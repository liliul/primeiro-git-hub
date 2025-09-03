import express from "express";
import request from "supertest";
import { jest } from "@jest/globals";
import YoutubeAlta from "../../youtubeAlta/controllers/youtubeAltaController.js";

describe("YoutubeAlta Controller", () => {
  let app;
  let mockService;

  beforeEach(() => {
    mockService = {
      buscarYoutubeEmAlta: jest.fn(),
      buscarVideosSalvos: jest.fn()
    };

    // instância do controller com mock do service
    const controller = new YoutubeAlta(null);
    controller.youtubeAltaService = mockService;

    app = express();
    app.get("/ytvideo/:id", controller.infoDoYoutubeEmAlta.bind(controller));
    app.get("/ytvideos", controller.buscarDadosDoYoutubeAlta.bind(controller));
  });

  it("GET /ytvideo/:id deve retornar vídeos em alta", async () => {
    mockService.buscarYoutubeEmAlta.mockResolvedValue([{ id: "abc123" }]);

    const res = await request(app).get("/ytvideo/BR");

    expect(res.statusCode).toBe(200);
    expect(res.body.count).toBe(1);
  });

  it("GET /ytvideos deve retornar vídeos salvos", async () => {
    mockService.buscarVideosSalvos.mockResolvedValue({ rows: [{ id: 1 }] });

    const res = await request(app).get("/ytvideos");

    expect(res.statusCode).toBe(200);
    expect(res.body.count).toBe(1);
  });
});
