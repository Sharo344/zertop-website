import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { getInitials } from '../../utils/helpers';
import { SITE_INFO } from '../../utils/constants';
import Button from '../ui/Button';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Properties', path: '/properties' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Glass Navbar */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/40 backdrop-blur-xl shadow-xl py-3'
            : 'bg-white/30 backdrop-blur-lg py-5'
        } border-b border-white/20`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/">
              <motion.div
                className="flex items-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-orange-500/50 transition-all duration-300">
                  <HomeIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  {SITE_INFO.name}
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative group"
                >
                  <motion.div
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 relative ${
                      isActive(link.path)
                        ? 'text-orange-600'
                        : 'text-slate-700 hover:text-orange-600'
                    }`}
                    whileHover={{ y: -2 }}
                  >
                    {link.name}
                    
                    {/* Active Indicator - Animated underline */}
                    {isActive(link.path) && (
                      <motion.div
                        className="absolute -bottom-1 left-4 right-4 h-1.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                        layoutId="activeNav"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Hover background */}
                    {!isActive(link.path) && (
                      <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    )}

                    {/* Active background */}
                    {isActive(link.path) && (
                      <motion.div
                        className="absolute inset-0 rounded-lg bg-orange-500/10 -z-10"
                        layoutId="activeNavBg"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Auth Buttons / Profile */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="relative">
                  <motion.button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-300 group"
                    whileHover={{ y: -2 }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-orange-500/50 transition-all duration-300">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        getInitials(user?.name)
                      )}
                    </div>
                    <span className="font-semibold text-slate-900 text-sm">{user?.name}</span>
                    <motion.div
                      animate={{ rotate: isProfileDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ExpandMoreIcon className="w-5 h-5 text-slate-600" />
                    </motion.div>
                  </motion.button>

                  {/* Dropdown Menu - Glass Effect */}
                  <AnimatePresence>
                    {isProfileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-56 bg-white/80 backdrop-blur-xl rounded-xl shadow-2xl border border-white/30 py-2 overflow-hidden"
                      >
                        {/* Dropdown Items */}
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-orange-500/10 transition-all duration-300 group"
                        >
                          <DashboardIcon className="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                          <span className="font-semibold text-slate-900">Dashboard</span>
                          <ChevronRightIcon className="w-4 h-4 text-slate-400 ml-auto group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                          to="/dashboard/profile"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-orange-500/10 transition-all duration-300 group"
                        >
                          <PersonIcon className="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                          <span className="font-semibold text-slate-900">Profile</span>
                          <ChevronRightIcon className="w-4 h-4 text-slate-400 ml-auto group-hover:translate-x-1 transition-transform" />
                        </Link>
                        
                        {/* Divider */}
                        <div className="my-2 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                        
                        {/* Logout Button */}
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 transition-all duration-300 w-full text-left group"
                        >
                          <LogoutIcon className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
                          <span className="font-semibold text-red-600">Logout</span>
                          <ChevronRightIcon className="w-4 h-4 text-slate-400 ml-auto group-hover:translate-x-1 transition-transform" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/login')}
                    className="text-slate-700 hover:text-orange-600 font-semibold"
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon
                    onClick={() => navigate('/register')}
                    className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-lg hover:shadow-orange-600/50 transition-all duration-300"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden text-slate-900 p-2 hover:bg-white/20 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <CloseIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu - Glass Effect */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="lg:hidden mt-4 pb-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/60 backdrop-blur-lg rounded-xl border border-white/30 p-4 space-y-2">
                  {/* Mobile Nav Links */}
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        className={`flex items-center justify-between py-3 px-4 rounded-lg font-semibold transition-all duration-300 group ${
                          isActive(link.path)
                            ? 'bg-orange-500/20 text-orange-600 border border-orange-500/30'
                            : 'text-slate-700 hover:bg-white/40'
                        }`}
                      >
                        <span>{link.name}</span>
                        {isActive(link.path) && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-2 h-2 rounded-full bg-orange-600"
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}

                  {isAuthenticated ? (
                    <>
                      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-3" />
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 py-3 px-4 rounded-lg font-semibold text-slate-700 hover:bg-orange-500/10 transition-all duration-300"
                        >
                          <DashboardIcon className="w-5 h-5 text-orange-600" />
                          Dashboard
                        </Link>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                      >
                        <Link
                          to="/dashboard/profile"
                          className="flex items-center gap-3 py-3 px-4 rounded-lg font-semibold text-slate-700 hover:bg-orange-500/10 transition-all duration-300"
                        >
                          <PersonIcon className="w-5 h-5 text-orange-600" />
                          Profile
                        </Link>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 py-3 px-4 rounded-lg font-semibold text-red-600 hover:bg-red-500/10 transition-all duration-300 w-full"
                        >
                          <LogoutIcon className="w-5 h-5" />
                          Logout
                        </button>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-3" />
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Button
                          variant="ghost"
                          size="md"
                          fullWidth
                          onClick={() => navigate('/login')}
                          className="text-slate-700 hover:bg-white/40 font-semibold"
                        >
                          Sign In
                        </Button>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                      >
                        <Button
                          variant="primary"
                          size="md"
                          fullWidth
                          icon
                          onClick={() => navigate('/register')}
                          className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white"
                        >
                          Get Started
                        </Button>
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Spacer for fixed navbar */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;