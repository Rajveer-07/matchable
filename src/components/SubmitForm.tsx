
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { createProfile } from '@/services/databaseService';
import { useNavigate } from 'react-router-dom';

// Import the new components
import ProfileInfoForm from './submit/ProfileInfoForm';
import BranchAndPurposeSelector from './submit/BranchAndPurposeSelector';
import HobbiesAndRoutineForm from './submit/HobbiesAndRoutineForm';
import ImageUploader from './submit/ImageUploader';
import SuccessMessage from './submit/SuccessMessage';

const SubmitForm = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [dob, setDob] = useState('');
  const [branch, setBranch] = useState<'AIML' | 'CSDS' | 'CSBS'>('AIML');
  const [purpose, setPurpose] = useState<'Study' | 'Fun' | 'Both'>('Study');
  const [hobbies, setHobbies] = useState('');
  const [routine, setRoutine] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !bio || !dob || !hobbies || !routine || !previewUrl) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields and upload an image",
        variant: "destructive"
      });
      return;
    }
    
    if (bio.length > 150) {
      toast({
        title: "Bio too long",
        description: "Your bio should be 150 characters or less",
        variant: "destructive"
      });
      return;
    }
    
    const hobbiesArray = hobbies
      .split(',')
      .map(hobby => hobby.trim())
      .filter(hobby => hobby.length > 0);
      
    if (hobbiesArray.length === 0) {
      toast({
        title: "Invalid hobbies",
        description: "Please enter at least one hobby",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newProfile = await createProfile({
        name,
        bio,
        dob,
        branch,
        purpose,
        hobbies: hobbiesArray,
        routine,
        imageUrl: previewUrl
      });
      
      setIsSuccess(true);
      
      toast({
        title: "Profile submitted",
        description: "Your profile has been successfully added to our database!",
      });
      
      setTimeout(() => {
        navigate('/explore');
      }, 3000);
      
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your profile. Please try again.",
        variant: "destructive"
      });
      setIsSubmitting(false);
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

  if (isSuccess) {
    return <SuccessMessage />;
  }

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-playfair font-medium mb-6">Submit Your Profile</h2>
          <p className="text-gray-600 mb-6">
            Share your information to connect with friendly people who share your interests and passions.
          </p>
        </div>
        
        <ProfileInfoForm 
          name={name}
          setName={setName}
          bio={bio}
          setBio={setBio}
          dob={dob}
          setDob={setDob}
        />
        
        <Separator />
        
        <BranchAndPurposeSelector
          branch={branch}
          setBranch={setBranch}
          purpose={purpose}
          setPurpose={setPurpose}
        />
        
        <Separator />
        
        <HobbiesAndRoutineForm
          hobbies={hobbies}
          setHobbies={setHobbies}
          routine={routine}
          setRoutine={setRoutine}
        />
        
        <Separator />
        
        <ImageUploader
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
        />
        
        <Button 
          type="submit" 
          className="w-full font-medium" 
          size="lg" 
          disabled={isSubmitting || isUploading}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Profile'
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default SubmitForm;