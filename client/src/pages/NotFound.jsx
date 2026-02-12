import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import HomeIcon from '@mui/icons-material/Home';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-primary-500 mb-4">404</h1>
        <h2 className="text-4xl font-bold text-neutral-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-xl text-neutral-600 mb-8">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg" icon iconPosition="left" className='bg-orange-600'>
            <HomeIcon className="w-6 h-6" />
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;