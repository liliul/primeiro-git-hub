import { utils } from "./utils.js";
import { getProtectedData } from "./index.js";
import { modalInfoUsuarioLogado } from "./infoUsuario.js";

document.addEventListener('DOMContentLoaded', () => {
    checkAuthenticationAndLoadData();
});

async function checkAuthenticationAndLoadData() {
    const body = document.getElementById('home-body');

    if (!utils.getRefreshToken()) {
        utils.clearTokens(); 
        window.location.href = '/login.html'
        return;
    }

    try {   
        const protectedData = await getProtectedData();

        if (protectedData) {
           
            if (body) {
                body.style.display = 'block';
               
                console.log(`Olá, ${protectedData.userName}! Seu ID é ${protectedData.userId}.`);

                modalInfoUsuarioLogado(protectedData)              
            }

        } else {
            console.error("Falha na autenticação ou carregamento de dados.");
            // window.location.reload()
        }
        
    } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        utils.clearTokens(); 
    }
}