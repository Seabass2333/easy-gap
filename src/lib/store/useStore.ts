import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  User,
  GapEntry,
  Achievement,
  Community,
  Message
} from '@/lib/types';

interface AppState {
  // Auth state
  user: User | null;
  isAuthenticated: boolean;

  // Data
  gapEntries: GapEntry[];
  achievements: Achievement[];
  communities: Community[];
  messages: Message[];

  // Actions
  login: (user: User) => void;
  logout: () => void;
  addGapEntry: (entry: GapEntry) => void;
  updateGapEntry: (id: string, updates: Partial<GapEntry>) => void;
  deleteGapEntry: (id: string) => void;
  addAchievement: (achievement: Achievement) => void;
  toggleAchievement: (id: string) => void;
  joinCommunity: (id: string) => void;
  leaveCommunity: (id: string) => void;
  addMessage: (message: Message) => void;
}

// Mock data
const mockUser: User = {
  id: 'user1',
  name: 'John Doe',
  email: 'john@example.com',
};

const mockGapEntries: GapEntry[] = [
  {
    id: 'entry1',
    date: '2023-04-15',
    mood: 'good',
    activities: ['Learning', 'Exercise'],
    notes: 'Had a productive day learning React and went for a 30 minute run.',
  },
  {
    id: 'entry2',
    date: '2023-04-16',
    mood: 'great',
    activities: ['Networking', 'Reading'],
    notes: 'Attended a virtual meetup and read 2 chapters of "Atomic Habits".',
  },
];

const mockAchievements: Achievement[] = [
  {
    id: 'ach1',
    title: 'First Week Completed',
    description: 'Completed your first week of gap management!',
    date: '2023-04-10',
    completed: true,
  },
  {
    id: 'ach2',
    title: 'Learn a New Skill',
    description: 'Add a new skill to your profile',
    date: '2023-04-20',
    completed: false,
  },
];

const mockCommunities: Community[] = [
  {
    id: 'comm1',
    name: 'Career Changers',
    members: 1245,
    isJoined: true,
  },
  {
    id: 'comm2',
    name: 'Tech Professionals',
    members: 3872,
    isJoined: false,
  },
];

const mockMessages: Message[] = [
  {
    id: 'msg1',
    senderId: 'user2',
    senderName: 'Jane Smith',
    content: 'Hey, have you checked out the new learning resources?',
    timestamp: '2023-04-16T10:30:00Z',
  },
  {
    id: 'msg2',
    senderId: 'user3',
    senderName: 'Mike Johnson',
    content: 'The webinar tomorrow looks interesting!',
    timestamp: '2023-04-16T14:45:00Z',
  },
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      gapEntries: mockGapEntries,
      achievements: mockAchievements,
      communities: mockCommunities,
      messages: mockMessages,

      // Actions
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),

      addGapEntry: (entry) =>
        set((state) => ({ gapEntries: [...state.gapEntries, entry] })),

      updateGapEntry: (id, updates) =>
        set((state) => ({
          gapEntries: state.gapEntries.map((entry) =>
            entry.id === id ? { ...entry, ...updates } : entry
          ),
        })),

      deleteGapEntry: (id) =>
        set((state) => ({
          gapEntries: state.gapEntries.filter((entry) => entry.id !== id),
        })),

      addAchievement: (achievement) =>
        set((state) => ({ achievements: [...state.achievements, achievement] })),

      toggleAchievement: (id) =>
        set((state) => ({
          achievements: state.achievements.map((ach) =>
            ach.id === id ? { ...ach, completed: !ach.completed } : ach
          ),
        })),

      joinCommunity: (id) =>
        set((state) => ({
          communities: state.communities.map((comm) =>
            comm.id === id ? { ...comm, isJoined: true } : comm
          ),
        })),

      leaveCommunity: (id) =>
        set((state) => ({
          communities: state.communities.map((comm) =>
            comm.id === id ? { ...comm, isJoined: false } : comm
          ),
        })),

      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
    }),
    {
      name: 'gaprise-storage',
    }
  )
); 