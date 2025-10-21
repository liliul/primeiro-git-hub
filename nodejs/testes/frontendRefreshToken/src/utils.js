export const TOKEN_STORAGE_KEY = 'refreshToken';
export const ACCESS_TOKEN_KEY = 'accessToken'; 

// export let currentAccessToken = null;
// export let currentAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY) || null;

function saveTokens(accessToken, refreshToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken); 
    localStorage.setItem(TOKEN_STORAGE_KEY, refreshToken);
    // currentAccessToken = accessToken;
}

function getCurrentAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
}

function getRefreshToken() {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
}

function clearTokens() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    // currentAccessToken = null;
}

function isLoggedIn() {

    function checarRefreshToken() {
        
        try {
            const token = localStorage.getItem(ACCESS_TOKEN_KEY);
            if (!token) return false;
  
            const [, payloadBase64] = token.split('.');
            const payload = JSON.parse(atob(payloadBase64));
            if (!payload || !payload.role) return false;
            console.log(payload);
            
            switch (payload.role) {
                case 'user':
                    redirecionandoPagina(1200, 'user.html');
                    break;
                case 'moderador':
                    redirecionandoPagina(1200, 'home.html')
                    break
                case 'admin':
                    redirecionandoPagina(1200, 'home.html')
                    break
                case 'superAdmin':
                    redirecionandoPagina(1200, 'private.html')                                                                                                                                                                     
                    break
                default:
                    redirecionandoPagina(1000, 'login.html')
                    break;
            }

            return true;

        } catch (error) {
            console.error(error);
            return false;
        }

    }

    async function checkUrl(functionRota) {

        const req = await functionRota()
        if (req.ok) {
            const res = await req.json()
            console.log(res);
            
        }

    } 

    return { checkUrl, checarRefreshToken}

}

function redirecionandoPagina(tempo, pagina) {
    return setTimeout(() => {
        window.location.href = pagina
    }, tempo)
}

/**
 * Verifica se o token JWT está prestes a expirar.
 *
 * Decodifica o payload Base64 do token JWT usando `atob()`
 * e compara o tempo de expiração (`exp`) com o horário atual.
 *
 * @param {string} token - O token JWT a ser verificado.
 * @returns {boolean} Retorna `true` se o token expira em menos de 1 minuto
 *                    ou se o token for inválido; caso contrário, `false`.
 * @throws {Error} Pode lançar erro caso o token não esteja no formato JWT válido.
 */
function tokenPrestesAexpirar(token) {
    
    try {
        const [, payloadBase64] = token.split('.');
        const payload = JSON.parse(atob(payloadBase64));
        const exp = payload.exp * 1000; 
        const now = Date.now();
        return exp - now < 60_000; 
    } catch {
        return true;
    }
}

function redirecionandoRolesAposLogin() {
    
    try {
        const token = localStorage.getItem(ACCESS_TOKEN_KEY
        if (!token) return

        const [, payloadBase64] = token.split('.');
        const payload = JSON.parse(atob(payloadBase64));
        console.log(payload);
        
        switch (payload.role) {
            case 'user':
                redirecionandoPagina(1200, 'user.html');
                break;
            case 'moderador':
                redirecionandoPagina(1200, 'home.html')
                break
            case 'admin':
                redirecionandoPagina(1200, 'home.html')
                break
            case 'superAdmin':
                redirecionandoPagina(1200, 'home.html')                                                                                                                                                                     
                break
            default:
                redirecionandoPagina(1200, '404.html')
                break;
        }

    } catch (error) {
        console.error(error);
        
    }

}

export const utils = {
    saveTokens,
    getRefreshToken,
    clearTokens,
    isLoggedIn,
    redirecionandoPagina,
    getCurrentAccessToken,
    MensagemCustomizada,
    redirecionandoRolesAposLogin
}