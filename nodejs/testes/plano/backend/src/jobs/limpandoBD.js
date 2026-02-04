import cron from "node-cron";

class LimpandoDB {
	constructor(pool) {
		this.pool = pool;
		this.started = false;
	}

	async limpandoRefreshToken() {
		if (this.started) return;
		this.started = true;
		cron.schedule("*/1 * * * *", async () => {
			try {
				const result = await this.pool.query(
					`DELETE FROM refresh_tokens WHERE expires_at < NOW()`,
				);

				console.log(
					`[CRON] Refresh tokens expirados removidos: ${result.rowCount}`,
				);
			} catch (error) {
				console.error("[CRON] Erro ao limpar refresh tokens", error);
			}
		});
	}
}

export default LimpandoDB;
