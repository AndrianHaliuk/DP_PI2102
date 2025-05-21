export interface Campaign {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  goalAmount: number;
  currentAmount: number;
  priority: number;
  isClosed: boolean;
  createdAt: Date;
  topDonors?: {
    name: string;
    amount: number;
  }[];
}
  export interface User {
    id: number;
    email: string;
    name?: string;
    role: string;
    createdAt: string;
  }
  
export interface UserProfile {
  id: number;
  userId: number;
  bio?: string;
  avatarUrl?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  user: {
    name?: string;
    email: string;
  };
}
  
  export interface Donation {
    id: number;
    amount: number;
    isAnonymous: boolean;
    campaign: { id: number; title: string };
    createdAt: string;
  }
  
  export interface UpdateUserProfileDto {
    bio?: string;
    avatarUrl?: string;
    phone?: string;
    address?: string;
  }