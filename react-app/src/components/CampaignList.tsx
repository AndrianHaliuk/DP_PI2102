import React, { useEffect, useState } from 'react';
import { useCampaigns } from '../hooks/useCampaigns';
import { CampaignCard } from './CampaignCard';
import { Campaign } from '../types';

interface CampaignListProps {
  forceRefetch?: boolean;
}

export const CampaignList: React.FC<CampaignListProps> = ({
  forceRefetch = false,
}) => {
  const { data, isLoading, error, refetch } = useCampaigns();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    if (forceRefetch) refetch();
  }, [forceRefetch, refetch]);

  useEffect(() => {
    if (data) {
      setCampaigns(data);
    }
  }, [data]);

  const handleCampaignDeleted = (deletedId: number) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== deletedId));
  };

  if (isLoading) return <div>Loading campaigns...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!campaigns || campaigns.length === 0) return <div>No campaigns yet.</div>;

  return (
    <div className="campaign-list">
      {campaigns.map((c) => (
        <CampaignCard key={c.id} campaign={c} onDeleted={handleCampaignDeleted} />
      ))}
    </div>
  );
};
