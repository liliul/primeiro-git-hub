.env

```bash

YOUTUBE_API_KEY=
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

```
