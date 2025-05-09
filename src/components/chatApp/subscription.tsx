'use client';

import { useState } from 'react';
import { 
  Users, 
  Download, 
  ChevronDown,
  ChevronUp,
  Check,
  DollarSign,
  Calendar,
  ArrowUpRight,
  Calendar as CalendarIcon,
  UserCheck,
  Filter
} from 'lucide-react';

const SalesSubscriptionDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [filterPeriod, setFilterPeriod] = useState('month');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedClient, setExpandedClient] = useState<string | null>(null);

  // Mock data for the sales dashboard
  const salesData = {
    totalRevenue: 128450,
    monthlyRecurring: 42350,
    newSubscriptions: 18,
    renewals: 27,
    churnRate: 3.2,
    upcomingRenewals: 12,
    activeClients: 89,
    clientsInTrial: 14,
    topPerformingPlan: 'Professional',
    revenueByPlan: [
      { plan: 'Starter', revenue: 35150, clients: 32 },
      { plan: 'Professional', revenue: 73500, clients: 42 },
      { plan: 'Enterprise', revenue: 19800, clients: 15 }
    ],
    recentSubscriptions: [
      { 
        id: 'SUB-2025-154',
        company: 'TechWave Solutions',
        plan: 'Professional',
        value: 699,
        startDate: 'May 2, 2025',
        contact: 'Sarah Johnson',
        status: 'Active',
        teamSize: 25,
        services: ['Job Posting', 'Custom Tests', 'Talent Matching']
      },
      { 
        id: 'SUB-2025-153',
        company: 'Nexus Innovations',
        plan: 'Enterprise',
        value: 1499,
        startDate: 'May 1, 2025',
        contact: 'Michael Chen',
        status: 'Active',
        teamSize: 120,
        services: ['Job Posting', 'Custom Tests', 'Talent Matching', 'API Integration']
      },
      { 
        id: 'SUB-2025-152',
        company: 'Horizon Healthcare',
        plan: 'Starter',
        value: 299,
        startDate: 'Apr 29, 2025',
        contact: 'Jessica Williams',
        status: 'Trial',
        teamSize: 15,
        services: ['Job Posting', 'Basic Talent Matching']
      },
      { 
        id: 'SUB-2025-151',
        company: 'Atlas Financial',
        plan: 'Professional',
        value: 699,
        startDate: 'Apr 27, 2025',
        contact: 'David Thompson',
        status: 'Active',
        teamSize: 30,
        services: ['Job Posting', 'Custom Tests', 'Talent Matching']
      },
      { 
        id: 'SUB-2025-150',
        company: 'Global Logistics Inc.',
        plan: 'Professional',
        value: 699,
        startDate: 'Apr 25, 2025',
        contact: 'Amanda Roberts',
        status: 'Active',
        teamSize: 45,
        services: ['Job Posting', 'Custom Tests', 'Talent Matching']
      }
    ],
    upcomingRenewalsList: [
      { 
        id: 'SUB-2024-098',
        company: 'Pinnacle Systems',
        plan: 'Enterprise',
        renewalDate: 'May 15, 2025',
        value: 1499,
        renewalChance: 'High',
        contact: 'Robert Anderson',
        lastContact: 'Apr 30, 2025',
        notes: 'Customer requested a meeting to discuss contract renewal'
      },
      { 
        id: 'SUB-2024-102',
        company: 'Velocity Engineering',
        plan: 'Professional',
        renewalDate: 'May 18, 2025',
        value: 699,
        renewalChance: 'Medium',
        contact: 'Jennifer Miller',
        lastContact: 'Apr 25, 2025',
        notes: 'Evaluating our service against competitors'
      },
      { 
        id: 'SUB-2024-105',
        company: 'Quantum Data',
        plan: 'Professional',
        renewalDate: 'May 20, 2025',
        value: 699,
        renewalChance: 'High',
        contact: 'Thomas Wilson',
        lastContact: 'May 1, 2025',
        notes: 'Very satisfied with our talent matching service'
      },
      { 
        id: 'SUB-2024-107',
        company: 'Meridian Marketing',
        plan: 'Starter',
        renewalDate: 'May 22, 2025',
        value: 299,
        renewalChance: 'Low',
        contact: 'Emma Brown',
        lastContact: 'Apr 15, 2025',
        notes: 'Has complained about limited job postings'
      }
    ],
    topPerformingServices: [
      { service: 'Custom Tests', usageRate: 87, growth: 12 },
      { service: 'Advanced Talent Matching', usageRate: 92, growth: 15 },
      { service: 'Job Posting', usageRate: 95, growth: 5 },
      { service: 'API Integration', usageRate: 62, growth: 22 }
    ]
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const toggleClientDetails = (id: string | null) => {
    if (expandedClient === id) {
      setExpandedClient(null);
    } else {
      setExpandedClient(id);
    }
  };

  const getPlanColor = (plan: string) => {
    switch(plan) {
      case 'Starter': return 'bg-blue-100 text-blue-800';
      case 'Professional': return 'bg-purple-100 text-purple-800';
      case 'Enterprise': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRenewalChanceColor = (chance: string) => {
    switch(chance) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sales & Subscription Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track and manage your client subscriptions, revenue, and service performance
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="mr-4">
              <span 
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
              >
                <CalendarIcon className="h-4 w-4 mr-1" />
                May 8, 2025
              </span>
            </div>
            <button 
              onClick={toggleFilters}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-1" />
              Filters
              {showFilters ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
                <select 
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={filterPeriod}
                  onChange={(e) => setFilterPeriod(e.target.value)}
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Type</label>
                <select className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option value="all">All Plans</option>
                  <option value="starter">Starter</option>
                  <option value="professional">Professional</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Status</label>
                <select className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="trial">Trial</option>
                  <option value="expiring">Expiring Soon</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Usage</label>
                <select className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option value="all">All Services</option>
                  <option value="job-posting">Job Posting</option>
                  <option value="talent-matching">Talent Matching</option>
                  <option value="custom-tests">Custom Tests</option>
                  <option value="api">API Integration</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Dashboard Navigation Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-4" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-2 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`px-3 py-2 text-sm font-medium ${
                activeTab === 'clients'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Client Subscriptions
            </button>
            <button
              onClick={() => setActiveTab('renewals')}
              className={`px-3 py-2 text-sm font-medium ${
                activeTab === 'renewals'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Upcoming Renewals
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`px-3 py-2 text-sm font-medium ${
                activeTab === 'performance'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Service Performance
            </button>
          </nav>
        </div>

        {/* Dashboard Content */}
        {activeTab === 'overview' && (
          <>
            {/* Key Metrics */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Monthly Recurring Revenue</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">${salesData.monthlyRecurring.toLocaleString()}</div>
                          <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                            <ArrowUpRight className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                            <span className="sr-only">Increased by</span>
                            8.2%
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Active Clients</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{salesData.activeClients}</div>
                          <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                            <ArrowUpRight className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                            <span className="sr-only">Increased by</span>
                            5.3%
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                      <Check className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">New Subscriptions</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{salesData.newSubscriptions}</div>
                          <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                            <ArrowUpRight className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                            <span className="sr-only">Increased by</span>
                            12.1%
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Upcoming Renewals</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{salesData.upcomingRenewals}</div>
                          <div className="ml-2 flex items-baseline text-sm font-semibold text-gray-600">
                            <span>Next 30 days</span>
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Revenue by Plan */}
            <div className="mb-6 bg-white shadow rounded-lg">
              <div className="px-5 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Revenue by Plan</h3>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {salesData.revenueByPlan.map((item) => (
                    <div key={item.plan} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlanColor(item.plan)}`}>
                          {item.plan}
                        </span>
                        <span className="text-sm text-gray-500">{item.clients} clients</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">${item.revenue.toLocaleString()}</div>
                      <div className="mt-2 text-sm text-gray-500">
                        {Math.round((item.revenue / salesData.totalRevenue) * 100)}% of total revenue
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Subscriptions */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Subscriptions</h3>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plan
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Start Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {salesData.recentSubscriptions.map((subscription) => (
                      <tr key={subscription.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{subscription.company}</div>
                              <div className="text-xs text-gray-500">{subscription.contact}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlanColor(subscription.plan)}`}>
                            {subscription.plan}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${subscription.value}/month
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {subscription.startDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            subscription.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {subscription.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'clients' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Client Subscriptions</h3>
              <div className="flex items-center space-x-2">
                <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </button>
                <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  <UserCheck className="h-4 w-4 mr-1" />
                  Add Client
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Team Size
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {salesData.recentSubscriptions.map((subscription) => (
                    <>
                      <tr key={subscription.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{subscription.company}</div>
                              <div className="text-xs text-gray-500">{subscription.contact}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlanColor(subscription.plan)}`}>
                            {subscription.plan}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${subscription.value}/month
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {subscription.startDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            subscription.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {subscription.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {subscription.teamSize}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => toggleClientDetails(subscription.id)} 
                            className="text-blue-600 hover:text-blue-900"
                          >
                            {expandedClient === subscription.id ? 'Hide Details' : 'View Details'}
                          </button>
                        </td>
                      </tr>
                      {expandedClient === subscription.id && (
                        <tr>
                          <td colSpan={7} className="px-6 py-4 bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Services Used</h4>
                                <div className="flex flex-wrap gap-2">
                                  {subscription.services.map((service) => (
                                    <span key={service} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      {service}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Account Details</h4>
                                <div className="text-sm text-gray-500">
                                  <p>Subscription ID: {subscription.id}</p>
                                  <p>Contact: {subscription.contact}</p>
                                  <p>Next Billing Date: {new Date(subscription.startDate).setMonth(new Date(subscription.startDate).getMonth() + 1).toString().split(' ').slice(1, 4).join(' ')}</p>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end space-x-3">
                              <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                Edit Subscription
                              </button>
                              <button className="px-3 py-1 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700">
                                Contact Client
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                    <span className="font-medium">89</span> clients
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Previous</span>
                      {/* Add previous icon here */}
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-blue-600 hover:bg-blue-50">
                      2
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      3
                    </button>
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      ...
                    </span>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      9
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Next</span>
                      {/* Add next icon here */}
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'renewals' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Upcoming Renewals</h3>
              <div className="flex items-center space-x-2">
                <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  <Calendar className="h-4 w-4 mr-1" />
                  Schedule Follow-ups
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Renewal Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Renewal Chance
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {salesData.upcomingRenewalsList.map((renewal) => (
                    <>
                      <tr key={renewal.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{renewal.company}</div>
                              <div className="text-xs text-gray-500">{renewal.contact}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlanColor(renewal.plan)}`}>
                            {renewal.plan}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${renewal.value}/month
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {renewal.renewalDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRenewalChanceColor(renewal.renewalChance)}`}>
                            {renewal.renewalChance}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {renewal.lastContact}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            onClick={() => toggleClientDetails(renewal.id)} 
                            className="text-blue-600 hover:text-blue-900"
                          >
                            {expandedClient === renewal.id ? 'Hide Details' : 'View Details'}
                          </button>
                        </td>
                      </tr>
                      {expandedClient === renewal.id && (
                        <tr>
                          <td colSpan={7} className="px-6 py-4 bg-gray-50">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Notes</h4>
                              <p className="text-sm text-gray-500 mb-4">{renewal.notes}</p>
                            </div>
                            <div className="mt-4 flex justify-end space-x-3">
                              <button className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                Add Note
                              </button>
                              <button className="px-3 py-1 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700">
                                Schedule Call
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg">
              <div className="px-5 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Service Usage Statistics</h3>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {salesData.topPerformingServices.map((service) => (
                    <div key={service.service} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{service.service}</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          +{service.growth}% growth
                        </span>
                      </div>
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block text-blue-600">
                              Usage Rate
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-blue-600">
                              {service.usageRate}%
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                          <div 
                            style={{ width: `${service.usageRate}%` }} 
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg">
              <div className="px-5 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Revenue Forecast</h3>
              </div>
              <div className="p-5">
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  {/* Placeholder for a chart */}
                  <p className="text-gray-500">Revenue forecast chart would be displayed here</p>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Projected Monthly Revenue</h4>
                    <div className="text-2xl font-bold text-gray-900">$45,200</div>
                    <div className="mt-2 text-sm text-green-600">+6.7% from current</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Projected Annual Revenue</h4>
                    <div className="text-2xl font-bold text-gray-900">$542,400</div>
                    <div className="mt-2 text-sm text-green-600">+8.2% from current</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Anticipated Growth</h4>
                    <div className="text-2xl font-bold text-gray-900">15.4%</div>
                    <div className="mt-2 text-sm text-gray-500">End of year target</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesSubscriptionDashboard;