import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

function Navegacion() {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <nav className="relative md:flex">
      <button
        type="button"
        onClick={() => setMenuAbierto((abierto) => !abierto)}
        aria-expanded={menuAbierto}
        aria-controls="menu-principal"
        aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
        className="rounded-lg p-2 text-slate-50 hover:bg-slate-700 transition-colors md:hidden"
      >
        {menuAbierto ? <X size={24} /> : <Menu size={24} />}
      </button>

      <ul
        id="menu-principal"
        className={`${menuAbierto ? 'flex' : 'hidden'} absolute right-0 top-full z-20 mt-3 min-w-48 flex-col gap-2 rounded-lg border border-sky-900/60 bg-slate-800 p-3 shadow-xl md:static md:mt-0 md:flex md:min-w-0 md:flex-row md:items-center md:gap-2 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
      >
        <li>
          <Link
            to="/escenario"
            onClick={cerrarMenu}
            className="px-4 py-2 rounded-lg text-sm font-medium text-sky-100/80 border border-transparent hover:border-sky-400/50 hover:text-white hover:bg-sky-400/10 transition-all duration-200"
          >
            Diviértete
          </Link>
        </li>
        <li>
          <Link
            to="/catalogo"
            onClick={cerrarMenu}
            className="px-4 py-2 rounded-lg text-sm font-medium text-sky-100/80 border border-transparent hover:border-sky-400/50 hover:text-white hover:bg-sky-400/10 transition-all duration-200"
          >
            Catálogo
          </Link>
        </li>
        <li>
          <Link
            to="/contacto"
            onClick={cerrarMenu}
            className="px-4 py-2 rounded-lg text-sm font-medium text-sky-100/80 border border-transparent hover:border-sky-400/50 hover:text-white hover:bg-sky-400/10 transition-all duration-200"
          >
            Contáctame
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navegacion