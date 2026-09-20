import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './Contexts/ThemeContext'
import Registro from './pages/Login/registro'
import Layout from './components/Layout/layout'
import Escenario from './pages/Escenario/Escenario'
import Productos from './pages/Catalogo/Productos'
import CarritoCompras from './pages/Compra/CarritoCompras'
import { Contacto } from './pages/Contacto/Contacto'
import { Inicio } from './pages/Inicio/Inicio'
import Perfil from './pages/Perfil/Perfil'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from './Contexts/CartContext'
import { AuthProvider } from './Contexts/AuthContext'
import RutaPrivada from './components/Auth/RutaPrivada'


function App() {
  return (
    <>
    <Toaster position="top-center" />
    <ThemeProvider>
      <CartProvider>
        <AuthProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path='/' element={<Inicio/>}/>
                <Route path='/Login' element={<Registro/>}/>
                <Route path='/escenario' element={<Escenario/>}/>
                <Route path='/catalogo' element={<Productos/>}/>
                <Route path='/contacto' element={<Contacto/>} />
                <Route path='/carrito' element={<CarritoCompras/>}/>
                <Route path='/Perfil' element={<RutaPrivada><Perfil/></RutaPrivada> }/>
              </Routes>
            </Layout>
          </BrowserRouter>
        </AuthProvider>
      </CartProvider>
    </ThemeProvider>
    </>
  )
}

export default App;
