import { useEffect, useState } from "react"
import { useAuth } from "../../context/auth/useAuth"
import { ButtonAddCart } from "../cart/buttonAddCart"

export function ListProductsUsers() {
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
                        <div className="w-full h-full rounded-[10px] p-6 border-2 border-black relative" key={items.id}>
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

                            {items.stock <= 0 ? (
                                <ButtonAddCart
                                idProducts={items.id}
                                btnDisabled={true}
                                btnStyle="text-white p-2 bg-gray-500 rounded-md"
                            />
                            ): (
                                <ButtonAddCart
                                idProducts={items.id}
                                btnDisabled={false}
                                btnStyle="text-white p-2 bg-blue-600 rounded-md"
                            />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}