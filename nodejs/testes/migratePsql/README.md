1. Criar tabela para controlar migrations
   Antes de rodar qualquer migration, precisamos de uma tabela que registre quais já foram aplicadas:

```bash

CREATE TABLE IF NOT EXISTS migrations (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  run_on TIMESTAMP DEFAULT NOW()
);

```
