export function PersistRoute(route, arrowFunction, idHtml) {
    if (window.location.pathname === route) {
        arrowFunction()
    }

    idHtml?.addEventListener("click", (event) => {
        event.preventDefault()
        
        if (window.location.pathname !== route) {
            history.pushState({}, "", route)
        }
        
        arrowFunction()
    })

    window.addEventListener("popstate", () => {
        if (window.location.pathname === route) {
            arrowFunction()
        } else {
            window.location.reload()
        }
    })
}