import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ROLES } from "../constants/text-constants";

const FormInput = ({
  label,
  id,
  name,
  type = "text",
  placeholder,
  formik,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const error = formik.touched[name] && formik.errors[name];

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={id || name}
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={id || name}
          name={name}
          type={inputType}
          placeholder={placeholder}
          {...formik.getFieldProps(name)}
          className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg pr-12 ${
            error ? "border-red-400" : ""
          }`}
        />

        {type === "password" && (
          <button
            role={ROLES.EYE}
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? (
              <Eye className="w-6 h-6" />
            ) : (
              <EyeOff className="w-6 h-6" />
            )}
          </button>
        )}
      </div>

      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default FormInput;
