import { useAuth } from "../../context/auth/useAuth"

export function ButtonAddCart({ idProducts }) {
    const { user } = useAuth()
    
    async function onSubmitCart(productId) {
        
        const data = {
            productId,
            quantity: 1
        }

        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(data)
            }
            
            const req = await fetch(`http://localhost:3001/v3/create-carts-users/${user.id}`, options)
            if (req.ok) {
                const res = await req.json()
                console.log(res)
            }
        } catch (error) {
            console.error(error)
        }
        
    }

    return (
        <>
            <button 
                className="text-white p-2 bg-blue-600 rounded-md"
                onClick={() => {onSubmitCart(idProducts)}}
            >
                Add cart
            </button>
        </>
    )
}