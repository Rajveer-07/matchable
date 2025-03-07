
import React, { useState, useEffect } from 'react';
import {
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Heart,
  Users,
  X
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getTopLikedProfiles, UserProfile } from '@/services/databaseService';
import { useIsMobile } from '@/hooks/use-mobile';

interface FriendshipLeaderboardProps {
  openCallback?: (isOpen: boolean) => void;
}

const FriendshipLeaderboard = ({ openCallback }: FriendshipLeaderboardProps) => {
  const [topProfiles, setTopProfiles] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useIsMobile();

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    try {
      const profiles = await getTopLikedProfiles(5);
      setTopProfiles(profiles);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data immediately when component mounts
    fetchLeaderboard();
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (openCallback && !open) {
      openCallback(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center" onClick={() => handleOpenChange(false)}>
      <div className="w-80 bg-white rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="px-4 py-3 bg-black text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-xl flex items-center gap-2">
              <Trophy className="h-5 w-5 text-pink-400" />
              Friendship Leaderboard
            </h3>
            <div 
              onClick={() => handleOpenChange(false)}
              className="h-7 w-7 rounded-full hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
            >
              <X className="h-4 w-4" />
            </div>
          </div>
          <p className="text-xs text-white/90 mt-1">
            Top profiles with the most likes
          </p>
        </div>
        
        <div className="p-2 max-h-[350px] overflow-auto">
          {isLoading ? (
            <div className="flex justify-center items-center p-4">
              <div className="animate-spin h-6 w-6 border-2 border-pink-500 border-t-transparent rounded-full"></div>
            </div>
          ) : (
            topProfiles.map((profile, index) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <div className={cn(
                  "flex items-center gap-3 p-3 rounded-md transition-all hover:bg-gray-50",
                  index === 0 ? "bg-pink-50" : ""
                )}>
                  <div className="relative">
                    <Avatar className="h-12 w-12 border-2 border-pink-200">
                      <AvatarImage src={profile.imageUrl} alt={profile.name} />
                      <AvatarFallback>{profile.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    {index < 3 && (
                      <div className="absolute -top-1 -right-1 bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center gap-1">
                      <h4 className="font-medium text-sm truncate">{profile.name}</h4>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 truncate">
                      <p>{profile.branch}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1 bg-pink-100 text-pink-800 px-2 py-1 rounded-full">
                      <Heart className="h-3.5 w-3.5 text-pink-500" fill="#ec4899" />
                      <span className="font-bold text-sm">{profile.likeCount}</span>
                    </div>
                  </div>
                </div>
                {index < topProfiles.length - 1 && <Separator className="my-2" />}
              </motion.div>
            ))
          )}
          
          {!isLoading && topProfiles.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>No profiles yet</p>
              <p className="text-xs">Be the first to like a profile!</p>
            </div>
          )}
        </div>
        
        <div className="p-3 bg-black/5 rounded-b-lg">
          <p className="text-sm text-center text-gray-700 font-medium">
            Like profiles to boost their friendship score!
          </p>
        </div>
      </div>
    </div>
  );
};

export default FriendshipLeaderboard;