
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Instagram, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { likeProfile } from '@/services/databaseService';
import { useToast } from '@/hooks/use-toast';

// Helper function to calculate age from DOB
const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Define the props interface
interface ProfileCardProps {
  id: string;
  name: string;
  image: string;
  hobbies: string[];
  bio: string;
  index?: number;
  matchScore?: number;
  matchReason?: string;
  showBranchPropose?: boolean;
  dob?: string;
  branch?: 'AIML' | 'CSDS' | 'CSBS';
  purpose?: 'Study' | 'Fun' | 'Both';
  age?: number;
  instagramId?: string;
  likeCount?: number;
  isLiked?: boolean;
  onLikeUpdate?: () => void;
}

const ProfileCard = ({
  id,
  name,
  image,
  hobbies,
  bio,
  index = 0,
  matchScore,
  matchReason,
  showBranchPropose = false,
  dob,
  branch,
  purpose,
  age,
  instagramId,
  likeCount = 0,
  isLiked = false,
  onLikeUpdate,
}: ProfileCardProps) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // Handle fallback image if the provided image fails to load
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format';
  };

  // Calculate age if DOB is provided and age is not directly passed
  const displayAge = age !== undefined ? age : (dob ? calculateAge(dob) : undefined);

  const handleInstagramClick = () => {
    if (instagramId) {
      window.open(`https://instagram.com/${instagramId}`, '_blank');
    }
  };

  const handleLikeClick = async () => {
    try {
      await likeProfile(id);
      toast({
        title: isLiked ? "Removed like" : "Profile liked",
        description: isLiked 
          ? `You've removed your like from ${name}'s profile` 
          : `You've liked ${name}'s profile`,
      });
      
      // Call the callback to refresh data if provided
      if (onLikeUpdate) {
        onLikeUpdate();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem updating your like",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
        <div className="relative group">
          <div className="w-full h-64 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={handleImageError}
            />
          </div>
          
          {matchScore !== undefined && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-purple-600 hover:bg-purple-700">
                {matchScore}% Match
              </Badge>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <CardContent className="p-5">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{name}</h3>
              {displayAge !== undefined && <p className="text-gray-500">{displayAge} years old</p>}
            </div>
            
            {/* Display like count */}
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4 text-pink-500" fill={isLiked ? "#ec4899" : "none"} />
              <span className="text-sm font-medium">{likeCount}</span>
            </div>
          </div>
          
          {/* Display Branch and Purpose information prominently */}
          <div className="flex flex-wrap gap-2 mb-3">
            {branch && (
              <Badge variant="outline" className="bg-purple-50 text-purple-800 font-medium">
                Branch: {branch}
              </Badge>
            )}
            
            {purpose && (
              <Badge
                variant="outline"
                className={cn(
                  purpose === 'Study'
                    ? 'bg-blue-50 text-blue-800'
                    : purpose === 'Fun'
                    ? 'bg-green-50 text-green-800'
                    : 'bg-amber-50 text-amber-800',
                  'font-medium'
                )}
              >
                For: {purpose}
              </Badge>
            )}
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{bio}</p>
          
          {matchScore !== undefined && (
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Compatibility</span>
                <span className="font-medium">{matchScore}%</span>
              </div>
              <Progress value={matchScore} className="h-1.5" />
              {matchReason && <p className="text-xs text-gray-500 mt-1.5">{matchReason}</p>}
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mt-2">
            {hobbies.map((hobby, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className={cn(
                  'bg-black/5 hover:bg-black/10 text-black',
                  idx % 3 === 0 && 'bg-pink-50 hover:bg-pink-100 text-pink-800',
                  idx % 3 === 1 && 'bg-blue-50 hover:bg-blue-100 text-blue-800',
                  idx % 3 === 2 && 'bg-amber-50 hover:bg-amber-100 text-amber-800'
                )}
              >
                {hobby}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 flex justify-between">
          <button 
            onClick={handleLikeClick}
            className={cn(
              "transition-colors duration-300 flex items-center gap-1 text-sm",
              isLiked ? "text-pink-600 hover:text-pink-700" : "text-gray-800 hover:text-pink-600"
            )}
          >
            <Heart className="h-4 w-4" fill={isLiked ? "#ec4899" : "none"} />
            <span>{isLiked ? "Liked" : "Like"}</span>
          </button>
          
          {instagramId && (
            <button 
              onClick={handleInstagramClick} 
              className="text-gray-800 hover:text-pink-600 transition-colors duration-300 flex items-center gap-1 text-sm cursor-pointer"
            >
              <Instagram className="h-4 w-4" />
              <span>Instagram</span>
            </button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProfileCard;