docker postgres

```bash

# criar container
docker run --name meu_postgres \
  -e POSTGRES_USER=root \
  -e POSTGRES_PASSWORD=admin \
  -e POSTGRES_DB=<nomeDobanco> \
  -p 5432:5432 \
  -d postgres

docker exec -it meu_postgres psql -U root -d <nomeDobanco>

# ver tabelas

\dt

\d youtube_videos

# sair

\q

```

rotas

```bash

# users
localhost:3001/v1/create-users

{
	"name": "nome sobrenome",
	"email": "@email.com",
	"password": "123"
}

# products
localhost:3001/v2/create-products

{
	"name": "Notebook Acer 15",
	"price": 2200,
	"stock": 10
}

bearer token

# carts
localhost:3001/v3/create-carts-users/3a4734f7-65a1-4ee1-8dda-9f37604fb0e4

{
	"productId": "3c7fc1f0-fcc5-41ad-82c7-4683f9501b14",
	"quantity": 1
}

bearer token

# rota de paginação com cursor bidirecional
localhost:3001/v1/checkout/orders/pages?cursor_created_at=2025-09-08T15:19:43.113Z&cursor_id=5d00de0a-cf32-49f1-8086-b58d0f6fdcd5&limit=5&direction=next

bearer token
```
