interface DashboardCardProps {
    title: string;
    value: string | number;
    description: string;
    icon: React.ReactNode;
  }
  
  function DashboardCard({ title, value, description, icon }: DashboardCardProps) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-700">{title}</h3>
          <div className="p-2 rounded-full bg-amber-100 text-amber-700">{icon}</div>
        </div>
        <p className="text-2xl font-bold text-gray-800 mb-1">{value}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    )
  }


  export default DashboardCard;