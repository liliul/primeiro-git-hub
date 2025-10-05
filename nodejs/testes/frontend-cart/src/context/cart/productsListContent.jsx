import { createContext, useContext, useState } from "react";

const ProductsContext = createContext()

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])

  async function refreshProducts(token) {
    const opitons = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
    },
    }
    const res = await fetch(`http://localhost:3001/v2/list-products`, opitons)
    const data = await res.json()
    console.log(data);
    
    setProducts(data.data)
  }

  return (
    <ProductsContext.Provider value={{ products, refreshProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => useContext(ProductsContext)
