
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface ProfileCardProps {
  name: string;
  image: string;
  hobbies: string[];
  bio?: string;
  index?: number;
  matchScore?: number;
  matchReason?: string;
}

const ProfileCard = ({ 
  name, 
  image, 
  hobbies, 
  bio, 
  index = 0,
  matchScore,
  matchReason
}: ProfileCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ y: -5 }}
      className="w-full"
    >
      <Card className="overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-500 h-full">
        <div className="relative w-full overflow-hidden aspect-[4/5]">
          <img 
            src={image} 
            alt={name} 
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
          />
          
          {matchScore !== undefined && (
            <div className="absolute top-3 right-3 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
              {matchScore}% Match
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-playfair text-xl font-medium">{name}</h3>
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>{name[0]}</AvatarFallback>
            </Avatar>
          </div>
          
          {bio && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{bio}</p>
          )}
          
          {matchScore !== undefined && (
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Compatibility</span>
                <span className="font-medium">{matchScore}%</span>
              </div>
              <Progress value={matchScore} className="h-1.5" />
              {matchReason && (
                <p className="text-xs text-gray-500 mt-1.5">{matchReason}</p>
              )}
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mt-2">
            {hobbies.map((hobby, idx) => (
              <Badge 
                key={idx} 
                variant="secondary"
                className={cn(
                  "bg-black/5 hover:bg-black/10 text-black",
                  idx % 3 === 0 && "bg-pink-50 hover:bg-pink-100 text-pink-800",
                  idx % 3 === 1 && "bg-blue-50 hover:bg-blue-100 text-blue-800",
                  idx % 3 === 2 && "bg-amber-50 hover:bg-amber-100 text-amber-800"
                )}
              >
                {hobby}
              </Badge>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between border-t border-gray-100 mt-2">
          <button className="text-gray-600 hover:text-pink-500 transition-colors duration-300 flex items-center gap-1">
            <Heart className="h-4 w-4" />
            <span className="text-xs">Connect</span>
          </button>
          
          <button className="text-gray-600 hover:text-blue-500 transition-colors duration-300 flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">Message</span>
          </button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProfileCard;
