import { createContext, useContext, useReducer, useMemo } from "react";

// ─── 1. TIPOS DE AÇÃO ────────────────────────────────────────────────────────
const ADD_TO_CART    = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART     = "CLEAR_CART";
const INCREMENT      = "INCREMENT";
const DECREMENT      = "DECREMENT";

// ─── 2. ESTADO INICIAL ────────────────────────────────────────────────────────
const initialState = {
  cart: [], // { id, name, price, qty, image }
};

// ─── 3. REDUCER ──────────────────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const exists = state.cart.find((i) => i.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    }

    case REMOVE_FROM_CART:
      return { ...state, cart: state.cart.filter((i) => i.id !== action.payload) };

    case INCREMENT:
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.id === action.payload ? { ...i, qty: i.qty + 1 } : i
        ),
      };

    case DECREMENT:
      return {
        ...state,
        cart: state.cart
          .map((i) => (i.id === action.payload ? { ...i, qty: i.qty - 1 } : i))
          .filter((i) => i.qty > 0), // remove automaticamente se qty = 0
      };

    case CLEAR_CART:
      return { ...state, cart: [] };

    default:
      return state;
  }
}

// ─── 4. CONTEXTO ─────────────────────────────────────────────────────────────
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // helpers com nomes claros — não expõe dispatch diretamente
  const addToCart    = (product) => dispatch({ type: ADD_TO_CART,      payload: product });
  const removeFromCart = (id)    => dispatch({ type: REMOVE_FROM_CART, payload: id });
  const increment    = (id)      => dispatch({ type: INCREMENT,         payload: id });
  const decrement    = (id)      => dispatch({ type: DECREMENT,         payload: id });
  const clearCart    = ()        => dispatch({ type: CLEAR_CART });

  // valores derivados com useMemo para evitar recálculo
  const totalItems = useMemo(
    () => state.cart.reduce((sum, i) => sum + i.qty, 0),
    [state.cart]
  );
  const totalPrice = useMemo(
    () => state.cart.reduce((sum, i) => sum + i.price * i.qty, 0),
    [state.cart]
  );

  const value = {
    cart: state.cart,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    increment,
    decrement,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ─── 5. HOOK CUSTOMIZADO ─────────────────────────────────────────────────────
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de <CartProvider>");
  return ctx;
}

// ─────────────────────────────────────────────────────────────────────────────
// DEMO — tudo abaixo é só para visualização, em produção separe em arquivos
// ─────────────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  { id: 1, name: "Tênis Runner Pro",   price: 299.9,  image: "👟" },
  { id: 2, name: "Mochila Urban 30L",  price: 189.9,  image: "🎒" },
  { id: 3, name: "Garrafa Inox 750ml", price:  79.9,  image: "🧴" },
  { id: 4, name: "Boné Aba Curva",     price:  59.9,  image: "🧢" },
];

function ProductCard({ product }) {
  const { addToCart, cart } = useCart();
  const inCart = cart.find((i) => i.id === product.id);

  return (
    <div style={styles.card}>
      <span style={styles.emoji}>{product.image}</span>
      <p style={styles.productName}>{product.name}</p>
      <p style={styles.price}>R$ {product.price.toFixed(2)}</p>
      <button
        onClick={() => addToCart(product)}
        style={{ ...styles.btn, background: inCart ? "#16a34a" : "#2563eb" }}
      >
        {inCart ? `✓ No carrinho (${inCart.qty})` : "Adicionar"}
      </button>
    </div>
  );
}

function CartItem({ item }) {
  const { removeFromCart, increment, decrement } = useCart();
  return (
    <div style={styles.cartItem}>
      <span>{item.image}</span>
      <span style={{ flex: 1, marginLeft: 8 }}>{item.name}</span>
      <div style={styles.qtyRow}>
        <button onClick={() => decrement(item.id)} style={styles.qtyBtn}>−</button>
        <span style={{ minWidth: 20, textAlign: "center" }}>{item.qty}</span>
        <button onClick={() => increment(item.id)} style={styles.qtyBtn}>+</button>
      </div>
      <span style={{ minWidth: 80, textAlign: "right" }}>
        R$ {(item.price * item.qty).toFixed(2)}
      </span>
      <button onClick={() => removeFromCart(item.id)} style={styles.removeBtn}>🗑</button>
    </div>
  );
}

function Cart() {
  const { cart, totalItems, totalPrice, clearCart } = useCart();

  return (
    <div style={styles.cartBox}>
      <h2 style={styles.sectionTitle}>🛒 Carrinho ({totalItems})</h2>
      {cart.length === 0 ? (
        <p style={{ color: "#6b7280", textAlign: "center", padding: "24px 0" }}>
          Carrinho vazio — adicione produtos!
        </p>
      ) : (
        <>
          {cart.map((item) => <CartItem key={item.id} item={item} />)}
          <div style={styles.total}>
            <span>Total</span>
            <strong>R$ {totalPrice.toFixed(2)}</strong>
          </div>
          <button onClick={clearCart} style={{ ...styles.btn, background: "#dc2626", width: "100%", marginTop: 8 }}>
            Limpar carrinho
          </button>
        </>
      )}
    </div>
  );
}

// ─── APP RAIZ ────────────────────────────────────────────────────────────────
export default function ShopContextReducerApp() {
  return (
    <CartProvider>
      <div style={styles.page}>
        <h1 style={styles.title}>Loja React Context</h1>
        <div style={styles.layout}>
          <section style={{ flex: 1 }}>
            <h2 style={styles.sectionTitle}>Produtos</h2>
            <div style={styles.grid}>
              {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
          <aside style={{ width: 340, flexShrink: 0 }}>
            <Cart />
          </aside>
        </div>
      </div>
    </CartProvider>
  );
}

// ─── ESTILOS ─────────────────────────────────────────────────────────────────
const styles = {
  page:        { fontFamily: "system-ui, sans-serif", maxWidth: 960, margin: "0 auto", padding: 24 },
  title:       { fontSize: 24, fontWeight: 700, marginBottom: 20 },
  layout:      { display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" },
  sectionTitle:{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: "#374151" },
  grid:        { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 },
  card:        { border: "1px solid #e5e7eb", borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, background: "#fff" },
  emoji:       { fontSize: 40 },
  productName: { fontWeight: 600, textAlign: "center", margin: 0 },
  price:       { color: "#2563eb", fontWeight: 700, margin: 0 },
  btn:         { color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontWeight: 600, fontSize: 13 },
  cartBox:     { border: "1px solid #e5e7eb", borderRadius: 12, padding: 16, background: "#fff" },
  cartItem:    { display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: "1px solid #f3f4f6" },
  qtyRow:      { display: "flex", alignItems: "center", gap: 4 },
  qtyBtn:      { width: 24, height: 24, borderRadius: 6, border: "1px solid #d1d5db", background: "#f9fafb", cursor: "pointer", fontWeight: 700 },
  removeBtn:   { background: "none", border: "none", cursor: "pointer", fontSize: 16, marginLeft: 4 },
  total:       { display: "flex", justifyContent: "space-between", padding: "12px 0 4px", fontWeight: 600, fontSize: 15 },
};
