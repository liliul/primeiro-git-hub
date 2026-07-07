class EventsController {
    constructor(sseManager) {
        this.sseManager = sseManager

        this.notifyVideosAlta = this.notifyVideosAlta.bind(this)
    }

    notifyVideosAlta(req, res) {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        res.flushHeaders();

        this.sseManager.add(res)

        req.on('close', () => {
            this.sseManager.delete(res)
        })
    }
}

export default EventsController