import React from 'react';
import { CampaignList } from '../components/CampaignList';
import Footer from '../components/Footer';

const CampaignsPage: React.FC = () => {
  return (
    <div className="app">
      <main className="container main-content">
        <CampaignList />
      </main>
      <Footer />
    </div>
  );
};

export default CampaignsPage;
