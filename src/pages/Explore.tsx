import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HobbyForm from '@/components/HobbyForm';
import ProfileCard from '@/components/ProfileCard';
import { Loader2, Brain, Lightbulb, BadgeCheck, Calendar, Bot } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllProfiles, UserProfile } from '@/services/databaseService';
import { analyzeCompatibility, AIAnalysisResult, getPersonalizedInsights } from '@/services/aiService';
import { useToast } from '@/hooks/use-toast';
import AIAssistant from '@/components/AIAssistant';

const Explore = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [matchedProfiles, setMatchedProfiles] = useState<UserProfile[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [searchCriteria, setSearchCriteria] = useState<{
    hobbies: string[];
    keywords: string[];
  } | null>(null);
  const { toast } = useToast();

  // Fetch all profiles on component mount
  useEffect(() => {
    const fetchProfiles = async () => {
      setIsLoading(true);
      try {
        const data = await getAllProfiles();
        setProfiles(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load profiles. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [toast]);

  const handleSearch = async (hobbies: string[], keywords: string[]) => {
    if (hobbies.length === 0) {
      toast({
        title: "Please add hobbies",
        description: "At least one hobby is required to find matches",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setSearchCriteria({ hobbies, keywords });
    
    try {
      // First perform basic filtering
      const filteredProfiles = profiles.filter(profile => {
        const hasMatchingHobby = profile.hobbies.some(hobby => 
          hobbies.some(userHobby => 
            hobby.toLowerCase().includes(userHobby.toLowerCase()) || 
            userHobby.toLowerCase().includes(hobby.toLowerCase())
          )
        );
        
        return hasMatchingHobby;
      });
      
      // Then use AI service for detailed analysis
      const analysis = await analyzeCompatibility(hobbies, keywords, profiles);
      
      // Match profiles with analysis results
      const profilesWithScores = analysis.matches
        .filter(match => match.score > 0)
        .map(match => {
          const profile = profiles.find(p => p.id === match.profileId);
          return profile ? profile : null;
        })
        .filter((profile): profile is UserProfile => profile !== null);
      
      setMatchedProfiles(profilesWithScores);
      setAnalysisResult(analysis);
      setHasSearched(true);
      
      toast({
        title: "Analysis complete",
        description: "We've found matches based on your interests",
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze matches. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-12"
    >
      {/* Add AI Assistant */}
      <AIAssistant />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-playfair text-4xl md:text-5xl font-bold mb-4"
          >
            Find Your Match
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Enter your hobbies and keywords to discover people with similar interests and passions.
            Our AI will analyze compatibility and provide personalized recommendations.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <HobbyForm onSubmit={handleSearch} />
              
              {hasSearched && analysisResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 space-y-4"
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-lg font-medium">
                        <Brain className="h-5 w-5 mr-2 text-purple-500" />
                        AI Analysis
                      </CardTitle>
                      <CardDescription>Based on your interests</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-600">{analysisResult.summary}</p>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Recommended Activities:</p>
                        <ul className="text-sm text-gray-600 space-y-2">
                          {analysisResult.recommendedActivities.map((activity, index) => (
                            <li key={index} className="flex items-start">
                              <Calendar className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="h-12 w-12 animate-spin text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg">Loading profiles...</p>
              </div>
            ) : isAnalyzing ? (
              <div className="flex flex-col items-center justify-center min-h-[400px]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Brain className="h-16 w-16 text-purple-500 mb-4" />
                </motion.div>
                <h3 className="text-xl font-medium mb-2">AI Analysis in Progress</h3>
                <p className="text-gray-600 mb-6 max-w-md text-center">
                  Our AI is analyzing your interests to find the most compatible matches...
                </p>
                <div className="w-64">
                  <Progress value={65} className="h-2" />
                </div>
              </div>
            ) : hasSearched ? (
              <>
                {matchedProfiles.length > 0 ? (
                  <Tabs defaultValue="matches" className="w-full">
                    <TabsList className="mb-6">
                      <TabsTrigger value="matches">Matches</TabsTrigger>
                      <TabsTrigger value="insights">AI Insights</TabsTrigger>
                    </TabsList>
                  
                    <TabsContent value="matches">
                      <div className="mb-6">
                        <h2 className="text-2xl font-medium mb-2">Your Matches</h2>
                        <p className="text-gray-600">
                          Based on {searchCriteria?.hobbies.join(', ')}
                          {searchCriteria?.keywords.length ? ` and keywords: ${searchCriteria.keywords.join(', ')}` : ''}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {matchedProfiles.map((profile, index) => {
                          const matchDetails = analysisResult?.matches.find(m => m.profileId === profile.id);
                          
                          return (
                            <motion.div
                              key={profile.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                              <ProfileCard
                                name={profile.name}
                                image={profile.imageUrl}
                                hobbies={profile.hobbies}
                                bio={profile.bio}
                                index={index}
                                matchScore={matchDetails?.score || 0}
                                matchReason={matchDetails?.matchReason || ''}
                              />
                            </motion.div>
                          );
                        })}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="insights">
                      <div className="mb-6">
                        <h2 className="text-2xl font-medium mb-2">AI-Powered Insights</h2>
                        <p className="text-gray-600">
                          Personalized recommendations based on your interests
                        </p>
                      </div>
                      
                      <div className="space-y-6">
                        {matchedProfiles.slice(0, 3).map((profile, index) => (
                          <Card key={profile.id} className="overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                              <div className="md:w-1/3">
                                <img 
                                  src={profile.imageUrl} 
                                  alt={profile.name}
                                  className="w-full h-48 md:h-full object-cover"
                                />
                              </div>
                              
                              <div className="p-6 md:w-2/3">
                                <h3 className="text-xl font-medium mb-2 flex items-center">
                                  {profile.name}
                                  <Badge className="ml-2 bg-purple-100 text-purple-800 hover:bg-purple-200">
                                    {analysisResult?.matches.find(m => m.profileId === profile.id)?.score || 0}% Match
                                  </Badge>
                                </h3>
                                
                                <p className="text-gray-600 mb-4">{profile.bio}</p>
                                
                                <Separator className="my-4" />
                                
                                <div className="space-y-4">
                                  <div className="flex items-start">
                                    <Lightbulb className="h-5 w-5 mr-2 text-amber-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm">
                                      {getPersonalizedInsights(searchCriteria?.hobbies || [], profile)}
                                    </p>
                                  </div>
                                  
                                  {analysisResult?.matches.find(m => m.profileId === profile.id)?.commonInterests.length 
                                    ? (
                                      <div className="flex items-start">
                                        <BadgeCheck className="h-5 w-5 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                                        <div>
                                          <p className="text-sm font-medium mb-1">Common Interests:</p>
                                          <div className="flex flex-wrap gap-2">
                                            {analysisResult?.matches.find(m => m.profileId === profile.id)?.commonInterests.map((interest, i) => (
                                              <Badge key={i} variant="outline" className="bg-green-50 text-green-800 hover:bg-green-100">
                                                {interest}
                                              </Badge>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    ) : null
                                  }
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                    <h3 className="text-2xl font-medium mb-3">No matches found</h3>
                    <p className="text-gray-600 max-w-md">
                      We couldn't find matches for your criteria. Try broadening your hobbies or keywords.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <h3 className="text-2xl font-medium mb-3">Ready to explore?</h3>
                <p className="text-gray-600 max-w-md">
                  Enter your hobbies and keywords on the left to find your perfect matches.
                  Our AI will analyze compatibility and provide personalized recommendations.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Explore;
