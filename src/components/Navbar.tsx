
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Heart, MessageCircle, User, Menu, X, Home, Compass, Send, Info, Mail, FileEdit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="h-5 w-5 mb-1" /> },
    { name: 'Explore', path: '/explore', icon: <Compass className="h-5 w-5 mb-1" /> },
    { name: 'Submit', path: '/submit', icon: <Send className="h-5 w-5 mb-1" /> },
    { name: 'About', path: '/about', icon: <Info className="h-5 w-5 mb-1" /> },
  ];

  const handleFeedbackClick = () => {
    toast({
      title: "Feedback Sent",
      description: "Thank you for your feedback! An admin will review it shortly.",
    });
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <>
      <motion.header
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex justify-center py-5 px-4 transition-all duration-300",
          scrolled ? "backdrop-blur-md bg-white/70 shadow-sm" : "bg-transparent"
        )}
      >
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center rounded-full bg-black/90 text-white px-7 py-4 space-x-10">
          <motion.span
            className="text-white font-playfair text-xl"
            variants={itemVariants}
          >
            Matchabel
          </motion.span>

          <div className="flex space-x-10">
            {navItems.map((item) => (
              <motion.div key={item.path} variants={itemVariants}>
                <Link
                  to={item.path}
                  className={cn(
                    "underline-animate text-sm font-medium",
                    location.pathname === item.path
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex justify-between items-center w-full md:hidden px-4">
          <Link to="/" className="text-black font-playfair text-lg z-50">
            Matchabel
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="z-50 p-2 bg-black/10 backdrop-blur-md rounded-full"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-black" />
            ) : (
              <Menu className="h-6 w-6 text-black" />
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center space-y-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center p-4 rounded-xl transition-all duration-300",
                    location.pathname === item.path
                      ? "bg-black text-white font-medium scale-110"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {item.icon}
                  <span className="text-lg">{item.name}</span>
                </Link>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-10 flex flex-col items-center"
            >
              <div className="flex space-x-3 mb-2">
                <Link to="/explore" className="bg-purple-100 p-3 rounded-full hover:bg-purple-200 transition-colors duration-300 flex items-center justify-center relative group">
                  <Compass className="h-5 w-5 text-purple-700" />
                  <span className="absolute -top-8 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Explore Matches</span>
                </Link>
                
                <button 
                  onClick={handleFeedbackClick} 
                  className="bg-blue-100 p-3 rounded-full hover:bg-blue-200 transition-colors duration-300 flex items-center justify-center relative group"
                >
                  <Mail className="h-5 w-5 text-blue-700" />
                  <span className="absolute -top-8 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Send Feedback</span>
                </button>
                
                <Link to="/submit" className="bg-green-100 p-3 rounded-full hover:bg-green-200 transition-colors duration-300 flex items-center justify-center relative group">
                  <FileEdit className="h-5 w-5 text-green-700" />
                  <span className="absolute -top-8 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Submit Content</span>
                </Link>
              </div>
              <p className="text-xs text-gray-500">Quick Actions</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
