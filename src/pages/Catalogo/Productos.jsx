import { useEffect, useState } from "react";
import { useJuegos } from "../../hooks/useJuegos";
import GameCard from "../../components/Catalogo/GameCard";
import { Link } from "react-router-dom";
import Busqueda from "../../components/Catalogo/BarraBusqueda";

function Productos() {
// Barra de busqueda 
const [search, setSearch] = useState("");

// Trae la lista de juegos desde el hook y guarda el estado de la página actual
const { juegos, cargando, error } = useJuegos(200);
const [paginaActual, setPaginaActual] = useState(1);

// Cantidad de juegos que se muestran por página
const juegosPorPagina = 12;

// Este Filtra ANTES de paginar (ajusta "nombre" al campo real de la API de juegos)
const JuegosFiltrados = juegos.filter((juego) => 
  juego.name?.toLowerCase().includes(search.toLowerCase())
);

const totalPaginas = Math.ceil(JuegosFiltrados.length / juegosPorPagina); // Calcula cuántas páginas habrá según la cantidad total de juegos
const indiceInicial = (paginaActual - 1) * juegosPorPagina; // Determina desde qué índice empieza la página actual
const juegosPagina = JuegosFiltrados.slice(  // Obtiene solo los juegos que corresponden a la página actual
  indiceInicial,
  indiceInicial + juegosPorPagina
);

// Si la página actual supera el total disponible, la ajusta a la última válida
useEffect(() => {
  if (paginaActual > totalPaginas && totalPaginas > 0) {
    setPaginaActual(totalPaginas);
  }
}, [paginaActual, totalPaginas]);


useEffect (() => {
  setPaginaActual(1);
}, [search])

  return (
    <>
      <section className="bg-slate-50 min-h-screen px-6 py-10 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
            Catálogo
          </h2>

          <p className="text-slate-500 mt-2 dark:text-slate-300">
            Videojuegos disponibles en la tienda
          </p>

          <div className="mt-6">
            <Busqueda value={search} onChange={setSearch}/>
          </div>

          {cargando && (
            <p className="mt-10 text-center text-slate-400">
              Cargando juegos...
            </p>
          )}

          {error && (
            <p className="mt-10 text-center text-rose-500">
              {error}
            </p>
          )}

          {!cargando && !error && (
            <>

              {JuegosFiltrados.length === 0 && (
                <p className="mt-10 text-center text-slate-400">
                  No se encontraron juegos con "{search}".
                </p>
              )}

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {juegosPagina.map((juego) => (
                  <GameCard key={juego.id} juego={juego} />
                ))}
              </div>

              {totalPaginas > 1 && (
                <nav className="flex justify-center items-center gap-2 mt-10">
                  <button
                    onClick={() => setPaginaActual((pagina) => pagina - 1)}
                    disabled={paginaActual === 1}
                    className="px-4 py-2 rounded-lg bg-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-700 dark:text-slate-200"
                  >
                    Anterior
                  </button>

                  {Array.from({ length: totalPaginas }, (_, indice) => (
                    <button
                      key={indice + 1}
                      onClick={() => setPaginaActual(indice + 1)}
                      className={`px-4 py-2 rounded-lg ${
                        paginaActual === indice + 1
                          ? "bg-sky-500 text-white"
                          : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                      }`}
                    >
                      {indice + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setPaginaActual((pagina) => pagina + 1)}
                    disabled={paginaActual === totalPaginas}
                    className="px-4 py-2 rounded-lg bg-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-700 dark:text-slate-200"
                  >
                    Siguiente
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>
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
  );
}


export default Productos;
