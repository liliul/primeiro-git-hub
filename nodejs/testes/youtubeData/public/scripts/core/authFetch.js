async function refreshToken() {
    const response = await fetch(
        "http://localhost:3001/auth/refresh",
        {
            method: "POST",
            credentials: "include"
        }
    )
    console.log('chammando refreshToken: ', response);
    
    return response.ok
}

export async function authFetch(url, options = {}) {
    let response = await fetch(url, {
        ...options,
        credentials: "include"
    })
    
    if (response.status === 401) {
        const refreshed = await refreshToken()
    
        if (!refreshed) {
            window.location.href = "/"
            return null
        }

        response = await fetch(url, {
            ...options,
            credentials: "include"
        })
    }

    return response
}