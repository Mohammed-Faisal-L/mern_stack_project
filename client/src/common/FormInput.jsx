const FormInput = ({
  label,
  id,
  name,
  type = "text",
  placeholder,
  formik,
  className = "",
}) => {
  const error = formik.touched[name] && formik.errors[name];

  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={id}
        className="block text-lg font-medium text-gray-700 mb-2"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        {...formik.getFieldProps(name)}
        className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg ${
          error ? "border-red-400" : ""
        }`}
      />

      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default FormInput;
