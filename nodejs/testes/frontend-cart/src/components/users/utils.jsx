export function ButtoDeleteUsers(props) {
    return (
        <>
            <button 
                onClick={ props.btndelete }
                className="w-5 h-5 rounded-sm bg-red-800 text-white absolute top-1 right-1 flex items-center justify-center"
            >
                x
            </button>
        </>
    )
}

export function ButtoEditUsers(props) {

    return (
        <>
            <button
                onClick={props.edit}
                className="w-[100px] bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-700 transition duration-300"
            >
                Editar
            </button>
        </>
    )
}