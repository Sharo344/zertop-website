import React from 'react';
import { motion } from 'framer-motion';
import { scaleIn } from '../../utils/animationVariants';

const ScaleIn = ({ 
  children, 
  delay = 0,
  duration = 0.5,
  className = '' 
}) => {
  return (
    <motion.div
      className={className}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={scaleIn}
      transition={{ 
        ...scaleIn.animate.transition, 
        delay,
        duration 
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScaleIn;