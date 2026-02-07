import cron from "node-cron";

class CronAgendamentos {
	constructor(pool) {
		this.pool = pool;
		this.started = false;
	}

	async limpandoRefreshTokenExpirados() {
		if (this.started) return;
		this.started = true;
		cron.schedule("0 3 * * *", async () => {
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

export default CronAgendamentos;
