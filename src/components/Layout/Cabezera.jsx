import imagen from '../../assets/Perfil.jpg'
import Navegacion from './nav'
import { useTheme } from '../../Contexts/ThemeContext'
import { Sun, Moon, ShoppingCart } from "lucide-react"
import { useCart } from '../../Contexts/CartContext'
import { useAuth } from '../../Contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function Cabezera() {
  const { usuario, logout } = useAuth()
  const {tema, cambiarTema} = useTheme();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const confirmarLogout = () => {
    toast((t) =>(
      
      <div className="flex flex-col gap-3">
        <p className='text-sm font-medium'>¿Estas Seguro De Cerrar Sesión?</p>
         <div className="flex gap-2 justify-end">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 rounded-md text-sm bg-slate-200 text-slate-700"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              logout();
              toast.dismiss(t.id);
              toast.success("Sesión cerrada");
              navigate("/");
             }}
            className="px-3 py-1 rounded-md text-sm bg-rose-500 text-white"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    ))
  }
  return (
    <header className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-sky-900/40 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <div className='flex items-center gap-4'>

                      {usuario && (
              <Link to="/Perfil">
                <div className="relative">
                  <img
                    src={imagen}
                    alt="Logo de la página"
                    className="w-14 h-14 rounded-full object-cover border-2 border-sky-400/60 shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-900 rounded-full"></span>
                </div>
              </Link>
            )}

          <Link to="/">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Proyecto <span className="text-sky-400">React-705</span>
            </h1>
          </Link>
        </div>

        <Navegacion />

        {usuario ? (
          <button
            onClick={confirmarLogout}
             className="px-6 py-2.5 rounded-lg bg-linear-to-r from-rose-500 to-red-600 text-white font-semibold text-sm shadow-[0_4px_14px_rgba(239,68,68,0.4)] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-[0_6px_20px_rgba(239,68,68,0.6)]"
          >
            Cerrar Sesion
          </button>
        ):(
        <Link to="/Login">
          <button className="px-6 py-2.5 rounded-lg bg-linear-to-r from-sky-500 to-blue-600 text-white font-semibold text-sm shadow-[0_4px_14px_rgba(59,130,246,0.4)] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:shadow-[0_6px_20px_rgba(59,130,246,0.6)]">
            Login
          </button>
        </Link>
        )}


      <div className="login-container flex">
        <Link to="/carrito">
            <button type="button" className="relative p-2 text-slate-50" title="Ver carrito">
                <ShoppingCart size={20} />
                  {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-cyan-500 text-slate-900 text-xs font-bold
                                        rounded-full w-5 h-5 flex items-center justify-center">
                              {totalItems}
                        </span>
                )}
            </button>
        </Link>

            <button
              type="button"
              onClick={cambiarTema}
              title={tema === "claro" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
              className="p-2 rounded-full text-amber-50 hover:bg-slate-600 transition-colors"
            >
              {tema === "claro" ? <Moon size={20} /> : <Sun size={20} />}
            </button>



      </div>
      </div>

    </header>
  )
}

export default Cabezera