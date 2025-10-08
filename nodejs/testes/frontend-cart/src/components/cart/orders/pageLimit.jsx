import { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth/useAuth";

export function OrdersPaginandoPageLimit() {
  const [orders, setOrders] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [prevCursor, setPrevCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  async function fetchOrders(cursor = null, direction = "next") {
    setLoading(true);

    try {
      const baseUrl = "http://localhost:3001/v1/checkout/orders/pages";
      const params = new URLSearchParams();

      if (cursor) {
        params.append("cursor_created_at", cursor.cursor_created_at);
        params.append("cursor_id", cursor.cursor_id);
        params.append("limit", 5);
        params.append("direction", direction);
      }

      const url = `${baseUrl}${params.toString() ? `?${params.toString()}` : ""}`;

      const options = {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      };

      const req = await fetch(url, options);

      if (req.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const res = await req.json();
      if (!req.ok) throw new Error(res.message || "Erro ao buscar pedidos");

      setOrders(res.data);
      setNextCursor(res.nextCursor);
      setPrevCursor(res.prevCursor);
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

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Histórico de Compras</h1>

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

      <div className="flex justify-between mt-4">
        <button
          disabled={!prevCursor || loading}
          onClick={() => fetchOrders(prevCursor, "prev")}
          className="bg-gray-700 text-white py-1 px-3 rounded disabled:opacity-50"
        >
          ← Anterior
        </button>

        <button
          disabled={!nextCursor || loading}
          onClick={() => fetchOrders(nextCursor, "next")}
          className="bg-blue-600 text-white py-1 px-3 rounded disabled:opacity-50"
        >
          Próximo →
        </button>
      </div>
    </div>
  );
}
