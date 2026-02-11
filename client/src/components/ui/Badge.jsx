import React from 'react';

const Badge = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  rounded = true,
  className = ''
}) => {
  
  const variants = {
    primary: 'bg-primary-100 text-primary-800 border-primary-200',
    secondary: 'bg-secondary-100 text-secondary-800 border-secondary-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
    neutral: 'bg-neutral-100 text-neutral-800 border-neutral-200'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const roundedClass = rounded ? 'rounded-full' : 'rounded';

  return (
    <span 
      className={`inline-flex items-center font-semibold border ${variants[variant]} ${sizes[size]} ${roundedClass} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;