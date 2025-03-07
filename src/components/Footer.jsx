import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FacebookOutlined, 
  TwitterOutlined, 
  InstagramOutlined, 
  LinkedinOutlined 
} from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-purple-700 mb-4">Unlock to Thrive</h3>
            <p className="text-gray-600 mb-4">
              Empowering women through education, skill-based training, and mentorship.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-purple-600">
                <FacebookOutlined style={{ fontSize: '20px' }} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600">
                <TwitterOutlined style={{ fontSize: '20px' }} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600">
                <InstagramOutlined style={{ fontSize: '20px' }} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600">
                <LinkedinOutlined style={{ fontSize: '20px' }} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-purple-600">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-purple-600">About Us</Link></li>
              <li><Link to="/career" className="text-gray-600 hover:text-purple-600">career</Link></li>
              <li><Link to="/mentorship" className="text-gray-600 hover:text-purple-600">Mentorship</Link></li>
              <li><Link to="/resources" className="text-gray-600 hover:text-purple-600">Resources</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-600 hover:text-purple-600">FAQ</Link></li>
              <li><Link to="/financial-aid" className="text-gray-600 hover:text-purple-600">Financial Aid</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-600 hover:text-purple-600">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-purple-600">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Contact</h4>
            <p className="text-gray-600 mb-2">contact@unlocktothrive.org</p>
            <p className="text-gray-600 mb-2">+1 (555) 123-4567</p>
            <p className="text-gray-600">123 Education Street, City, Country</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Unlock to Thrive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;