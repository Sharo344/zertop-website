import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/animationVariants';

const FadeInUp = ({ 
  children, 
  delay = 0, 
  duration = 0.6,
  className = '' 
}) => {
  return (
    <motion.div
      className={className}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      transition={{ 
        ...fadeInUp.animate.transition, 
        delay,
        duration 
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInUp;