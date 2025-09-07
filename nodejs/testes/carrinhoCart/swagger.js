import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Carrinho de Compras API",
      version: "1.0.0",
      description: "API para gerenciar usuários, produtos, carrinho e pedidos",
    },
    servers: [
      {
        url: "http://localhost:3000/api", // ajuste se precisar
      },
    ],
  },
  apis: ["./src/routers/cart.js"], // arquivos onde você vai documentar as rotas
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
