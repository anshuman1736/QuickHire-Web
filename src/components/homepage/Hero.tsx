'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  
  Search, 
  MapPin, 
  Briefcase, 
  Sparkles, 
  Building, 
  User, 
  TrendingUp,
  CheckCircle,
  Upload
} from "lucide-react"

function Hero() {
  const [activeTab, setActiveTab] = useState('jobseeker')
  const [searchFocused, setSearchFocused] = useState(false)
  const [locationFocused, setLocationFocused] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')
  
  const featuredCompanies = [
    "Google", "Microsoft", "Apple", "Amazon", "Meta", "Netflix"
  ]
  
  useEffect(() => {
    // Using requestAnimationFrame for smoother initial animation
    const animationFrame = requestAnimationFrame(() => {
      setIsVisible(true)
    })
    
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  const handleSearch = () => {
    // Placeholder for search functionality
    console.log('Searching for:', searchTerm, 'in', location)
    // Here you would typically redirect to search results page
  }

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-amber-100 blur-3xl opacity-20"></div>
        <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-blue-100 blur-3xl opacity-20"></div>
        <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-purple-100 blur-3xl opacity-10"></div>
        
        <motion.div 
          className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border border-gray-200 opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Added additional decorative elements */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full border border-amber-200 opacity-10"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-green-100 blur-2xl opacity-10"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
          {/* Left content column - improved animations */}
          <motion.div
            className="w-full lg:w-1/2 lg:pr-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-3 flex items-center">
              <Sparkles className="w-5 h-5 text-amber-500 mr-2" />
              <span className="text-sm font-medium px-3 py-1 bg-gradient-to-r from-amber-50 to-amber-100 rounded-full text-amber-700 border border-amber-100">
                #1 Job Platform in the Industry
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Dream Career</span>
              <br />Take the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">Next Step</span>
            </h1>
            
            <motion.p 
              className="text-gray-600 text-lg mb-8 max-w-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Connect with <span className="font-semibold">10,000+</span> employers and discover opportunities 
              that match your skills, experience, and career aspirations with our AI-powered matching system.
            </motion.p>
            
            {/* Stats row - improved layout and animations */}
            <motion.div 
              className="flex flex-wrap gap-8 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-3 shadow-sm">
                  <TrendingUp className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">2.4M+</p>
                  <p className="text-sm text-gray-500">Active Jobs</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3 shadow-sm">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">75K+</p>
                  <p className="text-sm text-gray-500">Companies</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-3 shadow-sm">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">8.5M+</p>
                  <p className="text-sm text-gray-500">Job Seekers</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Right search card - improved UI and functionality */}
          <motion.div
            className="w-full lg:w-5/12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white shadow-xl rounded-3xl border border-gray-100 overflow-hidden relative">
              {/* Tab switches with improved animations */}
              <div className="flex border-b border-gray-100">
                <button
                  className={`flex-1 py-4 font-medium text-center relative transition-colors ${activeTab === 'jobseeker' ? 'text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('jobseeker')}
                >
                  <span className="flex items-center justify-center">
                    <User className="w-4 h-4 mr-2" />
                    Job Seeker
                  </span>
                  {activeTab === 'jobseeker' && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600"
                      layoutId="activeTab"
                    />
                  )}
                </button>
                
                <button
                  className={`flex-1 py-4 font-medium text-center relative transition-colors ${activeTab === 'employer' ? 'text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('employer')}
                >
                  <span className="flex items-center justify-center">
                    <Building className="w-4 h-4 mr-2" />
                    Employer
                  </span>
                  {activeTab === 'employer' && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600"
                      layoutId="activeTab"
                    />
                  )}
                </button>
              </div>
              
              {/* Card content with improved animations and functionality */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'jobseeker' ? (
                    <motion.div
                      key="jobseeker"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="min-h-52"
                    >
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">Find Your Next Opportunity</h3>
                      
                      {/* Job search inputs with improved functionality */}
                      <div className="mb-4 relative">
                        <div className={`flex items-center border ${searchFocused ? 'border-amber-400 shadow-sm' : 'border-gray-200'} rounded-xl px-3 py-3 bg-gray-50 transition-all`}>
                          <Search className="w-5 h-5 text-gray-400 mr-2" />
                          <input
                            type="text"
                            placeholder="Job title, keywords, or company"
                            className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                          />
                        </div>
                      </div>
                      
                      <div className="mb-5 relative">
                        <div className={`flex items-center border ${locationFocused ? 'border-amber-400 shadow-sm' : 'border-gray-200'} rounded-xl px-3 py-3 bg-gray-50 transition-all`}>
                          <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                          <input
                            type="text"
                            placeholder="City, state, or remote"
                            className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-500"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            onFocus={() => setLocationFocused(true)}
                            onBlur={() => setLocationFocused(false)}
                          />
                        </div>
                      </div>
                      
                      <motion.button
                        className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white rounded-xl font-medium flex items-center justify-center transition-all shadow-md hover:shadow-lg"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSearch}
                      >
                        <Briefcase className="w-5 h-5 mr-2" />
                        Search Jobs
                      </motion.button>
                      
                      <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                        <span>Or</span>
                        <button className="ml-2 font-medium text-amber-600 hover:text-amber-700 flex items-center">
                          <Upload className="w-4 h-4 mr-1" />
                          Upload your resume
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="employer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="min-h-52"
                    >
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">Find Perfect Candidates</h3>
                      
                      <div className="space-y-3 mb-5">
                        {[
                          'Post unlimited job listings',
                          'Browse qualified candidate profiles',
                          'AI-powered talent matching',
                          'Detailed analytics and insights'
                        ].map((feature, i) => (
                          <motion.div 
                            key={i} 
                            className="flex items-start"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.3 }}
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <p className="text-gray-600">{feature}</p>
                          </motion.div>
                        ))}
                      </div>
                      
                      <motion.button
                        className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white rounded-xl font-medium flex items-center justify-center transition-all shadow-md hover:shadow-lg"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Building className="w-5 h-5 mr-2" />
                        Post a Job
                      </motion.button>
                      
                      <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                        <span>Or</span>
                        <button className="ml-2 font-medium text-amber-600 hover:text-amber-700">
                          Contact our recruiting team
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Featured companies - improved animations and layout */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-6">TRUSTED BY INDUSTRY LEADERS</p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6">
            {featuredCompanies.map((company, i) => (
              <motion.div
                key={i}
                className="text-lg font-bold text-gray-400 hover:text-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: isVisible ? 1 : 0,
                  transition: { delay: 0.9 + (i * 0.1) }
                }}
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;