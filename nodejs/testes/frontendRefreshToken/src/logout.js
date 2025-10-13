import { utils } from "./utils.js";

// document.getElementById('logout').addEventListener('click', async () => {
//     // const data = await getProtectedData()
//     // console.log(data.id);
    
//     await handleLogout('42fa49d2-9c1e-4ccf-8a29-f4ffa1be69dc')
// })

const API_BASE_URL = 'http://localhost:8000/auth'; 

export async function handleLogout(userId) {
    try {
        
        const req = await fetch(`${API_BASE_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({ id: userId }), 
        });
        
        if (!req.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Erro no logout: ${response.status}`);
        }

        utils.clearTokens();
        alert('Logout efetuado com sucesso!');
        setTimeout(() => {
            window.location.href = '/login.html'
        }, 1200)
       
    } catch (error) {
        console.error('Erro durante o logout:', error);
        utils.clearTokens(); 
    }
}