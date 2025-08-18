const mysql = require("mysql2");
// conexão com MySQL no docker
const db = mysql.createConnection({
  host: "172.17.0.2",   // se rodar fora do docker
  user: "root",
  password: "root",
  database: "nodejwt"
});

db.connect(err => {
  if (err) {
    console.error("Erro ao conectar no MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL com sucesso!");
});

module.exports = db