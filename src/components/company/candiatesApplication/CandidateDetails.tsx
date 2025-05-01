"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  FileText,
  User,
  ArrowLeft,
  Briefcase,
  Download,
  ExternalLink,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

export default function CandidateDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPdfLoading, setIsPdfLoading] = useState(true);
  const [pdfScale, setPdfScale] = useState(1);

  const fullName = searchParams.get("fullName");
  const email = searchParams.get("email");
  const phoneNo = searchParams.get("phoneNo");
  const resume = searchParams.get("resume");
  const profile_pic = searchParams.get("profile_pic");
  const majorIntrest = searchParams.get("majorIntrest");
  const completeProfile = searchParams.get("completeProfile");
  const categoryName = searchParams.get("categoryName");

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleZoomIn = () => {
    setPdfScale(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setPdfScale(prev => Math.max(prev - 0.1, 0.5));
  };

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isFullscreen]);

  return (
    <div className="p-4 md:p-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header with profile info */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 md:p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 mb-4 md:mb-6">
            <div className="flex-shrink-0">
              {profile_pic ? (
                <div className="h-24 w-24 md:h-28 md:w-28 rounded-full overflow-hidden border-4 border-white">
                  <img
                    src={profile_pic}
                    alt={fullName || "Candidate"}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-24 w-24 md:h-28 md:w-28 rounded-full bg-white flex items-center justify-center text-blue-600 text-3xl font-bold border-4 border-white">
                  <User size={36} className="md:hidden" />
                  <User size={48} className="hidden md:block" />
                </div>
              )}
            </div>
            <div className="text-center md:text-left text-white">
              <h1 className="text-2xl md:text-3xl font-bold">{fullName}</h1>
              <div className="flex items-center justify-center md:justify-start mt-2">
                <Briefcase className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                <p className="text-base md:text-lg">{majorIntrest || "Not specified"}</p>
              </div>
              <span
                className={`mt-2 md:mt-3 inline-block px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium ${
                  completeProfile === "true" ? "bg-green-500" : "bg-yellow-500"
                }`}
              >
                {completeProfile === "true"
                  ? "Complete Profile"
                  : "Incomplete Profile"}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Mail className="text-blue-500 mr-2 md:mr-3 w-4 h-4 md:w-5 md:h-5" />
              <div className="overflow-hidden">
                <p className="text-xs md:text-sm text-gray-500">Email</p>
                <p className="font-medium text-sm md:text-base truncate">{email}</p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Phone className="text-blue-500 mr-2 md:mr-3 w-4 h-4 md:w-5 md:h-5" />
              <div>
                <p className="text-xs md:text-sm text-gray-500">Phone Number</p>
                <p className="font-medium text-sm md:text-base">{phoneNo}</p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <FileText className="text-blue-500 mr-2 md:mr-3 w-4 h-4 md:w-5 md:h-5" />
              <div>
                <p className="text-xs md:text-sm text-gray-500">Category</p>
                <p className="font-medium text-sm md:text-base">{categoryName}</p>
              </div>
            </div>
          </div>

          {/* Resume Viewer */}
          {resume && (
            <div className={`mt-4 md:mt-8 border rounded-lg overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50 bg-white m-0' : ''}`}>
              <div className="p-3 md:p-4 bg-gray-50 border-b flex justify-between items-center">
                <h3 className="font-medium flex items-center text-base md:text-lg">
                  <FileText className="text-blue-500 mr-2 w-4 h-4 md:w-5 md:h-5" />
                  Resume
                </h3>
                <div className="flex space-x-2">
                  <a 
                    href={resume} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1 md:p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                    aria-label="Open in new tab"
                  >
                    <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                  <a 
                    href={resume} 
                    download
                    className="p-1 md:p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                    aria-label="Download"
                  >
                    <Download className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                  <button 
                    onClick={toggleFullscreen}
                    className="p-1 md:p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                    aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  >
                    {isFullscreen ? 
                      <Minimize className="w-4 h-4 md:w-5 md:h-5" /> : 
                      <Maximize className="w-4 h-4 md:w-5 md:h-5" />
                    }
                  </button>
                </div>
              </div>
              
              {/* Mobile PDF controls */}
              <div className="flex justify-center md:hidden space-x-4 p-2 bg-gray-100 border-t">
                <button 
                  onClick={handleZoomOut}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                  disabled={pdfScale <= 1}
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="flex items-center text-sm">{Math.round(pdfScale * 100)}%</span>
                <button 
                  onClick={handleZoomIn}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                  disabled={pdfScale >= 2}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
              
              <div className={`${isFullscreen ? 'h-[calc(100%-60px)]' : 'h-[80vh] md:h-[1200px]'} w-full relative`}>
                {isPdfLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                    <div className="animate-pulse text-gray-500">Loading PDF...</div>
                  </div>
                )}
                <iframe 
                  src={resume} 
                  className="w-full h-full" 
                  title="Resume Preview"
                  style={{
                    transform: `scale(${pdfScale})`,
                    transformOrigin: '0 0',
                    width: `${100 / pdfScale}%`,
                    height: `${100 / pdfScale}%`,
                  }}
                  onLoad={() => setIsPdfLoading(false)}
                ></iframe>
              </div>
            </div>
          )}

          {!isFullscreen && (
            <button
              onClick={() => router.back()}
              className="mt-4 md:mt-6 px-3 py-2 md:px-4 md:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center text-sm md:text-base"
            >
              <ArrowLeft className="mr-1 md:mr-2" size={16} />
              Back
            </button>
          )}
          
          {isFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="fixed bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center shadow-lg z-50"
            >
              <Minimize className="mr-2" size={16} />
              Exit Fullscreen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}