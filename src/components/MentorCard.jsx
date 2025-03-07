import React from 'react';
import { LinkedinOutlined } from '@ant-design/icons';

const MentorCard = ({ mentor }) => {
  const { name, title, company, expertise, image, linkedIn } = mentor;
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col border border-gray-100">
      <div className="p-6 text-center">
        <img 
          src={image || "/api/placeholder/150/150"} 
          alt={name} 
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
        />
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-sm text-gray-500 mb-3">{company}</p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {expertise.map((skill, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
        <a
          href={linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          <LinkedinOutlined style={{ fontSize: '20px' }} />
        </a>
      </div>
      <div className="mt-auto px-6 pb-6">
        <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          Request Mentorship
        </button>
      </div>
    </div>
  );
};

export default MentorCard;