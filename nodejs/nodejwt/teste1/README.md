iniciar

```bash

node --watch index.js

```

jwt

```bash
# criar um .env
touch .env

JWT_SECRET= # para testar ex: "alksjkashdasjdaçksd"

```

Criando o banco de dados

```sh

create database nodejwt;

show databases;

use nodejwt;

CREATE TABLE usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  role VARCHAR(100)
);

show tables;

INSERT INTO usuario (username, role) VALUES ('kakashi', 'admin');
INSERT INTO usuario (username, role) VALUES ('naruto', 'user');

DELETE FROM usuario WHERE id = 1;

```
