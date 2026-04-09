.env

```bash

YOUTUBE_API_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
JWT_SECRET=

```

docker postgres

```bash

# criar container
docker run --name meu_postgres \
  -e POSTGRES_USER=root \
  -e POSTGRES_PASSWORD=admin \
  -e POSTGRES_DB=youtubedata \
  -p 5432:5432 \
  -d postgres

docker exec -it meu_postgres psql -U root -d youtubedata

# ver tabelas

\dt

\d youtube_videos

# sair

\q

# descobrir ip do container docker
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' NOME_OU_ID_DO_CONTAINER

# criar container redis
docker run -d \
  --name redis \
  -p 6379:6379 \
  -v redis-data:/data \
  redis redis-server --appendonly yes

docker exec -it redis redis-cli

SCAN 0

GET minha-chave

info

```

configuração do banco de dados postgres

```bash

# para criar as tabelas -> pasta db -> init.js
npm run init:db

# criar usuario admin no banco -> pasta db -> admin.js
npm run admin


```

rotas

```bash

# videos pelo pais maximo de video do youtube
localhost:3001/youtube/v1/ytvideo/JP?maxResults=2

# busca por pais
localhost:3001/youtube/v1/yaltavideos/JP

```

configuração no google oauth2

```bash

# auth-google-teste

# colocar em Acesso a dados -> adicionar ou remover escopos
https://www.googleapis.com/auth/youtube.readonly
https://www.googleapis.com/auth/youtube.force-ssl
https://www.googleapis.com/auth/youtube

# adicionar usuario de teste -> em Público-alvo -> Usuario teste + add users colocar email
exemplo@email.com

```
