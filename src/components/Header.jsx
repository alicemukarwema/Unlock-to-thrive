import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import Navbar from './Navbar';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <Link to="/login" className="hidden md:flex items-center text-gray-700 hover:text-purple-700">
            <UserOutlined className="mr-1" />
            <span>Login</span>
          </Link>
          <Link to="/register" className="hidden md:block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Register
          </Link>
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
            <div className="flex flex-col gap-2 mt-4 pb-4">
              <Link to="/login" className="text-gray-700 py-2 px-4 hover:bg-gray-100 rounded">
                Login
              </Link>
              <Link to="/register" className="bg-purple-600 text-white py-2 px-4 rounded text-center">
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;