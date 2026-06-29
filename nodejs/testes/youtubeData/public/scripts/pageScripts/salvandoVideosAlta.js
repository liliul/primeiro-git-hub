import { authFetch } from "../core/authFetch.js"

const salvar = document.getElementById('salvar')

salvar.addEventListener('submit', async (e) => {
    e.preventDefault()
    document.getElementById('b-videos').style.color = 'tomato'
    document.getElementById('b-videos').setAttribute('disabled', true)
    
    const formData = new FormData(e.target)
    console.log(formData.get('uf'), formData.get('num'))
    
    const ufv = formData.get('uf')
    const numv = formData.get('num')
    
    try {
        const { rows, count, message } = await salvandoVideos(ufv.trim().toUpperCase(), numv)
        console.log(rows, count, message)
        
        cardVideos(message, count, rows)
    } catch(e) {
        console.error(e, {err: 'Erro no salvandoVideos.'})
        document.getElementById('videos').textContent = e + ' input UF vazio ou errado'
    } finally {
        setTimeout( async () => {
            document.getElementById('b-videos').removeAttribute('disabled')
            document.getElementById('b-videos').removeAttribute('style')
        }, 2000)
    }
    
})

async function salvandoVideos(uf, num) {
    const req = await authFetch(`http://localhost:3001/youtube/v1/ytvideo/${uf}?maxResults=${num}`)
    const res = await req.json()

    if (!req.ok) {
        console.log({ err: 'Erro ao buscar videos no youtube para salvar.' })
        return
    }

    return res
}

async function cardVideos(message, count, data) {
    document.getElementById('videos').innerHTML = ''

    const h1 = document.createElement('h1')
    h1.textContent = message
    const span = document.createElement('span')
    span.textContent = count
    span.classList.add('count')

    const card = document.createElement('section')

    card.innerHTML = data.map(i => {
        return `
            <div class="codigo">
                <pre>${JSON.stringify(i, null, 2)}</pre>
            </div>
        `

    }).join("")
    

    document.getElementById('videos').append(h1, span, card)
    
}
