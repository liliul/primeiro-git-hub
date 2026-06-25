import {authFetch} from '../me.js'

async function InformacoesCanalYoutubeApi() {
    try {
        // const req = await fetch('http://localhost:3001/ytuser')
        // const res = await req.json()

        const response = await authFetch('http://localhost:3001/ytuser')
        if (!response) return null
        const res = await response.json()
        
        return res 
    } catch (error) {
        console.error('ErrorInformacoesCanalYoutubeApi: ', error) 
        
        return {
            'status': 'erro na api ytuser',
            'codeErro': 401 
        }
    }
} 

async function mostraInformacoes() {
    const infoApi = await InformacoesCanalYoutubeApi()
    console.log(infoApi)
    const qualDataPegar = infoApi.redisytuser ? infoApi.redisytuser : infoApi.apiytuser

    qualDataPegar.items.map(i => {
        console.log(i);
        
        const section = document.createElement('section')
        section.setAttribute('data-id-ytuser', `${i.id}`)
        section.className = 'codigo'

        section.innerHTML = `
            <pre>${JSON.stringify(i, null, 2)}</pre>
        `
        document.getElementById('info-channel').appendChild(section)
    })

}
mostraInformacoes()