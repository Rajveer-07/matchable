
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Instagram } from 'lucide-react';

interface InstagramInputProps {
  instagram: string;
  setInstagram: (instagram: string) => void;
}

const InstagramInput = ({ instagram, setInstagram }: InstagramInputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any @ symbol if user adds it
    const value = e.target.value.replace('@', '');
    setInstagram(value);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="instagram" className="flex items-center gap-2">
        <Instagram className="h-4 w-4 text-pink-500" />
        <span>Instagram Username</span>
      </Label>
      <Input
        id="instagram"
        value={instagram}
        onChange={handleInputChange}
        placeholder="Your Instagram handle (without @)"
        className="focus-visible:ring-offset-0 focus-visible:ring-black/20"
      />
      <p className="text-xs text-gray-500">Optional: Share your Instagram to help others connect with you</p>
    </div>
  );
};

export default InstagramInput;