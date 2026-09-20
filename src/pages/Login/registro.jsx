import toast from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
function Registro({ onClose }) {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth ();
  const navigate = useNavigate();


    const handleSubmit = (e) => {
    e.preventDefault()

    if (!email.trim() || !password.trim()) {
      toast.error('Por favor completa todos los campos')
      return 
    }

    login({ email });
    toast.success("¡Inicio Exitoso!")

    setTimeout(() => {
      navigate('/Perfil')
    }, 800);
  }

  return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br bg-slate-100 dark:bg-slate-900">
        <div className="relative bg-white border dark:border-sky-950 border-sky-100 rounded-2xl p-8 sm:p-10 w-full max-w-105 shadow-[0_20px_50px_-12px_rgba(2,132,199,0.25)] dark:bg-slate-900">
          
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              ✕
            </button>
          )}

          <h3 className="text-3xl font-bold text-slate-800 mb-2 text-center dark:text-slate-50">
            Inicia Sesión
          </h3>
          <p className="text-slate-500 text-sm mb-8 text-center dark:text-slate-400">
            Inicia Sesion en tu cuenta para continuar
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="text-left">
              <label className="block text-sm font-medium text-slate-600 mb-1.5 dark:text-slate-400">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="tucorreo@ejemplo.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder-slate-400 outline-none transition-all duration-300 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
              />
            </div>

            <div className="text-left">
              <label className="block text-sm font-medium text-slate-600 mb-1.5 dark:text-slate-400">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm placeholder-slate-400 outline-none transition-all duration-300 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
              />
            </div>
            <div>
              <button
                type="submit"
                className="mt-4 w-full mx-auto px-6 py-4 rounded-xl text-white font-bold text-lg tracking-wide bg-linear-to-r from-sky-500 to-cyan-500 shadow-[0_10px_25px_-5px_rgba(14,165,233,0.5)] transition-all duration-300 hover:shadow-[0_15px_35px_-5px_rgba(14,165,233,0.65)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Iniciar Sesion
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default Registro