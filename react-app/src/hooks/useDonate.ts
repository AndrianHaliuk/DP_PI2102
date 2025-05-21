import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../api/client';
import type { AxiosResponse } from 'axios';

interface DonateDto {
  campaignId: number;
  amount: number;
  isAnonymous?: boolean;
}

export const useDonate = () => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, Error, DonateDto>({
    mutationFn: (dto: DonateDto) => client.post('/donations', dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });
};
