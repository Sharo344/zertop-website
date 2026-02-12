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
    { name: 'Home', path: '/' },
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
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-4' : 'bg-white/95 backdrop-blur-sm py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <HomeIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-neutral-900">
                {SITE_INFO.name}
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-semibold transition-colors duration-300 relative ${
                  isActive(link.path)
                    ? 'text-primary-500'
                    : 'text-neutral-700 hover:text-primary-500'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500"
                    layoutId="activeNav"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Buttons / Profile */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
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
                  <span className="font-semibold text-neutral-900">{user?.name}</span>
                  <ExpandMoreIcon
                    className={`transition-transform ${
                      isProfileDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-200 py-2"
                    >
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors"
                      >
                        <DashboardIcon className="w-5 h-5 text-neutral-600" />
                        <span className="font-semibold text-neutral-900">Dashboard</span>
                      </Link>
                      <Link
                        to="/dashboard/profile"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors"
                      >
                        <PersonIcon className="w-5 h-5 text-neutral-600" />
                        <span className="font-semibold text-neutral-900">Profile</span>
                      </Link>
                      <hr className="my-2 border-neutral-200" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors w-full text-left"
                      >
                        <LogoutIcon className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-red-600">Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button variant="primary" size="sm" icon onClick={() => navigate('/register')} className='bg-orange-600'>
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-neutral-900 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden mt-6 pb-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`py-3 px-4 rounded-lg font-semibold transition-colors ${
                      isActive(link.path)
                        ? 'bg-primary-50 text-primary-500'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                {isAuthenticated ? (
                  <>
                    <hr className="my-2 border-neutral-200" />
                    <Link
                      to="/dashboard"
                      className="py-3 px-4 rounded-lg font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/dashboard/profile"
                      className="py-3 px-4 rounded-lg font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="py-3 px-4 rounded-lg font-semibold text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <hr className="my-2 border-neutral-200" />
                    <Button
                      variant="ghost"
                      size="md"
                      fullWidth
                      onClick={() => navigate('/login')}
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      fullWidth
                      icon
                      onClick={() => navigate('/register')}
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;