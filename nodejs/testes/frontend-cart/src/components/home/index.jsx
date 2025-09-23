import { useState } from "react"
import { useEffect } from "react"

function Home() {
    const [dados, setDados] = useState(null)
    const [loading, setLoading] = useState(true)
    const [erro, setErro] = useState(null)

    useEffect(() => {
        async function api() {
            try {
                const req = await fetch('http://localhost:3001/v2/list-products')
                if(!req.ok) {
                    throw new Error(`Erro no fetch api ${req.status}`)
                }

                const data = await req.json()

                setDados(data)

                console.log(data)
            } catch (error) {
                console.error(error)
                setErro(error.message)
            } finally {
                setLoading(false)
            }
        }
        api()
    }, [])
    
     if (loading) {
      return <p>A carregar...</p>;
    }

    if (erro) {
      return <p>Erro: {erro}</p>;
    }
    return (
        <>
            <h1>home</h1>
            <div>{dados.data.map(item => (
                <h2 key={item.id}>{item.name}</h2>
            ))}</div>
        </>
    )
}

export default Home