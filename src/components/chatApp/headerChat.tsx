'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, CreditCard, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('chat');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router=useRouter();
  // Update activeTab based on the current pathname
  useEffect(() => {
    if (pathname.includes('/subscription')) {
      setActiveTab('subscription');
    } else if (pathname.includes('/logout')) {
      setActiveTab('logout');
    } else {
      setActiveTab('chat');
    }
  }, [pathname]);

  // Handle logout functionality
  const handleLogout = () => {
    // Add your logout logic here
    localStorage.clear();
     router.push('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg w-full sticky top-0 z-50">
      {/* Desktop Nav */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0 py-4">
            <h1 className="text-white font-bold text-xl">Sales</h1>
          </div>
          
          {/* Hamburger menu button for mobile */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none transition-all duration-200"
            >
              <div className="w-6 flex flex-col items-center justify-center gap-1">
                <span className={`block w-5 h-0.5 bg-white rounded transition-all duration-300 ${isMobileMenuOpen ? 'transform rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-white rounded transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block w-5 h-0.5 bg-white rounded transition-all duration-300 ${isMobileMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          </div>
          
          {/* Desktop navigation links */}
          <nav className="hidden md:flex items-center">
            <div className="flex space-x-1 mr-6">
              <Link
                href="/chatBoard"
                className={`px-6 py-3 rounded-lg flex items-center transition-all duration-200 ${
                  activeTab === 'chat'
                    ? 'bg-white text-blue-700 shadow-md transform scale-105'
                    : 'text-white hover:bg-blue-500'
                }`}
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                <span className="font-medium">Chat</span>
              </Link>
              
              <Link
                href="/chatBoard/subscription"
                className={`px-6 py-3 rounded-lg flex items-center transition-all duration-200 ${
                  activeTab === 'subscription'
                    ? 'bg-white text-blue-700 shadow-md transform scale-105'
                    : 'text-white hover:bg-blue-500'
                }`}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                <span className="font-medium">Subscription</span>
              </Link>
            </div>
            
            <button
              onClick={handleLogout}
              className={`px-6 py-3 rounded-lg flex items-center transition-all duration-200 ml-auto ${
                activeTab === 'logout'
                  ? 'bg-white text-blue-700 shadow-md transform scale-105'
                  : 'text-white hover:bg-red-500'
              }`}
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span className="font-medium">Logout</span>
            </button>
          </nav>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div 
        className={`md:hidden bg-blue-800 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/chatBoard"
            className={`block px-3 py-4 rounded-md text-base font-medium transition-colors ${
              activeTab === 'chat'
                ? 'bg-white text-blue-700'
                : 'text-white hover:bg-blue-700'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-3" />
              <span>Chat</span>
            </div>
          </Link>
          
          <Link
            href="/chatBoard/subscription"
            className={`block px-3 py-4 rounded-md text-base font-medium transition-colors ${
              activeTab === 'subscription'
                ? 'bg-white text-blue-700'
                : 'text-white hover:bg-blue-700'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 mr-3" />
              <span>Subscription</span>
            </div>
          </Link>
          
          <div className="border-t border-blue-700 mt-2 pt-2">
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left block px-3 py-4 rounded-md text-base font-medium transition-colors ${
                activeTab === 'logout'
                  ? 'bg-white text-blue-700'
                  : 'text-white hover:bg-red-600'
              }`}
            >
              <div className="flex items-center">
                <LogOut className="h-5 w-5 mr-3" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;