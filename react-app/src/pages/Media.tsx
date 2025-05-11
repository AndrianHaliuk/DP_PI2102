import React from 'react';
import Footer from '../components/Footer';
import Events from '../components/Events';

import MediaHeader from '../components/MediaPage/MediaHeader';

const Media: React.FC = () => {
  return (
    <>
      <MediaHeader />
      <Events />
      <Footer />
    </>
  );
};

export default Media;
