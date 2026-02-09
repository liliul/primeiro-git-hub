1. **O que está “fora do lugar” hoje**
2. **Como ficaria a organização em Clean Architecture**
3. **Exemplo de controller refatorado (bem fino)**
4. **Onde entram auditoria, validação e serviços**

---

## 1. O que esse controller faz hoje

Hoje o `UserController` está:

* Recebendo HTTP (`req`, `res`) ✅
* Validando input com Zod ❌ (depende do seu rigor)
* Chamando serviços de domínio / aplicação ✅
* Lidando com auditoria ❌
* Conhecendo detalhes de infraestrutura (`pool`) ❌

Na Clean Architecture, o **controller deve ser burro**:

> Ele só traduz HTTP → caso de uso e caso de uso → HTTP.

---

## 2. Organização de pastas (Clean Architecture)

Um modelo bem comum para Express:

```
src/
│
├── domain/
│   ├── user/
│   │   ├── User.js
│   │   ├── UserRepository.js
│   │   └── errors/
│   │
│   └── auditoria/
│       ├── AuditoriaAction.js
│       └── Auditoria.js
│
├── application/
│   ├── usecases/
│   │   └── user/
│   │       ├── CreateUserUseCase.js
│   │       ├── LoginUserUseCase.js
│   │       ├── MeUserUseCase.js
│   │       └── UpdateUserUseCase.js
│   │
│   └── services/
│       └── AuditoriaService.js
│
├── infrastructure/
│   ├── database/
│   │   ├── pool.js
│   │   └── UserRepositoryPostgres.js
│   │
│   └── http/
│       ├── express/
│       │   ├── controllers/
│       │   │   └── UserController.js
│       │   ├── routes/
│       │   │   └── user.routes.js
│       │   └── middlewares/
│       │
│       └── schemas/
│           └── userSchema.js
│
└── main/
    └── factories/
        └── makeUserController.js
```

---

## 3. Controller em Clean Architecture (bem fino)

### `UserController.js`

```js
export default class UserController {
	constructor({
		createUserUseCase,
		loginUserUseCase,
		meUserUseCase,
		updateUserUseCase,
	}) {
		this.createUserUseCase = createUserUseCase;
		this.loginUserUseCase = loginUserUseCase;
		this.meUserUseCase = meUserUseCase;
		this.updateUserUseCase = updateUserUseCase;
	}

	async create(req, res) {
		const result = await this.createUserUseCase.execute(req.body);
		return res.status(201).json(result);
	}

	async login(req, res) {
		const result = await this.loginUserUseCase.execute({
			email: req.body.email,
			password: req.body.password,
			ip: req.ip,
			userAgent: req.headers["user-agent"],
		});

		return res.status(200).json(result);
	}

	async me(req, res) {
		const result = await this.meUserUseCase.execute({
			userId: req.user.id,
			permissions: req.user.permissions,
		});

		return res.status(200).json(result);
	}

	async update(req, res) {
		await this.updateUserUseCase.execute({
			userId: req.user.id,
			...req.body,
		});

		return res.status(204).send();
	}
}
```

👉 Repara:

* Nenhum `pool`
* Nenhuma auditoria
* Nenhum `try/catch` de regra de negócio
* Nenhuma regra de domínio

---

## 4. Caso de uso (onde a mágica acontece)

### `LoginUserUseCase.js`

```js
import { AuditoriaAction } from "../../../domain/auditoria/AuditoriaAction.js";

export default class LoginUserUseCase {
	constructor({ userRepository, auditoriaService }) {
		this.userRepository = userRepository;
		this.auditoriaService = auditoriaService;
	}

	async execute({ email, password, ip, userAgent }) {
		try {
			const response = await this.userRepository.login(email, password);

			await this.auditoriaService.log({
				userId: response.user.id,
				email,
				action: AuditoriaAction.LOGIN_SUCCESS,
				ip,
				userAgent,
			});

			return response;
		} catch (error) {
			await this.auditoriaService.log({
				email,
				action: AuditoriaAction.LOGIN_FAIL,
				ip,
				userAgent,
			});

			throw error;
		}
	}
}
```

💡 **Auditoria é regra de aplicação**, não de controller.

---

## 5. Validação (onde entra o Zod?)

Você tem 3 opções válidas:

### Opção 1 (mais comum em Express)

➡️ **Middleware de validação**

```js
export const validate =
	(schema) => (req, res, next) => {
		schema.parse(req.body);
		next();
	};
```

```js
router.post(
	"/login",
	validate(loginSchema),
	(req, res) => controller.login(req, res),
);
```

### Opção 2

➡️ Validação dentro do **UseCase** (mais purista)

### Opção 3

➡️ Validação no controller (menos clean, mas aceitável)

---

## 6. Factory (injeção de dependências)

### `makeUserController.js`

```js
export function makeUserController() {
	const userRepository = new UserRepositoryPostgres(pool);
	const auditoriaService = new AuditoriaService(pool);

	return new UserController({
		createUserUseCase: new CreateUserUseCase(userRepository),
		loginUserUseCase: new LoginUserUseCase({
			userRepository,
			auditoriaService,
		}),
		meUserUseCase: new MeUserUseCase(userRepository),
		updateUserUseCase: new UpdateUserUseCase(userRepository),
	});
}
```

---

## Regra de ouro pra lembrar

> **Controller**
>
> * Traduz HTTP ↔ aplicação
> * Não pensa
> * Não decide

> **UseCase**
>
> * Contém regras
> * Orquestra serviços
> * Decide o que acontece

