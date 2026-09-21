  import ReactLogo from "../../assets/React_logo.png"
  import reactRouter from "../../assets/react-router.svg"
  import Tailwind from "../../assets/TailwindCss-Logo.png"
  import Vite from "../../assets/vite.svg"
  import { Link } from 'react-router-dom'

  export const Inicio = () => {
    const tecnologias = [
      {
        nombre: "React",
        descripcion: "Biblioteca para construir interfaces de usuario.",
        imagen: ReactLogo
      },
      {
        nombre: "Vite",
        descripcion: "Herramienta moderna para desarrollar aplicaciones frontend.",
        imagen: Vite
      },
      {
        nombre: "Tailwind CSS",
        descripcion: "Framework cssbassado en clases de utilidad",
        imagen: Tailwind
      },
      {
        nombre: "React Router",
        descripcion: "Librería para gestionar la navegación de la aplicación",
        imagen: reactRouter
      }
    ]
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-800">
          <section className="bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                ¡Bienvenidos a React705!
              </h1>
              <p className="max-w-3xl text-lg md:text-xl text-slate-300 mb-8">
                Un espacio creado para aprender a desarrollar aplicaciones
                web modernas utilizando React y Vite.
              </p>
              <p className="max-w-3xl text-slate-400 mb-8">
                Durante este proyecto exploraremos componentes, navegación,
                consumo de APIs, estilos y diferentes herramientas del
                ecosistema de React. Conoce lo realizado como, contacto, Diviertete y el catalogo
              </p>
              <Link 
                to="/catalogo"
                className="
                  text-white
                  font-semibold
                  px-8
                  py-3
                  rounded-lg
                  cursor-pointer
                  bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500
                "
              >
                Conocer
              </Link>
            </div>
          </div>
        </section>

        {/* TECNOLOGÍAS */}
        <section id="tecnologias" className="max-w-6xl mx-auto px-6 py-16 dark:bg-slate-800  ">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-slate-50 mb-4">
            Tecnologías utilizadas
          </h2>
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12 dark:text-slate-50">
            Este proyecto integra diferentes tecnologías y librerías
            utilizadas actualmente en el desarrollo frontend.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {tecnologias.map((tecnologia) => (
                  <div
                      key={tecnologia.nombre}
                      className="
                        bg-white
                        rounded-2xl
                        shadow-lg
                        p-6
                        text-center
                        hover:-translate-y-2
                        transition
                        duration-300
                        
                      "
                  >  
                        <div className="h-24 flex items-center justify-center mb-5">
                            <img
                              src={tecnologia.imagen}
                              alt={tecnologia.nombre}
                            
                              className="max-h-16 max-w-full w-auto object-contain"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">
                          {tecnologia.nombre}
                        </h3>
                        <p className="text-slate-600 text-sm">
                          {tecnologia.descripcion}
                        </p>
                  </div>
                ))}
          </div>
        </section>
        {/* APRENDIZAJE */}
        <section className="bg-slate-100 dark:bg-slate-800">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-12 dark:text-slate-50">
              ¿Qué aprenderemos?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow dark:bg-slate-700">
                <h3 className="font-bold text-xl mb-2 dark:text-slate-50">
                  Componentes
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Aprenderemos a dividir nuestra aplicación en componentes
                  reutilizables.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow dark:bg-slate-700">
                <h3 className="font-bold text-xl mb-2 dark:text-slate-50">
                  Navegación
                </h3>
                <p className="text-slate-600  dark:text-slate-300">
                  Utilizaremos React Router para crear diferentes páginas
                  dentro de nuestra aplicación.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow dark:bg-slate-700">
                <h3 className="font-bold text-xl mb-2 dark:text-slate-50">
                  APIs
                </h3>
                <p className="text-slate-600  dark:text-slate-300">
                  Aprenderemos a consumir información desde servicios
                  externos mediante APIs.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow dark:bg-slate-700">
                <h3 className="font-bold text-xl mb-2 dark:text-slate-50">
                  Tailwind CSS
                </h3>
                <p className="text-slate-600  dark:text-slate-300">
                  Construiremos interfaces modernas utilizando clases
                  de utilidad.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* FOOTER */}
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
      </main>

    )
  }
