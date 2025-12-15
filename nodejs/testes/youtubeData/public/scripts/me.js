export async function Me() {
    const req = await fetch("http://localhost:3001/v3/me", {
        method: "GET",
        credentials: "include", 
    })
    const res = await req.json()

    return res
} 

export async function LayoutMe() {
    const me = await Me()
    console.log(me)
    
    const section = document.createElement('section')
    section.setAttribute('data-id-google', me.user.sub)
    const img = document.createElement('img')
    img.src = me.user.picture

    const nomeEmail = document.createElement('div')
    nomeEmail.innerHTML = `<strong>${me.user.name}</strong><br><p>${me.user.email}</p>`
    
    section.append(img, nomeEmail)

    document.getElementById('auth').append(section)
}

LayoutMe()