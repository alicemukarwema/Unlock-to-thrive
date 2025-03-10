import React from 'react';
import { Link } from 'react-router-dom';
import womenLearning from "../assets/Women learning and collaborating.jpg"
const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 py-16 md:py-24">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Unlock Your Potential, <span className="text-purple-600">Thrive</span> in Your Future
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Bridging the gap between education and career readiness for Rwandan Students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/career" 
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition text-center"
            >
              Explore careers
            </Link>
            <Link 
              to="/mentorship" 
              className="px-6 py-3 bg-white text-purple-600 border border-purple-600 rounded-lg font-medium hover:bg-purple-50 transition text-center"
            >
              Find a Mentor
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <img 
            src={womenLearning} 
            alt="Women learning and collaborating" 
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
