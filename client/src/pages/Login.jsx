import React from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-orange-50 -z-20" />

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-10"
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-5"
        animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.08, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Content Container */}
      <div className="w-full max-w-md relative z-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;