import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Register from './components/auth/register'
import Login from './components/auth/login'

import './App.css'
import { TestandoContext } from './components/testandoContext'
// import { TestandoDashboard } from './components/testandoContext/testandoDashboard'
import { AuthRolesRoute } from './router/authRoles'
import { AuthProvider } from './context/auth/authContext'
import Layout from './layout'
import { AdminDashboard } from './pages/dashboard/Administrations/admin'
import { CreateProducts } from './components/products/createProducts'
import { ProductsList } from './components/products/listProducts'
import { ListUsers } from './components/users/list-users'
import { DashboardSuperAdmin } from './pages/dashboard/Administrations/superAdmin'
import { AddRoles } from './components/superAdmin/add-roles'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Register />} />

            <Route path='/login' element={<Login /> } /> 
            <Route path='/teste' element={<TestandoContext /> } />

            <Route path='/products' element={
              <AuthRolesRoute>
                <ProductsList />
              </AuthRolesRoute>
            } />

            <Route path='/dashboard/admin' element={
              <AuthRolesRoute roles={['admin', 'super-admin']}>
                {/* <TestandoDashboard /> */}
                <AdminDashboard />
                
                   
              </AuthRolesRoute>
            }>
              <Route path="create" element={<CreateProducts />} />
              <Route path="list" element={<ProductsList />} />

              <Route path="list-users" element={<ListUsers />} />
            </Route> 

            <Route path='/dashboard/super-admin' element={
              <AuthRolesRoute roles={['super-admin']}>
                   <DashboardSuperAdmin /> 
              </AuthRolesRoute>
            }>
              <Route path='add-roles' element={<AddRoles />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
