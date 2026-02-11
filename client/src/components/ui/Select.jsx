import React, { forwardRef } from 'react';

const Select = forwardRef(({ 
  label,
  options = [],
  error,
  helperText,
  placeholder = 'Select an option',
  fullWidth = false,
  className = '',
  containerClassName = '',
  ...props 
}, ref) => {
  
  const baseStyles = "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-white";
  
  const errorStyles = error 
    ? "border-red-500 focus:ring-red-500" 
    : "border-neutral-300 hover:border-neutral-400";

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <div className={`${widthClass} ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-semibold text-neutral-700 mb-2">
          {label}
        </label>
      )}
      
      <select
        ref={ref}
        className={`${baseStyles} ${errorStyles} ${className}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-2 text-sm text-neutral-500">{helperText}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;