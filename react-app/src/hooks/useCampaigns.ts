import { useQuery } from '@tanstack/react-query';
import client from '../api/client';
import { Campaign } from '../types';

export const useCampaigns = () =>
  useQuery<Campaign[], Error>({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const { data } = await client.get<Campaign[]>('/campaigns', {
        headers: { 'Cache-Control': 'no-cache' },
      });
      return data;
    },
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });