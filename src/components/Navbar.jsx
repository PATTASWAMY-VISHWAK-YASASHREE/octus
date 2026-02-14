import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LogOut, ArrowLeft } from 'lucide-react';

const Navbar = ({ showBackButton = false, backTo = '/dashboard', pageTitle = 'Dashboard' }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-black/80 backdrop-blur-xl border-b border-gray-800/50 px-4 md:px-6 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between w-full">
        {/* Left side - Back button + Logo + Page title */}
        <div className="flex items-center space-x-3">
          {showBackButton && (
            <button
              onClick={() => navigate(backTo)}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg text-slate-300 hover:text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Back</span>
            </button>
          )}
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">Octus</h1>
          <span className="px-2 py-1 bg-gray-800/50 border border-gray-700/50 rounded text-xs text-gray-400 font-medium hidden sm:inline-block">
            {pageTitle}
          </span>
        </div>
        
        {/* Right side - User menu */}
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 md:space-x-3 hover:bg-gray-900/50 rounded-xl px-2 md:px-3 py-2 transition-all duration-300 border border-transparent hover:border-gray-800"
            >
              <div className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                {currentUser?.email?.[0]?.toUpperCase()}
              </div>
              <div className="text-left hidden lg:block">
                <div className="text-sm font-medium text-white">{currentUser?.email?.split('@')[0]}</div>
                <div className="text-xs text-gray-500">Online</div>
              </div>
              <svg className={`w-4 h-4 text-gray-400 transition-transform hidden md:block ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl border border-gray-800 rounded-xl shadow-2xl overflow-hidden">
                <div className="px-4 py-4 border-b border-gray-800">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center text-white font-semibold">
                      {currentUser?.email?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{currentUser?.email?.split('@')[0]}</p>
                      <p className="text-xs text-gray-500">Project Manager</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{currentUser?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-gray-800/50 transition-colors flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
