import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import ImageGrid from '@/components/ImageGrid';
import ProfileCard from '@/components/ProfileCard';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowRight, Heart, Search } from 'lucide-react';

// Sample profiles data
const featuredProfiles = [
  {
   name: 'Pranjal',
   image: 'https://i.postimg.cc/DzbDp1QX/temp-Imagex-WHQ3-V.avif',
   hobbies: ['Poetry', 'Travel', 'Riding'],
   bio: 'Businessman and a bike enthusiast , love poetry and tea.',
   branch: 'CSDS' as const,
   purpose: 'Both' as const,
   age: 21
 },
 {
   name: 'Prashant Parmar',
   image: 'https://i.postimg.cc/QxLfFRMv/temp-Imagee5-Fhxb.avif',
   hobbies: ['Gaming', 'Football', 'Travel'],
   bio: 'Sports by day, Gym enthusiast by night. Let\'s discuss Animes over coffee.',
   branch: 'CSDS' as const,
   purpose: 'Fun' as const,
   age: 20
 },
 {
   name: 'Rajveer Dangi',
   image: 'https://i.postimg.cc/mDWmkqvd/face-swap.png',
   hobbies: ['Basketball', 'Reading', 'Travel'],
   bio: 'Creative soul with a passion for colors and movement. Always planning my next trip.',
   branch: 'CSBS' as const,
   purpose: 'Both' as const,
   age: 20
 },
 {
   name: 'Michael Chen',
   image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format',
   hobbies: ['Gaming', 'Cooking', 'Movies'],
   bio: 'Gamer and foodie. I can make a mean pasta while discussing film theory.',
   branch: 'AIML' as const,
   purpose: 'Fun' as const,
   age: 21
 }
];

const Index = () => {
  const controls = useAnimation();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    });
    
    // Smooth scroll to top on component mount
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [controls]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-transition-container"
    >
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Matches Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Featured Matches</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover people who share your passion and interests. Our matching algorithm helps you find the perfect connections.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProfiles.map((profile, index) => (
            <ProfileCard
              key={index}
              name={profile.name}
              image={profile.image}
              hobbies={profile.hobbies}
              bio={profile.bio}
              index={index}
              showBranchPropose={false}
              age={profile.age}
              branch={profile.branch}
              purpose={profile.purpose}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="rounded-full px-6">
            <Link to="/explore">
              View All Matches
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform makes it easy to find meaningful connections based on shared interests and activities.
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: "Share Your Interests",
                description: "Tell us about your hobbies, daily routines, and what makes you unique.",
                icon: "📝"
              },
              {
                title: "Find Your Matches",
                description: "Our AI analyzes your profile to find people with compatible interests and lifestyles.",
                icon: "🔍"
              },
              {
                title: "Connect & Chat",
                description: "Start conversations and build genuine relationships with your matches.",
                icon: "💬"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button asChild size="lg" className="rounded-full px-8 py-6 bg-black hover:bg-black/90 text-md">
              <Link to="/submit">
                <Heart className="mr-2 h-5 w-5" />
                Create Your Profile
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Image Grid Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Our Community</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join thousands of people who have already found their perfect matches through shared interests and passions.
              </p>
            </motion.div>
          </div>
          
          {/* Heart-shaped image grid with continuous scrolling */}
          <ImageGrid />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Ready to Find Your Match?</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
              Start your journey to meaningful connections based on shared interests and compatible lifestyles.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full px-8 py-6 bg-white text-black hover:bg-gray-100 text-md">
                <Link to="/explore">
                  <Search className="mr-2 h-5 w-5" />
                  Explore Matches
                </Link>
              </Button>
              
              {/* Enhanced visibility for Create Profile button */}
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 border-white border-2 hover:bg-white/20 text-white text-md font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                <Link to="/submit">
                  <Heart className="mr-2 h-5 w-5 text-pink-400" />
                  Create Profile
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Index;