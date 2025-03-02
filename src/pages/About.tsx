import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { ChevronRight, Users, Award, Clock, Heart, Mail, Github, Linkedin, Twitter, X } from 'lucide-react';

const About = () => {
  const controls = useAnimation();
  const [showContactForm, setShowContactForm] = useState(false);
  
  
  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const teamInView = useInView(teamRef, { once: true, amount: 0.3 });
  const historyInView = useInView(historyRef, { once: true, amount: 0.3 });
  const contactInView = useInView(contactRef, { once: true, amount: 0.3 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 });
  const faqInView = useInView(faqRef, { once: true, amount: 0.3 });
  
  useEffect(() => {
    window.scrollTo(0, 0);
    if (missionInView) {
      controls.start('visible');
    }
  }, [controls, missionInView]);

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const slideInLeftVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const slideInRightVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const teamMembers = [
    {
      name: "Arvind Dangi",
      role: "Founder & CEO",
      image: "https://i.ibb.co/Gf8kqmP3/Full-Size-Render.jpg&auto=format&fit=crop&w=1350&q=80",
      bio: "With over 10 years of experience in business leadership and innovation, Arvind leads our vision with passion.",
      socials: [
        { icon: <Twitter className="h-4 w-4" />, url: "#" },
        { icon: <Linkedin className="h-4 w-4" />, url: "#" },
        { icon: <Mail className="h-4 w-4" />, url: "dangirajveer33@gmail.com" }
      ]
    },
    {
      name: "Rajveer Dangi",
      role: "Lead Developer",
      image: "https://i.ibb.co/GQW23d5b/face-swap.png",
      bio: "Rajveer brings technical expertise and innovation to our platform, ensuring a seamless user experience.",
      socials: [
        { icon: <Github className="h-4 w-4" />, url: "https://github.com/Rajveer-07" },
        { icon: <Linkedin className="h-4 w-4" />, url: "#" },
        { icon: <Twitter className="h-4 w-4" />, url: "#" }
      ]
    }
  ];

  const historyEvents = [
    {
      year: "2024",
      title: "The Beginning",
      description: "Matchabel was founded with a vision to revolutionize how people connect online, focusing on authenticity and meaningful interactions."
    },
    {
      year: "2025",
      title: "Website Launch",
      description: "Our platform officially launched, combining innovative technology with user-centered design to create an intuitive experience."
    },
    {
      year: "2025",
      title: "Today & Beyond",
      description: "Continuing to innovate and create meaningful connections worldwide, with exciting new features and improvements on the horizon."
    }
  ];

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission here
    alert("Message sent! We'll get back to you soon.");
    setShowContactForm(false);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section ref={heroRef} className="mb-24">
          <motion.div
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={staggerContainerVariants}
            className="text-center"
          >
            <motion.span variants={itemVariants} className="inline-block bg-black text-white px-4 py-1 rounded-full text-sm font-medium mb-4">About Us</motion.span>
            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-medium mb-6 tracking-tight">Our Story</motion.h1>
            <motion.p variants={itemVariants} className="text-gray-600 max-w-3xl mx-auto text-lg mb-10">
              Discover how Matchabel is redefining connections in the digital age. 
              We're not just another platform – we're a community built on trust, 
              innovation, and the belief that meaningful friendships enhance lives.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-black text-white px-6 py-3 rounded-full font-medium flex items-center transition-all shadow-sm hover:shadow-md"
                onClick={() => scrollToSection(missionRef)}
              >
                Our Mission <ChevronRight className="ml-2 h-4 w-4" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="border border-gray-300 px-6 py-3 rounded-full font-medium transition-all hover:bg-gray-50"
                onClick={() => scrollToSection(contactRef)}
              >
                Contact Us
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* Mission Section */}
        <motion.section 
          ref={missionRef}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={missionInView ? "visible" : "hidden"}
          className="mb-24"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={slideInLeftVariants} className="relative order-2 md:order-1">
              <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-40 rounded-2xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                  alt="Mountains" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-white p-5 rounded-xl shadow-lg"
              >
                <Award className="h-12 w-12 text-purple-600" />
              </motion.div>
            </motion.div>
            
            <motion.div variants={slideInRightVariants} className="flex flex-col justify-center order-1 md:order-2">
              <div className="inline-block bg-purple-100 text-purple-800 px-4 py-1 rounded-full text-sm font-medium mb-4">Our Mission</div>
              <h2 className="text-3xl md:text-4xl mb-6 font-medium tracking-tight">Creating Meaningful Connections</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                At Matchabel, we believe that technology should bring people together, not isolate them. 
                Our mission is to create a platform that facilitates authentic connections based on 
                compatibility, shared values, and mutual interests.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div 
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-start bg-white p-4 rounded-xl shadow-sm"
                >
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <Users className="h-5 w-5 text-purple-800" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Community</h4>
                    <p className="text-gray-500 text-sm">Building supportive networks</p>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex items-start bg-white p-4 rounded-xl shadow-sm"
                >
                  <div className="bg-pink-100 p-3 rounded-full mr-4">
                    <Heart className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Relationships</h4>
                    <p className="text-gray-500 text-sm">Fostering authentic bonds</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          ref={teamRef}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={teamInView ? "visible" : "hidden"}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <motion.span variants={itemVariants} className="inline-block bg-black text-white px-4 py-1 rounded-full text-sm font-medium mb-4">Our People</motion.span>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl mb-4 font-medium tracking-tight">Meet Our Team</motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind Matchabel who are dedicated to helping you find meaningful connections.
            </motion.p>
          </div>
          
          <motion.div 
            variants={staggerContainerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto"
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                  <p className="text-purple-600 mb-3">{member.role}</p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="flex space-x-3">
                    {member.socials.map((social, idx) => (
                      <a 
                        key={idx} 
                        href={social.url} 
                        className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
                        aria-label={`${member.name}'s social link`}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* History Timeline */}
        <motion.section 
          ref={historyRef}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={historyInView ? "visible" : "hidden"}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <motion.span variants={itemVariants} className="inline-block bg-black text-white px-4 py-1 rounded-full text-sm font-medium mb-4">Our History</motion.span>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl mb-4 font-medium tracking-tight">Our Journey</motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to where we are today, explore the key milestones that shaped Matchabel.
            </motion.p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gray-200 md:block hidden"></div>
            
            {/* Timeline events */}
            <div className="space-y-12">
              {historyEvents.map((event, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="relative"
                >
                  <div className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="md:w-1/2 md:px-8 mb-4 md:mb-0 flex md:justify-center">
                      <motion.div 
                        whileHover={{ scale: 1.03 }}
                        className="bg-white p-6 rounded-2xl shadow-md"
                      >
                        <div className="inline-block bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
                          {event.year}
                        </div>
                        <h3 className="text-xl font-medium mb-2">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </motion.div>
                    </div>
                    <div className={`absolute left-0 top-0 md:relative md:flex items-center justify-center md:w-16 ${index % 2 === 0 ? 'md:order-first' : ''}`}>
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 z-10 flex items-center justify-center shadow-lg"
                      >
                        <Clock className="h-8 w-8 text-white" />
                      </motion.div>
                    </div>
                    <div className="md:w-1/2"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          ref={contactRef}
          variants={fadeInVariants}
          initial="hidden"
          animate={contactInView ? "visible" : "hidden"}
          className="mb-24"
        >
          <motion.div 
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="rounded-2xl overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 shadow-xl"
          >
            <div className="md:grid md:grid-cols-2">
              <div className="p-10 md:p-16 flex flex-col justify-center">
                <span className="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">Contact Us</span>
                <h2 className="text-white text-3xl md:text-4xl mb-6 font-medium tracking-tight">Get In Touch</h2>
                <p className="text-white/90 mb-8 leading-relaxed">
                  Have questions or feedback? We'd love to hear from you. 
                  Reach out to our team and we'll get back to you as soon as possible.
                </p>
                <div className="space-y-4">
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center"
                  >
                    <div className="bg-white/10 p-3 rounded-full mr-4">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white">hello@matchabel.com</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center"
                  >
                    <div className="bg-white/10 p-3 rounded-full mr-4">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white">Join our team - we're hiring!</span>
                  </motion.div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 bg-white text-purple-600 px-8 py-3 rounded-full font-medium self-start hover:shadow-lg transition-all"
                  onClick={() => setShowContactForm(true)}
                >
                  Contact Us
                </motion.button>
              </div>
              <div className="hidden md:block relative">
                <img 
                  src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                  alt="Forest" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-purple-600/30 backdrop-blur-sm"></div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Modal */}
          <AnimatePresence>
            {showContactForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                onClick={() => setShowContactForm(false)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-2xl p-6 max-w-md w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-medium">Contact Us</h3>
                    <button 
                      onClick={() => setShowContactForm(false)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors font-medium"
                    >
                      Send Message
                    </button>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Values Section */}
        <motion.section 
          ref={valuesRef}
          variants={staggerContainerVariants}
          initial="hidden"
          animate={valuesInView ? "visible" : "hidden"}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <motion.span variants={itemVariants} className="inline-block bg-black text-white px-4 py-1 rounded-full text-sm font-medium mb-4">Our Principles</motion.span>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl mb-4 font-medium tracking-tight">Our Values</motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600 max-w-3xl mx-auto">
              The core principles that guide everything we do at Matchabel.
            </motion.p>
          </div>
          
          <motion.div 
            variants={staggerContainerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-md"
            >
              <div className="bg-purple-100 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Authenticity</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe in fostering genuine connections that are based on honesty and transparency.
                Our platform is designed to showcase real personalities and interests.
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-md"
            >
              <div className="bg-pink-100 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                <Users className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Community</h3>
              <p className="text-gray-600 leading-relaxed">
                We're dedicated to building a supportive community where everyone feels welcome and valued.
                Belonging and inclusion are central to our approach.
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-md"
            >
              <div className="bg-purple-100 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-medium mb-3">Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                We strive for excellence in everything we do, from our platform to our customer service.
                Quality and attention to detail are at the core of our work.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section 
          ref={faqRef}
          variants={fadeInUpVariants}
          initial="hidden"
          animate={faqInView ? "visible" : "hidden"}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <span className="inline-block bg-black text-white px-4 py-1 rounded-full text-sm font-medium mb-4">Help Center</span>
            <h2 className="text-3xl md:text-4xl mb-4 font-medium tracking-tight">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Find answers to the most common questions about Matchabel.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            <FaqItem 
              question="How does Matchabel work?" 
              answer="Matchabel uses a sophisticated algorithm to connect individuals based on shared interests, values, and preferences. Our platform analyzes multiple factors to suggest compatible matches, prioritizing quality connections over quantity."
            />
            <FaqItem 
              question="Is Matchabel free to use?" 
              answer="Matchabel offers both free and premium subscription options. The free version provides access to basic features, while premium subscriptions unlock advanced matching capabilities, priority support, and additional benefits tailored to enhance your experience."
            />
            <FaqItem 
              question="How does Matchabel ensure safety?" 
              answer="We prioritize user safety through profile verification, encryption of personal data, and continuous monitoring for suspicious activity. Our community guidelines also promote respectful interactions, and we have a dedicated team handling reports and concerns promptly."
            />
            <FaqItem 
              question="Can I use Matchabel internationally?" 
              answer="Yes, Matchabel is available in multiple countries and supports various languages. Our global community continues to grow, connecting people across borders who share similar interests and values regardless of geographic location."
            />
          </div>
        </motion.section>
      </div>
    </div>
  );
};

// FAQ Item Component with improved animations
const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <motion.div 
      initial={false}
      animate={{ 
        backgroundColor: isOpen ? "rgb(249 250 251)" : "white",
        boxShadow: isOpen ? "0 4px 6px -1px rgba(0, 0, 0, 0.05)" : "0 1px 3px 0 rgba(0, 0, 0, 0.05)"
      }}
      className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-6 text-left"
      >
        <span className="font-medium text-lg">{question}</span>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronRight className="h-5 w-5 text-gray-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-gray-600 border-t border-gray-100">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default About;