import { Search } from "lucide-react";

function Busqueda({ value, onChange, placeholder = "Buscar..." }) {
    return(
        <div className="relative w-full max-w-md mb-6">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   text-gray-800 placeholder-gray-400 dark:text-slate-50"
            />
            <Search
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                strokeWidth={2}
            />

        </div>
    )
}

export default Busqueda;