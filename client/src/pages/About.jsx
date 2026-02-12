import React from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../utils/animationVariants";
import { SITE_INFO, STATS } from "../utils/constants";
import SectionTitle from "../components/ui/SectionTitle";
import Card from "../components/ui/Card";
import VerifiedIcon from "@mui/icons-material/Verified";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const About = () => {
  const values = [
    {
      icon: VerifiedIcon,
      title: "Trust & Transparency",
      description:
        "Every property is verified and all information is accurate and up-to-date.",
    },
    {
      icon: TrendingUpIcon,
      title: "Excellence",
      description:
        "We strive for excellence in every service we provide to our clients.",
    },
    {
      icon: SupportAgentIcon,
      title: "Client-Focused",
      description:
        "Your satisfaction is our priority. We are here to help you every step of the way.",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
              About {SITE_INFO.name}
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              Nigeria's most trusted real estate platform connecting property
              seekers with their dream homes since 2009.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionTitle
                subtitle="Our Story"
                title="Building Dreams Since 2009"
                centered={false}
              />
              <p className="text-neutral-700 leading-relaxed mb-4">
                {SITE_INFO.name} was founded with a simple mission: to make
                finding and selling properties in Nigeria easier, faster, and
                more transparent. What started as a small team of passionate
                real estate professionals has grown into Nigeria's leading
                property platform.
              </p>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Today, we serve thousands of clients across Nigeria, from Lagos
                to Abuja, Port Harcourt to Kano. Our platform features over{" "}
                {STATS.propertiesListed} verified listings and connects buyers,
                sellers, and renters with trusted agents.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                We believe that everyone deserves access to quality housing, and
                we're committed to making that dream a reality for every
                Nigerian.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="w-full aspect-square bg-gradient-to-br from-primary-400 to-secondary-400 rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            subtitle="Our Values"
            title="What We Stand For"
            centered
          />

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
                >
                  <Card hoverable className="text-center h-full">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-primary-500 mb-2">
                {STATS.propertiesListed}+
              </p>
              <p className="text-neutral-600 font-semibold">Properties</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary-500 mb-2">
                {STATS.happyClients}+
              </p>
              <p className="text-neutral-600 font-semibold">Happy Clients</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary-500 mb-2">
                {STATS.experienceYears}+
              </p>
              <p className="text-neutral-600 font-semibold">Years</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary-500 mb-2">
                {STATS.agentsActive}+
              </p>
              <p className="text-neutral-600 font-semibold">Agents</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
