
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-12"
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-playfair text-4xl md:text-5xl font-bold mb-4"
          >
            About Matchabel
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Building connections through shared passions and interests.
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <h2 className="font-playfair">Our Story</h2>
          <p>
            Matchabel was born from a simple idea: meaningful connections start with shared interests and passions. 
            We believe that the strongest relationships are built on common ground, where people can bond over the 
            activities and hobbies they love.
          </p>
          <p>
            Unlike traditional dating platforms that focus primarily on appearances, we prioritize compatibility 
            based on how you spend your time and what brings you joy. Whether you're an avid hiker, a bookworm, 
            a cooking enthusiast, or a music lover, Matchabel helps you find people who share your unique interests.
          </p>
          
          <h2 className="font-playfair">Our Mission</h2>
          <p>
            Our mission is to create authentic connections in an increasingly digital world. We strive to:
          </p>
          <ul>
            <li>Foster meaningful relationships based on shared interests and lifestyles</li>
            <li>Create a safe, inclusive community where everyone feels welcome</li>
            <li>Use innovative technology to enhance human connection, not replace it</li>
            <li>Prioritize quality interactions over quantity of matches</li>
          </ul>
          
          <h2 className="font-playfair">How Matchabel Works</h2>
          <p>
            Our platform uses a sophisticated matching algorithm that goes beyond simple keyword matching. When you 
            share your hobbies, interests, and daily routines, our system analyzes patterns and preferences to 
            find truly compatible matches.
          </p>
          <p>
            We consider not just what you do, but how and why you do it. This nuanced approach helps us recommend 
            connections that have the potential to grow into something meaningful, whether that's a friendship, 
            a romantic relationship, or simply a new hobby partner.
          </p>
          
          <h2 className="font-playfair">Join Our Community</h2>
          <p>
            Whether you're looking for friendship, romance, or simply to expand your social circle with like-minded 
            individuals, Matchabel provides a platform where you can be yourself and connect authentically.
          </p>
          <p>
            Ready to find people who share your passions? Create your profile today and start exploring matches 
            based on what matters most to you.
          </p>
          
          <div className="flex justify-center my-8">
            <Button asChild size="lg" className="rounded-full px-8 py-6 bg-black hover:bg-black/90 text-md">
              <Link to="/submit">
                <Heart className="mr-2 h-5 w-5" />
                Create Your Profile
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
