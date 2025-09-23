import { Routes, Route } from 'react-router-dom'
import Register from './components/auth'
import Login from './components/auth/login'

import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path='/login' element={<Login /> } /> 
    </Routes>
  )
}

export default App
