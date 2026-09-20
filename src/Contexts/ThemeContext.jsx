import { createContext, useContext, useState, useEffect } from "react";
// Crea la caja de context que contendra los valores de los props
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Controla el tema Claro/Oscuro
  const [tema, setTema] = useState("claro");

  // Funcion que cambia el tema una vez que sea llamado
  const cambiarTema = () => {
    setTema((actual) => (actual === "claro" ? "oscuro" : "claro"));
  };

  // Cada vez que "tema" cambia, agregamos o quitamos la clase "dark" en <html>
  useEffect(() => {
    const root = document.documentElement;
    if (tema === "oscuro") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [tema]);


  return (
    <ThemeContext.Provider value={{ tema, cambiarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}


export function useTheme() {
  return useContext(ThemeContext);
}
