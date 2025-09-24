import { useAuth } from "../../context/auth/useAuth"

export function Header() {
    const { user } = useAuth()

    return (
        <>
            <header className="h-8 w-full bg-white flex items-center justify-between pl-5 pr-5">
                <div>
                    <div className="h-[23px] w-[23px] bg-gray-500 rounded-[6px]"></div>
                </div>

                <div>
                    <h1 className="text-[15px] text-gray-500">Carrinho de Compra</h1>
                </div>

                <div className="flex flex-col">
                    <h1 className="text-[12px] text-gray-500">{ user?.name ?? "Visitante" }</h1>
                    <small className="text-gray-800">{ user?.email ?? "Sem email" }</small>
                </div>
            </header>
        </>
    )
}