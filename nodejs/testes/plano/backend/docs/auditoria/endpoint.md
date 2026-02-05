Excelente pergunta — **isso aqui é mentalidade de sistema sério** 🧠🔒
Auditoria não é “logar tudo”, é **logar o que importa juridicamente, operacionalmente e em segurança**.

Vou te responder de forma **prática**, com **lista clara de endpoints**, **por quê**, e **o que registrar**.

---

## 🎯 Regra-mãe da auditoria

> **Audite tudo que:**
>
> * altera estado
> * mexe com permissão / acesso
> * expõe dado sensível
> * pode virar incidente ou disputa

Se der problema e alguém perguntar
“**quem fez isso, quando e de onde**?” → **precisa de auditoria**.

---

## 🔴 Auditoria OBRIGATÓRIA (sempre)

### 1️⃣ Autenticação & Sessão

| Endpoint                | Por quê                |
| ----------------------- | ---------------------- |
| `POST /login`           | tentativa de acesso    |
| `POST /logout`          | encerramento de sessão |
| `POST /refresh-token`   | abuso de token         |
| `POST /password/reset`  | takeover               |
| `POST /password/change` | conta comprometida     |

📌 Logar:

* userId (se existir)
* sucesso / falha
* IP
* user-agent
* motivo da falha

---

### 2️⃣ Usuários (identity & access)

| Endpoint                | Auditoria           |
| ----------------------- | ------------------- |
| `POST /users`           | criação de conta    |
| `PUT /users/:id`        | alteração de perfil |
| `PUT /users/:id/roles`  | **CRÍTICO**         |
| `DELETE /users/:id`     | exclusão            |
| `PUT /users/:id/status` | bloqueio / ban      |

🚨 **Qualquer coisa que mexe em acesso = auditável**

---

### 3️⃣ Roles & Permissions

| Endpoint            | Nível   |
| ------------------- | ------- |
| `POST /roles`       | crítico |
| `PUT /roles/:id`    | crítico |
| `DELETE /roles/:id` | crítico |
| `PUT /permissions`  | crítico |

Esses endpoints são **alvo primário de ataque interno**.

---

### 4️⃣ Configuração do sistema

| Endpoint                 | Exemplo         |
| ------------------------ | --------------- |
| `PUT /config/*`          | feature flags   |
| `PUT /settings/security` | MFA             |
| `PUT /settings/auth`     | JWT / expiração |

📌 Qualquer coisa que muda comportamento global.

---

## 🟠 Auditoria RECOMENDADA

### 5️⃣ Dados sensíveis (LGPD)

| Endpoint         | Por quê         |
| ---------------- | --------------- |
| `GET /users/:id` | acesso a PII    |
| `GET /reports/*` | dados agregados |
| `GET /exports/*` | vazamento       |

⚠️ Aqui normalmente:

* **logar acesso**, não conteúdo
* especialmente se não for o dono

---

### 6️⃣ Ações administrativas

| Endpoint            | Exemplo            |
| ------------------- | ------------------ |
| `POST /impersonate` | assumir identidade |
| `POST /unlock-user` | bypass             |
| `POST /reprocess`   | efeitos colaterais |

---

## 🟢 Auditoria OPCIONAL (volume alto)

### 7️⃣ CRUD comum

| Endpoint             | Auditar? |
| -------------------- | -------- |
| `POST /orders`       | talvez   |
| `PUT /orders/:id`    | talvez   |
| `DELETE /orders/:id` | talvez   |
| `GET /orders`        | não      |

Regra:

> Se dá pra reconstruir pelo estado final, **não precisa auditar tudo**.

---

## 🧾 O que salvar em UM evento de auditoria

Modelo mínimo e bom:

```json
{
  "actorId": "uuid",
  "actorRoles": ["admin"],
  "action": "USER_ROLE_UPDATE",
  "resource": {
    "type": "user",
    "id": "uuid"
  },
  "result": "SUCCESS",
  "metadata": {
    "ip": "1.2.3.4",
    "userAgent": "...",
    "diff": {
      "from": ["user"],
      "to": ["admin"]
    }
  },
  "createdAt": "2026-02-05T10:30:00Z"
}
```

---

## 🧠 Onde colocar a auditoria no código

### ❌ Não colocar

* controller (polui)
* middleware genérico (sem contexto)

### ✅ Colocar

* **service layer**
* ou **decorator / event**

Exemplo:

```js
await audit.log({
  actor: req.user,
  action: "USER_ROLE_UPDATE",
  resourceId: userId,
  before,
  after,
});
```

---

## 🛂 Quem pode ver auditoria?

| Role       | Acesso   |
| ---------- | -------- |
| superadmin | total    |
| auditor    | leitura  |
| admin      | limitado |
| user       | nunca    |

---

## 🚨 Erros comuns (evita isso)

* ❌ auditar `GET /health`
* ❌ salvar senha/token
* ❌ logar payload inteiro
* ❌ permitir delete de auditoria
* ❌ auditor editar auditoria

---

## 🧩 Checklist rápido

Se o endpoint:

* muda estado? → audita
* mexe em acesso? → audita
* expõe PII? → audita
* é administrativo? → audita

---

## TL;DR

* auditoria não é sobre volume
* é sobre **risco**
* IAM, auth e config = sempre
* leitura sensível = sim
* CRUD comum = talvez
* loga **quem / quando / o quê / resultado**
