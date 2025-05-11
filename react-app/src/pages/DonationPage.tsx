import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import { DonateForm } from '../components/DonateForm';
import Footer from '../components/Footer';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

const DonationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const campaignId = Number(id);

  return (
    <Elements stripe={stripePromise}>
      <div className="app">
        <main className="container main-content">
          <h1>Пожертвувати на кампанію #{campaignId}</h1>
          <DonateForm campaignId={campaignId} />
        </main>
        <Footer />
      </div>
    </Elements>
  );
};

export default DonationPage;
