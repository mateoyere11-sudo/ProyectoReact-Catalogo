import Pinguino from "../../components/Escenario/Pinguino";
import BotonDerecho from "../../components/Escenario/BotonDerecho";
import BotonIzquierdo from "../../components/Escenario/BotonIzquierdo";
import BotonReiniciar from "../../components/Escenario/BotonReiniciar";
import { useState } from "react";
import { Link } from "react-router-dom";

function Escenario() {
  const [posicion, setPosicion] = useState(0);

  function moverDerecha() {
    setPosicion((prev) => Math.min(prev + 10, 290));
  }
  function moverIzquierda() {
    setPosicion((prev) => Math.max(prev - 10, -290));
  }
  function moverInicio() {
    setPosicion(0);
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 dark:bg-slate-900">
        <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(56,189,248,0.35)] border-4 border-white/80">

          {/* Cielo */}
          <div className="relative bg-linear-to-b from-sky-400 via-sky-300 to-blue-100 pt-8 pb-10 px-6 overflow-hidden">

            {/* Sol */}
            <div className="absolute top-6 right-8 w-16 h-16 bg-yellow-300 rounded-full shadow-[0_0_40px_15px_rgba(253,224,71,0.7)] animate-pulse"></div>

            {/* Nubes */}
            <div className="absolute top-10 left-6 w-20 h-8 bg-white/80 rounded-full blur-[1px]"></div>
            <div className="absolute top-14 left-16 w-14 h-6 bg-white/70 rounded-full blur-[1px]"></div>
            <div className="absolute top-24 right-32 w-24 h-9 bg-white/60 rounded-full blur-[1px]"></div>

            {/* Nieve */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <span
                  key={i}
                  className="absolute text-white/80 text-sm animate-bounce"
                  style={{
                    left: `${(i * 7) % 100}%`,
                    top: `${(i * 13) % 100}%`,
                    animationDuration: `${2 + (i % 3)}s`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                >
                  ❄
                </span>
              ))}
            </div>

            {/* Título */}
            <h2 className="relative text-center text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-wide drop-shadow-sm">
              Carrera del pingüino 🏁
            </h2>


              {/* Pingüino + pista */}
          <div className="relative flex flex-col items-center mt-6 h-28 justify-end">
              <Pinguino posicion={posicion} />
              <div className="w-52 h-4 bg-white/90 rounded-full blur-[2px] -mt-28 shadow-inner"></div>
              </div>

            <h3 className="relative text-center text-slate-700 font-semibold mt-7 text-lg">
              Posición actual: <span className="text-sky-700 font-bold">{posicion}</span>
            </h3>
          </div>

          {/* Controles */}
          <div className="bg-linear-to-b from-sky-50 to-sky-100 flex items-center justify-center gap-6 py-8">
            <BotonIzquierdo
              mover={moverIzquierda}
              className="w-16 h-14 rounded-xl bg-linear-to-b from-sky-400 to-sky-600 text-white text-xl shadow-[0_6px_0_0_rgba(2,132,199,0.6)] hover:shadow-[0_3px_0_0_rgba(2,132,199,0.6)] hover:translate-y-0.75 active:-translate-y-1.5 active:shadow-none transition-all duration-150"
            />
            <BotonReiniciar
              mover={moverInicio}
              className="w-16 h-14 rounded-xl bg-linear-to-b from-cyan-400 to-cyan-600 text-white text-xl shadow-[0_6px_0_0_rgba(8,145,178,0.6)] hover:shadow-[0_3px_0_0_rgba(8,145,178,0.6)] hover:translate-y-0.75 active:-translate-y-1.5 active:shadow-none transition-all duration-150"
            />
            <BotonDerecho
              mover={moverDerecha}
              className="w-16 h-14 rounded-xl bg-linear-to-b from-sky-400 to-sky-600 text-white text-xl shadow-[0_6px_0_0_rgba(2,132,199,0.6)] hover:shadow-[0_3px_0_0_rgba(2,132,199,0.6)] hover:translate-y-0.75 active:-translate-y-1.5 active:shadow-none transition-all duration-150"
            />
          </div>
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
  );
}

export default Escenario;