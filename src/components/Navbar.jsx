import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ mobile = false }) => {
  const location = useLocation();
  
  const navLinks = [
    { title: 'Home', path: '/' },
    // { title: 'About', path: '/about' },
    { title: 'Career', path: '/career' },
    { title: 'Mentorship', path: '/mentorship' },
    { title: 'Resources', path: '/resources' },
    { title: 'Financial Aid', path: '/financial-aid' },
    // { title: 'Contact', path: '/contact' }
  ];
  
  return (
    <nav className={`${mobile ? 'flex flex-col' : 'flex gap-1 md:gap-2'}`}>
      {navLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`${
            location.pathname === link.path 
              ? 'text-purple-700 font-medium' 
              : 'text-gray-700 hover:text-purple-600'
          } ${
            mobile 
              ? 'py-2 px-4 hover:bg-gray-100 rounded w-full' 
              : 'px-3 py-2'
          }`}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;