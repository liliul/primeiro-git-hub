import { authFetch } from "../core/authFetchAdmin.js";
import { PersistRoute } from "../core/persistRoute.js";

const searchUsersAll = document.getElementById('search-users');
const usersContainer = document.getElementById('users-content-container');

async function buscandoUsersGet() {
    
    if (!usersContainer) return

    usersContainer.textContent = 'Carregando'

    try {
        const users = await authFetch('/api/admin/users')

        if (!users.ok) {
            usersContainer.textContent = 'Erro ao buscar Usuarios.'
            return
        }

        const response = await users.json()

        if (!Array.isArray(response.users)) {
            usersContainer.textContent = 'Erro na resposta da api users.'
            return
        }

        console.log(response.users);

        usersContainer.replaceChildren()

        const h1 = document.createElement('h1')
        h1.textContent = 'Usuario no sistema.'
        const p = document.createElement('p')
        p.textContent = 'Buscando Usuarios no sistema.'

        const usersCardContainerDiv = document.createElement('div')
        usersCardContainerDiv.className = 'users-card-container'

        const usersMapHtml = response?.users.map(item => {
            return (`
                <article class="users-card">
                    <p>ID: ${item.id ?? 'Sem conteudo.'}</p>
                    <b>Nome: ${item.name ?? 'Sem conteudo.'}</b>
                    <img src="${item.picture}" all="Image avatar">
                    <div>
                        <b>Email: ${item.email ?? 'Sem conteudo'}</b>
                        <strong>Email_verificado: ${item.email_verified ?? 'Sem conteudo'}</strong>
                    </div>
                </article>
            `)
        }).join("")

        usersContainer.append(h1, p)
        usersCardContainerDiv.innerHTML = usersMapHtml
        usersContainer.appendChild(usersCardContainerDiv)
        
    } catch (error) {
        console.error(error)
        usersContainer.textContent = 'Erro ao buscar usuarios.'
    }
}

PersistRoute('/admin/users', buscandoUsersGet, searchUsersAll)

export { buscandoUsersGet }
