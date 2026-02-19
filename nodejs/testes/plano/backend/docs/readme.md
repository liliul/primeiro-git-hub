# API Auth Node.js (JWT + Refresh Token)

API de autenticação e autorização usando Node.js, Express, PostgreSQL,
JWT, Refresh Token rotativo, RBAC e ABAC.

## 🚀 Tecnologias
- Node.js 24
- Express
- PostgreSQL
- JWT
- bcrypt
- Zod
- node-cron

## 📦 Funcionalidades
- Cadastro de usuário
- Login com JWT
- Refresh token com rotação
- Logout
- RBAC (roles)
- Permissions
- ABAC (policies)
- Limpeza automática de refresh tokens expirados

## 🔐 Autenticação
- Access Token (JWT)
- Refresh Token (UUID)
- Rotação de refresh token
- Logout invalida refresh token

## 🧠 Autorização
- Roles: user, admin, superadmin
- Permissions: USER_CREATE, USER_DELETE, etc
- Policies (ex: usuário só edita o próprio perfil)

## 🛠️ Como rodar o projeto
```bash
# .env.example

npm install
npm run dev

```