import React from 'react';
import { motion } from 'framer-motion';
import RegisterForm from '../components/auth/RegisterForm';
import { fadeIn } from '../utils/animationVariants';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="w-full"
      >
        <RegisterForm />
      </motion.div>
    </div>
  );
};

export default Register;