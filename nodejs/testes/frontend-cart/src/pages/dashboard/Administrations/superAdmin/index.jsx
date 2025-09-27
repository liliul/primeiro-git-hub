import { Link, Outlet } from "react-router-dom"

export function DashboardSuperAdmin() {
    return (
        <>
            <h1>Super Admin Dashboard</h1>
            <section className="w-full flex gap-3">
                <nav className="w-[300px] bg-gray-800 text-white p-5 rounded-2xl">
                    <div>
                        <h2>Roles</h2>
                        <ul className="mt-2">
                            <li>
                                <Link to="add-roles">Adicionar Role para usuario</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="w-full">
                    <Outlet />
                </div>
            </section>
        </>
    )
}