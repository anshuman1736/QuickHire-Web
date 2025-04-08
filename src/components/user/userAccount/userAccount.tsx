"use client";
import React, { useState } from 'react';
import { User, Mail, Phone, Tag, Upload, Camera, Save, X, Plus, Briefcase, Award, Eye, ChevronDown, ChevronUp, MapPin, Globe, Linkedin, Github, Twitter } from 'lucide-react';
import Image from 'next/image'; // Import Next.js Image component

const UserAccount = () => {
  // State management
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [activeSection, setActiveSection] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  
  // Form data with job seeker specific fields
  const [formData, setFormData] = useState({
    fullName: "Alex Johnson",
    email: "alex.johnson@example.com",
    phoneNo: "+1 (555) 987-6543",
    jobTitle: "Senior Frontend Developer",
    location: "San Francisco, CA",
    bio: "Passionate developer with 5+ years of experience building modern web applications. Specialized in React ecosystem and responsive design.",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS", "Jest", "UI/UX Design"],
    experienceLevel: "senior",
    workType: ["full-time", "remote"],
    website: "https://alexjohnson.dev",
    linkedin: "alexjohnson",
    github: "alexjohnson",
    twitter: "alexjohnson",
    resume: null,
    portfolio: null,
    profile_pic: null
  });
  
  const [newSkill, setNewSkill] = useState("");

  // Type Definitions
  type FormData = {
    fullName: string;
    email: string;
    phoneNo: string;
    jobTitle: string;
    location: string;
    bio: string;
    skills: string[];
    experienceLevel: string;
    workType: string[];
    website: string;
    linkedin: string;
    github: string;
    twitter: string;
    resume: File | null;
    portfolio: File | null;
    profile_pic: File | null;
  }

  // Use type instead of empty interfaces
  type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  type CheckboxChangeEvent = React.ChangeEvent<HTMLInputElement>;
  type FileChangeEvent = React.ChangeEvent<HTMLInputElement>;
  type SubmitEvent = React.FormEvent<HTMLFormElement>;

  // Handlers
  const handleInputChange = (e: InputChangeEvent): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleCheckboxChange = (e: CheckboxChangeEvent): void => {
    const { name, checked, value } = e.target;
    let updatedValues: string[] = [...formData[name as keyof typeof formData] as string[]];
    
    if (checked) {
      updatedValues.push(value);
    } else {
      updatedValues = updatedValues.filter(item => item !== value);
    }
    
    setFormData({ ...formData, [name]: updatedValues });
  };
  
  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      });
      setNewSkill("");
    }
  };
  
  type RemoveSkillHandler = (skillToRemove: string) => void;

  const handleRemoveSkill: RemoveSkillHandler = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };
  
  type HandleFileChange = (e: FileChangeEvent, fileType: keyof Pick<FormData, 'resume' | 'portfolio' | 'profile_pic'>) => Promise<void>;

  const handleFileChange: HandleFileChange = async (e, fileType) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormData({
        ...formData,
        [fileType]: e.target.files[0]
      });
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: SubmitEvent): void => {
    e.preventDefault();
    console.log('Profile updated:', formData);
    // API call would go here
  };

  // Experience levels
  const experienceLevels = [
    { id: "intern", label: "Intern" },
    { id: "junior", label: "Junior (0-2 yrs)" },
    { id: "mid", label: "Mid (2-5 yrs)" },
    { id: "senior", label: "Senior (5+ yrs)" },
    { id: "lead", label: "Lead/Manager" }
  ];

  // Work types
  const workTypes = [
    { id: "full-time", label: "Full-time" },
    { id: "part-time", label: "Part-time" },
    { id: "contract", label: "Contract" },
    { id: "freelance", label: "Freelance" },
    { id: "remote", label: "Remote" },
    { id: "hybrid", label: "Hybrid" },
    { id: "onsite", label: "On-site" }
  ];

  type ToggleSectionHandler = (section: string) => void;

  const toggleSection: ToggleSectionHandler = (section) => {
    setActiveSection((prevSection) => (prevSection === section ? '' : section));
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen py-4 sm:py-6 md:py-8 px-2 sm:px-4 mt-12 sm:mt-20 md:mt-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8 shadow-lg">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">Job Seeker Profile</h1>
          <p className="text-blue-100 text-sm sm:text-base md:text-lg">Manage your professional profile and visibility to employers</p>
        </div>
        
        {/* Main Profile Card */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 md:p-8 flex flex-col md:flex-row items-start gap-4 sm:gap-6 md:gap-8 border-b border-gray-200">
            {/* Profile Picture */}
            <div className="relative mx-auto md:mx-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-white p-1 shadow-xl overflow-hidden border-4 border-white">
                {/* Replace img with Next.js Image component */}
                <div className="relative w-full h-full">
                  <Image 
                    src="/api/placeholder/400/400" 
                    alt="Profile" 
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
              </div>
              <button 
                onClick={() => setIsEditingPhoto(true)}
                className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-blue-600 p-1 sm:p-2 rounded-full text-white shadow-md hover:bg-blue-700 transition-all transform hover:scale-110"
              >
                <Camera size={16} className="sm:hidden" />
                <Camera size={18} className="hidden sm:block" />
              </button>
              
              {isEditingPhoto && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-full">
                  <div className="flex gap-2 sm:gap-3">
                    <label className="p-2 sm:p-3 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700 transition-all">
                      <Upload size={16} className="sm:hidden" />
                      <Upload size={18} className="hidden sm:block" />
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleFileChange(e, 'profile_pic')}
                      />
                    </label>
                    <button 
                      onClick={() => setIsEditingPhoto(false)} 
                      className="p-2 sm:p-3 bg-red-600 rounded-full text-white hover:bg-red-700 transition-all"
                    >
                      <X size={16} className="sm:hidden" />
                      <X size={18} className="hidden sm:block" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Profile Info */}
            <div className="flex-1 w-full md:w-auto text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{formData.fullName}</h2>
                  <p className="text-base sm:text-lg text-blue-600 font-medium">{formData.jobTitle}</p>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center mx-auto md:mx-0"
                >
                  <Eye size={16} className="sm:hidden mr-1" />
                  <Eye size={18} className="hidden sm:block mr-2" />
                  <span className="text-sm sm:text-base">View Public Profile</span>
                </button>
              </div>
              
              <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center md:justify-start gap-x-4 sm:gap-x-6 gap-y-2 text-sm sm:text-base text-gray-600">
                <div className="flex items-center">
                  <MapPin size={16} className="sm:hidden mr-1 text-blue-500" />
                  <MapPin size={18} className="hidden sm:block mr-2 text-blue-500" />
                  <span>{formData.location}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase size={16} className="sm:hidden mr-1 text-blue-500" />
                  <Briefcase size={18} className="hidden sm:block mr-2 text-blue-500" />
                  <span className="capitalize">{formData.experienceLevel}</span>
                </div>
                <div className="flex items-center">
                  <Globe size={16} className="sm:hidden mr-1 text-blue-500" />
                  <Globe size={18} className="hidden sm:block mr-2 text-blue-500" />
                  <a href={formData.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    {formData.website?.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="mt-3 sm:mt-4 flex gap-2 sm:gap-3 justify-center md:justify-start">
                {formData.linkedin && (
                  <a 
                    href={`https://linkedin.com/in/${formData.linkedin}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1.5 sm:p-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    <Linkedin size={16} className="sm:hidden" />
                    <Linkedin size={18} className="hidden sm:block" />
                  </a>
                )}
                {formData.github && (
                  <a 
                    href={`https://github.com/${formData.github}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1.5 sm:p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Github size={16} className="sm:hidden" />
                    <Github size={18} className="hidden sm:block" />
                  </a>
                )}
                {formData.twitter && (
                  <a 
                    href={`https://twitter.com/${formData.twitter}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1.5 sm:p-2 bg-blue-50 text-blue-400 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    <Twitter size={16} className="sm:hidden" />
                    <Twitter size={18} className="hidden sm:block" />
                  </a>
                )}
              </div>
            </div>
          </div>
          
          {/* Main Form */}
          <form onSubmit={handleSubmit} className="divide-y divide-gray-100">
            {/* Basic Information Section */}
            <div className="p-4 sm:p-6 md:p-8">
              <div 
                className="flex justify-between items-center cursor-pointer mb-4 sm:mb-6" 
                onClick={() => toggleSection('basic')}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                  <User size={20} className="sm:hidden mr-2 text-blue-600" />
                  <User size={22} className="hidden sm:block mr-3 text-blue-600" />
                  Basic Information
                </h3>
                {activeSection === 'basic' ? 
                  <ChevronUp size={20} className="sm:hidden text-gray-500" /> : 
                  <ChevronDown size={20} className="sm:hidden text-gray-500" />
                }
                {activeSection === 'basic' ? 
                  <ChevronUp size={22} className="hidden sm:block text-gray-500" /> : 
                  <ChevronDown size={22} className="hidden sm:block text-gray-500" />
                }
              </div>
              
              {(activeSection === 'basic' || activeSection === 'all') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mt-4 sm:mt-5 md:mt-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Full Name*</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <User size={16} className="sm:hidden" />
                        <User size={18} className="hidden sm:block" />
                      </span>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Professional Title*</label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      required
                      placeholder="E.g. Senior Frontend Developer"
                      className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Email Address*</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Mail size={16} className="sm:hidden" />
                        <Mail size={18} className="hidden sm:block" />
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Phone Number</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Phone size={16} className="sm:hidden" />
                        <Phone size={18} className="hidden sm:block" />
                      </span>
                      <input
                        type="tel"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleInputChange}
                        className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Location*</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <MapPin size={16} className="sm:hidden" />
                        <MapPin size={18} className="hidden sm:block" />
                      </span>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                        placeholder="City, Country"
                        className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Experience Level*</label>
                    <select
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {experienceLevels.map(level => (
                        <option key={level.id} value={level.id}>{level.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Professional Bio*</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tell employers about your professional background, skills, and what you're looking for..."
                    />
                  </div>
                </div>
              )}
            </div>
            
            {/* Skills & Preferences Section */}
            <div className="p-4 sm:p-6 md:p-8">
              <div 
                className="flex justify-between items-center cursor-pointer mb-4 sm:mb-6" 
                onClick={() => toggleSection('skills')}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                  <Award size={20} className="sm:hidden mr-2 text-blue-600" />
                  <Award size={22} className="hidden sm:block mr-3 text-blue-600" />
                  Skills & Job Preferences
                </h3>
                {activeSection === 'skills' ? 
                  <ChevronUp size={20} className="sm:hidden text-gray-500" /> : 
                  <ChevronDown size={20} className="sm:hidden text-gray-500" />
                }
                {activeSection === 'skills' ? 
                  <ChevronUp size={22} className="hidden sm:block text-gray-500" /> : 
                  <ChevronDown size={22} className="hidden sm:block text-gray-500" />
                }
              </div>
              
              {(activeSection === 'skills' || activeSection === 'all') && (
                <div className="mt-4 sm:mt-6 space-y-6 sm:space-y-8">
                  {/* Skills Section */}
                  <div>
                    <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">Your Skills*</h4>
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                      {formData.skills.map((skill, index) => (
                        <div key={index} className="bg-blue-100 text-blue-800 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-full flex items-center shadow-sm hover:shadow transition-all">
                          <Tag size={14} className="sm:hidden mr-1" />
                          <Tag size={16} className="hidden sm:block mr-2" />
                          <span className="font-medium">{skill}</span>
                          <button 
                            type="button" 
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-1 sm:ml-2 text-blue-500 hover:text-blue-700 transition-colors"
                          >
                            <X size={14} className="sm:hidden" />
                            <X size={16} className="hidden sm:block" />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 sm:gap-3 max-w-lg">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill (e.g. Python, Project Management)"
                        className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                      />
                      <button
                        type="button"
                        onClick={handleAddSkill}
                        disabled={!newSkill.trim()}
                        className="px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        <Plus size={16} className="sm:hidden mr-1" />
                        <Plus size={18} className="hidden sm:block mr-1" />
                        Add
                      </button>
                    </div>
                  </div>
                  
                  {/* Work Preferences */}
                  <div>
                    <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">Job Preferences*</h4>
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Work Type Preferences</label>
                        <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs sm:text-sm">
                          {workTypes.map(type => (
                            <label key={type.id} className="inline-flex items-center">
                              <input
                                type="checkbox"
                                name="workType"
                                value={type.id}
                                checked={formData.workType.includes(type.id)}
                                onChange={handleCheckboxChange}
                                className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <span className="ml-1 sm:ml-2 text-gray-700">{type.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Resume & Portfolio Section */}
            <div className="p-4 sm:p-6 md:p-8">
              <div 
                className="flex justify-between items-center cursor-pointer mb-4 sm:mb-6" 
                onClick={() => toggleSection('documents')}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                  <Briefcase size={20} className="sm:hidden mr-2 text-blue-600" />
                  <Briefcase size={22} className="hidden sm:block mr-3 text-blue-600" />
                  Documents
                </h3>
                {activeSection === 'documents' ? 
                  <ChevronUp size={20} className="sm:hidden text-gray-500" /> : 
                  <ChevronDown size={20} className="sm:hidden text-gray-500" />
                }
                {activeSection === 'documents' ? 
                  <ChevronUp size={22} className="hidden sm:block text-gray-500" /> : 
                  <ChevronDown size={22} className="hidden sm:block text-gray-500" />
                }
              </div>
              
              {(activeSection === 'documents' || activeSection === 'all') && (
                <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                  {/* Resume Upload */}
                  <div className="border-2 border-dashed border-blue-200 rounded-lg sm:rounded-xl p-4 sm:p-6 bg-blue-50">
                    <div className="text-center">
                      <div className="mx-auto flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-100 mb-3 sm:mb-4">
                        <Upload size={20} className="sm:hidden text-blue-600" />
                        <Upload size={24} className="hidden sm:block text-blue-600" />
                      </div>
                      <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-1 sm:mb-2">Upload Your Resume*</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Keep your resume updated to get better matches</p>
                      <label className="px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors inline-flex items-center cursor-pointer shadow-sm">
                        {isUploading ? 'Uploading...' : 'Select Resume'}
                        <input 
                          type="file" 
                          accept=".pdf,.doc,.docx" 
                          className="hidden" 
                          onChange={(e) => handleFileChange(e, 'resume')}
                          disabled={isUploading}
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-2 sm:mt-3">PDF, DOCX (Max 5MB)</p>
                    </div>
                  </div>
                  
                  {/* Portfolio Upload */}
                  <div className="border-2 border-dashed border-indigo-200 rounded-lg sm:rounded-xl p-4 sm:p-6 bg-indigo-50">
                    <div className="text-center">
                      <div className="mx-auto flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-indigo-100 mb-3 sm:mb-4">
                        <Globe size={20} className="sm:hidden text-indigo-600" />
                        <Globe size={24} className="hidden sm:block text-indigo-600" />
                      </div>
                      <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-1 sm:mb-2">Portfolio Link</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Showcase your work to stand out</p>
                      <div className="flex">
                        <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                          <Globe size={16} className="sm:hidden" />
                          <Globe size={18} className="hidden sm:block" />
                        </span>
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          placeholder="https://yourportfolio.com"
                          className="flex-1 p-2 sm:p-3 text-xs sm:text-sm border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Social Links Section */}
            <div className="p-4 sm:p-6 md:p-8">
              <div 
                className="flex justify-between items-center cursor-pointer mb-4 sm:mb-6" 
                onClick={() => toggleSection('social')}
              >
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                  <Globe size={20} className="sm:hidden mr-2 text-blue-600" />
                  <Globe size={22} className="hidden sm:block mr-3 text-blue-600" />
                  Social Profiles
                </h3>
                {activeSection === 'social' ? 
                  <ChevronUp size={20} className="sm:hidden text-gray-500" /> : 
                  <ChevronDown size={20} className="sm:hidden text-gray-500" />
                }
                {activeSection === 'social' ? 
                  <ChevronUp size={22} className="hidden sm:block text-gray-500" /> : 
                  <ChevronDown size={22} className="hidden sm:block text-gray-500" />
                }
              </div>
              
              {(activeSection === 'social' || activeSection === 'all') && (
                <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">LinkedIn Username</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Linkedin size={16} className="sm:hidden" />
                        <Linkedin size={18} className="hidden sm:block" />
                      </span>
                      <input
                        type="text"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        placeholder="yourusername"
                        className="flex-1 p-2 sm:p-3 text-xs sm:text-sm border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">GitHub Username</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Github size={16} className="sm:hidden" />
                        <Github size={18} className="hidden sm:block" />
                      </span>
                      <input
                        type="text"
                        name="github"
                        value={formData.github}
                        onChange={handleInputChange}
                        placeholder="yourusername"
                        className="flex-1 p-2 sm:p-3 text-xs sm:text-sm border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Twitter Username</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2 sm:px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Twitter size={16} className="sm:hidden" />
                        <Twitter size={18} className="hidden sm:block" />
                      </span>
                      <input
                        type="text"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleInputChange}
                        placeholder="yourusername"
                        className="flex-1 p-2 sm:p-3 text-xs sm:text-sm border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Save Section */}
            <div className="p-4 sm:p-6 md:p-8 bg-gray-50 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
                <div>
                  <h4 className="text-sm sm:text-base font-medium text-gray-800 text-center md:text-left">Ready to update your profile?</h4>
                  <p className="text-xs sm:text-sm text-gray-600 text-center md:text-left">Make sure all required fields are filled</p>
                </div>
                <div className="flex gap-2 sm:gap-3 w-full md:w-auto">
                  <button
                    type="button"
                    className="flex-1 md:flex-none px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 md:flex-none px-4 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center"
                  >
                    <Save size={16} className="sm:hidden mr-1" />
                    <Save size={18} className="hidden sm:block mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;