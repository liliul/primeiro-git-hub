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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: "http://localhost:3001/docs",
      },
    ],
  },
  apis: ["./src/docs/swaggerSchemas.js","./src/routers/cart.js","./src/routers/users.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
