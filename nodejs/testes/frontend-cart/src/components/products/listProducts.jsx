import { useEffect } from "react"
import { useAuth } from "../../context/auth/useAuth"
import { useState } from "react"

export function ProductsList() {
    const [dados, setDados] = useState([])

    const { user } = useAuth()
    
    useEffect(() => {
        async function getProducts(token) {
            const opitons = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            }
            const req = await fetch('http://localhost:3001/v2/list-products', opitons)
            const res = await req.json()

            setDados(res.data)
        }

        getProducts(user.token)
    },[user.token])
    
    return (
        <>
            <h1>Products</h1>

            <div >       
                <div className="p-2 w-[800px] grid grid-cols-2 gap-3 place-items-center mx-auto bg-white rounded-lg shadow-lg overflow-hidden m-4">
                    {dados.map((items) => (
                        <div className="w-full h-full rounded-[10px] p-6 border-2 border-black" key={items.id}>
                            <div className="mb-2">
                                <h3 className="text-xl font-semibold text-gray-900">{items.name}</h3>
                                <span className="text-2xl font-bold text-gray-800">R$ {items.price}</span>
                            </div>

                           {items.stock <= 0 ? (
                             <p className="text-sm text-gray-500 mb-4">
                                Estoque: <span className="font-bold text-green-600">Indisponivel</span>
                            </p>
                           ) : (
                             <p className="text-sm text-gray-500 mb-4">
                                Estoque: <span className="font-bold text-green-600">{items.stock}</span>
                            </p>
                           )}

                            <button className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                                Adicionar ao Carrinho
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}