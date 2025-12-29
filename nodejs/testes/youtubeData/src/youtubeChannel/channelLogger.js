import { logger } from "../configs/winston/logger.js";

export const channelLogger = logger.child({
    module: 'channel',
})  