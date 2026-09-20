import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(() => {
        const guardado = localStorage.getItem("usuario")
        return guardado ? JSON.parse(guardado) : null
    });

    const login = (datosUsuario) => {
        setUsuario(datosUsuario);
        localStorage.setItem("usuario", JSON.stringify(datosUsuario));
    };

    const logout = () => {
        setUsuario(null);
        localStorage.removeItem("usuario");
    }

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}