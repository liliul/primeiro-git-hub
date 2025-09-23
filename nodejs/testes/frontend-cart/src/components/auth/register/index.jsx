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
           <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Name:</label>

                <input id="name" type="name" {...register("name")} />
                
                {errors.name && <p className="error-message">{errors.name.message}</p>}
            </div>

            <div>
                <label htmlFor="email">Email:</label>

                <input id="email" type="email" {...register("email")} />
                
                {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="password">Senha:</label>
                <input id="password" type="password" {...register("password")} />
                {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Entrar'}
            </button>
            </form>
        </>
    )
}

export default Register