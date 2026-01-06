import ListandoVideosRegionCodeService from "../services/listandoVideosRegionCodeService.js"

class ListandoVideosRegionCodeController {
    constructor(db) {
        this.db = db 

        this.listandoVideosRegionCodeService = new ListandoVideosRegionCodeService(this.db)
    }

    async listandoUF(req, res) {
        try {
            const { UF } = req.params

            const videos = await this.listandoVideosRegionCodeService.listandoVideosService(UF)

            res.status(200).json(videos)
        } catch (error) {
            res.status(401).json({ message: 'Erro ao pegar videos pelo id=JP', erro: error})
        }
    }
}

export default ListandoVideosRegionCodeController