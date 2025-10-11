//  function handleLoginSubmit(event) {
//     // event.preventDefault();

//     const formData = formatLoginData();

//     console.log('Dados prontos para envio:', formData);

//     //Exemplo de como você chamaria a função de login (do código anterior)
//     // if (formData) {
//     //     handleLogin(formData.email, formData.password);
//     // }
// }

import { utils } from './utils.js';

function formatLoginData() {
    const form = document.getElementById('login-form');
    if (!form) return null;

    const formData = new FormData(form);
    
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    return formData;
}

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = formatLoginData()

    console.log(formData.get('email'), formData.get('password'));
    
    handleLogin(formData.get('email'), formData.get('password'))
})

const API_BASE_URL = 'http://localhost:8000/auth'; 

async function handleRegister(name, email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message); 
            return true;
        } else {
            alert(`Erro no Cadastro: ${data.message}`);
            return false;
        }
    } catch (error) {
        console.error('Erro de rede:', error);
        alert('Falha ao conectar com o servidor.');
        return false;
    }
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

async function handleLogout(userId) {
    try {
        
        await fetch(`${API_BASE_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({ id: userId }), 
        });
        
        clearTokens();
        alert('Logout efetuado com sucesso!');
       
    } catch (error) {
        console.error('Erro durante o logout:', error);
        clearTokens(); 
    }
}

/**
 * Tenta obter um novo Access Token usando o Refresh Token armazenado.
 * @returns {boolean} true se a renovação for bem-sucedida, false caso contrário.
 */
async function refreshAccessToken() {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        console.error('Refresh Token não encontrado. Usuário deve fazer login.');
        return false;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/refreshToken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: refreshToken }), 
        });

        const data = await response.json();

        if (response.ok) {
            
            saveTokens(data.accessToken, data.refreshToken);
            console.log('Tokens renovados com sucesso!');
            return true;
        } else {
           
            console.error('Falha na renovação dos tokens:', data.message);
            clearTokens(); 
            alert('Sua sessão expirou. Por favor, faça login novamente.');
            
            return false;
        }
    } catch (error) {
        console.error('Erro de rede ao renovar token:', error);
        clearTokens();
        return false;
    }
}

/**
 * Realiza uma requisição autenticada, tentando renovar o token em caso de falha 403/401.
 */
async function authenticatedFetch(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    async function makeRequest(token) {
        const headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
        };
        return fetch(url, { ...options, headers });
    }

    let response = await makeRequest(currentAccessToken);

    if (response.status === 403) {
        console.warn('Access Token expirado. Tentando renovar...');
 
        const success = await refreshAccessToken();

        if (success) {
           
            console.log('Tentando requisição novamente com novo token...');
            response = await makeRequest(currentAccessToken);
        } else {
            
            return response;
        }
    }

    return response;
}

async function getProtectedData() {
    try {
     
        const response = await authenticatedFetch('/protected-route', {
            method: 'GET'
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Dados protegidos:', data);
            return data;
        } 
        
        const errorData = await response.json();
        console.error('Falha ao obter dados protegidos:', errorData.message);
        
        return null;

    } catch (error) {
        console.error('Erro na requisição protegida:', error);
        return null;
    }
}