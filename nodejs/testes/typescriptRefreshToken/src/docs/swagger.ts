import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "node:path";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API RefreshToken JWT",
      version: "1.0.0",
      description: "Documentação da API usando Swagger",
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
        url: 'http://localhost:4000',
        description: 'Servidor Local'
      },
    ],
    security: [{ bearerAuth: [] }],
  },
  apis: [path.join(__dirname, "../router/*.ts")], 
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions as any);
export const swaggerUiMiddleware = swaggerUi;
  