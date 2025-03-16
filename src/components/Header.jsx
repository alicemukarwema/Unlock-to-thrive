import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuOutlined, CloseOutlined, UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { message } from 'antd';
import Navbar from './Navbar';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Effect to check if user is logged in
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Get user from localStorage
        const userJson = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (userJson && token) {
          setUser(JSON.parse(userJson));
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };

    checkAuth();
    
    // Listen for storage events
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setDropdownOpen(false);
    message.success('Logged out successfully');
    navigate('/');
  };

  // Get user initial for avatar placeholder - prioritize email first letter
  const getUserInitial = () => {
    if (!user) return 'U';
    
    // Use first letter of email as primary choice
    if (user.email && user.email.length > 0) {
      return user.email.charAt(0).toUpperCase();
    }
    
    // Fallback to name initials if email is not available
    if (user.name) {
      const nameParts = user.name.split(' ');
      if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
      return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
    }
    
    return 'U'; // Default fallback
  };
  
  // Generate a consistent color based on the user's email or name
  const getAvatarColor = () => {
    if (!user) return '#8B5CF6'; // Default purple color
    
    const string = user.email || user.name || 'user';
    let hash = 0;
    
    // Simple hash function to generate a number from string
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Convert hash to hex color (limiting to a pleasing color range)
    const hue = Math.abs(hash) % 360;
    // Using HSL for more vibrant colors with controlled lightness
    return `hsl(${hue}, 70%, 50%)`;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.profile-dropdown')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold text-purple-700">Unlock to Thrive</h1>
        </Link>
        
        <div className="hidden md:flex">
          <Navbar />
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative profile-dropdown">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center focus:outline-none"
              >
                {user.profileImage ? (
                  <img 
                    src={user.profileImage} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: getAvatarColor() }}
                  >
                    {getUserInitial()}
                  </div>
                )}
              </button>
              
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  
                  <Link 
                    to={user.accountType === "mentor" ? "/dashboard/mentor" : "/dashboard/student"}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <UserOutlined className="mr-2" />
                    Dashboard
                  </Link>
                  
                  <Link 
                    to={user.accountType === "mentor" ? "/dashboard/mentor/profile" : "/dashboard/student/profile"}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <SettingOutlined className="mr-2" />
                    Profile Settings
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <LogoutOutlined className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="hidden md:flex items-center text-gray-700 hover:text-purple-700">
                <UserOutlined className="mr-1" />
                <span>Login</span>
              </Link>
              <Link to="/register" className="hidden md:block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                Register
              </Link>
            </>
          )}
          
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden text-gray-700"
          >
            {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>
        </div>
      </div>
      
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full z-10">
          <div className="container mx-auto px-4 py-2">
            <Navbar mobile />
            {!user && (
              <div className="flex flex-col gap-2 mt-4 pb-4">
                <Link 
                  to="/login" 
                  className="text-gray-700 py-2 px-4 hover:bg-gray-100 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-purple-600 text-white py-2 px-4 rounded text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
            {user && (
              <div className="mt-4 pb-4 border-t pt-2">
                <div className="px-4 py-2">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <Link 
                  to={user.accountType === "mentor" ? "/dashboard/mentor" : "/dashboard/student"}
                  className="flex items-center text-gray-700 py-2 px-4 hover:bg-gray-100 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  <UserOutlined className="mr-2" />
                  Dashboard
                </Link>
                <Link 
                  to={user.accountType === "mentor" ? "/dashboard/mentor/profile" : "/dashboard/student/profile"}
                  className="flex items-center text-gray-700 py-2 px-4 hover:bg-gray-100 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  <SettingOutlined className="mr-2" />
                  Profile Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center w-full text-left text-gray-700 py-2 px-4 hover:bg-gray-100 rounded"
                >
                  <LogoutOutlined className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;