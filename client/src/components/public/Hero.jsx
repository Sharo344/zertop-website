import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUp, fadeIn } from '../../utils/animationVariants';
import { SITE_INFO, CITIES, PROPERTY_TYPES } from '../../utils/constants';
import Button from '../ui/Button';
import Select from '../ui/Select';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VerifiedIcon from '@mui/icons-material/Verified';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const Hero = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    city: '',
    type: '',
    status: 'For Sale'
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    
    if (searchData.city) queryParams.append('city', searchData.city);
    if (searchData.type) queryParams.append('type', searchData.type);
    if (searchData.status) queryParams.append('status', searchData.status);

    navigate(`/properties?${queryParams.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 -z-10" />
      
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-10 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-96 h-96 bg-secondary-200 rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold"
            >
              <TrendingUpIcon className="w-4 h-4" />
              <span>Nigeria's #1 Real Estate Platform</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 leading-tight"
            >
              Find Your{' '}
              <span className="text-gradient">Dream Home</span>{' '}
              Today
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-neutral-600 leading-relaxed"
            >
              {SITE_INFO.tagline}. Browse thousands of properties across Nigeria.
            </motion.p>

            {/* Trust Badges */}
            <motion.div
              variants={fadeInUp}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <VerifiedIcon className="w-6 h-6 text-green-500" />
                <span className="text-neutral-700">Verified Listings</span>
              </div>
              <div className="flex items-center gap-2">
                <SupportAgentIcon className="w-6 h-6 text-primary-500" />
                <span className="text-neutral-700">Expert Support</span>
              </div>
            </motion.div>

            {/* Search Form */}
            <motion.form
              variants={fadeInUp}
              transition={{ delay: 0.6 }}
              onSubmit={handleSearch}
              className="bg-white rounded-2xl shadow-2xl p-6 space-y-4"
            >
              <div className="grid md:grid-cols-3 gap-4">
                <Select
                  placeholder="Select City"
                  options={CITIES}
                  value={searchData.city}
                  onChange={(e) => setSearchData({ ...searchData, city: e.target.value })}
                />
                
                <Select
                  placeholder="Property Type"
                  options={[
                    { value: '', label: 'All Types' },
                    ...PROPERTY_TYPES.map(type => ({ value: type, label: type }))
                  ]}
                  value={searchData.type}
                  onChange={(e) => setSearchData({ ...searchData, type: e.target.value })}
                />

                <Select
                  options={[
                    { value: 'For Sale', label: 'For Sale' },
                    { value: 'For Rent', label: 'For Rent' }
                  ]}
                  value={searchData.status}
                  onChange={(e) => setSearchData({ ...searchData, status: e.target.value })}
                />
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth icon>
                <SearchIcon className="w-6 h-6 mr-2" />
                Search Properties
              </Button>
            </motion.form>

            {/* Quick Stats */}
            <motion.div
              variants={fadeInUp}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center gap-8 pt-4"
            >
              <div>
                <p className="text-3xl font-bold text-primary-500">2,500+</p>
                <p className="text-sm text-neutral-600">Properties Listed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary-500">1,200+</p>
                <p className="text-sm text-neutral-600">Happy Clients</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary-500">85+</p>
                <p className="text-sm text-neutral-600">Expert Agents</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square">
              {/* Property Card 1 */}
              <motion.div
                className="absolute top-0 right-0 w-80 bg-white rounded-2xl shadow-2xl p-6 z-20"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-full h-40 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-xl mb-4" />
                <h3 className="font-bold text-lg text-neutral-900 mb-2">Luxury Villa in VI</h3>
                <p className="text-2xl font-bold text-primary-500">₦85,000,000</p>
                <div className="flex items-center gap-4 mt-4 text-sm text-neutral-600">
                  <span>5 🛏️</span>
                  <span>6 🛁</span>
                  <span>450 sqm</span>
                </div>
              </motion.div>

              {/* Property Card 2 */}
              <motion.div
                className="absolute bottom-0 left-0 w-72 bg-white rounded-2xl shadow-xl p-6 z-10"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="w-full h-32 bg-gradient-to-br from-secondary-400 to-primary-400 rounded-xl mb-4" />
                <h3 className="font-bold text-lg text-neutral-900 mb-2">Modern Apartment</h3>
                <p className="text-2xl font-bold text-primary-500">₦35,000,000</p>
                <div className="flex items-center gap-4 mt-4 text-sm text-neutral-600">
                  <span>3 🛏️</span>
                  <span>4 🛁</span>
                  <span>180 sqm</span>
                </div>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-2xl p-8 z-30"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary-500">15+</p>
                  <p className="text-sm text-neutral-600">Years</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 bg-neutral-500 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;