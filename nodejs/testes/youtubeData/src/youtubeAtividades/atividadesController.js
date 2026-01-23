import { AppError } from '../errors/AppError.js'
import { getValidGoogleToken } from '../utils/getValidGoogleToken.js'

class AtividadesYoutube {
    constructor() {
        this.BASE_URL = 'https://www.googleapis.com/youtube/v3/activities'
    }

    async atividades(req, res) {
       try {
            if (!req.user || !req.user.sub) {
                throw new AppError('Usuário não autenticado', 401)
            }
            
            const googleId = req.user.sub
            const getAtividades = await this.getFetchAtividades(googleId)
            res.status(200).json(getAtividades)
       
        } catch (error) {
            console.error(error)
            return res.status(error.statusCode || 500).json({ error: error.message })    
        }
    }

    async getFetchAtividades(googleId) {
        try {
            const accessToken = await getValidGoogleToken(googleId)
        
            const options = {
                method: 'GET',
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

            const response = await fetch(urlParams.toString(), options)

            if (!response.ok) { 
                const resError = await response.json().catch(() => null)
                
                throw new AppError(
                    resError?.error?.message || 'Erro a buscar dados de atividades.',
                    response.status
                ) 
            }

            const data = await response.json()

            return data 

        } catch (error) {
            if (error instanceof AppError) {
                throw error
            }

            throw new AppError(
                'Erro interno ao comunicar com o YouTube',
                500
            )
        }
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