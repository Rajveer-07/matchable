
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Upload, Loader2, Check, X } from 'lucide-react';
import { createProfile } from '@/services/databaseService';
import { useNavigate } from 'react-router-dom';

const SubmitForm = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [routine, setRoutine] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    // Simulate upload
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setTimeout(() => {
        setPreviewUrl(reader.result as string);
        setIsUploading(false);
      }, 1500);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name || !bio || !hobbies || !routine || !previewUrl) {
      toast({
        title: "Missing information",
        description: "Please fill out all fields and upload an image",
        variant: "destructive"
      });
      return;
    }
    
    // Validate bio length
    if (bio.length > 150) {
      toast({
        title: "Bio too long",
        description: "Your bio should be 150 characters or less",
        variant: "destructive"
      });
      return;
    }
    
    // Process hobbies into array
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
    
    // Submit profile to database
    setIsSubmitting(true);
    
    try {
      const newProfile = await createProfile({
        name,
        bio,
        hobbies: hobbiesArray,
        routine,
        imageUrl: previewUrl
      });
      
      setIsSuccess(true);
      
      toast({
        title: "Profile submitted",
        description: "Your profile has been successfully added to our database!",
      });
      
      // Wait a moment before redirecting
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

  const removeImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center"
      >
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-playfair font-medium mb-4">Profile Submitted Successfully!</h2>
        
        <p className="text-gray-600 mb-8">
          Thank you for submitting your profile. You'll be redirected to explore matches in a moment.
        </p>
        
        <Button 
          onClick={() => navigate('/explore')}
          className="bg-black hover:bg-black/90"
        >
          Explore Matches Now
        </Button>
      </motion.div>
    );
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
            Share your information to connect with others who share your interests.
          </p>
        </div>
        
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
        
        <Separator />
        
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
        
        <Separator />
        
        <div className="space-y-4">
          <Label>Profile Image</Label>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          
          {!previewUrl ? (
            <div 
              onClick={triggerFileInput}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors duration-300"
            >
              {isUploading ? (
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <Loader2 className="h-10 w-10 animate-spin mb-2" />
                  <p>Uploading image...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <Upload className="h-10 w-10 mb-2" />
                  <p>Click to upload an image</p>
                  <p className="text-xs mt-2">JPEG, PNG (max 5MB)</p>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full" 
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
