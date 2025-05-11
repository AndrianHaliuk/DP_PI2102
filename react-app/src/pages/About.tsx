import React from 'react';
import Footer from '../components/Footer';
import Events from '../components/Events';
import AboutHero from '../components/AboutPage/AboutHero';
import MissionVision from '../components/AboutPage/MissionVision';
import Awards from '../components/AboutPage/Awards';
import Journey from '../components/AboutPage/Jorney';
import Team from '../components/AboutPage/Team';

const About: React.FC = () => {
  return (
    <>
      <AboutHero />
      <MissionVision />
      <Awards />
      <Journey />
      <Team />
      <Events />
      <Footer />
    </>
  );
};

export default About;
