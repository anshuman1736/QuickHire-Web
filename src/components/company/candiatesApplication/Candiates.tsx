"use client"
import React, { useState } from "react";
import { Briefcase, ArrowLeft, Search, Clock, Filter } from "lucide-react";
import Link from "next/link";

const Candidates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  
  const candidates = [
    {
      name: "Daniel Joe",
      role: "Web Developer",
      experience: "3 yrs",
      timeAgo: "2h ago",
      postedBy: "Daniel Joe",
    },
    {
      name: "Sophia Lane",
      role: "UI/UX Designer",
      experience: "2 yrs",
      timeAgo: "5h ago",
      postedBy: "Sophia Lane",
    },
    {
      name: "Ethan Wright",
      role: "Frontend Engineer",
      experience: "4 yrs",
      timeAgo: "1d ago",
      postedBy: "Ethan Wright",
    },
    {
      name: "Ava Patel",
      role: "Backend Developer",
      experience: "5 yrs",
      timeAgo: "3d ago",
      postedBy: "Ava Patel",
    },
    {
      name: "Liam Chen",
      role: "Full Stack Developer",
      experience: "6 yrs",
      timeAgo: "1h ago",
      postedBy: "Liam Chen",
    },
    {
      name: "Mia Gomez",
      role: "Project Manager",
      experience: "7 yrs",
      timeAgo: "4h ago",
      postedBy: "Mia Gomez",
    },
    {
      name: "Noah Smith",
      role: "DevOps Engineer",
      experience: "4 yrs",
      timeAgo: "2d ago",
      postedBy: "Noah Smith",
    },
    {
      name: "Emma Johnson",
      role: "QA Tester",
      experience: "3 yrs",
      timeAgo: "6h ago",
      postedBy: "Emma Johnson",
    },
  ];

  const roles = [...new Set(candidates.map(candidate => candidate.role))];
  
  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        candidate.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "" || candidate.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6 md:p-12 bg-gray-50 min-h-screen mt-11">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-gray-600 mb-4 transition-all hover:text-blue-600">
          <ArrowLeft className="w-4 h-4" />
          <Link href="/company/job-application" className="text-blue-500 hover:text-blue-700">
            Back to Applications
          </Link>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Applications for Web Development
        </h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search candidates..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="">All Roles</option>
              {roles.map((role, idx) => (
                <option key={idx} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="text-gray-600 mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4" /> 
          <span>Showing {filteredCandidates.length} of {candidates.length} candidates</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate, idx) => (
            <div 
              key={idx} 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex gap-4 items-start mb-6">
                <div className="flex-shrink-0">
                  <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    {candidate.name.charAt(0)}
                  </div>
                </div>
                <div className="space-y-1 flex-grow">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {candidate.name}
                  </h2>
                  <p className="text-blue-600 font-medium">{candidate.role}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Briefcase className="w-4 h-4" /> 
                    <span>{candidate.experience} experience</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t pt-4">
                <p className="text-gray-500 text-sm">
                  {candidate.timeAgo} · by {candidate.postedBy}
                </p>
                <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm transition-colors duration-200">
                  View Application
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No candidates found matching your search criteria.</p>
            <button 
              className="mt-4 text-blue-500 hover:text-blue-700"
              onClick={() => {
                setSearchTerm("");
                setFilterRole("");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Candidates;