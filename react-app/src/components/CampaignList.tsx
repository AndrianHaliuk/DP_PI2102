import React, { useEffect, useState } from 'react';
import { useCampaigns } from '../hooks/useCampaigns';
import { CampaignCard } from './CampaignCard';
import { Campaign } from '../types';
import { Tabs, Tab, Box, Typography } from '@mui/material';

interface CampaignListProps {
  forceRefetch?: boolean;
}

export const CampaignList: React.FC<CampaignListProps> = ({
  forceRefetch = false,
}) => {
  const { data, isLoading, error, refetch } = useCampaigns();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [tabIndex, setTabIndex] = useState(0);

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

  const handleTabChange = (_: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  if (isLoading) return <div>Loading campaigns...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!campaigns || campaigns.length === 0) return <div>No campaigns yet.</div>;

  const active = campaigns.filter((c) => !c.isClosed);
  const closed = campaigns.filter((c) => c.isClosed);

  const renderList = (list: Campaign[]) =>
    list.length ? (
      list.map((c) => (
        <CampaignCard
          key={c.id}
          campaign={c}
          onDeleted={handleCampaignDeleted}
        />
      ))
    ) : (
      <Typography variant="body1" sx={{ p: 2 }}>
        Немає кампаній у цьому розділі.
      </Typography>
    );

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Активні збори" />
        <Tab label="Завершені збори" />
      </Tabs>

      <Box sx={{ mt: 3, display: tabIndex === 0 ? 'block' : 'none' }}>
        {renderList(active)}
      </Box>
      <Box sx={{ mt: 3, display: tabIndex === 1 ? 'block' : 'none' }}>
        {renderList(closed)}
      </Box>
    </Box>
  );
};
