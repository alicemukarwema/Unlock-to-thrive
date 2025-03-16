import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  ReadOutlined,
  MessageOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FileTextOutlined,
  BarChartOutlined
} from '@ant-design/icons';

const MentorSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`bg-gray-800 text-white ${collapsed ? 'w-20' : 'w-64'} min-h-screen py-7 px-2 transition-all duration-300 ease-in-out`}>
      <div className="flex items-center justify-between px-4 mb-6">
        {!collapsed && <span className="text-xl font-bold">Mentor Portal</span>}
        <button 
          onClick={toggleCollapsed} 
          className="text-white p-2 rounded hover:bg-gray-700"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>
      </div>
      
      <div className="overflow-y-auto">
        <nav>
          <NavLink 
            to="/dashboard/mentor" 
            end 
            className={({isActive}) => 
              `flex items-center py-2.5 px-4 rounded transition duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'} mb-1`
            }
          >
            <HomeOutlined />
            {!collapsed && <span className="ml-3">Dashboard</span>}
          </NavLink>
          
          <NavLink 
            to="/dashboard/mentor/profile" 
            className={({isActive}) => 
              `flex items-center py-2.5 px-4 rounded transition duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'} mb-1`
            }
          >
            <UserOutlined />
            {!collapsed && <span className="ml-3">My Profile</span>}
          </NavLink>
          
          <NavLink 
            to="/dashboard/mentor/students" 
            className={({isActive}) => 
              `flex items-center py-2.5 px-4 rounded transition duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'} mb-1`
            }
          >
            <TeamOutlined />
            {!collapsed && <span className="ml-3">My Students</span>}
          </NavLink>
          
          <NavLink 
            to="/dashboard/mentor/sessions" 
            className={({isActive}) => 
              `flex items-center py-2.5 px-4 rounded transition duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'} mb-1`
            }
          >
            <CalendarOutlined />
            {!collapsed && <span className="ml-3">Sessions</span>}
          </NavLink>
          
          <NavLink 
            to="/dashboard/mentor/resources" 
            className={({isActive}) => 
              `flex items-center py-2.5 px-4 rounded transition duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'} mb-1`
            }
          >
            <ReadOutlined />
            {!collapsed && <span className="ml-3">Resources</span>}
          </NavLink>
          
          <NavLink 
            to="/dashboard/mentor/messages" 
            className={({isActive}) => 
              `flex items-center py-2.5 px-4 rounded transition duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'} mb-1`
            }
          >
            <MessageOutlined />
            {!collapsed && <span className="ml-3">Messages</span>}
          </NavLink>
          
          <NavLink 
            to="/dashboard/mentor/reports" 
            className={({isActive}) => 
              `flex items-center py-2.5 px-4 rounded transition duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'} mb-1`
            }
          >
            <BarChartOutlined />
            {!collapsed && <span className="ml-3">Reports</span>}
          </NavLink>
          
          <NavLink 
            to="/dashboard/mentor/documents" 
            className={({isActive}) => 
              `flex items-center py-2.5 px-4 rounded transition duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'} mb-1`
            }
          >
            <FileTextOutlined />
            {!collapsed && <span className="ml-3">Documents</span>}
          </NavLink>
          
          <div className="border-t border-gray-700 my-4"></div>
          
          <NavLink 
            to="/dashboard/mentor/settings" 
            className={({isActive}) => 
              `flex items-center py-2.5 px-4 rounded transition duration-200 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'} mb-1`
            }
          >
            <SettingOutlined />
            {!collapsed && <span className="ml-3">Settings</span>}
          </NavLink>
        </nav>
      </div>
      
      {/* {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-gray-700 rounded-lg p-3">
            <p className="text-sm text-gray-300 mb-2">Need help?</p>
            <a href="/dashboard/mentor/support" className="text-blue-400 hover:text-blue-300 text-sm">
              Contact support
            </a>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default MentorSidebar;