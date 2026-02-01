```zsh

npm i -g @nestjs/cli

nest g controller users

nest g service users

nest g module users

#Tudo de uma vez (recurso completo) (cria module, controller, service e DTOs)
#Ele ainda pergunta:
#REST ou GraphQL?
#CRUD ou não?

nest g resource users

```

```zsh
# prisma

npx prisma migrate dev

npx prisma generate

# Sempre que mudar o schema.prisma:
npx prisma migrate dev --name nome_da_mudanca

# Exemplos:

npx prisma migrate dev --name add_phone_to_user
npx prisma migrate dev --name create_orders
```
