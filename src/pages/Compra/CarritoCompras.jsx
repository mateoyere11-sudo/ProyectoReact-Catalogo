import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../../Contexts/CartContext";

const IVA_TASA = 0.19;

function formatearPrecio(valor) {
  return valor.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }); 
}

function CarritoCompras(){
  const { carrito, quitarDelCarrito, cambiarCantidad, vaciarCarrito } = useCart()
  const [enviado, setEnviado] = useState(false);

  const subTotalGeneral = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const iva = subTotalGeneral * IVA_TASA;
  const totalPagar = subTotalGeneral + iva;

  const confirmarEnvio   = () => {
    if (carrito.lenght === 0) {
      toast.error("Tu Carrito Esta Vacio");
      return;
    }

    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium">
          ¿Confirmas el envio del pedido por {formatearPrecio(totalPagar)}?
        </p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 rounded-md text-sm bg-slate-200 text-slate-700"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              enviarPedido()
            }}
             className="px-3 py-1 rounded-md text-sm bg-cyan-500 text-slate-900 font-semibold"
          >
            Confirmar
          </button>
        </div>
      </div>
    ), {duration: 8000});  
  };

  const enviarPedido = async () => {
    setEnviado(true)
    try {
      await new Promise ((resolve) => setTimeout(resolve, 1000));

      vaciarCarrito();
      toast.success("¡Pedido Enviado Con exito!");
    } catch(err){
      toast.error("A ocurrido Un error, Intenta de nuevo")
    } finally {
      setEnviado(false)
    }
  };

    if (carrito.length === 0) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center px-6 bg-slate-50 dark:bg-slate-900">
        <ShoppingBag size={56} className="text-slate-300 dark:text-slate-600 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Tu carrito está vacío
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Agrega Juegos desde el catálogo para verlos aquí.
        </p>
        <Link
          to="/catalogo"
          className="mt-6 px-6 py-2.5 rounded-lg bg-cyan-500 text-slate-900 font-semibold hover:bg-cyan-400 transition-colors"
        >
          Ir al catálogo
        </Link>
      </section>
    );
  }

    return (
    <section className="min-h-screen px-6 py-10 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
          Tu Carrito
        </h2>
        <p className="text-slate-500 mt-2 dark:text-slate-300">
          {carrito.length} {carrito.length === 1 ? "producto" : "productos"} en tu carrito
        </p>

        {/* Lista de los ítems */}
        <div className="mt-8 flex flex-col gap-4">
          {carrito.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg shrink-0"
              />

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 truncate">
                  {item.name}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Precio unitario: {formatearPrecio(item.precio)}
                </p>
              </div>

              {/* Control de la cantidad */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                  className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  title="Disminuir cantidad"
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center font-medium text-slate-800 dark:text-slate-100">
                  {item.cantidad}
                </span>
                <button
                  onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                  className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  title="Aumentar cantidad"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Subtotal por ítem */}
              <div className="text-right min-w-22.5">
                <p className="font-bold text-cyan-600 dark:text-cyan-400">
                  {formatearPrecio(item.precio * item.cantidad)}
                </p>
              </div>

              <button
                onClick={() => {
                  quitarDelCarrito(item.id);
                  toast.success(`${item.name} eliminado del carrito`);
                }}
                className="p-2 rounded-full text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                title="Eliminar producto"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Resumen de totales */}
        <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
          <div className="flex justify-between text-slate-600 dark:text-slate-300 text-sm">
            <span>Subtotal</span>
            <span>{formatearPrecio(subTotalGeneral)}</span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-300 text-sm mt-2">
            <span>IVA ({(IVA_TASA * 100).toFixed(0)}%)</span>
            <span>{formatearPrecio(iva)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-slate-900 dark:text-slate-50 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <span>Total a Pagar</span>
            <span className="text-cyan-600 dark:text-cyan-400">
              {formatearPrecio(totalPagar)}
            </span>
          </div>

          <button
            onClick={confirmarEnvio}
            disabled={enviado}
            className="mt-6 w-full py-3 rounded-lg bg-cyan-500 text-slate-900 font-bold hover:bg-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {enviado ? "Enviando..." : "Enviar Pedido"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default CarritoCompras