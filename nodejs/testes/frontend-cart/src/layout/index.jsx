import { Outlet } from "react-router-dom"
import { Header } from "../components/header"

export default function Layout() {
  return (
    <>
      <Header />
      <main className="grid place-items-center">
        <Outlet /> 
      </main>
    </>
  );
}