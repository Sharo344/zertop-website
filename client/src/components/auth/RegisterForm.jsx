import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuthContext();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'client'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const roleOptions = [
    { value: 'client', label: 'Client (Looking to buy/rent)' },
    { value: 'agent', label: 'Agent (Selling/listing properties)' }
  ];

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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    const { confirmPassword, ...dataToSend } = formData;

    const result = await register(dataToSend);

    if (result.success) {
      toast.success('Registration successful! Welcome.');
      navigate('/dashboard');
    } else {
      toast.error(result.error || 'Registration failed. Please try again.');
    }

    setLoading(false);
  };

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
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
            Create Account
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-slate-600 text-base sm:text-lg"
          >
            Join us and discover your dream home
          </motion.p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <motion.div
            variants={itemVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            <Input
              type="text"
              name="name"
              label="Full Name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              icon={<PersonIcon />}
              iconPosition="left"
              fullWidth
              className="bg-slate-50/50 border-slate-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </motion.div>

          {/* Email */}
          <motion.div
            variants={itemVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.25 }}
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

          {/* Phone */}
          <motion.div
            variants={itemVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.3 }}
          >
            <Input
              type="tel"
              name="phone"
              label="Phone Number"
              placeholder="+234 800 000 0000"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              icon={<PhoneIcon />}
              iconPosition="left"
              fullWidth
              className="bg-slate-50/50 border-slate-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </motion.div>

          {/* Role Select */}
          <motion.div
            variants={itemVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.35 }}
          >
            <Select
              name="role"
              label="I am a..."
              options={roleOptions}
              value={formData.role}
              onChange={handleChange}
              error={errors.role}
              fullWidth
              className="bg-slate-50/50 border-slate-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </motion.div>

          {/* Password */}
          <motion.div
            variants={itemVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 }}
          >
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              helperText="At least 6 characters"
              icon={<LockIcon />}
              iconPosition="left"
              fullWidth
              className="bg-slate-50/50 border-slate-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </motion.div>

          {/* Confirm Password */}
          <motion.div
            variants={itemVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.45 }}
          >
            <Input
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              icon={<LockIcon />}
              iconPosition="left"
              fullWidth
              className="bg-slate-50/50 border-slate-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </motion.div>

          {/* Terms Checkbox */}
          <motion.div
            variants={itemVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.5 }}
            className="flex items-start"
          >
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 mt-1 text-orange-600 border-slate-300 rounded focus:ring-orange-500 transition-all cursor-pointer"
            />
            <label className="ml-3 text-sm text-slate-700">
              I agree to the{' '}
              <Link to="/terms" className="font-semibold text-orange-600 hover:text-orange-700 transition-colors">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="font-semibold text-orange-600 hover:text-orange-700 transition-colors">
                Privacy Policy
              </Link>
            </label>
          </motion.div>

          {/* Error message for terms */}
          {errors.terms && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-red-50 border border-red-200 rounded-lg"
            >
              <p className="text-sm text-red-700 font-medium">{errors.terms}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div
            variants={itemVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.55 }}
            className="pt-2"
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
              <span>Create Account</span>
              {!loading && <ArrowForwardIcon className="w-5 h-5 ml-2" />}
            </Button>
          </motion.div>

          {/* Sign In Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center pt-4 border-t border-slate-100"
          >
            <p className="text-slate-700 text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-orange-600 hover:text-orange-700 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </form>
      </div>

      {/* Bottom text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="text-center text-xs text-slate-600 mt-6"
      >
        Your data is protected by industry-standard security measures
      </motion.p>
    </motion.div>
  );
};

export default RegisterForm;