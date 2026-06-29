import { authFetch } from "../core/authFetch.js";

const uf = document.getElementById('uf')
console.log(uf);

uf.addEventListener('keydown', async (e) => {

    if (e.key === 'Enter') {
        const u = e.target.value
        console.log(u);
        
        const f = await ytvideosUf(u.toUpperCase())
        if (!f) return

        const {message, data, length} = await f

        setTimeout(() => {
            console.log(f);

            cardVideos(message, data, length)
        }, 500)
    }

})

async function ytvideosUf(uf) {
    document.getElementById('videos').innerHTML = '<p>Carregando...</p>'
    
    try {
    const req = await authFetch(`http://localhost:3001/youtube/v1/yaltavideos/${uf}`)
    if (!req) return null
    const data = await req.json()

    return data
    } catch (error) {
    console.error(error);
    document.getElementById('videos').innerHTML = '<p style="color: tomato;">Erro ao buscar videos pesquisado.</p>'
    }
}

async function cardVideos(message, data, length) {
    document.getElementById('videos').innerHTML = ''
    
    const h1 = document.createElement('h1')
    h1.textContent = message
    const span = document.createElement('span')
    span.textContent = length
    span.classList.add('count')

    const card = document.createElement('section')

    card.innerHTML = data.map(i => {
        return `
            <div class="card">
                <img src="${i.thumbnails.default.url}" alt="${i.title}">
                <h3>${i.title}</h3>
                <p>${i.channel}</p>
                <a href="${i.video_url}" target="_blank">Assistir</a>
            </div>
        `

    }).join("")
    

    document.getElementById('videos').append(h1, span, card)
    
}