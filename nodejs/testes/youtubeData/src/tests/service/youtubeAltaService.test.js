import { jest } from "@jest/globals";
import YoutubeAltaService from "../../youtubeAlta/services/youtubeAltaService.js";

describe("YoutubeAltaService", () => {
  let service;
  let mockRepo;
  let mockGetTrending;

  beforeEach(() => {
    mockRepo = {
      salvarVideos: jest.fn(),
      queryBuscaDadosYoutubeAlta: jest.fn()
    };
    mockGetTrending = {
      getTrendingVideos: jest.fn()
    };

    service = new YoutubeAltaService(null);
    service.youtubeAltaRepository = mockRepo;
    service.getTrendingVideos = mockGetTrending;
  });

  it("deve buscar vídeos em alta e salvar no banco", async () => {
    const fakeVideos = [{ id: "abc123", snippet: {}, statistics: {} }];
    mockGetTrending.getTrendingVideos.mockResolvedValue(fakeVideos);

    const result = await service.buscarYoutubeEmAlta("BR");

    expect(mockGetTrending.getTrendingVideos).toHaveBeenCalledWith("BR");
    expect(mockRepo.salvarVideos).toHaveBeenCalledWith(fakeVideos, "BR");
    expect(result).toEqual(fakeVideos);
  });

  it("deve buscar vídeos salvos do banco", async () => {
    mockRepo.queryBuscaDadosYoutubeAlta.mockResolvedValue({ rows: [ { id: 1 } ] });

    const result = await service.buscarVideosSalvos();

    expect(result.rows.length).toBe(1);
  });
});
