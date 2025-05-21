import React, { useState, useEffect } from 'react';
import { Campaign } from '../types';
import TopDonorsMarquee from './TopDonorsMarquee';
const BASE_URL = import.meta.env.VITE_API_URL;

interface CampaignCardProps {
  campaign: Campaign & {
    isClosed: boolean;
    topDonors?: { name: string; amount: number }[];
  };
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const targetPercent = Math.min(
    (campaign.currentAmount / campaign.goalAmount) * 100,
    100
  );

  // Локальний стейт для анімації прогресу
  const [width, setWidth] = useState('0%');
  useEffect(() => {
    const t = setTimeout(() => setWidth(`${targetPercent}%`), 50);
    return () => clearTimeout(t);
  }, [targetPercent]);

  // Обчислюємо, скільки ще потрібно зібрати
  const remaining = Math.max(campaign.goalAmount - campaign.currentAmount, 0);

  return (
    <div
      className={`campaign-card ${
        campaign.isClosed ? 'closed' : ''
      } priority-${campaign.priority}`}
    >
      <div className="campaign-card__content">
        {campaign.imageUrl && (
          <div className="campaign-card__image-wrapper">
            <img
              src={`${BASE_URL}${campaign.imageUrl}`}
              alt={campaign.title}
              className="campaign-card__image"
            />
          </div>
        )}
        <div className="campaign-card__info">
          <h2 className="campaign-card__header">{campaign.title}</h2>
          <p className="campaign-card__description">{campaign.description}</p>
          <p className="campaign-card__goal">
            Ціль: {campaign.goalAmount.toLocaleString()} ₴
          </p>
          {remaining > 0 && !campaign.isClosed && (
            <p className="campaign-card__remaining">
              Залишилося зібрати: {remaining.toLocaleString()} ₴
            </p>
          )}
          {campaign.priority === 1 && (
            <p className="campaign-card__priority">Терміновий збір</p>
          )}
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width }} />
      </div>
      <span className="campaign-card__percent">
        {targetPercent.toFixed(0)}%
      </span>

      <div className="top-donors-footer">
        {campaign.topDonors?.length ? (
          <>
            <h4 className="thank-you-title">Дякуюємо❤️</h4>
            <TopDonorsMarquee donors={campaign.topDonors} />
          </>
        ) : null}

        {campaign.isClosed ? (
          <div className="campaign-status">Завершено!</div>
        ) : (
          <a href={`/campaigns/${campaign.id}`} className="primary-btn">
            Задонатити
          </a>
        )}
      </div>
    </div>
  );
};
