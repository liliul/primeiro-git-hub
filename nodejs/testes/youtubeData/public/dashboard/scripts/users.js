import { authFetch } from "../core/authFetchAdmin.js";

const searchUsersAll = document.getElementById('search-users')

async function buscandoUsersGet() {
    const usersContainer = document.getElementById('users-container')
    
    if (!usersContainer) return

    usersContainer.textContent = 'Carregando'

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
        }).join("")

        usersContainer.innerHTML = usersMapHtml
        
    } catch (error) {
        console.error(error)
        usersContainer.textContent = 'Erro ao buscar usuarios.'
    }
}

searchUsersAll.addEventListener('click', buscandoUsersGet)


// const pageContent = document.querySelector(".content");

// document.addEventListener("click", async (event) => {
//     const link = event.target.closest("a[data-page]");

//     if (!link || !pageContent) return;

//     event.preventDefault();

//     const url = link.getAttribute("href");

//     try {
//         pageContent.setAttribute("aria-busy", "true");
//         pageContent.textContent = "Carregando...";

//         const response = await fetch(url, {
//             credentials: "same-origin",
//             headers: {
//                 Accept: "text/html",
//             },
//         });

//         if (response.status === 401) {
//             window.location.href = "/admin/login";
//             return;
//         }

//         if (response.status === 403) {
//             pageContent.textContent = "Você não tem permissão para acessar esta página.";
//             return;
//         }

//         if (!response.ok) {
//             throw new Error("Falha ao carregar a página.");
//         }

//         const html = await response.text();
//         const j = JSON.parse(html)
//         console.log(j);
        
//         const usersMapHtml = j?.users.map(item => {
//             return (`
//                 <div class="users-card-container">
//                     <p>ID: ${item.id ?? 'Sem conteudo.'}</p>
//                     <b>Nome: ${item.name ?? 'Sem conteudo.'}</b>
//                     <img src="${item.picture}" all="Image avatar">
//                     <div>
//                         <b>Email: ${item.email ?? 'Sem conteudo'}</b>
//                         <strong>Email_verificado: ${item.email_verified ?? 'Sem conteudo'}</strong>
//                     </div>
//                 </div>
//             `)
//         }).join("")

//         pageContent.innerHTML = usersMapHtml;

//         history.pushState({ url }, "", url);

//         document.querySelectorAll("a[data-page]").forEach((item) => {
//             item.classList.toggle("active", item === link);
//         });
//     } catch (error) {
//         console.error("Erro na navegação:", error);
//         pageContent.textContent = "Erro ao carregar o conteúdo.";
//     } finally {
//         pageContent.removeAttribute("aria-busy");
//     }
// });
