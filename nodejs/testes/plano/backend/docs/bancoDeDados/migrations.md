Em projetos com Express.js, além de `migrations` e `seeds`, é comum organizar a camada de banco com outras pastas úteis dependendo do ORM/query builder que você usa (como Sequelize, Knex.js ou Prisma).

Uma estrutura bem comum fica assim:

```bash
database/
├── migrations/
├── seeds/
├── factories/
├── fixtures/
├── scripts/
├── backups/
├── dumps/
├── schema/
└── tests/
```

O que cada uma faz:

* `migrations/`
  Alterações versionadas da estrutura do banco.

* `seeds/`
  Dados iniciais ou fake data.

* `factories/`
  Geradores de dados para testes.
  Ex:

  ```js
  userFactory()
  ```

* `fixtures/`
  Dados estáticos de teste.
  Ex:

  ```json
  users.json
  ```

* `scripts/`
  Scripts auxiliares:

  * limpar banco
  * importar CSV
  * sincronizar dados
  * manutenção

* `backups/` ou `dumps/`
  Dumps SQL e backups locais.

* `schema/`
  Arquivos de schema/documentação do banco.
  Ex:

  ```sql
  schema.sql
  ```

* `tests/`
  Testes específicos da camada de banco.

---

Uma estrutura mais profissional para API Express costuma ser:

```bash
src/
├── database/
│   ├── migrations/
│   ├── seeds/
│   ├── factories/
│   ├── scripts/
│   └── config/
```

Também é comum adicionar:

```bash
database/
├── views/
├── procedures/
├── triggers/
├── functions/
```

caso use recursos avançados do banco SQL.
