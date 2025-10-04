import { useEffect } from "react"

export function MessageCustom({msg, status, total, setMessageCustom}) {
     useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => {
        setMessageCustom(null);
      }, 3000);

      return () => clearTimeout(timer)
    }
  }, [msg, setMessageCustom])

    if (!msg) return 
    return (
        <>
            <section className="p-5 fixed top-2 right-2 bg-gray-800">
                <h1 className="text-white">{msg}</h1>
                <small className="text-white">Status: {status}</small>
                <br />
                <b className="text-white">{total}</b>
            </section>
        </>
    )
}