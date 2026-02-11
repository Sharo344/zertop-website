import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIcon from '@mui/icons-material/Phone';

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
      toast.success('Registration successful! Welcome to Prime Estate.');
      navigate('/dashboard');
    } else {
      toast.error(result.error || 'Registration failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">Create Account</h2>
        <p className="text-neutral-600">Join Prime Estate today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          type="text"
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          icon={<PersonIcon />}
          iconPosition="left"
          fullWidth
        />

        <Input
          type="email"
          name="email"
          label="Email Address"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={<EmailIcon />}
          iconPosition="left"
          fullWidth
        />

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
        />

        <Select
          name="role"
          label="I am a..."
          options={roleOptions}
          value={formData.role}
          onChange={handleChange}
          error={errors.role}
          fullWidth
        />

        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          helperText="At least 6 characters"
          icon={<LockIcon />}
          iconPosition="left"
          fullWidth
        />

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
        />

        <div className="flex items-start">
          <input
            type="checkbox"
            required
            className="w-4 h-4 mt-1 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
          />
          <label className="ml-2 text-sm text-neutral-700">
            I agree to the{' '}
            <Link to="/terms" className="text-primary-500 hover:text-primary-600">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-primary-500 hover:text-primary-600">
              Privacy Policy
            </Link>
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          Create Account
        </Button>

        <div className="text-center">
          <p className="text-neutral-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary-500 hover:text-primary-600 font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;