import { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth/useAuth";

export function OrdersPaginando() {
  const [orders, setOrders] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const {user} = useAuth()

  async function fetchOrders(cursor = null, direction = "next") {
    setLoading(true);

    try {
        let baseUrl = "http://localhost:3001/v1/checkout/orders/pages";
        const params = new URLSearchParams();

        if (cursor) {
          // url += `?cursor_created_at=${cursor.cursor_created_at}&cursor_id=${cursor.cursor_id}&limit=5&direction=${direction}`;
          params.append('cursor_created_at', cursor.cursor_created_at);
          params.append('cursor_id', cursor.cursor_id);
          params.append('limit', 5);
          params.append('direction', direction)
        }
        const url = `${baseUrl}${params.toString() ? `?${params.toString()}` : ""}`;
        
        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        }

        const req = await fetch(url, options);
        
        if (req.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
            return null;
        }
        
        const res = await req.json();
        console.log(res)
        
        if (!req.ok) throw new Error(res.message || "Erro ao buscar pedidos");

        //   setOrders(res.data);
        //  setOrders((prev) =>
        //     direction === "next" ? [...prev, ...res.data] : [...res.data, ...prev]
        //   );

        setOrders((prev) => {
        const newOrders = res.data.filter(
            (item) => !prev.some((o) => o.id === item.id) 
        );

        return direction === "next"
            ? [...prev, ...newOrders]
            : [...newOrders, ...prev];
        });
            
        setNextCursor(res.nextCursor);
        
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextCursor && !loading) {
          fetchOrders(nextCursor, "next");
        }
      },
      { threshold: 1.0 }
    );

    const sentinel = document.querySelector("#scroll-sentinel");
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextCursor?.cursor_id, nextCursor?.cursor_created_at, fetchOrders, loading]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Historico de compras</h1>

      {loading && <p>Carregando...</p>}

      <ul className="space-y-2">
        {orders.map((order) => (
          <li key={order.id} className="border p-2 rounded">
            <div><strong>Cliente:</strong> {order.user_name}</div>
            <div><strong>Total:</strong> R$ {order.total}</div>
            <div><strong>Status:</strong> {order.status}</div>
            <div><strong>Data:</strong> {new Date(order.created_at).toLocaleString()}</div>
          </li>
        ))}
      </ul>

      <div id="scroll-sentinel" className="h-4"></div>
    </div>
  );
}
