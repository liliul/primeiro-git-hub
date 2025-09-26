import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from 'react'
import { useAuth } from '../../context/auth/useAuth'

const updateUserShema = z.object({
    name: z.string().min(3, 'Nome com no minimo de 3 letras'),
    password: z.string().min(8, 'No minimo 8 caracteries')
}) 

export function UpdateUsers({ id, name, password, onUpdated }) {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const { user } = useAuth()

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm({
        resolver: zodResolver(updateUserShema),
        defaultValues: {
            id,
            name,
            password
        }
    })

    async function onSubmitUpdateUsers(data) {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(data)
            }

            const req = await fetch(`http://localhost:3001/v1/update-users/${id}`, options)
            if (req.ok) {
              const res = await req.json()
              console.log(res)
              
              if (onUpdated) onUpdated(res)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    function ButtonShowPassword() {
        return (
            <>
                <button
                    type="button"
                    onClick={() => setIsShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-600"
                >
                    {isShowPassword ? "Ocultar" : "Mostrar"}
                </button>
            </>
        )
    }

    return (
        <>
            <h1>Atualizar produto</h1>
            <div className="p-2 w-[800px] grid grid-cols-2 gap-3 place-items-center mx-auto bg-white rounded-lg shadow-lg overflow-hidden m-4">
                <form onSubmit={handleSubmit(onSubmitUpdateUsers)} className="text-black">
                    <div>
                        <label htmlFor={`name-${id}`}>Editar novo nome:</label>
                        <input
                            className="border-2 border-black" 
                            id={`name-${id}`}
                            type="text" 
                            name="name" 
                            {...register("name")}
                        />
                        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor={`password-${id}`}>Editar nova senha:</label>
                        <input 
                            className="border-2 border-black"
                            id={`password-${id}`} 
                            type={isShowPassword ? 'text' : 'password'}
                            name="password"
                            {...register("password")}
                        />
                        <ButtonShowPassword />
                        <br />
                        {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="p-3 bg-black text-white mt-2"
                    >
                        { isSubmitting ? 'Enviando...' : 'Editar usuario' }
                    </button>
                </form>
            </div>
        </>
    )
}