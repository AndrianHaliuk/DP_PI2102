import React from 'react';
import { useCampaigns } from '../hooks/useCampaigns';
import { Campaign } from '../types';

export const CampaignList: React.FC = () => {
  const { data: campaigns, isLoading, error } = useCampaigns();

  if (isLoading) return <div>Loading campaigns...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!campaigns || campaigns.length === 0) return <div>No campaigns yet.</div>;

  return (
    <div className="campaign-list">
      {campaigns.map((c: Campaign) => {
        const percent = Math.min((c.currentAmount / c.goalAmount) * 100, 100);
        return (
          <div key={c.id} className="campaign-card">
            <div className="campaign-card__header">{c.title}</div>
            <div className="campaign-card__body">
              <p>{c.description}</p>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${percent}%` }} />
            </div>
            <div className="campaign-card__footer">
              <span>{percent.toFixed(0)}%</span>
              <a href={`/campaigns/${c.id}`} className="primary-btn">Пожертвувати</a>
            </div>
          </div>
        );
      })}
    </div>
  );
};