import { handleLogout } from "./logout.js";

export function modalInfoUsuarioLogado(data) {
    const buttonOpenModal = document.createElement('button')
    buttonOpenModal.setAttribute('id', 'open-modal-info-usuario')
    buttonOpenModal.textContent = 'user'
    buttonOpenModal.addEventListener('click', () => {
        buttonOpenModal.setAttribute('disabled', false)
        const divModal = document.createElement('div')
        divModal.setAttribute('id', 'div-modal')
        divModal.setAttribute('class', 'w-[300px] h-auto p-3 absolute top-10 right-4 bg-white rounded-lg')
        
        divModal.innerHTML = `
            <span 
                id="fechar-modal-info-usuario"
                class="absolute top-1 right-2 cursor-pointer"
            >
                X
            </span>

            <ul>
                <li class="mb-1">user: ${data.userName}</li>
                <li class="mb-1">email: ${data.userEmail}</li>
                <li class="mb-1">
                    <button id="logout" class="text-gray-800 p-2 rounded-lg bg-amber-300 hover:text-blue-700 transition duration-150">logout</button>
                </li>
            </ul>
        `

        document.getElementById('menu-info-usuario').appendChild(divModal)

        document.getElementById('fechar-modal-info-usuario').addEventListener('click', () => {
            document.getElementById('div-modal').remove()
            buttonOpenModal.removeAttribute('disabled')
        })

        document.getElementById('logout').addEventListener('click', async () => {
            await handleLogout(data.userId)
        })
    })

    document.getElementById('menu-info-usuario').appendChild(buttonOpenModal)
}