import DashboardCard from '@/components/company/DashboardCard'
import { FileText, PlusCircle, User2 } from 'lucide-react'
import React from 'react'



function User() {
  return (
    
    <main className="container mx-auto px-4 pt-24 pb-16 bg-white  h-screen">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Welcome to your Company Dashboard</h1>
        <p className="text-gray-600">Manage your jobs and applications from this central hub.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <DashboardCard
            title="Active Jobs"
            value="12"
            description="Currently active job postings"
            icon={<PlusCircle className="w-5 h-5" />}
          />
          <DashboardCard
            title="Applications"
            value="48"
            description="Total applications received"
            icon={<FileText className="w-5 h-5" />}
          />
          <DashboardCard
            title="Interviews"
            value="8"
            description="Scheduled interviews"
            icon={<User2 className="w-5 h-5" />}
          />
        </div>
      </div>
    </div>
  </main>
  )
}

export default User