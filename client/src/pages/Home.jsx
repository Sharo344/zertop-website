import React from 'react';
import Hero from '../components/public/Hero';
import Stats from '../components/public/Stats';
import FeaturedProperties from '../components/public/FeaturedProperties';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      <FeaturedProperties />
    </div>
  );
};

export default Home;