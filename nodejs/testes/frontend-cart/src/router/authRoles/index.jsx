// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom"
import { useAuth } from "../../context/auth/useAuth"

export function AuthRolesRoute({ children, roles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>; 
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
