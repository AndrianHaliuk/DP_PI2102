import React from 'react';
import Header from '../components/IndexPage/Header';
import AboutSection from '../components/IndexPage/SectionAbout';
import WhatWeDo from '../components/IndexPage/WhatWeDo';
import Projects from '../components/IndexPage/Projects';
import DonationsDiagram from '../components/IndexPage/DonationsDiagram';
import Events from '../components/Events';
import Footer from '../components/Footer';


interface HomeProps {
  onFeedbackClick: () => void;
}

const Home: React.FC<HomeProps> = ({ }) =>{
  return (
    <>
      <Header />
      <AboutSection />
      <WhatWeDo />
      <Projects />
      <DonationsDiagram />
      <Events />
      <Footer />
    </>
  );
};

export default Home;
