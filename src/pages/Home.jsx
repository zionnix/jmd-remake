import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Stats from '../components/Stats';

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <Portfolio />
    </>
  );
};

export default Home;
