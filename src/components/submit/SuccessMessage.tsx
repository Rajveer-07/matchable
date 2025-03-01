
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuccessMessage = () => {
  const navigate = useNavigate();
  
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
};

export default SuccessMessage;