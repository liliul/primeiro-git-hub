import { getValidGoogleToken } from '../utils/getValidGoogleToken.js'

class AtividadesYoutube {
    constructor() {
        this.BASE_URL = 'https://www.googleapis.com/youtube/v3/activities'
    }

    async atividades(req, res) {
        const googleId = req.user.sub

        const getAtividades = await this.getFetchAtividades(googleId)

        res.status(200).json(getAtividades)
    }

    async getFetchAtividades(googleId) {
        const accessToken = await getValidGoogleToken(googleId)
        
        const options = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }
        
        const urlParams = new URL(this.BASE_URL)
        urlParams.search = new URLSearchParams({
            part: 'snippet,contentDetails',
            maxResults: 5,
            mine: true
        })

        const response = await fetch(urlParams, options)

        if (!response.ok) return { error: 'Erro a buscar dados de atividades.'}

        const data = await response.json()

        return data 
    }
}

export default AtividadesYoutube

// async function at() {
//     const BASE_URL = 'https://www.googleapis.com/youtube/v3/activities'
//     const googleId = '105813639139258807510'

//     const accessToken = await getValidGoogleToken(googleId)
//     const options = {
//         headers: {
//             Authorization: `Bearer ${accessToken}`,
//         }
//     }
//     const urlParams = new URL(BASE_URL)
//     urlParams.search = new URLSearchParams({
//         part: 'snippet,contentDetails',
//         maxResults: 5,
//         mine: true
//     })

//     const response = await fetch(urlParams, options)

//     if (!response.ok) return { error: 'Erro a buscar dados de atividades.'}

//     const data = await response.json()
//     console.log(data);
    
// }
// at()