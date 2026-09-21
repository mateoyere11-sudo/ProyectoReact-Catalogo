import { useEffect, useState } from "react";
import { useJuegos } from "../../hooks/useJuegos";
import GameCard from "../../components/Catalogo/GameCard";
import { Link } from "react-router-dom";
import Busqueda from "../../components/Catalogo/BarraBusqueda";

function Productos() {
  // Estado del texto que el usuario escribe en la barra de búsqueda
  const [search, setSearch] = useState("");

  // Hook personalizado que trae hasta 200 juegos desde la API
  // Devuelve: la lista de juegos, si está cargando, y si hubo error
  const { juegos, cargando, error } = useJuegos(200);

  // Estado que indica en qué página de resultados esta parado el usuario
  const [paginaActual, setPaginaActual] = useState(1);

  // Cantidad fija de juegos que se muestran por página
  const juegosPorPagina = 12;

  // PASO 1: Filtrar ANTES de paginar.
  // Se compara el texto de búsqueda (en minúsculas) contra el nombre del juego.
  // El "?." evita un error si algún juego no trae la propiedad "name".
  const JuegosFiltrados = juegos.filter((juego) =>
    juego.name?.toLowerCase().includes(search.toLowerCase())
  );

  // PASO 2: Calcular cuántas páginas salen del total filtrado.
  // Ej: 50 juegos filtrados / 12 por página = 4.16 -> Math.ceil() = 5 páginas
  const totalPaginas = Math.ceil(JuegosFiltrados.length / juegosPorPagina);

  // PASO 3: Calcular desde qué índice del arreglo arranca la página actual.
  // Página 1 -> índice 0 | Página 2 -> índice 12 | Página 3 -> índice 24 ...
  const indiceInicial = (paginaActual - 1) * juegosPorPagina;

  // PASO 4: Recortar el arreglo filtrado para quedarnos solo
  // con los juegos que le corresponden a la página actual.
  const juegosPagina = JuegosFiltrados.slice(
    indiceInicial,
    indiceInicial + juegosPorPagina
  );

  // EFECTO 1: Si la página actual queda "fuera de rango" (por ejemplo,
  // estabas en la página 5 y al filtrar ahora solo hay 2 páginas),
  // te reubica automáticamente en la última página válida.
  useEffect(() => {
    if (paginaActual > totalPaginas && totalPaginas > 0) {
      setPaginaActual(totalPaginas);
    }
  }, [paginaActual, totalPaginas]);

  // EFECTO 2: Cada vez que cambia el texto de búsqueda,
  // se reinicia la vista a la página 1 (para no quedar "perdido"
  // en una página que ya no tiene sentido con el nuevo filtro).
  useEffect(() => {
    setPaginaActual(1);
  }, [search]);

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

          {/* Barra de búsqueda: recibe el valor actual y la función para actualizarlo */}
          <div className="mt-6">
            <Busqueda value={search} onChange={setSearch} />
          </div>

          {/* Mensaje mientras el hook todavía está trayendo los datos */}
          {cargando && (
            <p className="mt-10 text-center text-slate-400">
              Cargando juegos...
            </p>
          )}

          {/* Mensaje si el hook devolvió un error */}
          {error && (
            <p className="mt-10 text-center text-rose-500">{error}</p>
          )}

          {/* Solo renderizamos el catálogo si ya no está cargando y no hay error */}
          {!cargando && !error && (
            <>
              {/* Caso: la búsqueda no encontró ningún resultado */}
              {JuegosFiltrados.length === 0 && (
                <p className="mt-10 text-center text-slate-400">
                  No se encontraron juegos con "{search}".
                </p>
              )}

              {/* Grilla de tarjetas: se van a  pintar SOLO los juegos de la página actual */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {juegosPagina.map((juego) => (
                  <GameCard key={juego.id} juego={juego} />
                ))}
              </div>

              {/* El paginador solo se muestra si hay más de 1 página */}
              {totalPaginas > 1 && (
                <nav className="flex justify-center items-center gap-2 mt-10">
                  {/* Botón "Anterior": resta 1 a la página actual.
                      Se deshabilita si ya esta en la página 1 */}
                  <button
                    onClick={() => setPaginaActual((pagina) => pagina - 1)}
                    disabled={paginaActual === 1}
                    className="px-4 py-2 rounded-lg bg-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-700 dark:text-slate-200"
                  >
                    Anterior
                  </button>

                  {/* Botones numerados: Array.from genera un array de "totalPaginas"
                      posiciones vacías, y por cada una crea un botón numerado.
                      El botón de la página activa se pinta de otro color. */}
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

                  {/* Botón "Siguiente": suma 1 a la página actual.
                      Se deshabilita si ya estamos en la última página */}
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

      {/* Footer estático con navegación y créditos del proyecto */}
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