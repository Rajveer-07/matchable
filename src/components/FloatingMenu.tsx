
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Heart, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AIAssistant from '@/components/AIAssistant';
import FriendshipLeaderboard from '@/components/FriendshipLeaderboard';
import { useIsMobile } from '@/hooks/use-mobile';

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAIAssistantClick = () => {
    setShowAIAssistant(true);
    setIsOpen(false);
  };

  const handleLeaderboardClick = () => {
    setShowLeaderboard(true);
    setIsOpen(false);
  };

  const handleCloseLeaderboard = () => {
    setShowLeaderboard(false);
  };

  return (
    <>
      {/* Main floating button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={toggleMenu}
          className="rounded-full bg-black p-0 border-0 w-14 h-14 shadow-xl flex items-center justify-center"
          size="icon"
          style={{
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
          }}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-pink-400" />
          ) : (
            <Heart className="h-6 w-6 text-pink-400" fill="#ec4899" />
          )}
        </Button>

        {/* Expanding menu buttons */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* AI Assistant button */}
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -70 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-0 right-0"
              >
                <Button
                  onClick={handleAIAssistantClick}
                  className="rounded-full bg-black p-0 border-0 w-12 h-12 shadow-lg flex items-center justify-center"
                  size="icon"
                  style={{
                    boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <Bot className="h-5 w-5 text-pink-400" />
                </Button>
                {!isMobile && (
                  <motion.span
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: -10 }}
                    exit={{ opacity: 0, x: 0 }}
                    className="absolute right-14 top-3 bg-black text-white text-xs rounded-full px-2 py-1 -translate-y-1/2 whitespace-nowrap"
                  >
                    AI Assistant
                  </motion.span>
                )}
              </motion.div>

              {/* Friendship Leaderboard button */}
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -130 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 right-0"
              >
                <Button
                  onClick={handleLeaderboardClick}
                  className="rounded-full bg-black p-0 border-0 w-12 h-12 shadow-lg flex items-center justify-center"
                  size="icon"
                  style={{
                    boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <Heart className="h-5 w-5 text-pink-400" fill="#ec4899" />
                </Button>
                {!isMobile && (
                  <motion.span
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: -10 }}
                    exit={{ opacity: 0, x: 0 }}
                    className="absolute right-14 top-3 bg-black text-white text-xs rounded-full px-2 py-1 -translate-y-1/2 whitespace-nowrap"
                  >
                    Friendship Leaderboard
                  </motion.span>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Conditionally render components */}
      {showAIAssistant && <AIAssistant onClose={() => setShowAIAssistant(false)} />}
      {showLeaderboard && (
        <FriendshipLeaderboard
          openCallback={handleCloseLeaderboard}
        />
      )}
    </>
  );
};

export default FloatingMenu;