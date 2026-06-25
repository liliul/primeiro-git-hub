import {authFetch} from '../me.js'

let nextPageToken = null
let prevPageToken = null
const pagesCache = new Map()

async function getAtividades(pageToken) {
    const cacheKey = getCacheKey(pageToken)
    
    // console.log({
    //     pageToken,
    //     cacheKey,
    //     cacheKeys: [...pagesCache.keys()]
    // })

    if (pagesCache.has(cacheKey)) {
        // console.log('cache: ', cacheKey)
        return pagesCache.get(cacheKey)
    }

    const url = cacheKey === 'FIRST_PAGE'
        ? 'http://localhost:3001/atividades'
        : `http://localhost:3001/atividades?pageToken=${cacheKey}`
    // const req = await fetch(url)
    // const res = await req.json()
    const response = await authFetch(url)
    if (!response) return null
    const res = await response.json()
    pagesCache.set(cacheKey, res)
    
    return res
}

function getCacheKey(pageToken) {
    return pageToken || 'FIRST_PAGE'
}

async function renderizarAtividadesHtml(atividadesApi) {
    document.getElementById('content').innerHTML = ''

    const sectionContainerItems = document.createElement('section')
    sectionContainerItems.innerHTML = atividadesApi.items?.length ? (
        atividadesApi.items.map(item => {
            return (`
                <div class='card' data-idat='${item.id}'>
                    <img src="${item.snippet.thumbnails.medium.url}" alt="${item.snippet.title}">

                    <p>${item.snippet.description}</p>

                    <small>${item.snippet.type}</small>
                    <br>
                    <span>${new Date(item.snippet.publishedAt).toLocaleDateString()}</span>
                </div>
            `)
        }).join('')
    ) : (
        '<p>Nenhuma atividade encontrada</p>'
    )

    document.getElementById('content').appendChild(sectionContainerItems)
}

async function renderizarControles() {
    const controlePages = document.createElement('div')
    controlePages.innerHTML = `
        <button id="prev" class="voltar" ${!prevPageToken ? 'disabled' : ''}>&lt;</button>
        <button id="next" class="voltar" ${!nextPageToken ? 'disabled' : ''}>&gt;</button>
    `

    document.getElementById('content').appendChild(controlePages)

    document.getElementById('next')?.addEventListener('click', carregarProxima)
    document.getElementById('prev')?.addEventListener('click', carregarAnterior)
}

async function carregarProxima() {
    if (!nextPageToken) return

    renderizarSkeleton()
    const data = await getAtividades(nextPageToken)
    atualizarEstado(data, nextPageToken)
}

async function carregarAnterior() {
    if (!prevPageToken) return

    renderizarSkeleton()
    const data = await getAtividades(prevPageToken)
    atualizarEstado(data, prevPageToken)
}

function atualizarEstado(data, pageToken = 'FIRST_PAGE') {
    nextPageToken = data.nextPageToken || null
    prevPageToken = data.prevPageToken || null
        
    renderizarAtividadesHtml(data)
    renderizarControles()
}

function renderizarSkeleton(qtd = 5) {
    const content = document.getElementById('content')
    content.innerHTML = ''

    const section = document.createElement('section')
    section.className = 'cards'

    section.innerHTML = Array.from({ length: qtd })
        .map(() => `
            <div class="cards skeleton skeleton-card"></div>
        `)
        .join('')

    content.appendChild(section)
}

async function main() {
    renderizarSkeleton()

    const data = await getAtividades()
    atualizarEstado(data)
}

main()