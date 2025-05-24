// insomnia
```bash
# 1. http://localhost:3000/auth/register

{
    "name": "naruto",
    "email": "uzumaki@example.com",
    "password": "naruto10"
}

# 2. http://localhost:3000/auth/login

{
    "email": "uzumaki@example.com",
    "password": "naruto10"
}

# 3. http://localhost:3000/users/
# listar todos os cadastros 
# copie o token e em auth Bearer Token colar em TOKEN

# 4. http://localhost:3000/users/id
# listar um cadastro 
# copie o token e em auth Bearer Token colar em TOKEN

# 5. http://localhost:3000/users/id
# atualiza so nome e email e nao a password
# copie o token e em auth Bearer Token colar em TOKEN

{
	"name": "Naruto uzumaki",
	"email": "uzumaki@email"
}

# 6. http://localhost:3000/users/id
# deleta so um cadastro 
# copie o token e em auth Bearer Token colar em TOKEN
```