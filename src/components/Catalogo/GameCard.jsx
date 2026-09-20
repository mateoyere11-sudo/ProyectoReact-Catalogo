import { ShoppingCart, Star, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../Contexts/CartContext";

function colorRating(rating) {
  if (rating >= 4) return "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30";
  if (rating >= 2.5) return "bg-amber-500/15 text-amber-400 ring-amber-500/30";
  return "bg-slate-500/15 text-slate-400 ring-slate-500/30";
}

function formatearPrecio(valor) {
  return valor.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
}

export default function GameCard({ juego }) {
  const { agregarAlCarrito } = useCart();
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

  const colorEstado = colorRating(juego.rating);
  const plataformas =
    juego.platforms?.slice(0, 2).map((p) => p.platform.name).join(", ") || "N/D";
  const generos = juego.genres?.map((g) => g.name).join(", ") || "N/D";

  const agregarJuego = (evento) => {
    evento.stopPropagation();
    agregarAlCarrito(juego);
  };

  return (
    <>
      <article
        onClick={() => setMostrarDetalles(true)}
        className="group bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer dark:bg-slate-800"
      >
        <div className="relative">
          <img
            src={juego.background_image}
            alt={juego.name}
            className="w-full h-56 object-cover"
          />

          <span
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium ring-1 flex items-center gap-1 ${colorEstado}`}
          >
            <Star size={12} fill="currentColor" />
            {juego.rating}
          </span>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-slate-800 text-lg leading-tight dark:text-slate-300">
              {juego.name}
            </h3>
            <span className="text-xs text-slate-400 shrink-0">#{juego.id}</span>
          </div>

          <ul className="mt-3 space-y-1 dark:text-slate-300 text-sm text-slate-500">
            <li><span className="text-slate-400">Género:</span> {generos}</li>
            <li><span className="text-slate-400">Plataformas:</span> {plataformas}</li>
            <li><span className="text-slate-400">Lanzamiento:</span> {juego.released}</li>
          </ul>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-cyan-600 font-bold text-lg dark:text-cyan-400">
              {formatearPrecio(juego.precio)}
            </span>

            <button
              type="button"
              onClick={agregarJuego}
              className="p-2 rounded-full bg-slate-900 text-cyan-400 hover:bg-cyan-500 hover:text-slate-900 transition-colors"
              title="Agregar al carrito"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </article>

      {mostrarDetalles && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setMostrarDetalles(false)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-800"
            onClick={(evento) => evento.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setMostrarDetalles(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
              title="Cerrar detalles"
            >
              <X size={20} />
            </button>

            <img
              src={juego.background_image}
              alt={juego.name}
              className="h-72 w-full object-cover"
            />

            <div className="p-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {juego.name}
              </h2>

              <p className="mt-4 text-slate-600 dark:text-slate-300">
                Géneros: {generos}
              </p>

              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Plataformas: {plataformas}
              </p>

              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Fecha de lanzamiento: {juego.released || "N/D"}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                  {formatearPrecio(juego.precio)}
                </span>

                <button
                  type="button"
                  onClick={agregarJuego}
                  className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-900 hover:bg-cyan-400"
                >
                  <ShoppingCart size={18} />
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );  
}