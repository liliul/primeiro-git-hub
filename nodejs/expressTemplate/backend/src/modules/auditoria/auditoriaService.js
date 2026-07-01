import AuditoriaRepository from "./auditoriaRepository.js";

class AuditoriaService {
	constructor(pool) {
		this.pool = pool;

		this.auditoriaRepository = new AuditoriaRepository(this.pool);
	}

	async log(data) {
		await this.auditoriaRepository.criandoAuditoriaAuth(data);
	}
}

export default AuditoriaService;
