import React from 'react';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight } from '../../utils/animationVariants';

const SlideIn = ({ 
  children, 
  direction = 'left', 
  delay = 0,
  duration = 0.7,
  className = '' 
}) => {
  const variant = direction === 'left' ? slideInLeft : slideInRight;
  
  return (
    <motion.div
      className={className}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={variant}
      transition={{ 
        ...variant.animate.transition, 
        delay,
        duration 
      }}
    >
      {children}
    </motion.div>
  );
};

export default SlideIn;