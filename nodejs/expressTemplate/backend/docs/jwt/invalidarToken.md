**JWT por padrão não pode ser “invalidado”**, porque ele é stateless.
Mas **é totalmente possível invalidar tokens ativos** quando o usuário troca a senha, usando algumas estratégias.

Vou te explicar as formas corretas 👇

---

# ✅ Melhor prática: versionar o token (token version)

Você adiciona um campo no usuário, por exemplo:

```sql
token_version INTEGER DEFAULT 0
```

E inclui essa versão dentro do JWT:

```json
{
  "user_id": 123,
  "token_version": 2
}
```

### 🔁 Quando o usuário troca a senha:

Você incrementa no banco:

```sql
UPDATE users
SET token_version = token_version + 1
WHERE id = 123;
```

### 🔐 Na validação do JWT:

1. Decodifica o token
2. Busca o usuário no banco
3. Compara `token_version` do token com a do banco

Se forem diferentes → **token inválido**

✔ Funciona para AccessToken e RefreshToken
✔ Não precisa blacklist
✔ Escalável

---

# ✅ Alternativa 2: usar `password_changed_at`

Outra estratégia comum:

Adicionar coluna:

```sql
password_changed_at TIMESTAMP
```

No JWT você inclui o `iat` (issued at, já vem por padrão).

Na validação:

```text
Se token.iat < password_changed_at → token inválido
```

Quando o usuário troca a senha:

```sql
UPDATE users
SET password_changed_at = NOW()
WHERE id = 123;
```

✔ Muito usada
✔ Simples
✔ Não precisa guardar versão

---

# ⚠ Alternativa 3: blacklist de tokens

Você salva o `jti` (JWT ID) em uma tabela de tokens revogados:

```sql
revoked_tokens (jti, expires_at)
```

Quando quiser invalidar:

* Salva o jti na blacklist
* Na validação, consulta se ele está lá

❌ Mais pesado
❌ Precisa consultar banco ou Redis sempre
❌ Não escala tão bem

---

# 🔥 Melhor arquitetura com Refresh Token

O ideal hoje é:

* AccessToken → vida curta (5–15 min)
* RefreshToken → salvo no banco
* Ao trocar senha → delete todos refresh tokens do usuário

Exemplo:

```sql
DELETE FROM refresh_tokens
WHERE user_id = 123;
```

Assim:

* Todos os refresh tokens morrem
* Access tokens expiram em poucos minutos

---

# 🎯 Recomendação profissional

Use:

* `password_changed_at` OU `token_version`
* Refresh token salvo no banco
* Access token curto

Essa combinação resolve 99% dos casos de segurança.
