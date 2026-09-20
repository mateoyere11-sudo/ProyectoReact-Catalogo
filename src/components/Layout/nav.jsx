import { Link } from 'react-router-dom'

function Navegacion() {
  return (
    <nav className="hidden md:flex">
      <ul className="flex items-center gap-2">
        <li>
          <Link
            to="/escenario"
            className="px-4 py-2 rounded-lg text-sm font-medium text-sky-100/80 border border-transparent hover:border-sky-400/50 hover:text-white hover:bg-sky-400/10 transition-all duration-200"
          >
            Diviértete
          </Link>
        </li>
        <li>
          <Link
            to="/catalogo"
            className="px-4 py-2 rounded-lg text-sm font-medium text-sky-100/80 border border-transparent hover:border-sky-400/50 hover:text-white hover:bg-sky-400/10 transition-all duration-200"
          >
            Catálogo
          </Link>
        </li>
        <li>
          <Link
            to="/contacto"
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