import { utils } from "./utils.js";
import { rotaPrivada } from "./index.js";
import { modalInfoUsuarioLogado } from "./infoUsuario.js";

document.addEventListener('DOMContentLoaded', () => {
    checkAuthenticationAndLoadData();
});

async function checkAuthenticationAndLoadData() {
    const body = document.getElementById('private-body');

    if (!utils.getRefreshToken()) {
        utils.clearTokens(); 
        window.location.href = '/login.html'
        return;
    }

    try {   
        const protectedData = await rotaPrivada();

        if (protectedData) {
           
            if (body) {
                body.style.display = 'block';
               
                console.log(`Olá, ${protectedData.userName}! Seu ID é ${protectedData.userId}.`);

                modalInfoUsuarioLogado(protectedData)              
            }

        } else {
            console.error("Falha na autenticação ou carregamento de dados.");
        }
        
    } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        utils.clearTokens(); 
    }
}