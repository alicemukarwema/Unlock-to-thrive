import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow">
      <div className="flex justify-between items-center py-4 px-6">
        <div className="flex items-center">
          <span className="text-xl font-semibold text-gray-700">Portal</span>
        </div>
        <div className="flex items-center">
          <button 
            onClick={handleLogout}
            className="ml-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;