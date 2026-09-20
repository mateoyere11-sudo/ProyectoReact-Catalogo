import perf from "../../assets/Perfil.jpg"
import { Link } from "react-router-dom"

function Perfil() {
  return (
    <>
    
        <div className="min-h-screen flex flex-col items-center justify-center dark:bg-slate-900">
        <div className="flex flex-col items-center text-center dark:bg-slate-50 bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-sm mx-auto shadow-lg min-h-150 justify-between">

            <div className="flex flex-col items-center">
            <div className="relative mb-5">
                <img
                src={perf}
                alt="Foto de perfil"
                className="w-28 h-28 rounded-full object-cover border-2 border-sky-400/60 shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                />
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 border-2 border-slate-900 rounded-full"></span>
            </div>

            <h2 className="text-xl font-bold text-white dark:text-slate-700">
                Mateo <span className="text-sky-400">Desarrollador</span>
            </h2>

            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                Estudiante de desarrollo web, aprendiendo a construir aplicaciones
                modernas con React, Vite y Tailwind CSS.
            </p>

            <p className="text-slate-500 text-sm mt-4 leading-relaxed">
                Me interesa el desarrollo frontend y sigo aprendiendo cada día
                sobre nuevas herramientas y buenas prácticas para crear
                interfaces claras y funcionales.
            </p>

            <div className="flex gap-2 mt-5">
                <span className="px-3 py-1 text-xs rounded-full bg-slate-800 text-sky-300 border border-slate-700">
                React
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-slate-800 text-sky-300 border border-slate-700">
                Tailwind
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-slate-800 text-sky-300 border border-slate-700">
                Vite
                </span>
            </div>
            </div>

            <Link className="
                    text-white
                    font-semibold
                    px-8
                    py-3
                    rounded-lg
                    cursor-pointer
                    bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500
                "
                to="/contacto"
                >
            Contáctame
            </Link>

        </div>
        
        </div>
              <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            <div>
              <Link to="/" className="inline-block">
                <h3 className="text-white font-bold text-lg mb-3 hover:text-sky-400 transition-colors">
                  Proyecto <span className="text-sky-400">React-705</span>
                </h3>
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed">
                Espacio de aprendizaje para construir aplicaciones web modernas
                con React y su ecosistema.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                Navegación
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/escenario" className="hover:text-sky-400 transition-colors">
                    Diviértete
                  </Link>
                </li>
                <li>
                  <Link to="/catalogo" className="hover:text-sky-400 transition-colors">
                    Catálogo
                  </Link>
                </li>
                <li>
                  <Link to="/contacto" className="hover:text-sky-400 transition-colors">
                    Contáctame
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                Tecnologías
              </h4>
              <ul className="space-y-2 text-sm">
                <li>React</li>
                <li>Vite</li>
                <li>Tailwind CSS</li>
                <li>React Router</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
            <p>© {new Date().getFullYear()} React705 · Aprendiendo desarrollo web moderno</p>
            <p className="text-slate-500">Hecho con React + Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </>
    
  )
}

export default Perfil