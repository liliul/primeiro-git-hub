import { ProductsProvider } from "../cart/productsListContent"

export function AppProviders({ children }) {
  return (
    <ProductsProvider>
        { children }
    </ProductsProvider>
  )
}
