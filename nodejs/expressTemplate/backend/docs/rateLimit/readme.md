### Rate Limit - Login

A rota `/login` possui limitação de tentativas:

- 5 tentativas a cada 15 minutos
- Retorna HTTP 429 ao exceder
- Proteção contra brute force
