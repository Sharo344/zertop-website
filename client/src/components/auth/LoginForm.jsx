import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import Button from '../ui/Button';
import Input from '../ui/Input';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const result = await login(formData);

    if (result.success) {
      toast.success('Login successful! Welcome back.');
      navigate(from, { replace: true });
    } else {
      toast.error(result.error || 'Login failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md"
    >
      {/* Glass Card Container */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-8 sm:p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3"
          >
            Welcome Back
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-slate-600 text-base sm:text-lg"
          >
            Sign in to your account
          </motion.p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Input
              type="email"
              name="email"
              label="Email Address"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={<EmailIcon />}
              iconPosition="left"
              fullWidth
              className="bg-slate-50/50 border-slate-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </motion.div>

          {/* Password Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={<LockIcon />}
              iconPosition="left"
              fullWidth
              className="bg-slate-50/50 border-slate-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </motion.div>

          {/* Remember & Forgot Password */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between"
          >
            <label className="flex items-center group cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-orange-600 border-slate-300 rounded focus:ring-orange-500 transition-all"
              />
              <span className="ml-2 text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                Remember me
              </span>
            </label>

            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
            >
              Forgot password?
            </Link>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              disabled={loading}
              className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold shadow-lg hover:shadow-orange-600/50 transition-all duration-300"
              icon
            >
              <span>Sign In</span>
              {!loading && <ArrowForwardIcon className="w-5 h-5 ml-2" />}
            </Button>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4 }}
            className="relative my-8"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-slate-600">Or continue with</span>
            </div>
          </motion.div>

          {/* Social Login Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="grid grid-cols-2 gap-4"
          >
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-lg text-slate-700 font-semibold hover:bg-slate-50 transition-all duration-300"
            >
              <span>G</span>
              <span className="text-xs">Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-lg text-slate-700 font-semibold hover:bg-slate-50 transition-all duration-300"
            >
              <span>f</span>
              <span className="text-xs">Facebook</span>
            </button>
          </motion.div>

          {/* Sign Up Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center pt-4 border-t border-slate-100"
          >
            <p className="text-slate-700 text-sm">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold text-orange-600 hover:text-orange-700 transition-colors"
              >
                Create one
              </Link>
            </p>
          </motion.div>
        </form>
      </div>

      {/* Bottom text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="text-center text-xs text-slate-600 mt-6"
      >
        Protected by reCAPTCHA and subject to our{' '}
        <Link to="/privacy" className="text-orange-600 hover:underline">
          Privacy Policy
        </Link>
      </motion.p>
    </motion.div>
  );
};

export default LoginForm;