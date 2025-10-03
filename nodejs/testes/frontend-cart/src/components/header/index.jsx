import { Link } from "react-router-dom"
import { useAuth } from "../../context/auth/useAuth"
import { ListCart } from "../cart/list-cart"
import { useState } from "react"
import { Tooltip } from "../utils/toolTips"

export function Header() {
    const { user, logout } = useAuth()
    const [selected, setSelected] = useState(false)

    function handleCartOpen() {
        setSelected(true)
    }
    function handleCartClose() {
        setSelected(false)
    }
    return (
        <>
            <header className="h-8 w-full bg-white flex items-center justify-between pl-5 pr-5">
                <div>
                   <Tooltip text="Logo do Cart">
                     <div className="h-[23px] w-[23px] bg-gray-500 rounded-[6px]"></div>
                   </Tooltip>
                </div>

                { user && (
                    <div className="relative">
                        {selected ? (
                        <div>
                            <button
                                onClick={() => {handleCartClose()}}
                                className="text-[15px] text-white bg-red-600 rounded-md p-1"
                            >
                                Fechar Carrinho
                            </button>
                            <ListCart />
                        </div>
                        ) : (
                            <button
                                onClick={() => {handleCartOpen()}}
                                className="text-[15px] text-white bg-blue-500 rounded-md p-1"
                            >
                                Carrinho de Compra
                            </button>
                        )}
                    </div>
                )}

                <div className="flex flex-col">
                    { user ? (
                        <div>
                            <h1 className="text-[12px] text-gray-500">{ user?.name ?? "Visitante" }</h1>
                            <small className="text-gray-800">{ user?.email ?? "Sem email" }</small>
                            <span 
                                className="ml-2 text-black"
                                onClick={() => logout()}
                            >
                                Sair
                            </span>
                        </div>
                    ) : (
                        <button className="text-black">
                            <Link to="/login">Login</Link>
                        </button>
                    )}
                </div>
            </header>
        </>
    )
}