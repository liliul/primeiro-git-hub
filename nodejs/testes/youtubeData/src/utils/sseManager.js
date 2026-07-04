class SseManager {

    constructor() {
        this.clients = new Set()
    }

    add(res) {
        this.clients.add(res)
    }

    remove(res) {
        this.clients.delete(res)
    }

    broadcast(event, data) {

        const payload =
            `event: ${event}\n` +
            `data: ${JSON.stringify(data)}\n\n`

        for (const client of this.clients) {
            client.write(payload)
        }

    }

}

export default new SseManager()