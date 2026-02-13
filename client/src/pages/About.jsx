import React from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../utils/animationVariants";
import { SITE_INFO, STATS } from "../utils/constants";
import VerifiedIcon from "@mui/icons-material/Verified";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const About = () => {
  const values = [
    {
      icon: VerifiedIcon,
      title: "Trust & Transparency",
      description: "Every property is verified and all information is accurate and up-to-date.",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: TrendingUpIcon,
      title: "Excellence",
      description: "We strive for excellence in every service we provide to our clients.",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: SupportAgentIcon,
      title: "Client-Focused",
      description: "Your satisfaction is our priority. We are here to help you every step of the way.",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const stats = [
    {
      value: STATS.propertiesListed,
      suffix: "+",
      label: "Properties Listed",
      icon: "🏠",
      color: "from-orange-500 to-orange-600",
    },
    {
      value: STATS.happyClients,
      suffix: "+",
      label: "Happy Clients",
      icon: "😊",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      value: STATS.experienceYears,
      suffix: "+",
      label: "Years of Excellence",
      icon: "🏆",
      color: "from-orange-500 to-orange-600",
    },
    {
      value: STATS.agentsActive,
      suffix: "+",
      label: "Expert Agents",
      icon: "👥",
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Minimal & Clean */}
      <section className="pt-32 pb-24 bg-gradient-to-br from-slate-50 via-white to-orange-50 relative overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-10"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-5"
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-xs font-semibold tracking-wide mb-6"
            >
              <span>Our Story</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              transition={{ delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
            >
              Transforming Real Estate in{' '}
              <span className="text-orange-600">Nigeria</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto"
            >
              Nigeria's most trusted real estate platform connecting property seekers with their dream homes since 2009. Over a decade of excellence, innovation, and trust.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="inline-block text-orange-600 font-semibold text-sm tracking-widest uppercase"
                >
                  Since 2009
                </motion.span>
                <motion.h2
                  variants={fadeInUp}
                  transition={{ delay: 0.15 }}
                  className="text-4xl md:text-5xl font-bold text-slate-900 mt-4"
                >
                  Building Dreams,
                  <br />
                  Creating Futures
                </motion.h2>
              </div>

              <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="space-y-5"
              >
                <p className="text-lg text-slate-700 leading-relaxed">
                  {SITE_INFO.name} was founded with a simple mission: to make finding and selling properties in Nigeria easier, faster, and more transparent. What started as a small team of passionate real estate professionals has grown into Nigeria's leading property platform.
                </p>

                <p className="text-lg text-slate-700 leading-relaxed">
                  Today, we serve thousands of clients across Nigeria, from Lagos to Abuja, Port Harcourt to Kano. Our platform features over <span className="font-semibold text-orange-600">{STATS.propertiesListed}+ verified listings</span> and connects buyers, sellers, and renters with trusted agents.
                </p>

                <p className="text-lg text-slate-700 leading-relaxed">
                  We believe that everyone deserves access to quality housing, and we're committed to making that dream a reality for every Nigerian.
                </p>
              </motion.div>

              {/* Key highlights */}
              <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200"
              >
                <div>
                  <p className="text-3xl font-bold text-orange-600">15+</p>
                  <p className="text-sm text-slate-600 mt-1">Years of Excellence</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-600">500K+</p>
                  <p className="text-sm text-slate-600 mt-1">Users Served</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Visual - Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 sm:h-full"
            >
              <div className="relative w-full aspect-square">
                {/* Main card */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl shadow-2xl overflow-hidden"
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-white/30">
                    🏢
                  </div>
                </motion.div>

                {/* Accent card */}
                <motion.div
                  className="absolute bottom-8 -right-8 w-48 h-48 bg-white rounded-2xl shadow-lg border border-slate-100 p-6 z-10"
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-xl">
                      ✓
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">Verified Properties</p>
                      <p className="text-xs text-slate-600 mt-1">100% authentic listings</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-28 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-block text-orange-600 font-semibold text-sm tracking-widest uppercase mb-4"
            >
              Our Core Values
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              What We Stand For
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              These principles guide every decision we make and every service we provide.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-8 h-full shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-orange-200">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {value.description}
                    </p>

                    {/* Bottom accent */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15, duration: 0.6 }}
                      className={`h-1 bg-gradient-to-r ${value.color} rounded-full mt-6 group-hover:scale-x-110 transition-transform origin-left`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-block text-orange-600 font-semibold text-sm tracking-widest uppercase mb-4"
            >
              By The Numbers
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Our Impact
            </h2>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-slate-50 rounded-2xl p-8 h-full text-center hover:bg-white transition-all duration-300 border border-slate-100 hover:border-slate-200 hover:shadow-lg">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="text-5xl mb-6"
                  >
                    {stat.icon}
                  </motion.div>

                  {/* Stat Number */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="mb-3"
                  >
                    <p className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}{stat.suffix}
                    </p>
                  </motion.div>

                  {/* Label */}
                  <p className="text-slate-600 font-semibold text-lg">
                    {stat.label}
                  </p>

                  {/* Divider */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    className={`h-1 bg-gradient-to-r ${stat.color} rounded-full mt-6 mx-auto w-12`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-600 to-orange-700 text-white relative overflow-hidden">
        {/* Background decorations */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Find Your Dream Home?
            </h2>
            <p className="text-xl text-orange-100 mb-10">
              Join thousands of Nigerians who have found their perfect property with us.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Explore Properties Now
              <span>→</span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;