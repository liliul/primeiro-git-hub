export async function DeleteUsers(id, token) {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    const req = await fetch(`http://localhost:3001/v1/delete-users/${id}`, options)
    if (!req.ok) {
        const res = await req.json()
        console.error('Erro delete users:', res.message)
    } 
}