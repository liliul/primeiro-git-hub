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
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Login</h1>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name='email' id="email" {...register("email")} />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input type="password" name="password" id="password" {...register("password")} />
                    {errors.password && <p className="error-message">{errors.password.message}</p>}
                </div>

                <div>
                    <button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Enviando...' : 'Entrar'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default Login