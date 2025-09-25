export async function deleteProduct(id, token) {
    try {
        const options = {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
        }
        const req = await fetch(`http://localhost:3001/v2/delete-products/${id}`, options)

        if (!req.ok) {
            const errorRes = await req.json()
            console.error('Erro ao deletar', errorRes.message)
        }
    } catch (error) {
        console.error('Erro ao deletar produto', error)
    }
}