import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

function Formfile({ label, name, required = false, error = "", accept = { "application/pdf": [".pdf"] }, maxSizeMB, onFilesChange = () => {}, resetTrigger }) {
    const MAX_SIZE_MB = maxSizeMB;
    const maxFiles = 3;

    const [errorMsg, setErrorMsg] = useState("");
    const [archivos, setArchivo] = useState([]);
    const [MensajeEliminado, SetMensajeEliminado] = useState("");

    const generarID = (file) => `${file.name}-${file.lastModified}-${file.size}`;
    const espacioDisponible = maxFiles - archivos.length;



    // Timer para el mensaje de eliminación
    useEffect(() => {
        if (MensajeEliminado) {
            const timer = setTimeout(() => SetMensajeEliminado(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [MensajeEliminado]);

    useEffect(() => {
    if (resetTrigger) {
        archivos.forEach((item) => {
            if (item.preview) URL.revokeObjectURL(item.preview);
        });
        setArchivo([]);
        setErrorMsg("");
    }
    }, [resetTrigger]);
    

    const eliminarArchivo = (id) => {
        setArchivo((anteriores) => {
            const archivoEliminar = anteriores.find((arch) => arch.id === id);
            if (archivoEliminar?.preview) {
                URL.revokeObjectURL(archivoEliminar.preview);
            }
            return anteriores.filter((arch) => arch.id !== id);
        });
        SetMensajeEliminado("Archivo eliminado con éxito");
    };

    const onDrop = (acceptedFiles, rejectedFiles) => {
        if (acceptedFiles.length > 0) {
            setArchivo((anteriores) => {
                const cupos = maxFiles - anteriores.length;
                const seleccionados = acceptedFiles.slice(0, cupos);

                const nuevosObjetos = seleccionados.map((file) => ({
                    id: generarID(file),
                    file: file,
                    preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null
                }));

                return [...anteriores, ...nuevosObjetos];
            });
            setErrorMsg("");
        }

        if (rejectedFiles.length > 0) {
            const primerError = rejectedFiles[0].errors[0];
            if (primerError.code === "file-too-large") {
                setErrorMsg(`El archivo supera el tamaño máximo de ${MAX_SIZE_MB}MB`);
            } else if (primerError.code === "file-invalid-type") {
                setErrorMsg("Tipo de archivo no permitido");
            } else if (primerError.code === "too-many-files") {
                setErrorMsg(`Se ha alcanzado el límite de ${maxFiles} archivos`);
            } else {
                setErrorMsg(primerError.message);
            }
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
        maxSize: MAX_SIZE_MB ? MAX_SIZE_MB * 1024 * 1024 : undefined,
        maxFiles: maxFiles,
        accept,
        disabled: espacioDisponible <= 0
    });

    const MensajeDeError = errorMsg || error;

    return (
        <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1" htmlFor={name}>
                {label}{required && "*"}
            </label>

            <div 
                {...getRootProps()} 
                className="w-full p-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-all flex flex-col items-center justify-center text-center"
            >
                <input {...getInputProps({ id: name, name: name })} />
                <div className="text-3xl mb-2">📎</div>
                {isDragActive ? (
                    <p className="text-sm text-slate-700">Arrastra tu archivo aquí</p>
                ) : (
                    <p className="text-sm text-slate-500">
                        Arrastra tus archivos o haz clic para seleccionarlos <strong>(Máximo {maxFiles})</strong>
                    </p>
                )}
            </div>

            {archivos.length > 0 && (
                <div className="mt-3 flex flex-col gap-3">
                    {archivos.map((item) => (
                        <div key={item.id} className="rounded-lg bg-slate-100 p-4 flex items-center justify-between gap-4">
                            <div className="text-left text-sm">
                                <p className="font-semibold text-slate-700 mb-1">{item.file.name}</p>
                                <p className="text-xs text-slate-500">
                                    {(item.file.size / 1024).toFixed(2)} KB — {item.file.type || "Desconocido"}
                                </p>
                            </div>
                            
                            {item.preview && (
                                <img
                                    src={item.preview}
                                    alt={`Vista previa de ${item.file.name}`}
                                    className="w-16 h-16 object-cover rounded-md border border-slate-200 shrink-0" 
                                />
                            )}

                            <button
                                type="button"
                                onClick={() => eliminarArchivo(item.id)}
                                className="bg-red-500 hover:bg-red-600 text-white font-medium text-xs px-3 py-2 rounded-md transition-colors"
                            >
                                Eliminar 🗑️
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {MensajeEliminado && (
                <p className="mt-2 text-sm text-emerald-600 text-center font-medium">
                    ✅ {MensajeEliminado}
                </p>
            )}

            {MensajeDeError && ( 
                <span className="mt-1 block text-sm font-medium text-red-500 text-center">
                    ⚠️ {MensajeDeError}
                </span> 
            )}
        </div>
    );
}

export default Formfile;