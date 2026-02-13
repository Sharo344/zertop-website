import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUp, fadeIn } from '../../utils/animationVariants';
import { SITE_INFO, CITIES, PROPERTY_TYPES } from '../../utils/constants';
import Button from '../ui/Button';
import Select from '../ui/Select';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

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
    <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-orange-50 -z-10" />
      
      {/* Minimal Decorative Elements */}
      <motion.div
        className="absolute top-32 right-20 w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-10"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-5"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial="initial"
            animate="animate"
            className="space-y-10"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-xs font-semibold tracking-wide"
            >
              <TrendingUpIcon className="w-4 h-4" />
              <span>Nigeria's Trusted Real Estate Platform</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              transition={{ delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 leading-tight tracking-tight"
            >
              Find Your{' '}
              <span className="text-orange-600">Dream Home</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-md"
            >
              {SITE_INFO.tagline}. Browse thousands of verified properties across Nigeria.
            </motion.p>

            {/* Search Form */}
            <motion.form
              variants={fadeInUp}
              transition={{ delay: 0.25 }}
              onSubmit={handleSearch}
              className="bg-white rounded-xl shadow-lg p-6 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              </div>

              <Select
                options={[
                  { value: 'For Sale', label: 'For Sale' },
                  { value: 'For Rent', label: 'For Rent' }
                ]}
                value={searchData.status}
                onChange={(e) => setSearchData({ ...searchData, status: e.target.value })}
              />

              <Button type="submit" variant="primary" size="lg" fullWidth icon>
                <SearchIcon className="w-5 h-5 mr-2" />
                Search Properties
              </Button>
            </motion.form>

            {/* Quick Stats - Simplified */}
            <motion.div
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200"
            >
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-orange-600">2,500+</p>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Properties</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-orange-600">1,200+</p>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Happy Clients</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-orange-600">85+</p>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">Agents</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Card Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block h-96"
          >
            {/* Card 1 - Front */}
            <motion.div
              className="absolute bottom-8 right-0 w-72 bg-white rounded-lg shadow-lg overflow-hidden"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-full h-40 bg-gradient-to-br from-orange-400 to-orange-600" />
              <div className="p-5">
                <h3 className="font-semibold text-slate-900 text-sm">Luxury Villa in VI</h3>
                <p className="text-xl font-bold text-orange-600 mt-2">₦85,000,000</p>
                <div className="flex gap-4 mt-3 text-xs text-slate-600">
                  <span>5 🛏️</span>
                  <span>6 🛁</span>
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Back Left */}
            <motion.div
              className="absolute top-0 left-0 w-64 bg-white rounded-lg shadow-md overflow-hidden opacity-80"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="w-full h-32 bg-gradient-to-br from-orange-400 to-orange-600" />
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 text-sm">Modern Apartment</h3>
                <p className="text-lg font-bold text-orange-600 mt-2">₦35,000,000</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-5 h-8 border-2 border-slate-400 rounded-full flex justify-center pt-1.5">
          <motion.div
            className="w-1 h-2 bg-slate-500 rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;