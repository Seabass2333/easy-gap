export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface GapEntry {
  id: string;
  date: string;
  mood: 'great' | 'good' | 'neutral' | 'bad' | 'terrible';
  activities: string[];
  notes: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

export interface Community {
  id: string;
  name: string;
  avatar?: string;
  members: number;
  isJoined: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
} 