import React from 'react';
import Footer from '../components/Footer';
import ContactHeader from '../components/ContactPage/ContactHeader';
import ContactForm from '../components/ContactPage/ContactForm';
import ContactMap from '../components/ContactPage/ContactMap';

const Contact: React.FC = () => (
  <>
    <ContactHeader />
    <ContactForm />
    <ContactMap />
    <Footer />
  </>
);

export default Contact;
