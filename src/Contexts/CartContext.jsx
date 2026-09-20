import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();
const CLAVE_CARRITO = "carrito";

function leerCarritoDesdeStorage() {
  try {
    const data = localStorage.getItem(CLAVE_CARRITO);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(leerCarritoDesdeStorage);

  useEffect(() => {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  }, [carrito]);


  const agregarAlCarrito = useCallback((juego) => {
    setCarrito((prev) => {
      const yaExiste = prev.find((item) => item.id === juego.id);


      if (yaExiste) {
        return prev.map((item) =>
          item.id === juego.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }


      return [
        ...prev,
        {
          id: juego.id,
          name: juego.name,
          image: juego.background_image,
          precio: juego.precio,
          cantidad: 1,
        },
      ];
    });
  }, []);

  const quitarDelCarrito = useCallback((id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const cambiarCantidad = useCallback ((id, nuevaCantidad) => {
    setCarrito((prev) => {
      if(nuevaCantidad < 1) {
        return prev.filter((item) => item.id !== id); 
      }
      return prev.map((item) => 
        item.id === id ? {...item, cantidad: nuevaCantidad} : item
      );
    });
  }, []);

  const vaciarCarrito = useCallback(() => {
    setCarrito([]);
  }, []);


  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        return (
            <CartContext.Provider value={{ carrito, agregarAlCarrito, quitarDelCarrito, cambiarCantidad, vaciarCarrito, totalItems }}>
                {children}
            </CartContext.Provider>
        );
}

export function useCart() {
  return useContext(CartContext);
}

