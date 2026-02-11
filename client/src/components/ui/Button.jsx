import React from 'react';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  icon = false,
  iconPosition = 'right',
  onClick,
  href,
  type = 'button',
  disabled = false,
  fullWidth = false,
  loading = false,
  className = '',
  ...props 
}) => {
  
  const baseStyles = "font-semibold rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-secondary-500 hover:bg-secondary-600 text-white shadow-lg hover:shadow-xl",
    outline: "bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white",
    ghost: "bg-transparent text-primary-500 hover:bg-primary-50",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl",
    success: "bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const ButtonContent = () => (
    <>
      {loading && (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && <ArrowForwardIcon className="w-5 h-5 rotate-180" />}
      {children}
      {!loading && icon && iconPosition === 'right' && <ArrowForwardIcon className="w-5 h-5" />}
    </>
  );

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        {...props}
      >
        <ButtonContent />
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      {...props}
    >
      <ButtonContent />
    </motion.button>
  );
};

export default Button;