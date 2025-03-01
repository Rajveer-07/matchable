
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ProfileInfoFormProps {
  name: string;
  setName: (name: string) => void;
  bio: string;
  setBio: (bio: string) => void;
}

const ProfileInfoForm = ({ name, setName, bio, setBio }: ProfileInfoFormProps) => {
  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="focus-visible:ring-offset-0 focus-visible:ring-black/20"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="bio">Short Bio</Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself (max 150 characters)"
          maxLength={150}
          className="focus-visible:ring-offset-0 focus-visible:ring-black/20 resize-none"
          rows={3}
        />
        <p className="text-right text-sm text-gray-500">{bio.length}/150</p>
      </div>
    </div>
  );
};

export default ProfileInfoForm;