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
    // return localStorage.getItem(TOKEN_STORAGE_KEY) !== null;
    // const token = currentAccessToken;
    // console.log(token);
    
    // if (!token) {
    //     console.error('token null');
    //     // window.location.href = 'login.html'
    // }
    function checarRefreshToken() {
        const token = localStorage.getItem(TOKEN_STORAGE_KEY) !== null;
        if (token) {
            redirecionandoPagina(1200, 'home.html');
        } else {
            return
        } 

    }

    async function checkUrl(functionRota) {
        // const options = {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     }
        // }
        // const req = await fetch('http://localhost:8000/user/private', options)
        // console.log(req);
        // if (!req.ok) {
        //     const res = await req.json()
        //     console.log(res);
        //     // redirecionandoPagina(1000, 'login.html')
        // }

        // if (req.ok) {
        //     // window.location.href = 'home.html'
        //     // return

        //     redirecionandoPagina(2000, 'home.html')
        // }

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


export const utils = {
    saveTokens,
    getRefreshToken,
    clearTokens,
    isLoggedIn,
    redirecionandoPagina,
    getCurrentAccessToken
}