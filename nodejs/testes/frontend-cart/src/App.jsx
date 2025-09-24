import { Routes, Route } from 'react-router-dom'
import Register from './components/auth/register'
import Login from './components/auth/login'

import './App.css'
import { TestandoContext } from './components/testandoContext'
import { TestandoDashboard } from './components/testandoContext/testandoDashboard'
import { AuthRolesRoute } from './router/authRoles'
import { ProductsList } from './components/products'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path='/login' element={<Login /> } /> 
      <Route path='/teste' element={<TestandoContext /> } />

      <Route path='/products' element={
        <AuthRolesRoute>
          <ProductsList />
        </AuthRolesRoute>
       } />

      <Route path='/dashboard' element={
        <AuthRolesRoute roles={['admin', 'super-admin']}>
          <TestandoDashboard />
        </AuthRolesRoute>
       } /> 
    </Routes>
  )
}

export default App
