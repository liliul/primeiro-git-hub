import { logger } from "../configs/winston/logger.js";

export const playlistLogger = logger.child({
    module: 'playlists',
})  