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

function redirecionandoPagina(tempo, pagina, msgError = null) {
    if (typeof msgError === 'function') {
        try {
            () => {
                msgError()
            }
        } catch (error) {
            console.log(error);
        }    
    }
    
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

/**
 * Mostra uma mensagem customizada na tela.
 * @param {string} msg - Texto da mensagem.
 * @param {boolean} [error=false] - True para estilizar como erro (vermelho).
 * @param {number} [timeout=4000] - Tempo em ms para auto-fechar. 0 = não fecha automaticamente.
 */
function MensagemCustomizada(msg, error = false, timeout = 4000) {
    if (!msg) return;

    const existing = document.getElementById('id-msg-custom');
    if (existing) existing.remove();

    const container = document.createElement('div');
    container.id = 'id-msg-custom';
    container.setAttribute(
        'class',
        'p-4 rounded-lg absolute top-4 right-4 shadow-md bg-white/90 z-50 flex items-center gap-3'
    );
    container.style.pointerEvents = 'auto';

    const text = document.createElement('span');
    text.textContent = msg;
    text.setAttribute('role', 'status');

    const fechar = document.createElement('button');
    fechar.type = 'button';
    fechar.id = 'fechar-msg-custom';
    fechar.setAttribute('aria-label', 'Fechar mensagem');
    fechar.textContent = '×';
    fechar.style.cursor = 'pointer';
    fechar.style.fontWeight = '700';
    fechar.style.fontSize = '1rem';
    fechar.style.lineHeight = '1';
    fechar.className = 'ml-2 px-2 py-1 rounded';

    if (error) {
        text.classList.add('text-red-600');
        container.style.border = '1px solid rgba(239,68,68,0.2)';
    } else {
        text.classList.add('text-green-600');
        container.style.border = '1px solid rgba(34,197,94,0.15)';
    }

    container.appendChild(text);
    container.appendChild(fechar);

    document.body.appendChild(container);

    fechar.addEventListener('click', () => {
        container.remove();
    });

    if (timeout && typeof timeout === 'number' && timeout > 0) {
        setTimeout(() => {
        container.remove();
        }, timeout);
    }
}

function redirecionandoRolesAposLogin() {
    
    try {
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
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
    redirecionandoRolesAposLogin,
    tokenPrestesAexpirar
}