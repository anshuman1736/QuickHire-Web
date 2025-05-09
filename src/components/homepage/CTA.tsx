"use client";

import React, { useState, useRef, useEffect } from "react";
import "/styles/style.css";
import {
  ArrowRight,
  
  ChevronRight,
  
  MoveLeft,
  MapPin,
  
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { JobPosting } from "@/types/job";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface IBrowsResponse {
  STS: string;
  MSG: string;
  CONTENT: JobPosting[];
}

function CTA() {
  const [fetchJobs, setFetchJobs] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isLoading } = useQuery<IBrowsResponse>({
    queryKey: ["browseJobs"],
    queryFn: async () => {
      const response = await axios.get(
        "https://qh.api.quick-hire.in/home/browseJobs"
      );
      return response.data;
    },
    enabled: fetchJobs,
  });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = containerRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight * 0.75 && rect.bottom >= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-2 px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
            Career Opportunities
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Opportunity
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform connects you with personalized job matches based on your skills
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
          {data ? (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() => {
                    queryClient.removeQueries();
                    setFetchJobs(false);
                  }}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <MoveLeft className="w-4 h-4 mr-2" /> Back 
                </button>
                <span className="text-sm text-gray-500">
                  {data.CONTENT.length} jobs found
                </span>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.CONTENT.slice(0, 6).map((job, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx}
                    className="bg-white p-5 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all group"
                  >
                    <div className="mb-4">
                      <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full mb-2">
                        New
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {job.jobTitle}
                      </h3>
                    </div>
                    
                    <div className="flex items-center justify-between text-stone-900  mb-4">
                      <span className="flex items-center">
                        <MapPin size={14} className="mr-1" /> {job.companyDTO.companyName}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {job.jobDescription}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <MapPin size={14} className="mr-1" /> {job.jobAddress}
                      </span>
                      <span className="font-medium">₹{job.salary}</span>
                    </div>
                    
                    <button
                      onClick={() => router.push("/login")}
                      className="w-full flex items-center justify-center bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 rounded-lg py-2 px-4 transition-colors group-hover:border-blue-400"
                    >
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                ))}
              </div>
              
              {data.CONTENT.length > 6 && (
                <div className="mt-8 text-center">
                  <Link 
                  href={"/login"}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View all {data.CONTENT.length} jobs
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 p-8 md:p-10 lg:p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Find jobs that match your expertise
                </h3>
                
                
                
                <div className="space-y-4 mb-8">
                  {["AI-powered job matching", "Personalized career recommendations", "Direct connections with hiring managers"].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mt-1 mr-3 flex-shrink-0 bg-blue-100  rounded-full p-1">
                        <ChevronRight className="w-3 h-3" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFetchJobs(true)}
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg  transition-colors flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Searching jobs...
                      </>
                    ) : (
                      <>
                        Find Jobs Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </motion.button>
                  
                  
                </div>
                
                
              </div>
              
              <div className="hidden md:block w-1/2 text-black relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div
                    animate={{
                      x: [0, 10, 0],
                      y: [0, -10, 0],
                      transition: {
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className="absolute right-0 bottom-0 w-96 h-96 bg-white/10 rounded-full transform translate-x-1/3 translate-y-1/3 blur-md"
                  />
                  <motion.div
                    animate={{
                      x: [0, -10, 0],
                      y: [0, 10, 0],
                      transition: {
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className="absolute left-0 top-0 w-64 h-64 bg-white/10 rounded-full transform -translate-x-1/3 -translate-y-1/3 blur-md"
                  />
                </div>
                
                <div className="relative z-10 p-12 h-full flex flex-col justify-center">
                 

                  <div className=" rounded-xl p-5 backdrop-blur-sm border border-gray-200 bg-white/30 shadow-md">
                    <div className="flex text-yellow-200 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm italic  mb-3">
                      {"JobPro matched me with opportunities I never would have found otherwise. The personalized approach made all the difference."}
                    </p>
                    <p className="text-xs ">
                      — Sarah T., Software Developer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        
      </div>
    </section>
  );
}

export default CTA;