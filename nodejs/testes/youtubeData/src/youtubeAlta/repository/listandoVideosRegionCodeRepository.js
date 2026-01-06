class ListandoVideosRegionCodeRepository {
    constructor(db) {
        this.db = db
    }

    async queryListandoVideosRegionCode(uf) {
        const videos = await this.db.query(`
            SELECT * 
            FROM youtube_videos 
            WHERE region_code = $1 
            ORDER BY criado_em DESC`, 
            [uf]
        )
        
        return videos
    }
}

export default ListandoVideosRegionCodeRepository