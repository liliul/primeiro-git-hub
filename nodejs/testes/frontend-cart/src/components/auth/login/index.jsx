import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const loginShema = z.object({
    email: z.string().email({ error: 'Email invalido'}),
    password: z.string().min(8, { error: 'A senha deve conter pelo menos 8 caracteres' })
})

function Login() {
    const { register, handleSubmit, formState: { errors, isSubmitting}} = useForm({
        resolver: zodResolver(loginShema),
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
            const req = await fetch('http://localhost:3001/v1/login', options)
            if(!req.ok) {
                throw new Error(`Erro no fetch api ${req.status}`)
            }

            const res = await req.json()

            localStorage.setItem('token', res.token)
            
            console.log(res)

        } catch (error) {
            console.error(error)
        } 
    }

    return (
        <>
            <form 
                className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md space-y-6"
                onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    Login
                </h2>
                <div className="space-y-2">
                    <label
                        className="block text-sm font-medium text-gray-700" 
                        htmlFor="email"
                    >Email:</label>
                    <input 
                        className="w-full px-4 text-gray-800 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out" 
                        type="email" 
                        name='email' 
                        id="email" 
                        {...register("email")} 
                    />
                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <label
                        className="block text-sm font-medium text-gray-700" 
                        htmlFor="password">Senha:</label>
                    <input 
                        className="w-full px-4 text-gray-800 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out" 
                        type="password" 
                        name="password" 
                        id="password" 
                        {...register("password")} 
                    />
                    {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
                </div>

                <div>
                    <button
                        className={`
                            w-full py-2 px-4 rounded-lg font-semibold transition duration-150 ease-in-out
                            ${isSubmitting 
                                ? 'bg-indigo-400 cursor-not-allowed' 
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg'
                            }
                        `} 
                        type='submit' 
                        disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Entrar'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default Login