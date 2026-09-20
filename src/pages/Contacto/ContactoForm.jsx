import Forminput from "./components/FormInput";
import Formselect from "./components/Formselect";
import FormtextArea from "./components/FormtextArea";
import Formfile from "./components/Formfile";
import paises from "./components/Paises";
import Ciudades from "./components/Ciudades";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';

function ContactoForm() {

    const {
        register, control, handleSubmit, reset,
        formState: { errors },
        } = useForm({
            mode:"onBlur",
            defaultValues: {
                primerNombre: "", segundoNombre: "",
                primerApellido: "", segundoApellido: "",
                genero: "", pais: "", ciudad: "",
                correo: "", telefono: "", mensaje: "",
                archivo: [],
        },
    });

    const [fileInputKey, setFileInputKey] = useState(0);

    const onSubmit = async (data) => {
            console.log("Datos del formulario:", data)
            setFileInputKey(prev => prev + 1)
            reset();

            const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            if (key === "archivo") {
                value.forEach((file) => formData.append("archivo", file));
            } else {
                formData.append(key, value);
            }
        });
        try {
            const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            });
            if (response.ok) {
                console.log("Datos del formulario:", data);
                toast.success('¡Formulario enviado con exito!')
                reset();

        } else {
            const resultado = await response.json();
            const mensajeError = resultado.errors?
                resultado.errors.map((e) => e.message).join(", "):
                "Ocurrio un error al enviar el formulario"

                toast.error(mensajeError)
        }
        } catch (error){
            toast.error("Error de red al enviar el formulario:", error)
        }
    }

        useEffect(() => {
        const prevenirDropGlobal = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };

        window.addEventListener("dragover", prevenirDropGlobal);
        window.addEventListener("drop", prevenirDropGlobal);

        return () => {
            window.removeEventListener("dragover", prevenirDropGlobal);
            window.removeEventListener("drop", prevenirDropGlobal);
        };
    }, []);
  return (
    <>
     <div className="min-h-screen flex items-center justify-center p-4">
         <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <Forminput
                    label="Primer Nombre"
                    {...register("primerNombre", { required: "El primer nombre es obligatorio"})}
                    required
                    placeholder="Escriba Su Primer Nombre"
                    error={errors.primerNombre?.message}
                />
                <Forminput
                    label="Segundo Nombre"
                    {...register("segundoNombre")}
                    placeholder="Escriba Su Primer Nombre"
                    error={errors.segundoNombre?.message}
                />
                <Forminput
                    label="Primer Apellido"
                    {...register("primerApellido", { required: "El primer apellido es obligatorio"})}   
                    required
                    placeholder="Escriba Su Primer Apellido"
                    error={errors.primerApellido?.message}
                />
                <Forminput
                    label="Segundo Apellido"
                    {...register("segundoApellido")}
                    placeholder="Escriba Su Segundo Apellido"
                    error={errors.segundoApellido?.message}
                />
                <Formselect
                    label="Género"
                    options={[
                        "Femenino",
                        "Masculino",
                        "Otro"
                    ]}
                    error={errors.genero?.message}
                    {...register("genero", {
                        required: "El género es obligatorio",
                    })}
                    required
                />
                <Formselect
                    label="País"
                    options={paises}
                    error={errors.pais?.message}
                    {...register("pais", {
                        required: "El país es obligatorio",
                    })}
                    required
                />


                <Formselect
                    label="Ciudad"
                    options={Ciudades}
                    error={errors.ciudad?.message}
                    {...register("ciudad", {
                        required: "La ciudad es obligatoria",
                    })}
                    required
                />

                <Forminput
                    label="Correo"
                    {...register("correo", {
                                            required: "El correo es obligatorio",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Ingresa un correo valido"
                                            }
                    })}
                    required
                    placeholder="ejemplo@gmail.com"
                    type="email"
                    error={errors.correo?.message}

                />
                <Forminput
                    label="telefono"
                    {...register("telefono", {
                        required: "El Telefono es obligatorio",
                        pattern:{
                            value:/^[0-9]{10}$/,
                            message: "Ingresa un número de 10 digitos válido",
                        }
                    })}
                    required
                    placeholder="Ingresa tu telefono"
                    type="text"
                    error={errors.telefono?.message}
                />
            </div>
            <div className="mt-6">
                <FormtextArea
                    label="Mensaje"
                    error={errors.mensaje?.message}
                    {...register("mensaje", {required: "El mensaje es obligatorio"})}
                    required
                />
            </div>
            <div className="mt-6">
                <Controller
                    name="archivo"
                    control={control}
                    render={({ field }) => (
                        <Formfile
                         resetTrigger={fileInputKey}
                            label="Adjuntar archivo..."
                            name="archivo"
                            accept={{
                                "application/pdf": [".pdf"],
                                "image/png": [".png"],
                                "image/jpeg": [".jpg", ".jpeg"],
                                "video/*": [],
                            }}
                            maxSizeMB={5}
                            onFilesChange={field.onChange}
                            error={errors.archivo?.message}
                        />
                    )}
                />

            </div>

            <div className="mt-8 flex justify-center">
                <button
                    type="submit"
                    className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-3 rounded-lg transition"
                >
                    Contactame
                </button>
            </div>
        </form>
     </div>
    </>
  );
}

export default ContactoForm;
