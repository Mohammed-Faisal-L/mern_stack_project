import React from "react";

/**
 * Flexible Button component
 *
 * Props:
 * - text: string (display text)
 * - children: ReactNode (if you want custom content / icon)
 * - loadingText: string
 * - isLoading: boolean
 * - onClick: func
 * - type: "button" | "submit"
 * - role: string
 * - disabled: boolean
 * - variant: "primary" | "secondary" | "success" | "danger" | "outline" | "ghost"
 * - size: "xs" | "sm" | "md" | "lg"
 * - fullWidth: boolean
 * - rounded: "md" | "lg" | "full"
 * - className: string (extra classes)
 */

const VARIANT_CLASSES = {
  primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
  secondary: "bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-400",
  success: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500",
  danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-400",
  ghost: "bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
};

const SIZE_CLASSES = {
  xs: "py-1 px-2 text-sm",
  sm: "py-2 px-3 text-base",
  md: "py-2 px-4 text-base",
  lg: "py-3 px-4 text-lg",
};

const ROUNDED = {
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const Button = ({
  text,
  children,
  loadingText = "Loading...",
  isLoading = false,
  onClick,
  type = "button",
  role,
  disabled = false,
  variant = "primary",
  size = "md",
  fullWidth = true,
  rounded = "md",
  className = "",
  ...rest
}) => {
  const base =
    "font-semibold focus:outline-none focus:ring-2 transition-colors duration-200 inline-flex items-center justify-center";
  const widthClass = fullWidth ? "w-full" : "";
  const variantClass = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;
  const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;
  const roundedClass = ROUNDED[rounded] || ROUNDED.md;
  const disabledClass = disabled || isLoading ? "opacity-70 cursor-not-allowed" : "";

  const combined = `${base} ${variantClass} ${sizeClass} ${roundedClass} ${widthClass} ${disabledClass} ${className}`;

  return (
    <button
      role={role}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={combined}
      {...rest}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <span>{loadingText}</span>
        </>
      ) : children ? (
        children
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};

export default Button;
