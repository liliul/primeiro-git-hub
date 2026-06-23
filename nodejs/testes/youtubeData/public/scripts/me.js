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

export async function Me() {
    const response = await authFetch(
        "http://localhost:3001/auth/ggme"
    )
    
    if (!response) {
        return null
    }

    return response.json()
}

export async function LayoutMe() {
    const me = await Me()
    console.log('me', me);
    
    if (!me) {
        window.location.href = "/"
        return
    }

    const section = document.createElement("section")

    section.setAttribute(
        "data-id-google",
        me.user.sub
    )

    const img = document.createElement("img")
    img.src = me.user.picture

    const nomeEmail = document.createElement("div")

    nomeEmail.innerHTML = `
        <strong>${me.user.name}</strong>
        <br>
        <p>${me.user.email}</p>
    `

    section.append(img, nomeEmail)

    document
        .getElementById("auth")
        .append(section)
}

LayoutMe()