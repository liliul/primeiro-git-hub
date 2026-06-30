import { authFetch } from "../core/authFetch.js"

async function ytvideos() {
    document.getElementById('content').innerHTML = '<p style="text-align: center;">Carregando...</p>'

    try {
        const req = await authFetch('http://localhost:3001/youtube/v1/ytvideos')
        const res = await req.json()

        return res
    } catch(error) {
        console.error(error)
        const erroCode = {
            'status': 'Listando videos em alta salva no banco de dados',
            'codeError': 404,
            'erro':error
        }

        document.getElementById('content').innerHTML = `<pre>${JSON.stringify(erroCode, null, 2)}</pre>`
        return null
    }
}

async function cardVideos() {
    const v = await ytvideos()
    console.log(v.origindb)
    if (!v) return
    
    const ytvideo = v.ytvideos
    console.log(ytvideo)
    if (!ytvideo || !Array.isArray(ytvideo.data)) {
        console.error('Erro em data: ', v)
        return
    }

    document.getElementById('content').innerHTML = ''
        
    const h1 = document.createElement('h1')
    h1.textContent = ytvideo.message
    const span = document.createElement('span')
    span.textContent = ytvideo.count
    span.classList.add('count')

    const card = document.createElement('section')

    card.innerHTML = ytvideo.data.length
        ? ytvideo.data.map(i => {
            return `
                <div class="card">
                    <img src="${i.thumbnails.default.url}" alt="${i.title}">
                    <br>
                    <br>
                    <span>${i.region_code}</span>
                    <h3>${i.title}</h3>
                    <p>canal: ${i.channel}</p>
                    <small>data de criação: ${i.published_at}</small>
                    <br>
                    <br>
                    <a href="${i.video_url}" target="_blank">Assistir</a>
                </div>
            `

            }).join("")
        : "<p>Sem videos</p>"

    document.getElementById('content').append(h1, span, card)
    
}

cardVideos()