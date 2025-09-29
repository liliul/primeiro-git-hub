import { useEffect } from "react"
import { useAuth } from "../../context/auth/useAuth"
import { useState } from "react"
import { UpdateProducts } from "./updateProducts"
import { ButtoDeleteProduct, ButtoEditProduct } from "./utils"
import { deleteProduct } from "./deleteProducts"
import { ButtonAddCart } from "../cart/buttonAddCart"

export function ProductsList() {
    const [dados, setDados] = useState([])
    const [selected, setSelected] = useState(null)

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
    
    async function handleDeleteProducts(id) {
        try {
            await deleteProduct(id, user.token)
            setDados((prev) => prev.filter((item) => item.id !== id))
        } catch (error) {
            console.error(error.message);
        }
    }
    
    return (
        <>
            <h1>Products</h1>

            <div >       
                <div className="p-2 w-[800px] grid grid-cols-2 gap-3 place-items-center mx-auto bg-white rounded-lg shadow-lg overflow-hidden m-4">
                    {dados.map((items) => (
                        <div className="w-full h-full rounded-[10px] p-6 border-2 border-black relative" key={items.id}>
                            <ButtoDeleteProduct btndelete={() => handleDeleteProducts(items.id)} />
                            <ButtoEditProduct edit={() => setSelected(items)} />
                            
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

                            {/* <button className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                                Adicionar ao Carrinho
                            </button> */}
                            <ButtonAddCart
                                idProducts={items.id}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {selected && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 relative">
                        <button
                            onClick={() => setSelected(null)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-black"
                        >
                            ✕
                        </button>

                        <UpdateProducts
                            id={selected.id}
                            name={selected.name}
                            price={selected.price}
                            stock={selected.stock}
                            onUpdated={(updated) => {
                                setDados((prev) =>
                                prev.map((p) => (p.id === updated.id ? updated : p))
                                )
                                setSelected(null)
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    )
}