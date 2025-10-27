import { utils } from './utils.js';

const API_BASE_URL = 'http://localhost:8000/auth'; 
const API_USER_URL = 'http://localhost:8000/user';

/**
 * Tenta obter um novo Access Token usando o Refresh Token armazenado.
 * @returns {boolean} true se a renovação for bem-sucedida, false caso contrário.
 */
async function refreshAccessToken() {
    const refreshToken = utils.getRefreshToken();
    console.log('refresh:', refreshToken);
    
    if (!refreshToken) {
        console.error('Refresh Token não encontrado. Usuário deve fazer login.');
        return false;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: refreshToken }), 
        });

        const data = await response.json();

        if (response.ok) {
            
            utils.saveTokens(data.accessToken, data.refreshToken);
            console.log('Tokens renovados com sucesso!');
            return true;
        } else {

            console.error('Falha na renovação dos tokens:', data.message);
            utils.clearTokens(); 
            alert('Sua sessão expirou. Por favor, faça login novamente.');
            
            return false;
        }
    } catch (error) {
        console.error('Erro de rede ao renovar token:', error);
        utils.clearTokens();
        return false;
    }
}

/**
 * Realiza uma requisição autenticada, tentando renovar o token em caso de falha 403/401.
 */
async function authenticatedFetch(endpoint, options = {}) {
    const url = `${API_USER_URL}${endpoint}`;

    if (!utils.getCurrentAccessToken()) {
        // Se houver um Refresh Token, tente renovar
        if (utils.getRefreshToken()) {
             const success = await refreshAccessToken();
             if (!success) {
                 // Falha na renovação, limpa os tokens e redireciona (logout)
                 utils.clearTokens(); 
                 window.location.href = 'login.html'
                 return { status: 401, json: async () => ({ message: 'Sessão expirada. Redirecionando...' }) };
             }
        } else {
             // Não tem nenhum token, força o redirecionamento imediato
             utils.clearTokens();
             return { status: 401, json: async () => ({ message: 'Usuário não autenticado. Redirecionando...' }) };
        }
    }

    if (utils.tokenPrestesAexpirar(utils.getCurrentAccessToken())) {
        console.warn('Token prestes a expirar, renovando...');
        const success = await refreshAccessToken();
        if (!success) {
            utils.clearTokens();
            window.location.href = 'login.html';
            return { status: 401, json: async () => ({ message: 'Sessão expirada.' }) };
        }
    }

    async function makeRequest(token) {
        const headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
        };
        return fetch(url, { ...options, headers });
    }

    let response = await makeRequest(utils.getCurrentAccessToken());
    console.log(response);
    
    if (response.status === 403 || response.status === 401) {
        console.warn('Access Token expirado. Tentando renovar...');
 
        const success = await refreshAccessToken();

        if (success) {
            const accessTokenLocalStorage = utils.getCurrentAccessToken()
            console.log(accessTokenLocalStorage);

            console.log('Tentando requisição novamente com novo token...');
            response = await makeRequest(accessTokenLocalStorage);
            console.log('novo response: ', response);
            
            switch (response.status) {
                case 200:
                    console.log('token atualizado como sucesso...');
                    utils.MensagemCustomizada('token atualizado como sucesso...', false, 0)
                    break
                case 401:
                    utils.MensagemCustomizada(response.statusText, true, 0)
                    // utils.clearTokens()
                    utils.redirecionandoPagina(1000, 'login.html')
                    break;
                case 403:
                    utils.redirecionandoPagina(1000, '404.html')
                    break
                case 404:
                    utils.redirecionandoPagina(1000, '404.html')
                    break
                case 500:
                    utils.redirecionandoPagina(1000, '404.html')
                    break
                default:
                    console.log('sem reload');
                    utils.redirecionandoPagina(1000, '404.html')
                break;
            }
            
        } else {
            
            return response;
        }
    }
    
    return response;
}

export async function getProtectedData() {
    try {
        const response = await authenticatedFetch('/home', {
            method: 'GET'
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Dados protegidos:', data);
            return data;
        } 
        
        const errorData = await response.json();
        console.error('Falha ao obter dados protegidos:', errorData.error);
        
        return null;

    } catch (error) {
        console.error('Erro na requisição protegida:', error);
        return null;
    }
}

export async function rotaPrivada() {
    try {
        const response = await authenticatedFetch('/private', {
            method: 'GET'
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Dados protegidos:', data);
            return data;
        } 
        
        const errorData = await response.json();
        console.error('Falha ao obter dados protegidos:', errorData.error);

        return null;

    } catch (error) {
        console.error('Erro na requisição protegida:', error);
        return null;
    }
}