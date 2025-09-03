import cron from "node-cron";
import YoutubeAltaService from "../youtubeAlta/services/youtubeAltaService.js";
import db from "../db/conection_db.js";

const service = new YoutubeAltaService(db);

// roda todo início de hora
cron.schedule("0 */6 * * *", async () => {
  console.log("🔄 Atualizando vídeos em alta...", new Date().toISOString());
  try {
    const videos = await service.buscarYoutubeEmAlta("JP");
    console.log(`✅ ${videos.length} vídeos salvos no banco`);
  } catch (err) {
    console.error("❌ Erro no cronjob:", err.message);
  }
});
