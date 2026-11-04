# inversaodependencia

Exemplo de inversão de dependência com repositórios de pedidos em JSON e MongoDB.
O schema Mongoose grava os pedidos na coleção `pedidos`.

Instale as dependências:

```bash
bun install
```

Configure a conexão com o MongoDB e execute:

```bash
## criando mongoDB

docker run -d \
  --name mongotestes \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin \
  -v mongodb_pedidos:/data/db \
  mongo:7.0

## entrar no mongoDB

docker exec -it mongotestes mongosh -u admin -p admin --authenticationDatabase admin

## criar banco

use pedidos
```

```bash
## criar .env
MONGODB_URI="mongodb://admin:admin@localhost:27017/pedidos?authSource=admin";

bun run main.ts
```

Verifique os tipos:

```bash
bun run typecheck
```
