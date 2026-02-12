import React from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../components/auth/LoginForm';
import { fadeIn } from '../utils/animationVariants';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="w-full"
      >
        <LoginForm />
      </motion.div>
    </div>
  );
};

export default Login;