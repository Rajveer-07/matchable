
import { toast } from '@/hooks/use-toast';

// Types
export interface UserProfile {
  id?: string;
  name: string;
  bio: string;
  hobbies: string[];
  routine: string;
  imageUrl: string;
  createdAt?: Date;
}

// Simulated database - would be replaced with actual database in production
let profiles: UserProfile[] = [
  {
    id: '1',
    name: 'Alexis Morgan',
    bio: 'Adventure seeker and food enthusiast. Always looking for the next mountain to climb.',
    hobbies: ['Photography', 'Hiking', 'Cooking'],
    routine: 'Early riser, morning workout, work as a freelance photographer, cooking dinner.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format',
    createdAt: new Date('2023-06-15')
  },
  {
    id: '2',
    name: 'James Wilson',
    bio: 'Bookworm by day, jazz enthusiast by night. Let\'s discuss novels over coffee.',
    hobbies: ['Cycling', 'Reading', 'Jazz'],
    routine: 'Reading in the morning, work at the library, jazz club on weekends.',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format',
    createdAt: new Date('2023-07-20')
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    bio: 'Creative soul with a passion for colors and movement. Always planning my next trip.',
    hobbies: ['Painting', 'Yoga', 'Travel'],
    routine: 'Morning yoga, work as a graphic designer, painting in the evening.',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format',
    createdAt: new Date('2023-08-05')
  },
  {
    id: '4',
    name: 'Michael Chen',
    bio: 'Gamer and foodie. I can make a mean pasta while discussing film theory.',
    hobbies: ['Gaming', 'Cooking', 'Movies'],
    routine: 'Late riser, work in IT, gaming sessions at night, weekend cooking experiments.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format',
    createdAt: new Date('2023-09-12')
  },
  {
    id: '5',
    name: 'Sophia Kim',
    bio: 'Dancer with a camera and a sweet tooth. Always in motion, always creating.',
    hobbies: ['Dancing', 'Photography', 'Baking'],
    routine: 'Dance practice in the morning, work as a dance instructor, photography on weekends.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format',
    createdAt: new Date('2023-10-18')
  },
  {
    id: '6',
    name: 'David Martinez',
    bio: 'Marathon runner and music producer. Let\'s grab a coffee and talk about beats.',
    hobbies: ['Running', 'Music', 'Coffee'],
    routine: 'Morning run, work in music production, coffee shop hopping in the afternoon.',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format',
    createdAt: new Date('2023-11-02')
  },
  {
    id: '7',
    name: 'Olivia Johnson',
    bio: 'Plant mom and book enthusiast. I can recommend a podcast for any mood.',
    hobbies: ['Gardening', 'Reading', 'Podcasts'],
    routine: 'Gardening in the morning, work as a writer, reading before bed.',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format',
    createdAt: new Date('2023-12-09')
  },
  {
    id: '8',
    name: 'Ethan Williams',
    bio: 'Ocean lover and yoga instructor. Finding balance between waves and poses.',
    hobbies: ['Surfing', 'Yoga', 'Photography'],
    routine: 'Sunrise surfing, teaching yoga classes, photography in the golden hour.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format',
    createdAt: new Date('2024-01-15')
  }
];

// Simulate API delays for realistic user experience
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get all profiles
export const getAllProfiles = async (): Promise<UserProfile[]> => {
  await delay(800);
  return [...profiles];
};

// Get profile by ID
export const getProfileById = async (id: string): Promise<UserProfile | null> => {
  await delay(500);
  const profile = profiles.find(p => p.id === id);
  return profile || null;
};

// Create new profile
export const createProfile = async (profile: Omit<UserProfile, 'id' | 'createdAt'>): Promise<UserProfile> => {
  await delay(1500);
  
  const newProfile: UserProfile = {
    ...profile,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date()
  };
  
  profiles = [...profiles, newProfile];
  return newProfile;
};

// Update existing profile
export const updateProfile = async (profile: UserProfile): Promise<UserProfile> => {
  await delay(1000);
  
  if (!profile.id) {
    throw new Error('Profile ID is required for updates');
  }
  
  const index = profiles.findIndex(p => p.id === profile.id);
  if (index === -1) {
    throw new Error('Profile not found');
  }
  
  profiles[index] = profile;
  return profile;
};

// Delete profile
export const deleteProfile = async (id: string): Promise<boolean> => {
  await delay(800);
  
  const initialLength = profiles.length;
  profiles = profiles.filter(p => p.id !== id);
  
  return profiles.length < initialLength;
};
