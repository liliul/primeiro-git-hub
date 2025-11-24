import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const registerSchema = z.object({
   name: z.string()
       .min(3, { message: 'Nome tem que pelo menos 3 letras.' })
       .max(100, { message: 'Nome deve ter maximo 100 letras.' }),
    email: z.string().email({ message: 'Email invalido' }),
    password: z.string().min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
})

function Register() {
    const { register, handleSubmit, formState: { errors, isSubmitting  } } = useForm({
        resolver: zodResolver(registerSchema),
    })

    const onSubmit = async (data) => {
        console.log("Dados do formulário:", data);

        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(data)

            }
            const req = await fetch('http://localhost:3001/v1/create-users', options)
            if(!req.ok) {
                throw new Error(`Erro no fetch api ${req.status}`)
            }

            const res = await req.json()

            console.log(res)
        } catch (error) {
            console.error(error)
        } 
    }
    return (
        <>
           <section className="w-full h-[100vh] grid place-items-center">
                <form
                className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md space-y-6" 
                onSubmit={handleSubmit(onSubmit)}>
                
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    Registrar Usuário
                </h2>

                <div className="space-y-2">
                    <label
                        className="block text-sm font-medium text-gray-700" 
                        htmlFor="name"
                    >Name:</label>

                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out" 
                        id="name" 
                        type="name" 
                        {...register("name")} 
                    />
                    
                    {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                    <label
                        className="block text-sm font-medium text-gray-700" 
                        htmlFor="email"
                    >Email:</label>

                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out" 
                        id="email" 
                        type="email" 
                        {...register("email")} 
                    />
                    
                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                    <label
                        className="block text-sm font-medium text-gray-700" 
                        htmlFor="password"
                    >Senha:</label>
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out" 
                        id="password" 
                        type="password" 
                        {...register("password")} 
                    />
                    {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
                </div>

                <button 
                    className={`
                        w-full py-2 px-4 rounded-lg font-semibold transition duration-150 ease-in-out
                        ${isSubmitting 
                            ? 'bg-indigo-400 cursor-not-allowed' 
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg'
                        }
                    `}
                    type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Entrar'}
                </button>
                </form>
           </section>
        </>
    )
}

export default Register