import app from "./app.js";
import "./configs/env.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`API rodando na porta ${PORT}`);
});
