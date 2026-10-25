import { authFetch } from "../core/authFetchAdmin.js";

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const ulInfos = document.getElementById('ul-infos');

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
})

async function me() {
    if (!ulInfos) return

    try {
        const me = await authFetch('/admin/me')
        
        if (!me.ok) {
            ulInfos.textContent = 'Erro ao buscar informações do usuario.'
            return
        }

        const response = await me.json()
        
        if (!response?.me) {
            ulInfos.textContent = 'Erro na resposta do ME.'
            return
        }

        const user = response.me
        console.log(user);
        
        renderInfosAdminMenu(user)
    } catch (error) {
        console.error("Erro ao carregar admin/me: ", error)
        ulInfos.textContent = 'Erro ao carregar informações do usuario.'
    }
}

function renderInfosAdminMenu(user) {
    ulInfos.replaceChildren()

    ulInfos.innerHTML = `
            <div class="ul-infos-close">✕</div>

            <li class="li-infos">
                <span class="icon">🏠</span>
                <span class="text">
                    ${user.id ?? 'Sem conteudo.'}
                </span>    
            </li>

            <li class="li-infos">
                <span class="icon">▶️</span>
                <span class="text">
                    ${user.name ?? 'Sem contaudo.'}
                </span>
            </li>
                
            <li class="li-infos">
                <span class="icon">📺</span>
                <span class="text">
                    ${user.email ?? 'Sem conteudo.'}
                </span>
            </li>

            <hr class="separator">

            <li class="li-infos">
                <span class="icon">📚</span>
                <span class="text">
                    ${user.role ?? 'Sem conteudo.'}
                </span>
            </li>

            <li class="li-infos">
                <span class="icon">🕘</span>
                <span class="text">
                    ${user.criado_em ?? 'Sem conteudo.'}
                </span>
            </li>
        `
        document.querySelector('.ul-infos-close').addEventListener('click', () => {
            document.querySelector('.sidebar').classList.remove('open')
        })
}

me()