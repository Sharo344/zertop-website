import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ 
  tabs = [], 
  defaultTab = 0,
  onChange,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onChange) {
      onChange(index);
    }
  };

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className="flex border-b border-neutral-200 overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`relative px-6 py-3 font-semibold transition-colors whitespace-nowrap ${
              activeTab === index
                ? 'text-primary-500'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            {tab.label}
            
            {/* Active indicator */}
            {activeTab === index && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                layoutId="activeTab"
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {tabs[activeTab]?.content}
        </motion.div>
      </div>
    </div>
  );
};

export default Tabs;