import { Navigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

function RutaPrivada({ children }) {
    const { usuario } = useAuth();
    return usuario ? children : <Navigate to="/" replace/>;
}

export default RutaPrivada