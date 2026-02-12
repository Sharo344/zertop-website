import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { sidebarVariants } from '../../utils/animationVariants';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="flex">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-lg z-40"
        >
          <MenuIcon />
        </button>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              />

              {/* Sidebar */}
              <motion.div
                variants={sidebarVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="lg:hidden fixed left-0 top-0 bottom-0 z-50 bg-white"
              >
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="absolute top-4 right-4 w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center"
                >
                  <CloseIcon />
                </button>
                <Sidebar />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;