import app from "./app.js";
import "./configs/env.js";
import { pool } from "./database/postgres.js";
import LimpandoDB from "./jobs/limpandoBD.js";

const PORT = process.env.PORT || 3000;

const limpandoBD = new LimpandoDB(pool);
limpandoBD.limpandoRefreshToken();

app.listen(PORT, () => {
	console.log(`API rodando na porta ${PORT}`);
});
