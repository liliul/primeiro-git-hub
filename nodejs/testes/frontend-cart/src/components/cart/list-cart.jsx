import { useForm } from "react-hook-form"
import { useAuth } from "../../context/auth/useAuth"
import { useEffect, useState } from "react"
import { Checkout } from "../checkout/checkout"

export function ListCart() {
  const [dados, setDados] = useState([])
  const { user } = useAuth()
  const { register, setValue, formState: { errors } } = useForm()

  async function onSubmitGetCart() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        }
      }
      
      const req = await fetch(`http://localhost:3001/v3/list-cart-items/${user?.id}`, options)
      if (req.ok) {
        const res = await req.json()
        console.log('Carrinho:', res)
        setDados(res)

        res.forEach(item => {
          setValue(`quantity-${item.item_id}`, item.quantity)
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function updateQuantity(itemId, newQuantity) { 
    try {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify({ itemId, quantity: newQuantity })
      }

      const req = await fetch(`http://localhost:3001/v3/update-cart-items/${itemId}`, options)
      if (req.ok) {
        const res = await req.json()
        console.log("Atualizado:", res)

        setDados(prev =>
          prev.map(p => p.item_id === itemId ? { ...p, quantity: newQuantity } : p)
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (user?.token) {
      onSubmitGetCart()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.token])

  async function deleteCart(idDelete) {
        try {
          const options = {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
          }

          const req = await fetch(`http://localhost:3001/v3/delete-cart-items/${idDelete}`, options)
          if (req.ok) {
            await req.json()
            setDados(prev => prev.filter(item => item.item_id !== idDelete))
          }
        } catch (error) {
          console.error(error)
        }
  }
  return (
    <section className={`cart-menu w-[450px] p-3 absolute top-9 bg-[#191919] z-50`}>
      <h1>Carrinho</h1>
      {dados.length === 0 ? 'sem cart' : (
        <>
        <div>
        <ul>
          {dados.map((item) => (
            <li key={item.item_id} className="mb-4 relative">
              <button
                className="bg-red-600 text-white p-1 absolute top-1 right-1"
                onClick={() => {deleteCart(item.item_id)}} 
              >
                x
              </button>
              <div>
                <h2>{item.name}</h2>
                <small>R$ {item.price}</small>
              </div>

            <input 
                type="number" 
                id={`quantity-${item.item_id}`} 
                {...register(`quantity-${item.item_id}`)} 
                defaultValue={item.quantity}
                onChange={(e) => updateQuantity(item.item_id, parseInt(e.target.value))}
                className="border rounded px-2 py-1 w-20"
              />
              {errors[`quantity-${item.item_id}`] && (
                <p className="text-yellow-300">
                  {errors[`quantity-${item.item_id}`].message}
                </p>
              )}
              
            </li> 
          ))}
        </ul>
      </div>
      <Checkout 
        checado={onSubmitGetCart}
      />
        </>
      )}
    </section>
  )
}
