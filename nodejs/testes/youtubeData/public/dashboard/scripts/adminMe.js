import { authFetch } from "../core/authFetchAdmin.js";

async function me() {
    const me = await authFetch('/admin/me')
    const response = await me.json()

    if (!response) {
        return document.getElementById('ul-infos').textContent = 'Erro na resposta do ME.'
    }
    
    console.log(response);

    document.getElementById('ul-infos').innerHTML = `
        <li class="li-infos">
            <span class="icon">🏠</span>
            <span class="text">
                ${response.me.id ?? 'Sem conteudo.'}
            </span>    
        </li>

        <li class="li-infos">
            <span class="icon">▶️</span>
            <span class="text">
                ${response.me.name ?? 'Sem contaudo.'}
            </span>
        </li>
            
        <li class="li-infos">
            <span class="icon">📺</span>
            <span class="text">
                ${response.me.email ?? 'Sem conteudo.'}
            </span>
        </li>

        <hr class="separator">

        <li class="li-infos">
            <span class="icon">📚</span>
            <span class="text">
                ${response.me.role ?? 'Sem conteudo.'}
            </span>
        </li>

        <li class="li-infos">
            <span class="icon">🕘</span>
            <span class="text">
                ${response.me.criado_em ?? 'Sem conteudo.'}
            </span>
        </li>

        <li class="li-infos">
            <span class="icon">🎬</span>
            <span class="text">Seus vídeos</span>
        </li>

        <li class="li-infos">
            <span class="icon">⏱️</span>
            <span class="text">Assistir mais tarde</span>
        </li>

        <hr class="separator">

        <li class="li-infos">
            <span class="icon">👍</span>
            <span class="text">Vídeos marcados</span>
        </li>
    `
}
me()