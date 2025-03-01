
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface BranchAndPurposeSelectorProps {
  branch: 'AIML' | 'CSDS' | 'CSBS';
  setBranch: (branch: 'AIML' | 'CSDS' | 'CSBS') => void;
  purpose: 'Study' | 'Fun' | 'Both';
  setPurpose: (purpose: 'Study' | 'Fun' | 'Both') => void;
}

const BranchAndPurposeSelector = ({
  branch,
  setBranch,
  purpose,
  setPurpose
}: BranchAndPurposeSelectorProps) => {
  return (
    <div className="grid gap-6">
      <div className="space-y-3">
        <Label className="text-md font-medium">Branch</Label>
        <RadioGroup 
          value={branch} 
          onValueChange={(value) => setBranch(value as 'AIML' | 'CSDS' | 'CSBS')}
          className="flex flex-wrap gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="AIML" id="branch-aiml" />
            <Label htmlFor="branch-aiml" className="cursor-pointer">AIML</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="CSDS" id="branch-csds" />
            <Label htmlFor="branch-csds" className="cursor-pointer">CSDS</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="CSBS" id="branch-csbs" />
            <Label htmlFor="branch-csbs" className="cursor-pointer">CSBS</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-md font-medium">For</Label>
        <RadioGroup 
          value={purpose} 
          onValueChange={(value) => setPurpose(value as 'Study' | 'Fun' | 'Both')}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Study" id="purpose-study" />
            <Label htmlFor="purpose-study" className="cursor-pointer">Study</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Fun" id="purpose-fun" />
            <Label htmlFor="purpose-fun" className="cursor-pointer">Fun</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Both" id="purpose-both" />
            <Label htmlFor="purpose-both" className="cursor-pointer">Both</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default BranchAndPurposeSelector;