import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSettings, FiTrash2 } from 'react-icons/fi';
import { AuthContext } from '../contexts/AuthContext';
import client from '../api/client';
import TopDonorsMarquee from './TopDonorsMarquee';
import { Campaign } from '../types';

interface CampaignCardProps {
  campaign: Campaign & {
    isClosed: boolean;
    topDonors?: { name: string; amount: number }[];
  };
  onDeleted?: (id: number) => void;  // новий проп
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onDeleted }) => {
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);

  const targetPercent = Math.min(
    (campaign.currentAmount / campaign.goalAmount) * 100,
    100
  );
  const [width, setWidth] = useState('0%');
  useEffect(() => {
    const t = setTimeout(() => setWidth(`${targetPercent}%`), 50);
    return () => clearTimeout(t);
  }, [targetPercent]);

  const remaining = Math.max(campaign.goalAmount - campaign.currentAmount, 0);

  const handleEdit = () => navigate(`/campaigns/edit/${campaign.id}`);
  const handleDelete = async () => {
    if (!window.confirm('Видалити цю кампанію назавжди?')) return;
    try {
      await client.delete(`/campaigns/${campaign.id}`);
      if (onDeleted) onDeleted(campaign.id);  // повідомляємо батька
    } catch (err) {
      console.error('Помилка видалення кампанії:', err);
    }
  };

  return (
    <div
      className={`campaign-card ${
        campaign.isClosed ? 'closed' : ''
      } priority-${campaign.priority}`}
      style={{ position: 'relative' }}
    >
      {isAdmin && (
        <div
          className="campaign-card__admin-actions"
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            display: 'flex',
            gap: '4px',
          }}
        >
          <button onClick={handleEdit} title="Редагувати" className="icon-btn">
            <FiSettings size={18} />
          </button>
          <button onClick={handleDelete} title="Видалити" className="icon-btn">
            <FiTrash2 size={18} />
          </button>
        </div>
      )}

      <div className="campaign-card__content">
        {campaign.imageUrl && (
          <div className="campaign-card__image-wrapper">
            <img
              src={campaign.imageUrl}
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
      <span className="campaign-card__percent">{targetPercent.toFixed(0)}%</span>

      <div className="top-donors-footer">
        {campaign.topDonors?.length ? (
          <>
            <h4 className="thank-you-title">Дякуємо ❤️</h4>
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
