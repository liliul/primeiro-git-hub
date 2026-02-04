🛡️ Ensures

---

# 1️⃣ `auth()` – Autenticação (quem é você?)

```js
auth(req, res, next) {
```

👉 **Primeira barreira**
Sem isso, ninguém entra.

---

### 🔹 Lê o header Authorization

```js
const authHeader = req.headers.authorization;
```

Espera algo assim:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

---

### 🔹 Token não veio? Bloqueia

```js
if (!authHeader) {
  throw new AppError("Token não informado", 401);
}
```

401 = **não autenticado**

---

### 🔹 Remove o `Bearer`

```js
const [, token] = authHeader.split(" ");
```

Resultado:

```js
token = "eyJhbGciOiJIUzI1NiIs..."
```

---

### 🔹 Valida o JWT

```js
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

✔ Assinatura válida
✔ Não expirou
✔ Não foi alterado

Se falhar → `catch`

---

### 🔹 Injeta o usuário na request

```js
req.user = {
  id: decoded.sub,
  roles: Array.isArray(decoded.roles)
    ? decoded.roles
    : [decoded.roles],
  permissions: decoded.permissions || [],
};
```

Agora **todas as rotas abaixo** têm acesso a:

```js
req.user.id
req.user.roles
req.user.permissions
```

📌 Isso é **stateless auth** (não consulta banco)

---

### 🔹 Continua o fluxo

```js
return next();
```

---

# 2️⃣ `ensureRole()` – RBAC (o que você É?)

```js
ensureRole(...allowedRoles)
```

👉 Controla **cargo / papel**
Ex: admin, superadmin, user

---

### 🔹 Retorna um middleware

```js
return (req, res, next) => {
```

Isso permite usar assim:

```js
authJwt.ensureRole("admin", "superadmin")
```

---

### 🔹 Confere se existe usuário

```js
if (!user || !user.roles) {
  throw new AppError("Permissão não encontrada", 403);
}
```

403 = autenticado, mas **sem acesso**

---

### 🔹 Verifica se algum role é permitido

```js
const hasRole = user.roles.some(role =>
  allowedRoles.includes(role)
);
```

✔ Se o usuário tiver **pelo menos um role permitido**, passa.

---

### 🔹 Bloqueia se não tiver

```js
if (!hasRole) {
  throw new AppError("Acesso negado", 403);
}
```

---

### 🧠 Quando usar

```js
ensureRole("admin")
```

Quando o **cargo** importa.

---

# 3️⃣ `ensurePermission()` – Permissions (o que você PODE fazer?)

```js
ensurePermission(...allowedPermissions)
```

👉 Controla **ações específicas**

---

### 🔹 Lê permissões do JWT

```js
const { permissions } = req.user;
```

Ex:

```json
["USER_CREATE", "USER_DELETE"]
```

---

### 🔹 Verifica se tem alguma permissão válida

```js
const hasPermission = permissions.some(p =>
  allowedPermissions.includes(p)
);
```

---

### 🔹 Bloqueia se não tiver

```js
if (!hasPermission) {
  throw new AppError("Permissão insuficiente", 403);
}
```

---

### 🧠 Quando usar

```js
ensurePermission("USER_DELETE")
```

Quando **não basta ser admin**, precisa poder fazer aquilo.

---

# 4️⃣ `ensurePolicy()` – ABAC (contexto e regra de negócio)

```js
ensurePolicy(policy)
```

👉 Regras **dinâmicas**, baseadas em contexto

---

### 🔹 Executa a policy

```js
const allowed = policy({
  user: req.user,
  resource: req.params,
  body: req.body,
});
```

Você decide a lógica fora:

```js
({ user, resource }) => user.id === resource.id
```

---

### 🔹 Bloqueia se a policy negar

```js
if (!allowed) {
  throw new AppError("Acesso negado pela política", 403);
}
```

---

### 🧠 Quando usar

* OWN vs ANY
* Multi-tenant
* Dono do recurso
* Regras complexas

---

# 🧩 Como tudo se conecta (fluxo real)

```js
router.delete(
  "/users/:id",
  authJwt.auth,                       // quem é você?
  authJwt.ensureRole("admin"),        // você é admin?
  authJwt.ensurePermission("USER_DELETE"), // pode deletar?
  authJwt.ensurePolicy(({ user, resource }) => {
    return user.id !== resource.id;   // regra especial
  }),
  controller.delete
);
```

---

# 🧠 Resumo mental (guarde isso)

| Método             | Pergunta                       |
| ------------------ | ------------------------------ |
| `auth`             | Quem é você?                   |
| `ensureRole`       | Qual seu cargo?                |
| `ensurePermission` | O que você pode fazer?         |
| `ensurePolicy`     | Pode fazer **nessa situação**? |

---

## 🎯 O que você construiu aqui

Isso é **arquitetura de segurança de sistema grande**:

* JWT stateless
* RBAC
* Permissions
* ABAC
* Refresh token rotativo
