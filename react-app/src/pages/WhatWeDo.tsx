import React from 'react';
import Footer from '../components/Footer';
import Hero from '../components/WhatWeDoPage/Hero';
import Services from '../components/WhatWeDoPage/Services';
import Projects from '../components/WhatWeDoPage/Projects';
import Events from '../components/Events';


interface WhatWeDoProps {
  onFeedbackClick: () => void;
}

const WhatWeDo: React.FC<WhatWeDoProps> = ({ }) => {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <Events />
      <Footer />
    </>
  );
};

export default WhatWeDo;
