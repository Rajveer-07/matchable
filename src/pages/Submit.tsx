
import React from 'react';
import { motion } from 'framer-motion';
import SubmitForm from '@/components/SubmitForm';

const Submit = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-playfair text-4xl md:text-5xl font-bold mb-4"
          >
            Join Our Friendly Community
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Share your profile and discover wonderful people who share your interests. Connect for study buddies, fun activities, or both!
          </motion.p>
        </div>

        <SubmitForm />
      </div>
    </motion.div>
  );
};

export default Submit;