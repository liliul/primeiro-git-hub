export function initAdminMe() {
    const menuBtn = document.getElementById("menuBtn")
    const sidebar = document.getElementById("sidebar")

    if (!menuBtn || !sidebar) return

    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open")
    })
}

export function renderInfosAdminMenu(ulInfos, user) {
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