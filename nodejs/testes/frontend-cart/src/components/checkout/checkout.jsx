import { useState, useEffect } from "react"
import { useAuth } from "../../context/auth/useAuth"

export function Checkout() {
    const { user } = useAuth() 
    // const [disableButtonCheckout, setDisableButtonCheckout] = useState(true)
    const [dadosCartLength, setDadosCartLength] = useState([])

    async function CriarCheckout() {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                }
            }   

            const req = await fetch(`http://localhost:3001/v1/checkout`, options)
            if (req.ok) {
                const res = await req.json()
                console.log(res)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function onSubmitGetCart() {
        try {
            const options = {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user?.token}`
                }
            }
            
            const req = await fetch(`http://localhost:3001/v3/list-cart-items/${user?.id}`, options)
            if (req.ok) {
                const res = await req.json()
                console.log('Carrinho:', res)
                setDadosCartLength(res)
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onSubmitGetCart()
    }, [user.token])
    console.log(dadosCartLength.length);
    
    return (
        <>
            {dadosCartLength.length === 0 ? (
               <button
                    disabled
                    className="bg-blue-100 text-black p-2"
                    onClick={() => {CriarCheckout()}} 
                >checkout</button>
            ): (
                <button
                    className="bg-blue-400 text-white p-2"
                    onClick={() => {CriarCheckout()}} 
                >checkout</button>
            )}
        </>
    )
}