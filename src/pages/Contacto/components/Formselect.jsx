import { forwardRef } from "react";

const Formselect = forwardRef(function Formselect({ label, options = [], error = "", required = false, ...rest }, ref) {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-sm font-semibold text-gray-700 mb-1">
          {label}{required && "*"}
        </label>
      )}
      <select
        ref={ref}
        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        {...rest}
      >
        <option value="">Selecciona Una Opción</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
});

export default Formselect;