import app from "./app.js";
import "./configs/env.js";
import { planosSeed } from "./database/migrations/seeds/planosSeed.js";

await planosSeed();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`API rodando na porta ${PORT}`);
});
