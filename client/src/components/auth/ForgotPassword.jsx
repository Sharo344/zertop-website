import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../ui/Button';
import Input from '../ui/Input';
import EmailIcon from '@mui/icons-material/Email';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      toast.success('Password reset link sent to your email!');
      setLoading(false);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <EmailIcon className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Check Your Email</h2>
          <p className="text-neutral-600">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-neutral-600">
            Didn't receive the email? Check your spam folder or{' '}
            <button
              onClick={() => setSubmitted(false)}
              className="text-primary-500 hover:text-primary-600 font-semibold bg-orange-600"
            >
              try again
            </button>
          </p>

          <Link to="/login">
            <Button variant="outline" size="md" fullWidth icon iconPosition="left">
              <ArrowBackIcon className="w-5 h-5" />
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">Forgot Password?</h2>
        <p className="text-neutral-600">
          No worries! Enter your email and we'll send you reset instructions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="email"
          name="email"
          label="Email Address"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          error={error}
          icon={<EmailIcon />}
          iconPosition="left"
          fullWidth
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          Send Reset Link
        </Button>

        <Link to="/login">
          <Button variant="ghost" size="md" fullWidth>
            <ArrowBackIcon className="w-5 h-5 mr-2" />
            Back to Login
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;