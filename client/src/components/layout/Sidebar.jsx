import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthContext } from '../../context/AuthContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

const Sidebar = () => {
  const location = useLocation();
  const { user, isAgent, isAdmin } = useAuthContext();

  const clientLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
    { name: 'Saved Properties', path: '/dashboard/saved', icon: FavoriteIcon },
    { name: 'My Appointments', path: '/dashboard/appointments', icon: CalendarTodayIcon },
    { name: 'Profile', path: '/dashboard/profile', icon: PersonIcon },
    { name: 'Settings', path: '/dashboard/settings', icon: SettingsIcon },
  ];

  const agentLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
    { name: 'My Properties', path: '/dashboard/properties', icon: HomeWorkIcon },
    { name: 'Add Property', path: '/dashboard/add-property', icon: AddCircleIcon },
    { name: 'Appointments', path: '/dashboard/appointments', icon: CalendarTodayIcon },
    { name: 'Profile', path: '/dashboard/profile', icon: PersonIcon },
    { name: 'Settings', path: '/dashboard/settings', icon: SettingsIcon },
  ];

  const links = isAgent() || isAdmin() ? agentLinks : clientLinks;

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 min-h-screen p-6">
      {/* User Info */}
      <div className="mb-8 pb-6 border-b border-neutral-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              user?.name?.charAt(0)
            )}
          </div>
          <div>
            <h3 className="font-bold text-neutral-900">{user?.name}</h3>
            <p className="text-sm text-neutral-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.path);

          return (
            <Link key={link.path} to={link.path}>
              <motion.div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors relative ${
                  active
                    ? 'bg-primary-50 text-primary-500'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
                whileHover={{ x: 4 }}
              >
                <Icon className="w-5 h-5" />
                <span>{link.name}</span>
                {active && (
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 rounded-r"
                    layoutId="activeSidebar"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;