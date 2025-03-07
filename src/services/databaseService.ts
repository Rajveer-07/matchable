
export interface UserProfile {
  id: string;
  name: string;
  bio: string;
  branch?: 'AIML' | 'CSDS' | 'CSBS';
  purpose?: 'Study' | 'Fun' | 'Both';
  hobbies: string[];
  routine?: string;
  imageUrl: string;
  dob?: string;
  createdAt?: Date;
  instagramId?: string;
  likeCount?: number;
  isLiked?: boolean;
}

// Sample profiles for development
let profiles: UserProfile[] = [
  {
    id: '1',
    name: 'Prashant Parmar',
    bio: 'Adventure seeker and food enthusiast. Always looking for the next mountain to climb.',
    branch: 'AIML',
    purpose: 'Study',
    hobbies: ['Gaming', 'Football', 'Travel'],
    routine: 'Morning hikes, work as a software engineer, cooking experiments in the evening.',
    imageUrl: 'https://i.postimg.cc/QxLfFRMv/temp-Imagee5-Fhxb.avif',
    instagramId: 'pras_hanntt_',
    createdAt: new Date('2023-09-15'),
    likeCount: 32,
    isLiked: false
  },
  {
    id: '2',
    name: 'Rajveer dangi',
    bio: 'Creative soul with a passion for colors and movement. Always planning my next trip.',
    branch: 'AIML',
    purpose: 'Both',
    hobbies: ['Reading', 'Traveling', 'Coffee'],
    routine: 'Reading at coffee shops, work as a literature professor, jazz clubs on weekends.',
    imageUrl: 'https://i.postimg.cc/mDWmkqvd/face-swap.png',
    instagramId: 'rajveerrdangi',
    createdAt: new Date('2023-10-05'),
    likeCount: 47,
    isLiked: false
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    bio: 'Creative soul with a passion for colors and movement. Always planning my next trip.',
    branch: 'CSBS',
    purpose: 'Both',
    hobbies: ['Painting', 'Yoga', 'Travel'],
    routine: 'Morning yoga, work as a graphic designer, painting in the evening.',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format',
    instagramId: 'rajveerrdangi',
    createdAt: new Date('2023-10-20'),
    likeCount: 29,
    isLiked: false
  },
  {
    id: '4',
    name: 'Michael Chen',
    bio: 'Gamer and foodie. I can make a mean pasta while discussing film theory.',
    branch: 'AIML',
    purpose: 'Fun',
    hobbies: ['Gaming', 'Cooking', 'Movies'],
    routine: 'Gaming in the morning, work as a chef, watching movies at night.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format',
    instagramId: 'rajveerrdangi',
    createdAt: new Date('2023-11-01'),
    likeCount: 18,
    isLiked: false
  },
  {
    id: '5',
    name: 'Sophia Lee',
    bio: 'Music lover and baker extraordinaire. My playlists and pastries are equally sweet.',
    branch: 'CSDS',
    purpose: 'Study',
    hobbies: ['Music', 'Baking', 'Hiking'],
    routine: 'Morning baking, work as a sound engineer, hiking on weekends.',
    imageUrl: 'https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=400&auto=format',
    instagramId: '',
    createdAt: new Date('2023-12-15'),
    likeCount: 22,
    isLiked: false
  },
  {
    id: '6',
    name: 'David Martinez',
    bio: 'Marathon runner and music producer. Let\'s grab a coffee and talk about beats.',
    branch: 'CSBS',
    purpose: 'Both',
    hobbies: ['Running', 'Music', 'Coffee'],
    routine: 'Morning run, work in music production, coffee shop hopping in the afternoon.',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format',
    instagramId: '',
    createdAt: new Date('2023-11-02'),
    likeCount: 15,
    isLiked: false
  },
  {
    id: '7',
    name: 'Olivia Johnson',
    bio: 'Plant mom and book enthusiast. I can recommend a podcast for any mood.',
    branch: 'AIML',
    purpose: 'Fun',
    hobbies: ['Gardening', 'Reading', 'Podcasts'],
    routine: 'Gardening in the morning, work as a writer, reading before bed.',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format',
    instagramId: '',
    createdAt: new Date('2023-12-09'),
    likeCount: 11,
    isLiked: false
  },
  {
    id: '8',
    name: 'Ethan Williams',
    bio: 'Ocean lover and yoga instructor. Finding balance between waves and poses.',
    branch: 'CSDS',
    purpose: 'Study',
    hobbies: ['Surfing', 'Yoga', 'Photography'],
    routine: 'Sunrise surfing, teaching yoga classes, photography in the golden hour.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format',
    instagramId: '',
    createdAt: new Date('2024-01-15'),
    likeCount: 7,
    isLiked: false
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
    createdAt: new Date(),
    likeCount: 0,
    isLiked: false
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

// Like a profile
export const likeProfile = async (id: string): Promise<UserProfile> => {
  await delay(300);

  const index = profiles.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error('Profile not found');
  }

  // Toggle like state
  const isCurrentlyLiked = profiles[index].isLiked || false;
  
  profiles[index] = {
    ...profiles[index],
    isLiked: !isCurrentlyLiked,
    likeCount: (profiles[index].likeCount || 0) + (isCurrentlyLiked ? -1 : 1)
  };
  
  return profiles[index];
};

// Get top liked profiles (for leaderboard)
export const getTopLikedProfiles = async (limit: number = 5): Promise<UserProfile[]> => {
  await delay(500);
  
  // Sort by like count in descending order and take the top 'limit' profiles
  return [...profiles]
    .sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0))
    .slice(0, limit);
};