import { useAuth } from "../../context/auth/useAuth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const RoleEnum = z.enum(["user", "admin"])

const roleSchema = z.object({
  role: RoleEnum,
  id: z.string().uuid({ message: "ID inválido, deve ser um UUID" })
})


export function AddRoles() {
    const [dados, setDados] = useState([])
    const {register, handleSubmit, formState: { errors, isSubmitting }} = useForm({
        resolver: zodResolver(roleSchema)
    })
    const { user } = useAuth()

    async function onSubmitCreateRoles(data) {
        console.log(data);
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(data)
        }

        const req = await fetch(`http://localhost:3001/v1/new-role/${data.id}`, options)

        if (req.ok) {
            const res = await req.json()
            console.log(res)
        }
    }

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
            <h1>Adicionar Roles</h1>
            <div className="p-3">
                <form onSubmit={handleSubmit(onSubmitCreateRoles)}>
                    <div>
                        <label htmlFor="role">Adicionando roles</label>
                        <select 
                            id="role" 
                            {...register("role")}
                        >
                            <option className="text-black" value="">-- selecione role --</option>
                            <option className="text-black" value="user">User</option>
                            <option className="text-black" value="admin">Admin</option>
                        </select>
                        { errors.role && <p className="text-red-600">{errors.role.message}</p> }
                    </div>

                    <div>
                        <label htmlFor="id">Adicionando id do usuario</label>
                        <input 
                            className="ml-1 pl-1"
                            type="text" 
                            name="id" 
                            {...register("id")} 
                            placeholder="uuid"
                        />
                        { errors.id && <p className="text-red-600">{errors.id.message}</p> }
                    </div>

                    <button type="submit" disabled={isSubmitting}>
                        { isSubmitting ? 'Enviando' : 'ADD Role'}
                    </button>
                </form>
            </div>

            <div className="mt-5 border-t border-white">
                <ul className="p-2">
                    { dados.map((i) => (
                        <li key={i.id} className="border border-gray-600 mb-1 p-1">
                            <h1>{i.name}</h1>
                            <small>{i.id}</small>
                            <br />
                            <span>{i.role}</span>
                        </li>
                    )) }
                </ul>
            </div>
        </>
    )
}