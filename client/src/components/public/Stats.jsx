import React from 'react';
import { motion } from 'framer-motion';
import { STATS } from '../../utils/constants';
import { formatNumber } from '../../utils/helpers';
import useCounter from '../../hooks/useCounter';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const Stats = () => {
  const stats = [
    {
      id: 1,
      value: STATS.propertiesListed,
      suffix: '+',
      label: 'Properties Listed',
      icon: HomeWorkIcon,
      color: 'bg-blue-600'
    },
    {
      id: 2,
      value: STATS.happyClients,
      suffix: '+',
      label: 'Happy Clients',
      icon: PeopleIcon,
      color: 'bg-orange-600'
    },
    {
      id: 3,
      value: STATS.experienceYears,
      suffix: '+',
      label: 'Years of Excellence',
      icon: TrendingUpIcon,
      color: 'bg-emerald-600'
    },
    {
      id: 4,
      value: STATS.agentsActive,
      suffix: '+',
      label: 'Expert Agents',
      icon: SupportAgentIcon,
      color: 'bg-indigo-600'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Our numbers speak for themselves
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ stat, index }) => {
  const { count, ref } = useCounter(stat.value, 2000);
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center"
    >
      {/* Icon Circle */}
      <div className={`w-16 h-16 ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-6 shadow-md`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      
      {/* Number */}
      <div className="mb-3">
        <span className="text-4xl sm:text-5xl font-bold text-slate-900">
          {formatNumber(count)}{stat.suffix}
        </span>
      </div>
      
      {/* Label */}
      <p className="text-sm sm:text-base text-slate-600 font-medium">
        {stat.label}
      </p>
    </motion.div>
  );
};

export default Stats;