import React from 'react'
import {  User, BookOpen, Building, MapPin, } from 'lucide-react';


function Achievements() {
  return (
    <section className="px-8 pb-24 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-6xl mx-auto py-16">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FFBF2F]/10 text-[#FFBF2F] text-xs font-medium mb-4">Milestones</span>
            <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
            <p className="max-w-2xl mx-auto text-gray-600">The numbers that define our success story so far.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "Trained Employees", number: "20K+", icon: <User className="w-10 h-10" /> },
              { title: "Trained Interns", number: "5K+", icon: <BookOpen className="w-10 h-10" /> },
              { title: "Cities", number: "30+", icon: <MapPin className="w-10 h-10" /> },
              { title: "Corporate Clients", number: "50+", icon: <Building className="w-10 h-10" /> }
            ].map((achievement, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-[#FFBF2F]/20">
                <div className="h-28 flex items-center justify-center">
                  <div className="w-20 h-20 bg-[#FFBF2F]/10 rounded-full flex items-center justify-center">
                    {achievement.icon}
                  </div>
                </div>
                <p className="text-3xl font-bold text-[#FFBF2F] mb-1">{achievement.number}</p>
                <p className="text-base">{achievement.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Achievements