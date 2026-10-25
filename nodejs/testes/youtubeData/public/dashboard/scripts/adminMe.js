import { authFetch } from "../core/authFetchAdmin.js";
import { initAdminMe, renderInfosAdminMenu } from "./components/adminMe.js";

initAdminMe();

const ulInfos = document.getElementById('ul-infos');

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
        
        renderInfosAdminMenu(ulInfos, user)
    } catch (error) {
        console.error("Erro ao carregar admin/me: ", error)
        ulInfos.textContent = 'Erro ao carregar informações do usuario.'
    }
}

me()