import React, { useEffect } from 'react';
import { useCampaigns } from '../hooks/useCampaigns';
import { CampaignCard } from './CampaignCard';

interface CampaignListProps {
  forceRefetch?: boolean;
}

export const CampaignList: React.FC<CampaignListProps> = ({
  forceRefetch = false,
}) => {
  const { data: campaigns, isLoading, error, refetch } = useCampaigns();

  useEffect(() => {
    if (forceRefetch) refetch();
  }, [forceRefetch, refetch]);

  if (isLoading) return <div>Loading campaigns...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!campaigns || campaigns.length === 0) return <div>No campaigns yet.</div>;

  return (
    <div className="campaign-list">
      {campaigns.map(c => (
        <CampaignCard key={c.id} campaign={c} />
      ))}
    </div>
  );
};