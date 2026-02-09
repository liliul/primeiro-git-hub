2️⃣ **como blindar isso contra bugs e falhas de segurança**

# 2️⃣ Blindando contra bugs e falhas comuns 

Agora vem a parte mais importante.

---

## 🚨 Bug comum #1 — Update genérico de roles

❌ Nunca permita:

```ts
PATCH /users/:id/roles
{ "roles": ["admin"] }
```

Isso é **porta aberta pra desastre**.

---

## ✅ Solução

### Separe ações comuns de ações críticas

#### Roles comuns

```http
PATCH /users/:id/roles
```

Permitido:

```json
{ "roles": ["editor", "support"] }
```

Bloqueado internamente:

* admin
* super_admin

---

#### Elevação crítica

```http
POST /users/:id/promote-to-admin
POST /users/:id/promote-to-super-admin
```

---

## 🚨 Bug comum #2 — Confiar no front-end

> “O front nunca vai mandar admin…”

❌ mentira clássica 😅

### Blindagem

* backend valida **sempre**
* ignore roles proibidas no payload
* ou falhe explicitamente

```ts
if (roles.includes("admin")) {
  throw new ForbiddenError();
}
```

---

## 🚨 Bug comum #3 — Admin criando admin

Pergunta-chave:

> **Admin pode criar outro admin?**

Se a resposta for “não”:

```ts
if (!currentUser.roles.includes("super_admin")) {
  throw new ForbiddenError();
}
```

👉 só `super_admin` promove admin.

---

## 🚨 Bug comum #4 — Falta de auditoria

Promoção de privilégio **precisa deixar rastro**.

### Tabela de auditoria

```sql
CREATE TABLE role_audit (
  id SERIAL PRIMARY KEY,
  actor_id UUID NOT NULL,
  target_user_id UUID NOT NULL,
  role TEXT NOT NULL,
  action TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
```

Sempre que promover:

```ts
INSERT INTO role_audit (...)
```

---

## 🚨 Bug comum #5 — Admin removendo o último admin

Isso já derrubou sistema em produção 😬

### Proteção

```ts
const adminCount = await countAdmins();

if (adminCount === 1) {
  throw new Error("Cannot remove last admin");
}
```

---

## 🚨 Bug comum #6 — Lógica espalhada

Role check no controller, service, repo… vira caos.

### Centralize

```ts
function canPromoteToAdmin(currentUser) {
  return currentUser.roles.includes("super_admin");
}
```

---

# 🧠 Regra de ouro final

> **Roles controlam acesso**
> **Ações críticas controlam poder**

Nunca misture os dois.
