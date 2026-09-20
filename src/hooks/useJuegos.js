import { useState, useEffect } from "react";

const RANGO_PRECIO = { min: 50000, max: 340000 };

function precioAleatorio() {
  return Math.floor(Math.random() * (RANGO_PRECIO.max - RANGO_PRECIO.min + 1)) + RANGO_PRECIO.min;
}

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export function useJuegos(limit = 12) {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let activo = true;

    async function cargarJuegos() {
      try {
        setCargando(true);
        const resJ = await fetch(
          `https://api.rawg.io/api/games?key=${API_KEY}&page=1&page_size=${limit}`
        );
        if (!resJ.ok) throw new Error("No se pudo cargar el catálogo");

        const dataJ = await resJ.json();
        const lista = dataJ.results.map((juego) => ({
          ...juego,
          precio: precioAleatorio(),
        }));

        if (activo) setJuegos(lista);
      } catch (err) {
        if (activo) setError(err.message);
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargarJuegos();
    return () => { activo = false; };
  }, [limit]);

  return { juegos, cargando, error };
}