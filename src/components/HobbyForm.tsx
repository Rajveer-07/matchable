
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Search, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface HobbyFormProps {
  onSubmit: (hobbies: string[], keywords: string[], branch?: string, purpose?: string) => void;
}

// Common hobbies for suggestions
const suggestedHobbies = [
  'Reading', 'Cooking', 'Hiking', 'Photography', 'Gaming', 
  'Traveling', 'Yoga', 'Painting', 'Running', 'Dancing', 
  'Music', 'Cycling', 'Swimming', 'Gardening', 'Meditation'
];

const HobbyForm = ({ onSubmit }: HobbyFormProps) => {
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [currentHobby, setCurrentHobby] = useState('');
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [branch, setBranch] = useState<string>('AIML');
  const [purpose, setPurpose] = useState<string>('Study');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddHobby = () => {
    if (currentHobby.trim() && hobbies.length < 3) {
      setHobbies([...hobbies, currentHobby.trim()]);
      setCurrentHobby('');
    }
  };

  const handleAddKeyword = () => {
    if (currentKeyword.trim() && keywords.length < 5) {
      setKeywords([...keywords, currentKeyword.trim()]);
      setCurrentKeyword('');
    }
  };

  const handleRemoveHobby = (index: number) => {
    setHobbies(hobbies.filter((_, i) => i !== index));
  };

  const handleRemoveKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hobbies.length > 0) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        onSubmit(hobbies, keywords, branch, purpose);
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleSuggestionClick = (hobby: string) => {
    if (hobbies.length < 3 && !hobbies.includes(hobby)) {
      setHobbies([...hobbies, hobby]);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-md font-medium">Branch</Label>
            <RadioGroup 
              value={branch} 
              onValueChange={setBranch}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="AIML" id="AIML" />
                <Label htmlFor="AIML" className="cursor-pointer">AIML</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="CSDS" id="CSDS" />
                <Label htmlFor="CSDS" className="cursor-pointer">CSDS</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="CSBS" id="CSBS" />
                <Label htmlFor="CSBS" className="cursor-pointer">CSBS</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-md font-medium">For</Label>
            <RadioGroup 
              value={purpose} 
              onValueChange={setPurpose}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Study" id="Study" />
                <Label htmlFor="Study" className="cursor-pointer">Study</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Fun" id="Fun" />
                <Label htmlFor="Fun" className="cursor-pointer">Fun</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-md font-medium">Your Top 3 Hobbies</Label>
            <span className="text-sm text-gray-500">{hobbies.length}/3</span>
          </div>
          
          <div className="flex gap-2">
            <Input
              value={currentHobby}
              onChange={(e) => setCurrentHobby(e.target.value)}
              placeholder="Add a hobby..."
              disabled={hobbies.length >= 3}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddHobby();
                }
              }}
              className="focus-visible:ring-offset-0 focus-visible:ring-black/20"
            />
            <Button
              type="button"
              onClick={handleAddHobby}
              disabled={hobbies.length >= 3 || !currentHobby.trim()}
              size="sm"
              className="transition-all duration-300"
            >
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 min-h-8">
            {hobbies.map((hobby, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1 text-sm bg-black text-white">
                {hobby}
                <button
                  type="button"
                  onClick={() => handleRemoveHobby(index)}
                  className="ml-2 hover:text-white/80"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>

          <div className="pt-2">
            <Label className="text-sm text-gray-500">Suggestions:</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {suggestedHobbies
                .filter(hobby => !hobbies.includes(hobby))
                .slice(0, 6)
                .map((hobby, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="hover:bg-black hover:text-white cursor-pointer transition-colors duration-300"
                    onClick={() => handleSuggestionClick(hobby)}
                  >
                    {hobby}
                  </Badge>
                ))}
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-md font-medium">Add Keywords (Optional)</Label>
            <span className="text-sm text-gray-500">{keywords.length}/5</span>
          </div>
          
          <div className="flex gap-2">
            <Input
              value={currentKeyword}
              onChange={(e) => setCurrentKeyword(e.target.value)}
              placeholder="Add interests, traits..."
              disabled={keywords.length >= 5}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddKeyword();
                }
              }}
              className="focus-visible:ring-offset-0 focus-visible:ring-black/20"
            />
            <Button
              type="button"
              onClick={handleAddKeyword}
              disabled={keywords.length >= 5 || !currentKeyword.trim()}
              size="sm"
              className="transition-all duration-300"
            >
              Add
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 min-h-8">
            {keywords.map((keyword, index) => (
              <Badge key={index} variant="outline" className="px-3 py-1 text-sm">
                {keyword}
                <button
                  type="button"
                  onClick={() => handleRemoveKeyword(index)}
                  className="ml-2 hover:text-black"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={hobbies.length === 0 || isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Finding matches...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Find Matches
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default HobbyForm;
