import AuditoriaService from "./auditoriaService.js";

class AuditoriaController {
	constructor(pool) {
		this.pool = pool;

		this.auditoriaService = new AuditoriaService(this.pool);
	}

	async auditoriaSegura(data) {
		try {
			await this.auditoriaService.log(data);
		} catch (error) {
			console.error("Falha na auditoria", error);
		}
	}
}

export default AuditoriaController;