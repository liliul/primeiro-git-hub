import { authFetch } from "../core/authFetchAdmin.js";

async function me() {
    const me = await authFetch('/admin/me')
    const response = await me.json()
    console.log(response);
    
    document.getElementById('me').innerHTML = `
        <p>${response.me.id}</p>
        <p>${response.me.name}</p>
        <p>${response.me.email}</p>
        <p>${response.me.role}</p>
        <p>${response.me.criado_em}</p>
    `
}
me()