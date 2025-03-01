
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface HobbiesAndRoutineFormProps {
  hobbies: string;
  setHobbies: (hobbies: string) => void;
  routine: string;
  setRoutine: (routine: string) => void;
}

const HobbiesAndRoutineForm = ({
  hobbies,
  setHobbies,
  routine,
  setRoutine
}: HobbiesAndRoutineFormProps) => {
  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <Label htmlFor="hobbies">Your Hobbies</Label>
        <Textarea
          id="hobbies"
          value={hobbies}
          onChange={(e) => setHobbies(e.target.value)}
          placeholder="List your favorite hobbies and activities (comma-separated)"
          className="focus-visible:ring-offset-0 focus-visible:ring-black/20 resize-none"
          rows={3}
        />
        <p className="text-xs text-gray-500">Example: Photography, Hiking, Reading</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="routine">Daily Routine</Label>
        <Textarea
          id="routine"
          value={routine}
          onChange={(e) => setRoutine(e.target.value)}
          placeholder="Briefly describe your typical day"
          className="focus-visible:ring-offset-0 focus-visible:ring-black/20 resize-none"
          rows={3}
        />
      </div>
    </div>
  );
};

export default HobbiesAndRoutineForm;