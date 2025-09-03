import { jest } from "@jest/globals";
import YoutubeAltaRepository from "../../youtubeAlta/repository/youtubeAltaRepository.js";

describe("YoutubeAltaRepository", () => {
  let repo;
  let mockDb;

  beforeEach(() => {
    mockDb = { query: jest.fn() };
    repo = new YoutubeAltaRepository(mockDb);
  });

  it("deve salvar vídeos no banco", async () => {
    const fakeVideos = [
      {
        id: "abc123",
        snippet: {
          title: "Video Teste",
          description: "Descrição",
          channelTitle: "Canal",
          publishedAt: "2025-09-03",
          thumbnails: { default: "url" },
          tags: ["tag1"],
          channelId: "chan123"
        },
        statistics: { viewCount: 100 },
        etag: "etag123"
      }
    ];

    await repo.salvarVideos(fakeVideos, "BR");

    expect(mockDb.query).toHaveBeenCalledTimes(1);
    expect(mockDb.query).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
  });

  it("deve buscar vídeos salvos no banco", async () => {
    mockDb.query.mockResolvedValue({ rows: [{ id: 1, title: "Teste" }] });

    const result = await repo.queryBuscaDadosYoutubeAlta();

    expect(result.rows.length).toBe(1);
    expect(result.rows[0].title).toBe("Teste");
  });
});
