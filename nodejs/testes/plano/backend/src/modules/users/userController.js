import { createUserSchema, loginSchema } from "./userSchema.js";
import UserService from "./userService.js";

class UserController {
	constructor(pool) {
		this.pool = pool;

		this.userService = new UserService(this.pool);
	}

	async create(req, res) {
		const { name, email, password } = createUserSchema.parse(req.body);

		if (!name || !email || !password) {
			return res.status(400).json({ message: "Dados obrigatórios ausentes" });
		}

		const user = await this.userService.createUserService(
			name,
			email,
			password,
		);

		return res.status(201).json(user);
	}

	async login(req, res) {
		const { email, password } = loginSchema.parse(req.body);

		const response = await this.userService.loginUserService(email, password);

		return res.status(200).json(response);
	}

	async me(req, res) {
		const userId = req.user.id;

		if (!userId) {
			return res.status(401).json({ message: "User id da rota me invalido" });
		}

		const response = await this.userService.meUserService(userId);

		return res.status(200).json(response);
	}
}

export default UserController;
