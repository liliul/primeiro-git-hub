import { authFetch } from "../core/authFetchAdmin.js";

async function me() {
    const me = await authFetch('/admin/me')
    const response = await me.json()

    if (!response) {
        return document.getElementById('me').textContent = 'Erro na resposta do ME.'
    }
    
    console.log(response);
    
    document.getElementById('me').innerHTML = `
        <ul>
    
            <li class="li-infos">
                <span class="icon">🏠</span>
                <span class="text">
                    ${response.me.id}
                </span>    
            </li>

            <li class="li-infos">
                <span class="icon">▶️</span>
                <span class="text">
                    ${response.me.name}
                </span>
            </li>
                
            <li class="li-infos">
                <span class="icon">📺</span>
                <span class="text">
                    ${response.me.email}
                </span>
            </li>

            <hr class="separator">

            <li class="li-infos">
                <span class="icon">📚</span>
                <span class="text">
                    ${response.me.role}
                </span>
            </li>

            <li class="li-infos">
                <span class="icon">🕘</span>
                <span class="text">
                    ${response.me.criado_em}
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

        </ul>
    `
}
me()