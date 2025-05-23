import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';

import Navbar from './components/Navbar';
import Modal from './components/Modal';  

import Home from './pages/Home';
import About from './pages/About';
import WhatWeDo from './pages/WhatWeDo';
import Contact from './pages/Contact';
import Media from './pages/Media';
import CampaignsPage from './pages/CampaignsPage';
import CreateCampaignPage from './pages/CreateCampaignPage';
import DonationPage from './pages/DonationPage';
import ProfilePage from './pages/ProfilePage';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import { RequireAuth } from './components/RequireAuth';
import EditCampaignPage from './pages/EditCampaignPage';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Navbar onFeedbackClick={() => setFeedbackOpen(true)} />

        <Modal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)}>
          
        </Modal>

        <Routes>
          <Route path="/" element={<Home onFeedbackClick={() => setFeedbackOpen(true)} />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/what-we-do" element={<WhatWeDo onFeedbackClick={() => setFeedbackOpen(true)} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/media" element={<Media />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route
            path="/campaigns/create"
            element={
              <RequireAuth>
                <CreateCampaignPage />
              </RequireAuth>
            }
          />
          <Route
            path="/campaigns/:id"
            element={
              <RequireAuth>
                <DonationPage />
              </RequireAuth>
            }
          />

          <Route
          path="/campaigns/edit/:id"
          element={
            <RequireAuth>
              <EditCampaignPage />
            </RequireAuth>
          }
           />
                  
          <Route path="/profile" element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }/>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
