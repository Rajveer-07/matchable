
import { UserProfile } from './databaseService';

// Types
export interface MatchResult {
  profileId: string;
  score: number;
  matchReason: string;
  commonInterests: string[];
}

export interface AIAnalysisResult {
  matches: MatchResult[];
  summary: string;
  recommendedActivities: string[];
}

// Simulated AI analysis engine
export const analyzeCompatibility = async (
  userHobbies: string[],
  keywords: string[],
  profiles: UserProfile[]
): Promise<AIAnalysisResult> => {
  // Simulate API delay for AI processing
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Convert everything to lowercase for better matching
  const normalizedUserHobbies = userHobbies.map(h => h.toLowerCase());
  const normalizedKeywords = keywords.map(k => k.toLowerCase());
  
  // Process each profile
  const matches = profiles.map(profile => {
    // Normalize profile data
    const profileHobbies = profile.hobbies.map(h => h.toLowerCase());
    const profileBio = profile.bio.toLowerCase();
    const profileRoutine = profile.routine?.toLowerCase() || '';
    
    // Calculate hobby match score (0-1)
    const matchingHobbies = profileHobbies.filter(hobby => 
      normalizedUserHobbies.some(userHobby => 
        hobby.includes(userHobby) || userHobby.includes(hobby)
      )
    );
    
    const hobbyScore = 
      normalizedUserHobbies.length > 0 
        ? matchingHobbies.length / Math.max(normalizedUserHobbies.length, profileHobbies.length)
        : 0;
    
    // Calculate keyword match score (0-1)
    let keywordScore = 0;
    if (normalizedKeywords.length > 0) {
      const keywordMatches = normalizedKeywords.filter(keyword => 
        profileBio.includes(keyword) || 
        profileRoutine.includes(keyword) || 
        profileHobbies.some(h => h.includes(keyword))
      ).length;
      
      keywordScore = keywordMatches / normalizedKeywords.length;
    }
    
    // Calculate final score (weighted)
    const finalScore = hobbyScore * 0.7 + keywordScore * 0.3;
    
    // Generate match reason
    let matchReason = '';
    if (matchingHobbies.length > 0) {
      matchReason = `You both enjoy ${matchingHobbies.slice(0, 2).join(' and ')}`;
      if (keywordScore > 0) {
        matchReason += ` and have similar interests in ${normalizedKeywords.slice(0, 1).join(', ')}`;
      }
    } else if (keywordScore > 0) {
      matchReason = `You may enjoy their interests in ${normalizedKeywords.slice(0, 2).join(' and ')}`;
    } else {
      matchReason = `You might find their profile interesting`;
    }
    
    return {
      profileId: profile.id || '',
      score: parseFloat((finalScore * 100).toFixed(1)),
      matchReason,
      commonInterests: matchingHobbies
    };
  });
  
  // Sort by score (descending)
  matches.sort((a, b) => b.score - a.score);
  
  // Generate recommended activities based on common interests
  const allCommonInterests = matches
    .flatMap(m => m.commonInterests)
    .filter((v, i, a) => a.indexOf(v) === i) // unique values
    .slice(0, 3);
    
  const recommendedActivities = allCommonInterests.map(interest => {
    switch(interest.toLowerCase()) {
      case 'hiking':
        return 'Join a local hiking group for weekend adventures';
      case 'photography':
        return 'Check out the photography exhibition at the downtown gallery';
      case 'cooking':
        return 'Try a cooking class that focuses on international cuisine';
      case 'reading':
        return 'Visit the book club meeting at Central Library on Thursdays';
      case 'yoga':
        return 'Attend the sunrise yoga sessions at Harmony Studio';
      case 'painting':
        return 'Join the art workshop this weekend at Creative Space';
      case 'travel':
        return 'Explore the travel meetup group that plans weekend getaways';
      case 'gaming':
        return 'Check out the board game café that opened downtown';
      case 'music':
        return 'Visit the local jazz club for their amateur night on Wednesdays';
      case 'dancing':
        return 'Try the beginner dance classes at Move Studio on Tuesdays';
      default:
        return `Find local ${interest} events in your area`;
    }
  });
  
  // Generate summary
  let summary = '';
  if (matches.filter(m => m.score > 70).length > 0) {
    summary = `We found some great matches based on your interests in ${userHobbies.join(', ')}!`;
  } else if (matches.filter(m => m.score > 40).length > 0) {
    summary = `We found some potential connections that might share your interests.`;
  } else {
    summary = `We found a few profiles you might want to explore, though they may not perfectly match your interests.`;
  }
  
  return {
    matches: matches,
    summary,
    recommendedActivities
  };
};

// Enhanced matching with personalized insights
export const getPersonalizedInsights = (
  userHobbies: string[],
  matchedProfile: UserProfile
): string => {
  const matchingHobbies = matchedProfile.hobbies.filter(hobby => 
    userHobbies.some(userHobby => 
      hobby.toLowerCase().includes(userHobby.toLowerCase()) || 
      userHobby.toLowerCase().includes(hobby.toLowerCase())
    )
  );
  
  if (matchingHobbies.length === 0) {
    return `While you may not share the same hobbies, ${matchedProfile.name}'s interests in ${
      matchedProfile.hobbies.slice(0, 2).join(' and ')
    } could introduce you to new experiences.`;
  }
  
  const matchedHobby = matchingHobbies[0];
  
  switch(matchedHobby.toLowerCase()) {
    case 'hiking':
      return `You and ${matchedProfile.name} could explore local trails together and discuss your favorite hiking spots.`;
    case 'photography':
      return `Share photography tips and maybe plan a photo walk with ${matchedProfile.name} to capture interesting perspectives.`;
    case 'cooking':
      return `You might enjoy exchanging recipes or cooking a meal together with ${matchedProfile.name}.`;
    case 'reading':
      return `Compare reading lists and favorite authors with ${matchedProfile.name} over coffee.`;
    case 'yoga':
      return `Practice yoga together or recommend your favorite instructors to ${matchedProfile.name}.`;
    case 'travel':
      return `Swap travel stories and destination recommendations with ${matchedProfile.name}.`;
    case 'music':
      return `Share playlists and discuss your favorite artists with ${matchedProfile.name}.`;
    case 'gaming':
      return `You could challenge ${matchedProfile.name} to your favorite games or discover new ones together.`;
    default:
      return `Your shared interest in ${matchedHobby} could be a great starting point for conversations with ${matchedProfile.name}.`;
  }
};
