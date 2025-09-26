import { useEffect, useState } from "react"
import { useAuth } from "../../context/auth/useAuth"
import { ButtoDeleteUsers, ButtoEditUsers } from "./utils"
import { DeleteUsers } from "./delete-users"
import { UpdateUsers } from "./update-users"

export function ListUsers() {
    const [dados, setDados] = useState([])
    const [selected, setSelected] = useState(null)
    const { user } = useAuth()

    async function getUsers(token) {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const req = await fetch('http://localhost:3001/v1/list-users', options)
        
        if (req.ok) {
            const res = await req.json()
            console.log(res)
            setDados(res.data)            
        }
    }

    useEffect(() => {
        getUsers(user.token)
    },[user.token])

    async function handleDelete(id) {
        try {
            await DeleteUsers(id, user.token)
            setDados((prev) => prev.filter((i) => i.id !== id))
        } catch (error) {
            console.error(error.message)
        }
    } 

    return (
        <>
            <h1>Listando usuarios</h1>
            <div className="p-5 w-[800px] mx-auto bg-white rounded-lg shadow-lg overflow-hidden m-4">
                <ul>
                    {dados.map((i) => (
                        <li key={i.id} className="mb-3 border-b border-black">
                            <div className="text-gray-600 relative">
                                <ButtoDeleteUsers btndelete={() => handleDelete(i.id)} />
                                <ButtoEditUsers edit={() => setSelected(i)} />
                                <h1>{ i.name }</h1>
                                <b>{ i.email }</b>
                                <br/>
                                <small>{ i.role }</small>
                            </div>
                        </li>
                    ))}
                </ul>
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

                        <UpdateUsers 
                            id={selected.id}
                            name={selected.name}
                            password={selected}
                            onUpdated={
                                (updated) => {
                                    setDados((prev) =>
                                        prev.map((p) => (p.id === updated.id ? updated : p))
                                    )
                                    setSelected(null)
                                }
                            }
                        />  
                    </div>
                </div>
            )}
        </>
    )
} 