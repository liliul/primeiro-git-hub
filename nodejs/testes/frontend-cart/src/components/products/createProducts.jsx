import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { useAuth } from "../../context/auth/useAuth"
import { useState } from "react"

const productSchema = z.object({
  name: z.string()
    .min(3, "O nome do produto deve ter pelo menos 3 caracteres"),
  price: z.preprocess(
    (val) => Number(val),
    z.number().nonnegative("Preço deve ser >= 0")
  ),
  stock: z.preprocess(
    (val) => Number(val),
    z.number().int().nonnegative("Stock deve ser >= 0")
  )
})

export function CreateProducts() {
    const { user } = useAuth()
    const [erro, setErro] = useState(null)

    const {register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm({
        resolver: zodResolver(productSchema)
    })
    
    async function onSubmitCreateProduct(data) {
        setErro(null) 
        
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(data)
            }
            
            const req = await fetch('http://localhost:3001/v2/create-products', options)
            
            if (!req.ok) {
                const res = await req.json()
                console.log(res)
                setErro(res)
            }

            reset()
            
        } catch (error) {
          console.error(error)
        }
    }

    return (
        <>
            <h1>Criar produto</h1>
            <div className="p-2 w-[800px] grid grid-cols-1 gap-3 place-items-center mx-auto bg-white rounded-lg shadow-lg overflow-hidden m-4">
                {erro && (
                    <div className="p-2 rounded-md shadow-md shadow-[#191919] text-red-600">
                        <b>{erro.message}</b>
                        <p>{erro.error}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmitCreateProduct)} className="text-black">
                    <div>
                        <label htmlFor="name">Nome do produto:</label>
                        <input
                            className="border-2 border-black" 
                            id="name" 
                            type="text" 
                            name="name" 
                            {...register("name")}
                            placeholder="Nome"
                        />
                        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                    </div>
                    
                    <div>
                        <label htmlFor="price">Preço do produto:</label>
                        <input 
                            className="border-2 border-black"
                            id="price" 
                            type="number"
                            name="price"
                            {...register("price")}
                            placeholder="preço" 
                        />
                        {errors.price && <p className="text-red-600">{errors.price.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="stock">Estoque do produto:</label>
                        <input 
                            className="border-2 border-black" 
                            id="stock" 
                            type="number" 
                            name="stock" 
                            {...register("stock")}
                            placeholder="estoque"
                        />
                        {errors.stock && <p className="text-red-600">{errors.stock.message}</p>}
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="p-3 bg-black text-white mt-2"
                    >
                        { isSubmitting ? 'Enviando...' : 'Criar produto' }
                    </button>
                </form>
            </div>
        </>
    )
}