import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion'; // Added for animations

// Define the props interface
interface ProfileCardProps {
  name: string;
  age: number;
  bio?: string;
  hobbies: string[];
  image?: string;
  matchScore?: number;
  matchReason?: string;
  branch?: 'AIML' | 'CSDS' | 'CSBS';
  purpose?: 'Study' | 'Fun' | 'Both';
}

// Functional component
const ProfileCard = ({
  name,
  age,
  bio,
  hobbies,
  image,
  matchScore,
  matchReason,
  branch,
  purpose,
}: ProfileCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-sm mx-auto"
    >
      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative group">
          <Avatar className="w-full h-64 object-cover">
            <AvatarImage src={image || '/default-profile.png'} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          {matchScore !== undefined && (
            <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg text-sm font-medium text-pink-500">
              {matchScore}% Match
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{name}</h3>
              <p className="text-gray-500">{age} years old</p>
            </div>
          </div>

          {purpose && (
            <div className="flex gap-2 mb-3">
              <Badge
                variant="outline"
                className={cn(
                  purpose === 'Study'
                    ? 'bg-blue-50 text-blue-800'
                    : purpose === 'Fun'
                    ? 'bg-green-50 text-green-800'
                    : 'bg-amber-50 text-amber-800'
                )}
              >
                For: {purpose}
              </Badge>
            </div>
          )}

          {bio && <p className="text-gray-600 text-sm mb-4 line-clamp-2">{bio}</p>}

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