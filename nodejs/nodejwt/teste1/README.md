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
  passworld VARCHAR(50),
  role VARCHAR(10),
  date DATE
);

show tables;

INSERT INTO usuario (username, passworld, role, date) VALUES ('kakashi','senha', 'admin', '2025-08-19');
INSERT INTO usuario (username, role) VALUES ('naruto', 'user');

DELETE FROM usuario WHERE id = 1;

DROP TABLE nome_da_tabela;

```
