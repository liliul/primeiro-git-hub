import { logger } from "../../configs/winston/logger.js";

export const searchLogger = logger.child({
    module: 'search',
})  