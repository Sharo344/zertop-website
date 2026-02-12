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
      color: 'from-primary-500 to-primary-600'
    },
    {
      id: 2,
      value: STATS.happyClients,
      suffix: '+',
      label: 'Happy Clients',
      icon: PeopleIcon,
      color: 'from-secondary-500 to-secondary-600'
    },
    {
      id: 3,
      value: STATS.experienceYears,
      suffix: '+',
      label: 'Years of Excellence',
      icon: TrendingUpIcon,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 4,
      value: STATS.agentsActive,
      suffix: '+',
      label: 'Expert Agents',
      icon: SupportAgentIcon,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <section className="py-20 bg-neutral-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-neutral-400">
            Numbers that speak for themselves
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center"
    >
      <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
        <Icon className="w-10 h-10 text-white" />
      </div>
      
      <div className="mb-2">
        <span className="text-5xl md:text-6xl font-bold text-white">
          {formatNumber(count)}{stat.suffix}
        </span>
      </div>
      
      <p className="text-lg text-neutral-400 font-semibold">
        {stat.label}
      </p>
    </motion.div>
  );
};

export default Stats;