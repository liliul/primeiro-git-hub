import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './router'
import { AuthProvider } from './context/auth/authContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
