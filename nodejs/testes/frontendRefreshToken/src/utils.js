export const TOKEN_STORAGE_KEY = 'refreshToken';
export const ACCESS_TOKEN_KEY = 'accessToken'; 

// export let currentAccessToken = null;
export let currentAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY) || null;

function saveTokens(accessToken, refreshToken) {
    currentAccessToken = null;
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken); 
    localStorage.setItem(TOKEN_STORAGE_KEY, refreshToken);
}

function getRefreshToken() {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
}

function clearTokens() {
    currentAccessToken = null;
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}

function isLoggedIn() {
    // return localStorage.getItem(TOKEN_STORAGE_KEY) !== null;
    const token = currentAccessToken;
    console.log(token);
    
    if (!token) {
        console.error('token null');
        // window.location.href = 'login.html'
    }

    async function checkUrl() {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const req = await fetch('http://localhost:8000/user/private', options)
        console.log(req);
        if (!req.ok) {
            const res = await req.json()
            console.log(res);
            // redirecionandoPagina(1000, 'login.html')
        }

        if (req.ok) {
            // window.location.href = 'home.html'
            // return

            redirecionandoPagina(2000, 'home.html')
        }


    } 

    checkUrl()

}

function redirecionandoPagina(tempo, pagina) {
    return setTimeout(() => {
        window.location.href = pagina
    }, tempo)
}

export const utils = {
    saveTokens,
    getRefreshToken,
    clearTokens,
    currentAccessToken,
    isLoggedIn,
    redirecionandoPagina
}