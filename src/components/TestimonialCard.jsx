import React from 'react';
import { StarFilled } from '@ant-design/icons';

const TestimonialCard = ({ testimonial }) => {
  const { name, role, content, rating, image } = testimonial;
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition border border-gray-100">
      <div className="flex items-center mb-4">
        <img 
          src={image || "/api/placeholder/50/50"} 
          alt={name} 
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <StarFilled 
            key={i} 
            className={i < rating ? "text-yellow-400" : "text-gray-200"} 
            style={{ fontSize: '16px' }}
          />
        ))}
      </div>
      <p className="text-gray-600">{content}</p>
    </div>
  );
};

export default TestimonialCard;