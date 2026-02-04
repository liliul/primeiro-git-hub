# JWT permissions

---

## O que é `USER_CREATE`, `USER_DELETE`?

👉 **`USER_` é o domínio (recurso)**
👉 **`CREATE`, `DELETE` é a ação**

Ou seja:

```
<RECURSO>_<AÇÃO>
```

### Exemplos:

| Permission     | Significado             |
| -------------- | ----------------------- |
| `USER_CREATE`  | Pode criar usuários     |
| `USER_DELETE`  | Pode deletar usuários   |
| `USER_UPDATE`  | Pode editar usuários    |
| `POST_PUBLISH` | Pode publicar posts     |
| `ORDER_REFUND` | Pode estornar pedidos   |
| `ADMIN_ACCESS` | Pode acessar área admin |

Não é palavra reservada nem padrão JWT — **é padrão de mercado**.

---

## Por que usar esse padrão?

### 1️⃣ Organização

Fica fácil saber **o que a permissão faz só pelo nome**.

### 2️⃣ Escalável

Quando o sistema cresce:

```
USER_CREATE
USER_DELETE
USER_UPDATE
USER_VIEW
```

Sem bagunça.

### 3️⃣ Compatível com RBAC + ABAC

* Role = agrupamento de permissões
* Permission = ação específica

---

## Como isso funciona com roles

Exemplo de mapeamento lógico:

```js
const rolePermissions = {
  user: [],
  admin: [
    "USER_CREATE",
    "USER_UPDATE",
  ],
  superadmin: [
    "USER_CREATE",
    "USER_UPDATE",
    "USER_DELETE",
  ],
};
```

O JWT pode carregar:

```json
{
  "roles": ["admin"],
  "permissions": ["USER_CREATE", "USER_UPDATE"]
}
```

---

## Como usar no middleware

Você já fez certinho:

```js
authJwt.ensurePermission("USER_DELETE")
```

Isso só passa se:

```js
req.user.permissions.includes("USER_DELETE")
```

---

## Outras convenções comuns (você pode escolher)

### 🔹 Com `:` (estilo OAuth)

```
user:create
user:delete
order:refund
```

### 🔹 Com verbo primeiro

```
CREATE_USER
DELETE_USER
```

### 🔹 Com contexto

```
USER:CREATE:OWN
USER:CREATE:ANY
```

📌 A mais usada em sistemas corporativos é exatamente:

```
RESOURCE_ACTION
```

---

## Boa prática IMPORTANTE

❌ Não confundir:

* **role** ≠ **permission**

✔ `admin` → é um papel
✔ `USER_DELETE` → é uma capacidade

---

## Onde guardar isso no banco (recomendado)

### Simples (o que você já tem)

* `users.roles` (string ou array)
* `permissions` direto no JWT

### Profissional

* `roles`
* `permissions`
* `role_permissions`
* `user_roles`

Mas **não precisa agora**, seu modelo atual está certo para o estágio do projeto.

---

## Resumo rápido

* `USER_` = recurso (users)
* `CREATE / DELETE` = ação
* É convenção, não regra do JWT
* Facilita RBAC, ABAC e escala
* Você está fazendo do jeito certo 👍

Se quiser, te ajudo a:

* Criar enum de permissions
* Gerar permissions automático por resource
* Criar policy `OWN vs ANY`
* Migrar para modelo enterprise
