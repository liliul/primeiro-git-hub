#!/bin/bash

# Nome do projeto
PROJECT_NAME="primeiro-teste"

echo "🚀 Criando estrutura do projeto React: $PROJECT_NAME"

# Criar projeto base com Vite
npm create vite@latest $PROJECT_NAME -- --template react

cd $PROJECT_NAME

# Criar estrutura de pastas
mkdir -p src/{api,assets/{images,styles},components/{common,layout},context,hooks,pages/{Home,Login,Products},router,utils}

# Criar arquivos base
touch src/api/index.js
touch src/context/AuthContext.jsx
touch src/hooks/useAuth.js
touch src/utils/formatCurrency.js
touch src/router/AppRoutes.jsx

# Criar componentes base
cat <<EOL > src/components/layout/Header.jsx
export function Header() {
  return (
    <header style={{padding: '1rem', background: '#eee'}}>
      <h1>My React App</h1>
    </header>
  );
}
EOL

# Criar páginas base
echo "export default function Home() { return <h2>Home Page</h2> }" > src/pages/Home/Home.jsx
echo "export default function Login() { return <h2>Login Page</h2> }" > src/pages/Login/Login.jsx
echo "export default function Products() { return <h2>Products Page</h2> }" > src/pages/Products/Products.jsx

# Criar rotas base
cat <<EOL > src/router/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Products from "../pages/Products/Products";
import { Header } from "../components/layout/Header";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}
EOL

# Atualizar App.jsx
cat <<EOL > src/App.jsx
import { AppRoutes } from "./router/AppRoutes";

export default function App() {
  return <AppRoutes />;
}
EOL

# Instalar dependências úteis
npm install react-router-dom axios

echo "✅ Estrutura criada com sucesso!"
echo "👉 Rode o projeto com: cd $PROJECT_NAME && npm run dev"
