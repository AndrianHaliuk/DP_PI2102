import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import type { Campaign } from '../types';

interface DonateDto {
  amount: number;
  campaignId: number;
  isAnonymous: boolean;
}

export const DonateForm: React.FC<{ campaignId: number }> = ({ campaignId }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const queryClient = useQueryClient();

  const [amount, setAmount] = useState(0);
  const [anon, setAnon] = useState(false);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const mutation = useMutation<AxiosResponse<any>, Error, DonateDto>({
    mutationFn: dto => client.post('/api/payments/intent', dto),
    onSuccess: async (res, dto) => {
      const clientSecret = res.data.clientSecret;

      try {
        const result = await stripe!.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements!.getElement(CardElement)!,
          },
        });

        if (result?.paymentIntent?.status === 'succeeded') {
          queryClient.setQueryData<Campaign[]>(['campaigns'], old =>
            old?.map(c =>
              c.id === dto.campaignId
                ? { ...c, currentAmount: c.currentAmount + dto.amount }
                : c
            ) ?? []
          );

          setShowThankYou(true);

          setTimeout(() => {
            setShowThankYou(false);
            setIsProcessing(false);

            navigate('/campaigns');
          }, 2000);
        } else {
          throw new Error('Платіж не пройшов. Спробуйте ще раз.');
        }
      } catch (err: any) {
        setError(err.message || 'Сталася помилка при оплаті.');
        setIsProcessing(false);
      }
    },
    onError: err => {
      setError(err.message || 'Сталася помилка. Спробуйте ще раз.');
      setIsProcessing(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (amount < 1) {
      setError('Сума повинна бути від 1 грн.');
      return;
    }
    setIsProcessing(true);
    mutation.mutate({ amount, campaignId, isAnonymous: anon });
  };

  return (
    <>
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
            <input type="checkbox" checked={anon} onChange={() => setAnon(!anon)} />
            Пожертвувати анонімно
          </label>
        </div>
        <div className="donate-form__field">
          <label className="donate-form__label">Дані картки</label>
          <CardElement />
        </div>
        {error && <div className="donate-form__error">{error}</div>}
        <button
          type="submit"
          className="primary-btn donate-form__button"
          disabled={isProcessing || !stripe || !elements}
        >
          {isProcessing ? 'Обробка...' : 'Надіслати пожертву'}
        </button>
      </form>

      <div className={`thank-you-overlay ${showThankYou ? 'show' : ''}`}>
        <div className="thank-you-content">
          <div className="heart">💖</div>
          <div className="message">Дякуємо за донат!</div>
        </div>
      </div>

    </>
  );
};
