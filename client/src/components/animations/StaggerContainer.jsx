import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../utils/animationVariants';

const StaggerContainer = ({ 
  children, 
  staggerDelay = 0.1,
  className = '' 
}) => {
  return (
    <motion.div
      className={className}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        ...staggerContainer,
        animate: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.2
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

// StaggerItem - to be used inside StaggerContainer
export const StaggerItem = ({ children, className = '' }) => {
  return (
    <motion.div
      className={className}
      variants={staggerItem}
    >
      {children}
    </motion.div>
  );
};

export default StaggerContainer;