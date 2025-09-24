import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { useAuth } from "../../context/auth/useAuth"

const updateProductSchema = z.object({
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

export function UpdateProducts({ id, name, price, stock, onUpdated }) {
    const { user } = useAuth()

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm({
        resolver: zodResolver(updateProductSchema),
        defaultValues: {
            name,
            price,
            stock
        }
    })
    
    async function onSubmitUpdateProduct(data) {
        try {
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(data)
            }
            
            const req = await fetch(`http://localhost:3001/v2/update-products/${id}`, options)
            if (req.ok) {
                const res = await req.json()

                if (onUpdated) onUpdated(res)
            }
        } catch (error) {
          console.error(error)
        }
    }

    return (
        <>
            <h1>Atualizar produto</h1>
            <div className="p-2 w-[800px] grid grid-cols-2 gap-3 place-items-center mx-auto bg-white rounded-lg shadow-lg overflow-hidden m-4">
                <form onSubmit={handleSubmit(onSubmitUpdateProduct)} className="text-black">
                    <div>
                        <label htmlFor={`name-${id}`}>Nome do produto:</label>
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
                        <label htmlFor={`price-${id}`}>Preço do produto:</label>
                        <input 
                            className="border-2 border-black"
                            id={`price-${id}`} 
                            type="number"
                            name="price"
                            {...register("price")}
                        />
                        {errors.price && <p className="text-red-600">{errors.price.message}</p>}
                    </div>

                    <div>
                        <label htmlFor={`stock-${id}`}>Estoque do produto:</label>
                        <input 
                            className="border-2 border-black" 
                            id={`stock-${id}`} 
                            type="number" 
                            name="stock" 
                            {...register("stock")}
                        />
                        {errors.stock && <p className="text-red-600">{errors.stock.message}</p>}
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="p-3 bg-black text-white mt-2"
                    >
                        { isSubmitting ? 'Enviando...' : 'Editar produto' }
                    </button>
                </form>
            </div>
        </>
    )
}