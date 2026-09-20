import { forwardRef } from "react";

const Forminput = forwardRef(function Forminput({ label, error = "", type = "text", required = false, ...rest }, ref) {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-sm font-semibold text-gray-700 mb-1">
          {label}{required && "*"}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        {...rest}
      />
      {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
    </div>
  );
});

export default Forminput;