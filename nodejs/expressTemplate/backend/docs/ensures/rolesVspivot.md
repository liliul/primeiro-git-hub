1️⃣ **modelagem ideal de roles (enum vs pivot)**

---

# 1️⃣ Modelagem de roles: ENUM vs PIVOT

## ❌ ENUM no user (simples, mas perigoso a longo prazo)

### Exemplo

```sql
CREATE TYPE user_role AS ENUM ('user', 'admin');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'user'
);
```

### ✅ Vantagens

* simples
* rápido de implementar
* bom para sistemas pequenos

### ❌ Problemas reais

* migração dolorosa (alterar ENUM em produção é chato)
* usuário só pode ter **uma role**
* difícil crescer (moderator, editor, support…)
* tentador demais permitir `UPDATE users SET role = 'admin'`

👉 **Não recomendo** se o sistema vai crescer.

---

## ✅ Tabela pivot (recomendado / profissional)

### Modelagem base

```sql
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL
);

CREATE TABLE user_roles (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role_id INT REFERENCES roles(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, role_id)
);
```

### Roles iniciais

```sql
INSERT INTO roles (name) VALUES
('user'),
('admin'),
('super_admin');
```

### ✅ Vantagens

* usuário pode ter múltiplas roles
* adicionar role não exige migration pesada
* fácil auditar e controlar
* padrão usado em sistemas grandes

👉 **Essa é a escolha certa na maioria dos casos**.

---

## 🧠 Dica importante

Mesmo com pivot, **trate “admin” como role especial**, não como role comum.
