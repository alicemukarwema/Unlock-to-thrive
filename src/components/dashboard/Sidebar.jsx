import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <div className="flex items-center space-x-4 px-4">
        <span className="text-2xl font-extrabold">Dashboard</span>
      </div>
      <nav>
        <NavLink to="/dashboard/student/profile" end className={({isActive}) => 
          `block py-2.5 px-4 rounded transition duration-200 ${isActive ? 'bg-blue-500' : 'hover:bg-gray-700'}`
        }>
          Home
        </NavLink>
        <NavLink to="/dashboard/student/profile" className={({isActive}) => 
          `block py-2.5 px-4 rounded transition duration-200 ${isActive ? 'bg-blue-500' : 'hover:bg-gray-700'}`
        }>
          Profile
        </NavLink>
        {/* <NavLink to="/dashboard/student/courses" className={({isActive}) => 
          `block py-2.5 px-4 rounded transition duration-200 ${isActive ? 'bg-blue-500' : 'hover:bg-gray-700'}`
        }>
          Courses
        </NavLink> */}
      </nav>
    </div>
  );
};

export default Sidebar;