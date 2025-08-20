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

create database nomeDoBancoDeDados;

show databases;

use nomeDoBancoDeDados;

CREATE TABLE usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  password VARCHAR(100),
  role VARCHAR(10)
);

show tables;

INSERT INTO usuario (username, passworld, role) VALUES ('kakashi','senha', 'admin');
INSERT INTO usuario (username, role) VALUES ('naruto', 'user');

DELETE FROM usuario WHERE id = 1;

DROP TABLE nome_da_tabela;

```
