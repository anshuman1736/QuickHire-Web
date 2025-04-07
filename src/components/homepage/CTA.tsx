'use client'

import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowRight,  
  Briefcase,
  Zap, 
  ChevronRight,
  Star,
  Shield,
  CpuIcon,
  Globe,
  Rocket,
  Award,
  Code2
} from "lucide-react";
import { motion, useScroll, useTransform } from 'framer-motion';


const TypingAnimation = ({ 
  text, 
  duration = 50, 
  className = '', 
  delay = 0
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setCurrentIndex(0);
    setIsTyping(true);
  }, [text]);

  useEffect(() => {
    let timeout;

    if (isTyping && currentIndex < text.length) {
      // Set a delay for the first character if needed
      const initialDelay = currentIndex === 0 ? delay : 0;
      
      timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, initialDelay + duration);
    } else if (currentIndex >= text.length) {
      setIsTyping(false);
    }

    return () => clearTimeout(timeout);
  }, [isTyping, currentIndex, text, duration, delay]);

  return (
    <span className={className}>
      {displayedText}
      {isTyping && <span className="inline-block w-1 h-4 ml-0.5 bg-current animate-pulse"></span>}
    </span>
  );
};



function CTA() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scroll-based animations
  const y = useTransform(scrollYProgress, [0, 1], [50, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  useEffect(() => {
    const handleScroll = () => {
      const element = containerRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight * 0.75 && rect.bottom >= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="bg-gradient-to-r from-white to-gray-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative"
    >
      {/* Decorative elements */}
      <motion.div 
        style={{ opacity }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      >
        <div className="absolute top-40 left-20 w-64 h-64 rounded-full bg-amber-100 blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-blue-100 blur-3xl opacity-30"></div>
      </motion.div>

      <motion.div 
        className="max-w-6xl mx-auto relative z-10"
        style={{ y }}
      >
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <Rocket className="w-7 h-7 text-amber-500 mr-3 animate-pulse" />
            <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
              <TypingAnimation 
                text="Transform Your Career" 
                duration={50} 
                className="inline-block"
              />
            </h2>
            <CpuIcon className="w-7 h-7 text-amber-600 ml-3 animate-spin-slow" />
          </div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto flex items-center justify-center">
            <Code2 className="w-5 h-5 mr-2 text-gray-400" />
            Join thousands of professionals who found their dream opportunities
            <Globe className="w-5 h-5 ml-2 text-gray-400" />
          </p>
        </motion.div>

        {/* Main Card Container */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Left Content Section */}
            <div className="bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-white p-8 lg:p-12 lg:w-3/5 relative overflow-hidden">
              {/* Animated decorative elements */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div 
                  animate={{ 
                    x: [0, 10, 0],
                    y: [0, -10, 0],
                    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute right-0 bottom-0 w-96 h-96 bg-white/10 rounded-full transform translate-x-1/3 translate-y-1/3 blur-md"
                />
                <motion.div 
                  animate={{ 
                    x: [0, -10, 0],
                    y: [0, 10, 0],
                    transition: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute left-0 top-0 w-64 h-64 bg-white/10 rounded-full transform -translate-x-1/3 -translate-y-1/3 blur-md"
                />
              </div>
              
              <div className="relative z-10">
                <motion.span 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium mb-6"
                >
                  <Zap className="w-3.5 h-3.5 mr-1.5" />
                  Take the next step
                </motion.span>
                
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
                >
                  Ready to discover your <span className="text-white underline decoration-2 decoration-white/40">perfect</span> opportunity?
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-white/90 mb-8 text-lg max-w-lg"
                >
                  Our AI-powered platform connects you with personalized job matches based on your unique skills and career aspirations.
                </motion.p>
                
                {/* Stats Cards */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6"
                >
                  {[
                    { value: "30K+", label: "Open Positions", icon: Briefcase },
                    { value: "92%", label: "Success Rate", icon: Award },
                    { value: "24hr", label: "Response Time", icon: Shield }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/10 rounded-xl p-4 backdrop-blur-sm"
                    >
                      <stat.icon className="w-5 h-5 text-amber-200 mb-2" />
                      <div className="text-xl font-bold">{stat.value}</div>
                      <div className="text-xs text-white/80">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Testimonial */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? 1 : 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="bg-gradient-to-r from-white/20 to-white/10 rounded-xl p-4 mb-6"
                >
                  <div className="flex text-amber-200 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm italic mb-2">
                    "JobPro matched me with opportunities I never would have found otherwise. The personalized approach made all the difference."
                  </p>
                  <p className="text-xs text-white/70">— Sarah T., Software Developer</p>
                </motion.div>
              </div>
            </div>
            
            {/* Right CTA Section */}
            <div className="bg-white p-8 lg:p-12 lg:w-2/5 flex flex-col justify-center">
              <h3 className="font-bold text-xl mb-6 text-gray-800">
                Get started in minutes
              </h3>
              
              {/* Feature List */}
              <ul className="mb-8 space-y-4">
                {[
                  "AI-powered job matching",
                  "Direct connections with hiring managers",
                  "Personalized career guidance",
                  "Exclusive job opportunities"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                      opacity: isVisible ? 1 : 0, 
                      x: isVisible ? 0 : 20 
                    }}
                    transition={{ delay: 0.3 + (index * 0.1) }}
                    className="flex items-center text-gray-700"
                  >
                    <div className="bg-amber-100 p-1 rounded-full mr-3">
                      <ChevronRight className="w-4 h-4 text-amber-600" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
              
              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ delay: 0.7 }}
                className="space-y-4"
              >
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center group"
                >
                  <span>Create Your Profile</span>
                  <Briefcase className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                
                <motion.button 
                  whileHover={{ 
                    scale: 1.03, 
                    backgroundColor: "rgba(251, 191, 36, 0.1)" 
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 px-6 bg-transparent border border-amber-500/30 rounded-xl text-amber-600 transition-all font-medium flex items-center justify-center group"
                >
                  <span>Browse Opportunities</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
              
              {/* Trust Indicator */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex items-center mt-8 pt-6 border-t border-gray-100"
              >
                <Shield className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-500">Trusted by 10,000+ companies worldwide</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Animated footer text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-gray-50 to-white rounded-full px-6 py-3 shadow-inner border border-gray-200/50">
            <Zap className="w-5 h-5 text-amber-500 mr-2 animate-pulse" />
            <TypingAnimation
              text="Join today and unlock your career potential!"
              className="text-base text-gray-600 inline-block"
              duration={30}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default CTA;