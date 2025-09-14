import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Novo cliente conectado!");

  ws.on("message", (msg) => {
    console.log(`Mensagem recebida: ${msg}`);
    ws.send(`Echo: ${msg}`); 
  });

  ws.on("close", () => {
    console.log("Cliente desconectado");
  });
});
