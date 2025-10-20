bug = quando usuario com role user tem acessar rota privada

```bash
// utils.isLoggedIn().checarRefreshToken()
// fica em loop infinito checa sem o token é true retorna para home.html
// mais se o token nao tem permisao o usuario role user volta para home.html
```
