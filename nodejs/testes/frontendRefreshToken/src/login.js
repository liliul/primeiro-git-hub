import { utils } from './utils.js';
import { getProtectedData } from './index.js'

const API_BASE_URL = 'http://localhost:8000/auth'; 

document.addEventListener('DOMContentLoaded', () => {
    CallLogin()
})

function CallLogin() {
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault()
        const formData = formatLoginData()

        console.log(formData.get('email'), formData.get('password'));
        
        handleLogin(formData.get('email'), formData.get('password'))
    })
}
function formatLoginData() {
    const form = document.getElementById('login-form');
    if (!form) return null;

    const formData = new FormData(form);
    
    return formData;
}

async function handleLogin(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            utils.saveTokens(data.accessToken, data.refreshToken);
            console.log('Login bem-sucedido. Tokens salvos.');
            
            getProtectedData()
            return data.id; 
        } else {
            alert(`Erro no Login: ${data.message}`);
            return null;
        }
    } catch (error) {
        console.error('Erro de rede:', error);
        alert('Falha ao conectar com o servidor.');
        return null;
    }
}