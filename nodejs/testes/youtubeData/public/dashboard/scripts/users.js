import { authFetch } from "../core/authFetchAdmin.js";

async function buscandoUsersGet() {
    const usersContainer = document.getElementById('users-container')
    
    try {
        const users = await authFetch('/admin/users')

        if (!users.ok) {
            usersContainer.textContent = 'Erro ao buscar Usuarios.'
            return
        }

        const response = await users.json()

        if (!response.users) {
            usersContainer.textContent = 'Erro na resposta da api users.'
            return
        }

        console.log(response.users);

        const usersMapHtml = response?.users.map(item => {
            return (`
                <div class="users-card-container">
                    <p>ID: ${item.id ?? 'Sem conteudo.'}</p>
                    <b>Nome: ${item.name ?? 'Sem conteudo.'}</b>
                    <img src="${item.picture}" all="Image avatar">
                    <div>
                        <b>Email: ${item.email ?? 'Sem conteudo'}</b>
                        <strong>Email_verificado: ${item.email_verified ?? 'Sem conteudo'}</strong>
                    </div>
                </div>
            `)
        })

        usersContainer.innerHTML = usersMapHtml
        
    } catch (error) {
        console.error(error)
        usersContainer.textContent = 'Erro ao buscar usuarios.'
    }
}

buscandoUsersGet()