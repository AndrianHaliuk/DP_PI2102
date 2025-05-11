import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

export const DonateForm: React.FC<{ campaignId: number }> = ({ campaignId }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState(0);
  const [anon, setAnon] = useState(false);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (amount < 1) {
      setError('Сума повинна бути від 1 грн.');
      return;
    }

    setIsProcessing(true);

    try {
      const res = await client.post('/api/payments/intent', {
        amount,
        campaignId,
        isAnonymous: anon,
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements?.getElement(CardElement)!,
        },
      });

      if (result?.error) {
        setError(result.error.message || 'Помилка оплати');
      } else if (result?.paymentIntent?.status === 'succeeded') {
        navigate('/campaigns');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Сталася помилка. Спробуйте ще раз.');
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="donate-form">
      <div className="donate-form__field">
        <label className="donate-form__label">Сума пожертви</label>
        <input
          type="number"
          className="donate-form__input"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          required
          min={1}
        />
      </div>

      <div className="donate-form__field">
        <label className="donate-form__label">
          <input type="checkbox" checked={anon} onChange={() => setAnon(!anon)} /> Пожертвувати анонімно
        </label>
      </div>

      <div className="donate-form__field">
        <label className="donate-form__label">Дані картки</label>
        <CardElement />
      </div>

      {error && <div className="donate-form__error">{error}</div>}

      <button type="submit" className="primary-btn donate-form__button" disabled={isProcessing}>
        {isProcessing ? 'Обробка...' : 'Надіслати пожертву'}
      </button>
    </form>
  );
};
