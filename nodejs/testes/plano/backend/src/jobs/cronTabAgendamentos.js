import cron from "node-cron";

class CronAgendamentos {
	constructor(pool) {
		this.pool = pool;
		this.refreshTokenExpiradosStarted = false;
		this.esqueceuSenhaExpiradoStarted = false;
	}

	async limpandoRefreshTokenExpirados() {
		if (this.refreshTokenExpiradosStarted) return;
		this.refreshTokenExpiradosStarted = true;
		cron.schedule("53 18 * * *", async () => {
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
	
	async limpandoTokensExpiradosEsqueceuSenha() {
		if (this.esqueceuSenhaExpiradoStarted) return
		this.esqueceuSenhaExpiradoStarted = true
		
		cron.schedule("55 18 * * *", async () => {
		try {
			const result = await this.pool.query(`
			DELETE FROM password_resets
			WHERE expires_at < NOW()
				OR used = true
			`);

			console.log(`[CRON] Esqueceu senha tokens usados ou expirados removidos: ${result.rowCount}`);
		} catch (err) {
			console.error("Erro ao limpar tokens:", err);
		}
		});
	}
}

export default CronAgendamentos;
