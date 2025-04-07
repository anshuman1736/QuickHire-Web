import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ChevronLeft, ChevronRight, User, 
  BookOpen, Building, MapPin, Play, Heart, 
  CheckCircle, Star, Zap, Globe, Briefcase,
  BarChart, Award, Shield, Clock
} from 'lucide-react';

function Features() {
  const features = [
    {
      title: "Smart Matching",
      description: "AI-powered algorithm to match candidates with perfect job opportunities.",
      icon: Heart,
      gradient: "from-pink-500 via-red-500 to-yellow-500",
      iconColor: "text-pink-500",
      bgGradient: "from-pink-100 to-pink-50"
    },
    {
      title: "Verified Profiles",
      description: "All candidate and job listings are thoroughly verified for maximum credibility.",
      icon: CheckCircle,
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      iconColor: "text-green-500",
      bgGradient: "from-green-100 to-green-50"
    },
    {
      title: "Global Opportunities",
      description: "Connect with opportunities and talents from over 30 countries worldwide.",
      icon: Globe,
      gradient: "from-blue-500 via-cyan-500 to-sky-500",
      iconColor: "text-blue-500",
      bgGradient: "from-blue-100 to-blue-50"
    },
    {
      title: "Career Analytics",
      description: "Detailed insights into your job search activity and application performance.",
      icon: BarChart,
      gradient: "from-purple-500 via-violet-500 to-indigo-500",
      iconColor: "text-purple-500",
      bgGradient: "from-purple-100 to-purple-50"
    },
    {
      title: "Premium Employers",
      description: "Access to exclusive job listings from top-tier companies in every industry.",
      icon: Building,
      gradient: "from-amber-500 via-yellow-500 to-orange-500",
      iconColor: "text-amber-500",
      bgGradient: "from-amber-100 to-amber-50"
    },
    {
      title: "Instant Notifications",
      description: "Real-time alerts for new jobs matching your skills and preferences.",
      icon: Clock,
      gradient: "from-teal-500 via-cyan-500 to-blue-500",
      iconColor: "text-teal-500",
      bgGradient: "from-teal-100 to-teal-50"
    }
  ];

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 px-8 py-20 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-amber-100 blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-blue-100 blur-3xl opacity-30"></div>
        <motion.div 
          animate={{ 
            rotate: 360,
            transition: { 
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }
          }}
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full border-2 border-dashed border-amber-200 opacity-20 transform -translate-x-1/2 -translate-y-1/2"
        ></motion.div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 text-xs font-medium mb-4 shadow-sm"
          >
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-1.5" />
              <span>Why Choose Us</span>
              <Award className="w-4 h-4 ml-1.5" />
            </div>
          </motion.span>
          
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">
            Our Features
          </h2>
          
          <motion.p 
            className="max-w-2xl mx-auto text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover what makes JobPro the leading platform for job search and recruitment.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -5 }}
            >
              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 h-full relative overflow-hidden"
                whileTap={{ scale: 0.98 }}
              >
                {/* Subtle gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-30`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <motion.div 
                    className={`w-16 h-16 rounded-xl bg-white shadow-md flex items-center justify-center mb-6 ${feature.iconColor}`}
                    whileHover={{ 
                      rotate: [0, 15, -15, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                  
                  <motion.div 
                    className="mt-6 flex items-center text-amber-600 font-medium text-sm cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features