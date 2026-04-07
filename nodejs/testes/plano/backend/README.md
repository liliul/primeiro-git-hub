| Método | Rota          | Descrição                     |
|--------|----------------|-------------------------------|
| POST   | /user/create   | criar usuários                |
| POST   | /user/login    | fazer login                   |
| GET    | /user/me       | Retorna dados do usuário logado|
| PUT    | /user/name     | Atualiza nome do usuário      |
| PUT    | /user/newpassword | atualizar senha do usuario |
| POST   | /auth/refresh  | Gerar novo access token       |
| POST   | /auth/logout   | fazer logout                  |
| POST   | /auth/esqueci-senha | esqueceu senha           |
| POST   | /auth/restaurar-senha | restaurando senha      |
| GET    | /superadmin/roles/:id | alterando roles do user|


## inicar container docker
```bash
# 1. criar e configurar .env

docker compose up -d # criar container

docker compose down -v # deletar container
```