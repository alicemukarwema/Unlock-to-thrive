
// components/CourseCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ClockCircleOutlined, UserOutlined, StarFilled } from '@ant-design/icons';

const CourseCard = ({ course }) => {
  const { id, title, instructor, category, rating, duration, image} = course;
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100">
      <img 
        src={image || "/api/placeholder/400/200"} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
            {category}
          </span>
          <div className="flex items-center">
            <StarFilled className="text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{rating}/5</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <ClockCircleOutlined className="mr-1" />
          <span>{duration}</span>
          <span className="mx-2">•</span>
          <UserOutlined className="mr-1" />
          <span>{instructor}</span>
        </div>
        <div className="flex justify-between items-center mt-4">
        
          <Link 
            to={`/career/${id}`}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition"
          >
            View Career
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;