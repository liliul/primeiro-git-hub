import { authFetch } from "../core/authFetch.js"

 document.addEventListener('DOMContentLoaded', () => {
    buscar()
})

async function buscar() {
    const formBuscar = document.getElementById('form-buscar')

    formBuscar.addEventListener('submit', async (e) => {
        e.preventDefault()

        const buscar = document.getElementById('buscar')

        const pesquisando = await pesquisandoNoYoutube(buscar.value.trim())
        if (!pesquisando) return

        card(pesquisando)

    })

}

async function pesquisandoNoYoutube(query) {
    try {
        const url = 'http://localhost:3001/youtube/v2/ytsearch'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query })
        }

        const req = await authFetch(url, options)
        const res = await req.json()


        if (!Array.isArray(res.data) || res.data.length === 0) {
            document.getElementById('videos').innerHTML = '<h2 style="color: tomato;">Pesquisa retornou Nemnhum video</h2>'
            return
        }

        return res

    } catch (error) {
        console.error(error)
        const erroCode = {
            'status': 'Pesquisando videos no youtube',
            'codeError': 404,
            'erro': {
                name: error.name,
                message: error.message,
                stack: error.stack,
            }
        }

        document.getElementById('videos').innerHTML = `<pre>${JSON.stringify(erroCode, null, 2)}</pre>`
        return
    }
}

// pesquisandoNoYoutube('dragon ball z abertura')

function card(data) {
    document.getElementById('videos').innerHTML = ''

    return data.data.map((i) => {

        const section = document.createElement('section')
        section.setAttribute('id', i.videoId)
        section.setAttribute('class', 'buscar-card')

        const title = document.createElement('h1')
        title.textContent = i.title

        const thumbnails = document.createElement('img')
        thumbnails.src = i.thumbnails.default.url

        const description = document.createElement('p')
        description.textContent = i.description

        const publishedAt = document.createElement('small')
        const data = new Date(i.publishedAt)
        publishedAt.textContent = data.toLocaleString('pt-BR')

        const videoUrl = document.createElement('a')
        videoUrl.href = i.videoUrl
        videoUrl.textContent = 'Assistir'

        section.append(title, thumbnails, description, publishedAt, videoUrl)

        document.getElementById('videos').append(section)

    })
}