export const TOKEN_STORAGE_KEY = 'refreshToken';
export const ACCESS_TOKEN_KEY = 'accessToken'; 

// export let currentAccessToken = null;
export let currentAccessToken = localStorage.getItem(ACCESS_TOKEN_KEY) || null;

function saveTokens(accessToken, refreshToken) {
    // currentAccessToken = accessToken;
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken); 
    localStorage.setItem(TOKEN_STORAGE_KEY, refreshToken);
}

function getRefreshToken() {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
}

function clearTokens() {
    currentAccessToken = null;
    localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export const utils = {
    saveTokens,
    getRefreshToken,
    clearTokens,
    currentAccessToken
}