import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../api/client';
import { UpdateUserProfileDto, UserProfile, Donation } from '../types';

export const useProfile = () =>
  useQuery<UserProfile>({
    queryKey: ['user-profile'],
    queryFn: () => client.get('/user-profile/me').then(res => res.data),
  });

export const useUpdateProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateUserProfileDto) =>
      client.put('/user-profile/me', dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['user-profile'] }),
  });
};

export const useMyDonations = () =>
  useQuery<Donation[]>({
    queryKey: ['my-donations'],
    queryFn: () =>
      client.get('/user-profile/me/donations').then(res => res.data),
  });

export const useDonationSummary = () =>
  useQuery<number>({
    queryKey: ['donation-summary'],
    queryFn: () =>
      client.get('/user-profile/me/donations/summary').then(res => res.data),
  });
