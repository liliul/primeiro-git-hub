# iniciar

```bash
node src/index.js
```

---

## 🔗 Fluxo de um encurtador de links

### 1. **Receber URL original**

- Usuário envia a URL longa (ex: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`) para o sistema, geralmente via:

  - Formulário na web
  - API REST
  - CLI ou outro cliente

---

### 2. **Validar URL**

- Checa se o input é uma URL válida (`http://` ou `https://`).
- Pode aplicar regras extras:

  - Não permitir certos domínios (blacklist)
  - Normalizar a URL (remover espaços, parâmetros desnecessários)

---

### 3. **Gerar um identificador curto**

- Criar um **código único** para representar a URL original.
- Exemplos de estratégias:

  - **Hashing** (MD5, SHA1 → truncado em 6-8 chars)
  - **Base62 encoding** de um ID incremental (1 → `a`, 2 → `b`, etc.)
  - **UUID encurtado**

- Exemplo: `dQw4w9`

URL final:
👉 `https://meuencurtador.com/dQw4w9`

---

### 4. **Salvar no banco de dados**

Estrutura típica de tabela:

| id  | original_url                                                                               | short_code | created_at          | clicks |
| --- | ------------------------------------------------------------------------------------------ | ---------- | ------------------- | ------ |
| 1   | [https://www.youtube.com/watch?v=dQw4w9WgXcQ](https://www.youtube.com/watch?v=dQw4w9WgXcQ) | dQw4w9     | 2025-09-12 10:00:00 | 0      |

---

### 5. **Retornar link encurtado**

- Para o usuário/cliente, retorna:

```json
{
  "shortUrl": "https://meuencurtador.com/dQw4w9",
  "originalUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

---

### 6. **Redirecionamento**

- Quando alguém acessa `https://meuencurtador.com/dQw4w9`:

  1. O sistema busca `short_code = dQw4w9` no banco
  2. Recupera a `original_url`
  3. Incrementa o contador de cliques
  4. Retorna **HTTP 301/302 Redirect** para a URL original

---

### 7. **Analytics (opcional)**

- Registrar dados de acesso:

  - Quantidade de cliques
  - Geolocalização
  - Navegador, dispositivo
  - Último acesso

- Isso permite dashboards de estatísticas.

---

### 8. **Expiração e regras extras (opcional)**

- Link expira depois de `X` dias
- Links privados com senha
- Limite de cliques

---

## 🔄 Resumindo o fluxo

1. Usuário envia URL longa
2. Sistema valida
3. Gera código curto
4. Salva no banco
5. Retorna URL curta
6. Acesso → busca no banco → redireciona
7. (Opcional) Coleta métricas
