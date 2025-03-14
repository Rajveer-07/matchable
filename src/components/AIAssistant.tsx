import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, User, Send, X, Settings, Sparkles, Heart, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  error?: boolean;
}

interface AIAssistantProps {
  openCallback?: (isOpen: boolean) => void;
  onClose?: () => void;
}

const AIAssistant = ({ openCallback, onClose }: AIAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m your AI assistant. How can I help you find your perfect match today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('AIzaSyDBOuY72tchllg3C_6sex3w_JyJ8dccfr4');
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [retryMessage, setRetryMessage] = useState<{index: number, originalContent: string} | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (openCallback) {
      openCallback(isOpen);
    }
  }, [isOpen, openCallback]);

  const handleSendMessage = async (retry = false, retryIndex = -1, originalContent = '') => {
    const messageContent = retry ? originalContent : input;
    
    if (!messageContent.trim() && !retry) return;
    
    if (!retry) {
      const userMessage: Message = {
        role: 'user',
        content: messageContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInput('');
    }
    
    setIsLoading(true);
    
    try {
      if (!apiKey) {
        setTimeout(() => {
          const simulatedResponse = getSimulatedResponse(messageContent);
          
          const assistantMessage: Message = {
            role: 'assistant',
            content: simulatedResponse,
            timestamp: new Date()
          };
          
          if (retry && retryIndex >= 0) {
            setMessages(prev => {
              const updatedMessages = [...prev];
              updatedMessages[retryIndex] = assistantMessage;
              return updatedMessages;
            });
            setRetryMessage(null);
          } else {
            setMessages(prev => [...prev, assistantMessage]);
          }
          
          setIsLoading(false);
        }, 1000);
        return;
      }
      
      const geminiMessages = [
        { role: "user", parts: [{ text: "You are a helpful, friendly matchmaking assistant. Your primary goal is to help users find compatible matches based on their hobbies, interests, and preferences. Provide insights about how shared activities can strengthen relationships. Be concise, warm, and encouraging in your responses." }] },
        { role: "model", parts: [{ text: "I understand my role. I'll be a helpful matchmaking assistant focused on connecting people based on shared interests and hobbies. I'll be concise, warm, and encouraging in my responses." }] }
      ];
      
      messages.forEach(msg => {
        geminiMessages.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }]
        });
      });
      
      geminiMessages.push({
        role: "user",
        parts: [{ text: messageContent }]
      });
      
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: geminiMessages,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
            topP: 0.95,
            topK: 40
          }
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'Failed to get response from AI assistant');
      }
      
      const data = await response.json();
      
      if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content) {
        throw new Error('No response generated by AI assistant');
      }
      
      const generatedContent = data.candidates[0].content.parts[0].text;
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: generatedContent,
        timestamp: new Date()
      };
      
      if (retry && retryIndex >= 0) {
        setMessages(prev => {
          const updatedMessages = [...prev];
          updatedMessages[retryIndex] = assistantMessage;
          return updatedMessages;
        });
        setRetryMessage(null);
      } else {
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response from AI assistant",
        variant: "destructive"
      });
      
      const fallbackMessage: Message = {
        role: 'assistant',
        content: "I'm sorry, I encountered an error while processing your request. Please try again later.",
        timestamp: new Date(),
        error: true
      };
      
      if (retry && retryIndex >= 0) {
        setMessages(prev => {
          const updatedMessages = [...prev];
          updatedMessages[retryIndex] = fallbackMessage;
          return updatedMessages;
        });
      } else {
        setMessages(prev => [...prev, fallbackMessage]);
        setRetryMessage({
          index: messages.length + (retry ? 0 : 1),
          originalContent: messageContent
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getSimulatedResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi')) {
      return "Hello! How can I assist you with finding matches today?";
    } else if (input.includes('match') || input.includes('dating')) {
      return "Our matching algorithm analyzes your hobbies and interests to find compatible people. Try adding more specific hobbies to get better matches!";
    } else if (input.includes('hobby') || input.includes('interest')) {
      return "Adding specific hobbies helps us find better matches. Consider adding activities you're passionate about, not just general interests. For example, instead of 'cooking', try 'Italian cooking' or 'baking sourdough bread'.";
    } else if (input.includes('profile') || input.includes('account')) {
      return "To improve your matching results, make sure your profile has detailed hobbies and keywords that truly represent your interests. The more specific, the better!";
    } else if (input.includes('help') || input.includes('support')) {
      return "I'm here to help! You can ask me about finding matches, optimizing your search criteria, or understanding your compatibility results. What specific help do you need?";
    } else {
      return "Thank you for your message. To get better matches, try being more specific with your hobbies and interests. Our AI works best when you provide detailed information about what you enjoy. Can I help you refine your search criteria?";
    }
  };

  const handleRetry = (index: number, originalContent: string) => {
    handleSendMessage(true, index, originalContent);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (openCallback) {
      openCallback(false);
    }
    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300 
            }}
            className="fixed bottom-20 right-6 w-80 md:w-96 z-50"
          >
            <Card className="overflow-hidden border border-gray-200 glass-card"
              style={{ 
                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
                borderRadius: "var(--radius)"
              }}  
            >
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 flex flex-row items-center justify-between p-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-black text-white p-1.5 rounded-full">
                    <Heart className="h-4 w-4 text-pink-400" />
                  </div>
                  <CardTitle className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Match Assistant
                  </CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setShowSettings(!showSettings)}
                    className="h-8 w-8 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Settings className="h-4 w-4 text-gray-600" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleClose}
                    className="h-8 w-8 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
              </CardHeader>
              
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden bg-gray-50 border-b border-gray-200"
                  >
                    <div className="p-4">
                      <h3 className="font-medium mb-2 text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>Gemini API Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>API Key</label>
                          <Input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Enter your Gemini API key"
                            className="w-full border-gray-200 focus:border-gray-300"
                          />
                          <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                            Your API key is secured and used only for your requests.
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setShowSettings(false)}
                          className="w-full border-gray-200 text-gray-700 hover:bg-gray-100"
                        >
                          Save Settings
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <CardContent className="p-4 h-[350px] overflow-y-auto bg-white">
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * Math.min(index, 5) }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-black text-white rounded-br-none'
                            : message.error 
                              ? 'bg-red-50 text-gray-800 border border-red-200 rounded-bl-none'
                              : 'bg-gray-100 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        <div className="flex items-center mb-1">
                          {message.role === 'assistant' ? (
                            <Heart className={`h-4 w-4 mr-2 ${message.error ? 'text-red-500' : 'text-pink-500'}`} />
                          ) : (
                            <User className="h-4 w-4 mr-2" />
                          )}
                          <span className="text-xs opacity-70" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {message.role === 'assistant' ? 'Assistant' : 'You'}
                          </span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap" style={{ fontFamily: "'Inter', sans-serif" }}>{message.content}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs opacity-50" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {new Date(message.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                          
                          {message.error && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 p-0 px-2 text-xs font-medium text-red-600 hover:bg-red-50 hover:text-red-700 rounded-full"
                              onClick={() => {
                                let userMessageIndex = index - 1;
                                while (userMessageIndex >= 0 && messages[userMessageIndex].role !== 'user') {
                                  userMessageIndex--;
                                }
                                
                                if (userMessageIndex >= 0) {
                                  handleRetry(index, messages[userMessageIndex].content);
                                }
                              }}
                            >
                              <RefreshCw className="h-3 w-3 mr-1" /> Retry
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div 
                      className="flex justify-start"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none max-w-[80%] px-4 py-2">
                        <div className="flex items-center mb-1">
                          <Heart className="h-4 w-4 mr-2 text-pink-500" />
                          <span className="text-xs opacity-70" style={{ fontFamily: "'Inter', sans-serif" }}>Assistant</span>
                        </div>
                        <div className="flex space-x-1.5 py-2">
                          <div className="typing-animation-dot"></div>
                          <div className="typing-animation-dot"></div>
                          <div className="typing-animation-dot"></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </motion.div>
              </CardContent>
              
              <CardFooter className="p-4 border-t border-gray-200 bg-white">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex w-full space-x-2"
                >
                  <Input
                    type="text"
                    placeholder="Ask about finding matches..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 border-gray-200 focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    size="icon"
                    disabled={isLoading || !input.trim()}
                    className="bg-black text-white hover:bg-black/90 transition-all duration-200"
                    style={{ 
                      borderRadius: "var(--radius)",
                      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)"
                    }}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;