import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 flex flex-col h-full">
        <h2 className="text-xl font-semiboald text-gray-700 mb-5">Dashboard</h2>
        <nav className="flex-grow">
          <ul>
            <li className="mb-4">
              <Link to="/dashboard/student" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                <FiHome /> <span>Home</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/dashboard/student/profile" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                <FiUser /> <span>Profile</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/dashboard/student/settings" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                <FiSettings /> <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
        <button className="flex items-center space-x-2 text-red-500 hover:text-red-700">
          <FiLogOut /> <span>Logout</span>
        </button>
      </aside>
      
      {/* Main Content */}
      <main className="flex-grow p-8 overflow-auto">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome to your Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your profile, settings, and more.</p>
      </main>
    </div>
  );
};

export default Dashboard;
