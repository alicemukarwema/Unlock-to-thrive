import React, { useEffect, useState } from 'react';
import { LinkedinOutlined } from '@ant-design/icons';
import axios from 'axios';

const MentorCard = ({ mentor }) => {
  const { fullName, title, company, expertise, image, linkedIn } = mentor;
  const avatarUrl = image || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition flex flex-col border border-gray-200 p-4">
      <div className="text-center">
        <img 
          src={avatarUrl} 
          alt={fullName} 
          className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border border-gray-300"
          onError={(e) => e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`}
        />
        <h3 className="text-md font-semibold text-gray-800">{fullName}</h3>
        <p className="text-sm text-gray-600 mb-1">{title || 'Mentor'}</p>
        <p className="text-xs text-gray-500 mb-2">{company || 'Independent'}</p>
        <div className="flex flex-wrap justify-center gap-1 mb-3">
          {expertise && expertise.length > 0 ? (
            expertise.map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full">
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-xs">No expertise listed</span>
          )}
        </div>
        {linkedIn && (
          <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            <LinkedinOutlined style={{ fontSize: '18px' }} />
          </a>
        )}
      </div>
      <div className="mt-auto">
        <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm">
          Request Mentorship
        </button>
      </div>
    </div>
  );
};

const MentorList = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/mentors'); 
        
        // Ensure we correctly extract "data" from API response
        if (response.data && response.data.data) {
          setMentors(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {mentors.length > 0 ? (
        mentors.map((mentor) => (
          <MentorCard key={mentor._id} mentor={mentor} />
        ))
      ) : (
        <p className="text-center text-gray-500 w-full">No mentors available</p>
      )}
    </div>
  );
};

export default MentorList;
