import { useEffect, useState } from "react"
import { useAuth } from "../../context/auth/useAuth"

export function ListUsers() {
    const [dados, setDados] = useState([])
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

    return (
        <>
            <h1>Listando usuarios</h1>
            {dados.map((i) => (
                <li key={i.id}>{ i.name }</li>
            ))}
        </>
    )
} 