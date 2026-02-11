import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '',
  hoverable = true,
  padding = 'normal',
  shadow = 'normal',
  onClick,
  ...props 
}) => {
  
  const paddingClasses = {
    none: 'p-0',
    small: 'p-4',
    normal: 'p-6',
    large: 'p-8'
  };

  const shadowClasses = {
    none: '',
    small: 'shadow-sm',
    normal: 'shadow-md',
    large: 'shadow-lg'
  };
  
  const baseStyles = "bg-white rounded-xl overflow-hidden";
  const hoverStyles = hoverable ? "hover:shadow-xl hover:-translate-y-1 cursor-pointer" : "";
  const clickableStyles = onClick ? "cursor-pointer" : "";
  
  const classes = `${baseStyles} ${shadowClasses[shadow]} ${paddingClasses[padding]} ${hoverStyles} ${clickableStyles} transition-all duration-300 ${className}`;

  return (
    <motion.div
      className={classes}
      onClick={onClick}
      whileHover={hoverable ? { y: -8 } : {}}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;