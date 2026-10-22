/**
 * Design Patterns em TypeScript aplicados a "Login Social" (OAuth 2.0)
 * Provedores: Google, Instagram, TikTok
 *
 * Padrões usados:
 *  1. ADAPTER   -> cada rede tem uma API diferente; adaptamos todas para uma interface única
 *  2. FACTORY   -> cria o adapter certo a partir de um nome ("google", "tiktok"...)
 *  3. SINGLETON -> instância única de coisas compartilhadas (config e armazenamento de tokens)
 *  4. STRATEGY  -> algoritmo trocável em runtime (como vincular a conta social a um usuário)
 *
 * Rodar:  npx tsx oauth-design-patterns.ts
 * (o HTTP é simulado no final do arquivo, então não precisa de credenciais reais)
 *
 * Obs.: URLs/campos das APIs reais mudam com frequência. Confira a documentação
 * oficial de cada provedor antes de usar em produção.
 */

import { randomUUID } from "node:crypto";

// ─────────────────────────────────────────────────────────────
// 0. TIPOS COMUNS (o "idioma" interno da nossa aplicação)
// ─────────────────────────────────────────────────────────────

type ProviderName = "google" | "instagram" | "tiktok";

interface OAuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number; // timestamp em ms
}

/** Perfil normalizado: não importa de qual rede veio, a aplicação sempre vê isto. */
interface SocialProfile {
  provider: ProviderName;
  providerUserId: string;
  displayName: string;
  email?: string; // Instagram e TikTok NÃO fornecem e-mail
  avatarUrl?: string;
}

interface ProviderCredentials {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

interface HttpClient {
  postForm<T>(url: string, body: Record<string, string>): Promise<T>;
  getJson<T>(url: string, headers?: Record<string, string>): Promise<T>;
}

class FetchHttpClient implements HttpClient {
  async postForm<T>(url: string, body: Record<string, string>): Promise<T> {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(body),
    });
    if (!res.ok) throw new Error(`POST ${url} falhou: ${res.status}`);
    return (await res.json()) as T;
  }

  async getJson<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`GET ${url} falhou: ${res.status}`);
    return (await res.json()) as T;
  }
}

// ─────────────────────────────────────────────────────────────
// 1. SINGLETON
// ─────────────────────────────────────────────────────────────
// PROBLEMA: precisamos de UMA única fonte de configuração e UM único
//           armazenamento de tokens em toda a aplicação.
// QUANDO USAR: config, cache, pool de conexões, logger, registry.
// CUIDADO: dificulta testes (estado global). Mitigamos injetando o resto
//          (http, repositório) e deixando o Singleton só para o que é
//          realmente global.

class AppConfig {
  private static instance: AppConfig | null = null;
  private readonly credentials: Record<ProviderName, ProviderCredentials>;

  // construtor privado: ninguém consegue fazer `new AppConfig()` de fora
  private constructor() {
    const env = process.env;
    const redirect = (p: string) => `${env.APP_URL ?? "http://localhost:3000"}/auth/${p}/callback`;
    this.credentials = {
      google: {
        clientId: env.GOOGLE_CLIENT_ID ?? "demo-google-id",
        clientSecret: env.GOOGLE_CLIENT_SECRET ?? "demo-google-secret",
        redirectUri: redirect("google"),
      },
      instagram: {
        clientId: env.INSTAGRAM_CLIENT_ID ?? "demo-ig-id",
        clientSecret: env.INSTAGRAM_CLIENT_SECRET ?? "demo-ig-secret",
        redirectUri: redirect("instagram"),
      },
      tiktok: {
        clientId: env.TIKTOK_CLIENT_KEY ?? "demo-tt-key",
        clientSecret: env.TIKTOK_CLIENT_SECRET ?? "demo-tt-secret",
        redirectUri: redirect("tiktok"),
      },
    };
  }

  static getInstance(): AppConfig {
    if (!AppConfig.instance) AppConfig.instance = new AppConfig();
    return AppConfig.instance;
  }

  getCredentials(provider: ProviderName): ProviderCredentials {
    return this.credentials[provider];
  }
}

/** Segundo Singleton: guarda tokens. Em produção seria Redis/banco (criptografado). */
class TokenStore {
  private static instance: TokenStore | null = null;
  private tokens = new Map<string, OAuthTokens>();

  private constructor() {}

  static getInstance(): TokenStore {
    if (!TokenStore.instance) TokenStore.instance = new TokenStore();
    return TokenStore.instance;
  }

  save(userId: string, provider: ProviderName, tokens: OAuthTokens): void {
    this.tokens.set(`${userId}:${provider}`, tokens);
  }

  get(userId: string, provider: ProviderName): OAuthTokens | undefined {
    return this.tokens.get(`${userId}:${provider}`);
  }
}

// ─────────────────────────────────────────────────────────────
// 2. ADAPTER
// ─────────────────────────────────────────────────────────────
// PROBLEMA: Google, Instagram e TikTok fazem a MESMA coisa (OAuth), mas com
//           nomes de campos, URLs e formatos de resposta diferentes:
//             Google    -> client_id,  userinfo.sub,  resposta plana
//             Instagram -> user_id no token, graph.instagram.com/me
//             TikTok    -> client_key (não client_id!), open_id, resposta em { data: { user } }
// SOLUÇÃO: uma interface única (OAuthProvider). Cada adapter "traduz"
//          a API externa para ela.
// QUANDO USAR: integrar APIs/SDKs de terceiros, bibliotecas legadas,
//              gateways de pagamento, provedores de e-mail/SMS, storage (S3/GCS).

/** A interface "alvo" que o resto da aplicação conhece. */
interface OAuthProvider {
  readonly name: ProviderName;
  getAuthorizationUrl(state: string): string;
  exchangeCode(code: string): Promise<OAuthTokens>;
  getProfile(accessToken: string): Promise<SocialProfile>;
}

// ----- Google ------------------------------------------------
class GoogleOAuthAdapter implements OAuthProvider {
  readonly name = "google" as const;

  constructor(private creds: ProviderCredentials, private http: HttpClient) {}

  getAuthorizationUrl(state: string): string {
    const params = new URLSearchParams({
      client_id: this.creds.clientId,
      redirect_uri: this.creds.redirectUri,
      response_type: "code",
      scope: "openid email profile",
      access_type: "offline", // pede refresh_token
      state,
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  }

  async exchangeCode(code: string): Promise<OAuthTokens> {
    const res = await this.http.postForm<{
      access_token: string;
      refresh_token?: string;
      expires_in: number;
    }>("https://oauth2.googleapis.com/token", {
      code,
      client_id: this.creds.clientId,
      client_secret: this.creds.clientSecret,
      redirect_uri: this.creds.redirectUri,
      grant_type: "authorization_code",
    });
    return {
      accessToken: res.access_token,
      refreshToken: res.refresh_token,
      expiresAt: Date.now() + res.expires_in * 1000,
    };
  }

  async getProfile(accessToken: string): Promise<SocialProfile> {
    const u = await this.http.getJson<{
      sub: string;
      name: string;
      email?: string;
      picture?: string;
    }>("https://www.googleapis.com/oauth2/v3/userinfo", {
      Authorization: `Bearer ${accessToken}`,
    });
    return {
      provider: "google",
      providerUserId: u.sub,
      displayName: u.name,
      email: u.email,
      avatarUrl: u.picture,
    };
  }
}

// ----- Instagram ---------------------------------------------
class InstagramOAuthAdapter implements OAuthProvider {
  readonly name = "instagram" as const;

  constructor(private creds: ProviderCredentials, private http: HttpClient) {}

  getAuthorizationUrl(state: string): string {
    const params = new URLSearchParams({
      client_id: this.creds.clientId,
      redirect_uri: this.creds.redirectUri,
      response_type: "code",
      scope: "instagram_business_basic",
      state,
    });
    return `https://www.instagram.com/oauth/authorize?${params}`;
  }

  async exchangeCode(code: string): Promise<OAuthTokens> {
    const res = await this.http.postForm<{ access_token: string; user_id: string }>(
      "https://api.instagram.com/oauth/access_token",
      {
        client_id: this.creds.clientId,
        client_secret: this.creds.clientSecret,
        grant_type: "authorization_code",
        redirect_uri: this.creds.redirectUri,
        code,
      },
    );
    return {
      accessToken: res.access_token,
      // o token curto do Instagram dura ~1h e não vem com expires_in nem refresh_token
      expiresAt: Date.now() + 60 * 60 * 1000,
    };
  }

  async getProfile(accessToken: string): Promise<SocialProfile> {
    const qs = new URLSearchParams({
      fields: "user_id,username,profile_picture_url",
      access_token: accessToken,
    });
    const u = await this.http.getJson<{
      user_id: string;
      username: string;
      profile_picture_url?: string;
    }>(`https://graph.instagram.com/me?${qs}`);
    return {
      provider: "instagram",
      providerUserId: u.user_id,
      displayName: u.username, // não existe "name" nem "email"
      avatarUrl: u.profile_picture_url,
    };
  }
}

// ----- TikTok ------------------------------------------------
class TikTokOAuthAdapter implements OAuthProvider {
  readonly name = "tiktok" as const;

  constructor(private creds: ProviderCredentials, private http: HttpClient) {}

  getAuthorizationUrl(state: string): string {
    const params = new URLSearchParams({
      client_key: this.creds.clientId, // <- TikTok chama de client_key
      redirect_uri: this.creds.redirectUri,
      response_type: "code",
      scope: "user.info.basic",
      state,
    });
    return `https://www.tiktok.com/v2/auth/authorize/?${params}`;
  }

  async exchangeCode(code: string): Promise<OAuthTokens> {
    const res = await this.http.postForm<{
      access_token: string;
      refresh_token: string;
      expires_in: number;
      open_id: string;
    }>("https://open.tiktokapis.com/v2/oauth/token/", {
      client_key: this.creds.clientId,
      client_secret: this.creds.clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: this.creds.redirectUri,
    });
    return {
      accessToken: res.access_token,
      refreshToken: res.refresh_token,
      expiresAt: Date.now() + res.expires_in * 1000,
    };
  }

  async getProfile(accessToken: string): Promise<SocialProfile> {
    const res = await this.http.getJson<{
      data: { user: { open_id: string; display_name: string; avatar_url?: string } };
    }>("https://open.tiktokapis.com/v2/user/info/?fields=open_id,display_name,avatar_url", {
      Authorization: `Bearer ${accessToken}`,
    });
    const u = res.data.user; // resposta aninhada
    return {
      provider: "tiktok",
      providerUserId: u.open_id,
      displayName: u.display_name,
      avatarUrl: u.avatar_url,
    };
  }
}

// ─────────────────────────────────────────────────────────────
// 3. FACTORY
// ─────────────────────────────────────────────────────────────
// PROBLEMA: o controller recebe "google" / "tiktok" na rota (/auth/:provider)
//           e não deve ter if/else ou switch espalhado para escolher a classe.
// SOLUÇÃO: a Factory centraliza a criação. Adicionar um provedor novo
//          (ex.: Facebook) = criar um adapter + registrar aqui. Nada mais muda
//          (princípio Aberto/Fechado).
// QUANDO USAR: quando o tipo concreto depende de dados de runtime
//              (query string, config, feature flag, tipo de arquivo, etc.).

type ProviderConstructor = new (creds: ProviderCredentials, http: HttpClient) => OAuthProvider;

class OAuthProviderFactory {
  private static registry = new Map<ProviderName, ProviderConstructor>([
    ["google", GoogleOAuthAdapter],
    ["instagram", InstagramOAuthAdapter],
    ["tiktok", TikTokOAuthAdapter],
  ]);

  static create(name: string, http: HttpClient): OAuthProvider {
    const Ctor = OAuthProviderFactory.registry.get(name as ProviderName);
    if (!Ctor) throw new Error(`Provedor OAuth não suportado: "${name}"`);
    // a Factory usa o Singleton de config para montar o adapter
    const creds = AppConfig.getInstance().getCredentials(name as ProviderName);
    return new Ctor(creds, http);
  }
}

// ─────────────────────────────────────────────────────────────
// 4. STRATEGY
// ─────────────────────────────────────────────────────────────
// PROBLEMA: depois do OAuth, precisamos descobrir QUEM é o usuário no nosso
//           sistema. A regra muda por provedor:
//             - Google dá e-mail  -> podemos vincular a uma conta existente pelo e-mail
//             - Instagram/TikTok NÃO dão e-mail -> só dá para usar o ID do provedor
// SOLUÇÃO: cada regra é uma "estratégia" intercambiável com a mesma interface.
//          O AuthService escolhe a estratégia, mas não conhece os detalhes.
// QUANDO USAR: vários algoritmos para a mesma tarefa que variam por contexto:
//              cálculo de frete/desconto, formas de pagamento, ordenação,
//              validação, estratégias de retry/cache.
// Diferença para Factory: Factory decide QUAL OBJETO criar;
//                         Strategy decide COMO um comportamento é executado.

interface UserRecord {
  id: string;
  name: string;
  email?: string;
  links: { provider: ProviderName; providerUserId: string }[];
}

interface UserRepository {
  findByEmail(email: string): UserRecord | undefined;
  findByProviderId(provider: ProviderName, id: string): UserRecord | undefined;
  create(profile: SocialProfile): UserRecord;
  addLink(user: UserRecord, profile: SocialProfile): void;
}

class InMemoryUserRepository implements UserRepository {
  private users: UserRecord[] = [];

  findByEmail(email: string) {
    return this.users.find((u) => u.email === email);
  }

  findByProviderId(provider: ProviderName, id: string) {
    return this.users.find((u) =>
      u.links.some((l) => l.provider === provider && l.providerUserId === id),
    );
  }

  create(profile: SocialProfile): UserRecord {
    const user: UserRecord = {
      id: `user_${this.users.length + 1}`,
      name: profile.displayName,
      email: profile.email,
      links: [{ provider: profile.provider, providerUserId: profile.providerUserId }],
    };
    this.users.push(user);
    return user;
  }

  addLink(user: UserRecord, profile: SocialProfile): void {
    const exists = user.links.some(
      (l) => l.provider === profile.provider && l.providerUserId === profile.providerUserId,
    );
    if (!exists) user.links.push({ provider: profile.provider, providerUserId: profile.providerUserId });
  }
}

/** Interface comum de todas as estratégias. */
interface AccountLinkingStrategy {
  resolveUser(profile: SocialProfile, repo: UserRepository): UserRecord;
}

/** Estratégia A: tenta pelo ID do provedor; senão, pelo e-mail; senão, cria. */
class LinkByEmailStrategy implements AccountLinkingStrategy {
  resolveUser(profile: SocialProfile, repo: UserRepository): UserRecord {
    const byProvider = repo.findByProviderId(profile.provider, profile.providerUserId);
    if (byProvider) return byProvider;

    // ATENÇÃO: só vincule por e-mail se o provedor garante que o e-mail é verificado
    // (o Google garante via email_verified). Senão abre brecha de account takeover.
    if (profile.email) {
      const byEmail = repo.findByEmail(profile.email);
      if (byEmail) {
        repo.addLink(byEmail, profile);
        return byEmail;
      }
    }
    return repo.create(profile);
  }
}

/** Estratégia B: só confia no ID do provedor (não existe e-mail para comparar). */
class LinkByProviderIdStrategy implements AccountLinkingStrategy {
  resolveUser(profile: SocialProfile, repo: UserRepository): UserRecord {
    return repo.findByProviderId(profile.provider, profile.providerUserId) ?? repo.create(profile);
  }
}

// ─────────────────────────────────────────────────────────────
// 5. COLA: AuthService usa os 4 padrões juntos
// ─────────────────────────────────────────────────────────────
// Repare: o AuthService NÃO tem nenhum if("google") / switch(provider).
// Ele só fala com interfaces: OAuthProvider e AccountLinkingStrategy.

class AuthService {
  // state anti-CSRF: gerado no início do login e validado no callback
  private pendingStates = new Map<string, ProviderName>();

  // mapa provedor -> estratégia (poderia vir de config)
  private strategies: Record<ProviderName, AccountLinkingStrategy> = {
    google: new LinkByEmailStrategy(),
    instagram: new LinkByProviderIdStrategy(),
    tiktok: new LinkByProviderIdStrategy(),
  };

  constructor(private http: HttpClient, private users: UserRepository) {}

  /** Passo 1: devolve a URL para redirecionar o usuário ao provedor. */
  startLogin(providerName: string): string {
    const provider = OAuthProviderFactory.create(providerName, this.http); // FACTORY
    const state = randomUUID();
    this.pendingStates.set(state, provider.name);
    return provider.getAuthorizationUrl(state); // ADAPTER
  }

  /** Passo 2: o provedor redireciona de volta com ?code=...&state=... */
  async handleCallback(providerName: string, code: string, state: string): Promise<UserRecord> {
    const expected = this.pendingStates.get(state);
    if (!expected || expected !== providerName) throw new Error("state inválido (possível CSRF)");
    this.pendingStates.delete(state);

    const provider = OAuthProviderFactory.create(providerName, this.http); // FACTORY
    const tokens = await provider.exchangeCode(code); // ADAPTER
    const profile = await provider.getProfile(tokens.accessToken); // ADAPTER

    const strategy = this.strategies[provider.name]; // STRATEGY
    const user = strategy.resolveUser(profile, this.users);

    TokenStore.getInstance().save(user.id, provider.name, tokens); // SINGLETON
    return user;
  }
}

// ─────────────────────────────────────────────────────────────
// DEMO (HTTP simulado para rodar sem credenciais reais)
// ─────────────────────────────────────────────────────────────

class MockHttpClient implements HttpClient {
  async postForm<T>(url: string): Promise<T> {
    if (url.includes("oauth2.googleapis.com"))
      return { access_token: "g_access", refresh_token: "g_refresh", expires_in: 3600 } as T;
    if (url.includes("api.instagram.com"))
      return { access_token: "ig_access", user_id: "ig-777" } as T;
    if (url.includes("open.tiktokapis.com/v2/oauth"))
      return { access_token: "tt_access", refresh_token: "tt_refresh", expires_in: 86400, open_id: "tt-999" } as T;
    throw new Error(`POST não mockado: ${url}`);
  }

  async getJson<T>(url: string): Promise<T> {
    if (url.includes("googleapis.com/oauth2/v3/userinfo"))
      return { sub: "g-123", name: "Ana Souza", email: "ana@exemplo.com", picture: "https://img/g.png" } as T;
    if (url.includes("graph.instagram.com"))
      return { user_id: "ig-777", username: "ana.souza", profile_picture_url: "https://img/ig.png" } as T;
    if (url.includes("open.tiktokapis.com/v2/user/info"))
      return { data: { user: { open_id: "tt-999", display_name: "Ana no TikTok", avatar_url: "https://img/tt.png" } } } as T;
    throw new Error(`GET não mockado: ${url}`);
  }
}

async function main() {
  // Em produção: new AuthService(new FetchHttpClient(), new AlgumRepositorioReal())
  const auth = new AuthService(new MockHttpClient(), new InMemoryUserRepository());

  for (const name of ["google", "instagram", "tiktok"]) {
    const url = auth.startLogin(name);
    console.log(`\n[${name}] redirecionar para:\n  ${url.slice(0, 90)}...`);

    // simulando o callback: extrai o state da URL gerada
    const state = new URL(url).searchParams.get("state")!;
    const user = await auth.handleCallback(name, "codigo-fake", state);
    console.log(`[${name}] usuário logado:`, JSON.stringify(user));
  }

  // Singleton: sempre a mesma instância
  console.log("\nSingleton é o mesmo objeto?", AppConfig.getInstance() === AppConfig.getInstance());
  console.log("Token do user_1 no Google:", TokenStore.getInstance().get("user_1", "google")?.accessToken);

  // Factory rejeita provedor desconhecido
  try {
    OAuthProviderFactory.create("facebook", new MockHttpClient());
  } catch (e) {
    console.log("Factory:", (e as Error).message);
  }
}

main().catch(console.error);
