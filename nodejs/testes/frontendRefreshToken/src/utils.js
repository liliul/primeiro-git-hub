export const TOKEN_STORAGE_KEY = 'refreshToken';
export const ACCESS_TOKEN_KEY = 'accessToken'; 

let currentAccessToken = null;

function saveTokens(accessToken, refreshToken) {
    currentAccessToken = accessToken;
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
    clearTokens
}