export function MessageCustom({msg, status, total}) {
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