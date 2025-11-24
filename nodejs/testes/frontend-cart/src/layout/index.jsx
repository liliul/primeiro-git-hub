import { Outlet } from "react-router-dom"
import { Header } from "../components/header"

export default function Layout() {
  return (
    <>
      <Header />
      <main className="w-full h-[100vh] grid place-items-center">
        <Outlet /> 
      </main>
    </>
  );
}