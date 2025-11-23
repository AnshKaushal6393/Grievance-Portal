import React from "react";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  disabled = false,
  icon: Icon,
  ...props
}) => {
  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`w-full ${
            Icon ? "pl-10" : "pl-4"
          } pr-10 py-2.5 text-[15px] text-gray-800 border border-gray-300 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50 focus:border-[#2563eb]
          placeholder-gray-400 bg-gray-50 hover:bg-gray-100
          transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
            error ? "border-red-400 focus:ring-red-400" : ""
          }`}
          {...props}
        />
      </div>
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-500 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;