import PlanosService from "../service/planosService.js";
import {
	atualizandoPlanoSchema,
	criandoPlanoSchema,
} from "../schemas/planosSchemas.js";

class PlanoController {
	constructor(pool) {
		this.pool = pool;

		this.planosService = new PlanosService(this.pool);

		this.criandoNovoPlano = this.criandoNovoPlano.bind(this);
		this.buscandoTodosPlanos = this.buscandoTodosPlanos.bind(this);
		this.atualizarPlano = this.atualizarPlano.bind(this);
	}

	async criandoNovoPlano(req, res) {
		const { name, price, duration_days } = criandoPlanoSchema.parse(req.body);

		const metadata = {
			id: req.user.id,
			ip: req.ip,
			userAgent: req.headers["user-agent"],
			roles: req.user.roles,
		};

		try {
			const plano = await this.planosService.criandoNovoPlano(
				name,
				price,
				duration_days,
				metadata,
			);

			req.logger.info({
				event: "CREATED_NEW_PLAN",
				userId: metadata.id,
				plan: name,
				roles: metadata.roles,
			});

			return res
				.status(201)
				.json({ message: "Plano criado com sucesso.", data: plano });
		} catch (error) {
			req.logger.error({
				event: "ERROR_CREATED_NEW_PLAN",
				userId: metadata.id,
				plan: name,
				roles: metadata.roles,
				message: error.message,
			});

			return res.status(error.statusCode || 500).json({
				message: error.message,
			});
		}
	}

	async buscandoTodosPlanos(req, res) {
		const metadata = {
			id: req.user.id,
			ip: req.ip,
			userAgent: req.headers["user-agent"],
			roles: req.user.roles,
		};

		try {
			const todosPlanos = await this.planosService.buscandoTodosPlanos();

			req.logger.info({
				event: "SEARCH_PLANS",
				userId: metadata.id,
				ip: metadata.ip,
				userAgent: metadata.userAgent,
				roles: metadata.roles,
			});

			return res.status(201).json({
				message: "Busca por todos os planos com sucesso.",
				data: todosPlanos,
			});
		} catch (error) {
			req.logger.error({
				event: "ERROR_SEARCH_PLANS",
				userId: metadata.id,
				ip: metadata.ip,
				userAgent: metadata.userAgent,
				roles: metadata.roles,
				message: error.message,
			});

			return res
				.status(error.statusCode || 500)
				.json({ message: error.message });
		}
	}

	async atualizarPlano(req, res) {
		const { name, price, duration_days } = atualizandoPlanoSchema.parse(
			req.body,
		);
		const { id } = req.params;
		const metadata = {
			id: req.user.id,
			ip: req.ip,
			userAgent: req.headers["user-agent"],
			roles: req.user.roles,
		};

		const planoAtualizado = await this.planosService.atualizarPlano(
			name,
			price,
			duration_days,
			id,
		);

		return res.status(201).json({
			message: "Atualização do plano sucesso.",
			data: planoAtualizado,
		});
	}
}

export default PlanoController;
