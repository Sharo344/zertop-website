import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../utils/animationVariants';

const SectionTitle = ({ 
  title, 
  subtitle, 
  centered = true,
  className = '' 
}) => {
  return (
    <motion.div 
      className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
    >
      {subtitle && (
        <motion.p 
          className="text-primary-500 font-semibold text-sm uppercase tracking-wide mb-2"
          variants={fadeInUp}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2 
        className="text-4xl md:text-5xl font-bold text-neutral-900"
        variants={fadeInUp}
      >
        {title}
      </motion.h2>
    </motion.div>
  );
};

export default SectionTitle;