import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
  label,
  type = 'text',
  error,
  helperText,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  containerClassName = '',
  ...props 
}, ref) => {
  
  const baseStyles = "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200";
  
  const errorStyles = error 
    ? "border-red-500 focus:ring-red-500" 
    : "border-neutral-300 hover:border-neutral-400";

  const iconPaddingStyles = icon 
    ? iconPosition === 'left' ? 'pl-12' : 'pr-12'
    : '';

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <div className={`${widthClass} ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-semibold text-neutral-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={`${baseStyles} ${errorStyles} ${iconPaddingStyles} ${className}`}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400">
            {icon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="mt-2 text-sm text-neutral-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;