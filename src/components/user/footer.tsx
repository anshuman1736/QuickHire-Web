import { Briefcase, Building, Users } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <div className=" bg-gradient-to-r from-blue-50 to-blue-100 rounded-b-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
              <h3 className="text-2xl font-bold mb-2">
                Ready to take the next step in your career?
              </h3>
              <p className="text-gray-600 mb-4">
                Upload your resume and create a profile to get personalized job recommendations. 
                Our AI-powered matching system connects you with the perfect opportunities.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                  <Briefcase className="w-4 h-4 text-blue-600 mr-1" />
                  <span className="text-sm font-medium">Verified Employers</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                  <Building className="w-4 h-4 text-blue-600 mr-1" />
                  <span className="text-sm font-medium">
                    Top Companies
                  </span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                  <Users className="w-4 h-4 text-blue-600 mr-1" />
                  <span className="text-sm font-medium">Exclusive Network</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/3">
              <button className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-md">
                Create Profile
              </button>
            </div>
          </div>
        </div>
  )
}

export default Footer