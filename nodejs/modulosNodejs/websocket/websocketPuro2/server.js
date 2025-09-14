import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }, // permite qualquer frontend
});

io.on("connection", (socket) => {
  console.log("🔗 Novo cliente conectado:", socket.id);

  // Receber mensagem do cliente
  socket.on("chatMessage", (msg) => {
    console.log("📩 Mensagem recebida:", msg);

    // Enviar para TODOS conectados
    io.emit("chatMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ Cliente saiu:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("🚀 Servidor rodando em http://localhost:3000");
});
