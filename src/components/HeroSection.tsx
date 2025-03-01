
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Search } from 'lucide-react';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const { scrollY } = useScroll();
  
  // Parallax effect
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const titleY = useTransform(scrollY, [0, 300], [0, -50]);
  const subtitleY = useTransform(scrollY, [0, 300], [0, -25]);
  
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    });
  }, [controls]);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-100 mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-yellow-100 mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-2000"></div>
      
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.div style={{ opacity: titleOpacity, y: titleY }}>
          <motion.h1 
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="font-playfair text-5xl md:text-7xl font-bold mb-4 tracking-tight"
          >
            Make Friends.
            <motion.span 
              variants={textVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="block mt-2 font-playfair text-4xl md:text-6xl"
            >
              Connect locally.
            </motion.span>
          </motion.h1>
          
          <motion.p
            style={{ y: subtitleY }}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="text-gray-600 text-lg md:text-xl mt-6 max-w-2xl mx-auto"
          >
            Connect with friendly people who share your interests and passions.
            Find study buddies, activity partners, and new friends based on common hobbies.
          </motion.p>
        </motion.div>
        
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild size="lg" className="rounded-full px-8 py-6 bg-black hover:bg-black/90 text-md">
            <Link to="/explore">
              <Search className="mr-2 h-5 w-5" />
              Explore Friends
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 border-black/20 hover:bg-black hover:text-white text-md">
            <Link to="/submit">
              <Heart className="mr-2 h-5 w-5" />
              Create Profile
            </Link>
          </Button>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-500 mb-2">Scroll to discover</p>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <motion.div
              animate={{
                y: [0, 15, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-1.5 h-1.5 bg-black rounded-full mt-2"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
