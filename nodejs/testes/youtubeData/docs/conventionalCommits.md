Se você quis dizer **“como usar Conventional Commits para cada tipo de mudança”**, a ideia é escolher o `type` conforme a natureza do commit.

 ## Principais tipos

 | Tipo | Quando usar | Exemplo |
| --- | --- | --- |
| `feat` | Nova funcionalidade | `feat: add user registration` |
| `fix` | Correção de bug | `fix: correct user email validation` |
| `refactor` | Refatoração sem mudar comportamento | `refactor: replace SELECT * with explicit columns` |
| `perf` | Melhoria de performance | `perf: optimize user query` |
| `docs` | Documentação | `docs: update API documentation` |
| `test` | Criação/alteração de testes | `test: add tests for user repository` |
| `build` | Alterações no build/dependências | `build: update node version` |
| `ci` | CI/CD | `ci: add GitHub Actions workflow` |
| `chore` | Manutenção que não se encaixa nos anteriores | `chore: update project configuration` |
| `style` | Formatação, lint, espaços etc., sem mudança de lógica | `style: format repository files` |
| `revert` | Reverter um commit anterior | `revert: feat: add user registration` |

### Estrutura

```
<type>[optional scope]: <description>
```

 Por exemplo:

```
feat(auth): add JWT authentication
fix(user): prevent duplicate email registration
refactor(repository): replace SELECT * with explicit columns
test(user): add repository integration tests
docs(api): update authentication documentation
chore: update dependencies
```

 ### No seu caso

 Você mudou:

```
SELECT *
```

 para:

```
SELECT name, id, created_at
```

 Se isso **não altera o comportamento da aplicação**, apenas melhora a query, seria:

```
refactor: replace SELECT * with explicit columns
```

 Se a mudança foi feita especificamente para **melhorar performance**, eu usaria:

```
perf: select only required columns
```

 A regra prática é: **não escolha `feat` porque você “fez uma alteração”; escolha `feat` apenas quando o usuário/aplicação ganha uma nova capacidade.**