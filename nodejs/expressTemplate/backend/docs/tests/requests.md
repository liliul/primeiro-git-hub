```zsh

npx autocannon -c 50 -d 20 \
  -m POST \
  -H "Content-Type: application/json" \
  -b '{"email":"mauchiha@email.com","password":"hashirama10"}' \
  http://localhost:3000/user/login

```