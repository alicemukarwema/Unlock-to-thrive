import React, { useEffect, useState } from 'react';
import { Modal, Input, message } from 'antd';
import { LinkedinOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;

const ApplicationModal = ({ visible, onClose, mentorId }) => {
  const [applicationForm, setApplicationForm] = useState({ motivation: '', skills: '', resumeFile: null });

  const handleSubmit = async () => {
    const UserId = localStorage.getItem("userId")
    try {
      const formData = new FormData();
      formData.append('mentorId', mentorId);
      formData.append('studentId', UserId);
      formData.append('motivation', applicationForm.motivation);
      formData.append('skills', applicationForm.skills);
      if (applicationForm.resumeFile) {
        formData.append('resume', applicationForm.resumeFile);
      }

      await axios.post('https://unlock-to-thrive-backend.onrender.com/api/students/apply', formData);
      message.success('Application submitted successfully!');
      onClose();
    } catch (error) {
      message.error('Failed to submit application');
      console.error(error);
    }
  };

  return (
    <Modal
      title="Apply to Mentorship Program"
      visible={visible}
      onOk={handleSubmit}
      onCancel={onClose}
      okText="Submit Application"
    >
      <div className="space-y-4">
        <div>
          <strong>Motivation</strong>
          <TextArea 
            rows={4} 
            placeholder="Why are you interested in this mentorship program?"
            value={applicationForm.motivation}
            onChange={(e) => setApplicationForm({ ...applicationForm, motivation: e.target.value })}
          />
        </div>
        <div>
          <strong>Relevant Skills</strong>
          <TextArea 
            rows={4} 
            placeholder="Describe your relevant skills and experience"
            value={applicationForm.skills}
            onChange={(e) => setApplicationForm({ ...applicationForm, skills: e.target.value })}
          />
        </div>
        <div>
          <strong>Resume/CV</strong>
          <Input 
            type="file" 
            onChange={(e) => setApplicationForm({ ...applicationForm, resumeFile: e.target.files[0] })}
          />
        </div>
      </div>
    </Modal>
  );
};

const MentorCard = ({ mentor, onRequest }) => {
  const { fullName, title, company, expertise, image, linkedIn, _id } = mentor;
  const avatarUrl = image || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random`;
  const [isHovered, setIsHovered] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Format the professional experience for display
  const formatExperience = (exp) => {
    const experienceMap = {
      "less_than_1_year": "Less than 1 year",
      "1_3_years": "1-3 years",
      "3_5_years": "3-5 years",
      "5_10_years": "5-10 years",
      "more_than_10_years": "More than 10 years"
    };
    return experienceMap[exp] || exp;
  };

  return (
    <>
      <div 
        className={`bg-white rounded-lg overflow-hidden shadow-md transition flex flex-col border border-gray-200 p-4 cursor-pointer ${isHovered ? 'shadow-lg' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowDetailModal(true)}
      >
        <div className="text-center">
          <img 
            src={avatarUrl} 
            alt={fullName} 
            className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border border-gray-300"
          />
          <h3 className="text-md font-semibold text-gray-800">{fullName}</h3>
          <p className="text-sm text-gray-600 mb-1">{title || 'Mentor'}</p>
          <p className="text-xs text-gray-500 mb-2">{company || 'Independent'}</p>
          
          {/* Display basic info when not hovered */}
          {!isHovered && (
            <div className="flex flex-wrap justify-center gap-1 mb-3">
              {expertise && expertise.length > 0 ? (
                expertise.slice(0, 2).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full">
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-xs">No expertise listed</span>
              )}
              {expertise && expertise.length > 2 && (
                <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full">
                  +{expertise.length - 2}
                </span>
              )}
            </div>
          )}
          
          {/* Display additional info when hovered */}
          {isHovered && (
            <div className="mt-2 text-left">
              {mentor.email && (
                <p className="text-xs text-gray-600"><strong>Email:</strong> {mentor.email}</p>
              )}
              {mentor.phone && (
                <p className="text-xs text-gray-600"><strong>Phone:</strong> {mentor.phone}</p>
              )}
              {mentor.professionalExperience && (
                <p className="text-xs text-gray-600"><strong>Experience:</strong> {formatExperience(mentor.professionalExperience)}</p>
              )}
              <div className="mt-2">
                <p className="text-xs text-gray-600"><strong>Expertise:</strong></p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {expertise && expertise.length > 0 ? (
                    expertise.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs">None listed</span>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">Click for more details</p>
            </div>
          )}
          
          {linkedIn && !isHovered && (
            <a 
              href={linkedIn} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:text-blue-800"
              onClick={(e) => e.stopPropagation()} // Prevent card click when clicking LinkedIn icon
            >
              <LinkedinOutlined style={{ fontSize: '18px' }} />
            </a>
          )}
        </div>
        <div className="mt-auto">
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click when clicking button
              onRequest(_id);
            }} 
            className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm"
          >
            Request Mentorship
          </button>
        </div>
      </div>
      
      {/* Detailed Modal */}
      {showDetailModal && (
        <Modal
          title="Mentor Details"
          visible={showDetailModal}
          onCancel={() => setShowDetailModal(false)}
          footer={[
            <button 
              key="request" 
              onClick={() => {
                setShowDetailModal(false);
                onRequest(_id);
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm"
            >
              Request Mentorship
            </button>
          ]}
          width={600}
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img 
                src={avatarUrl} 
                alt={fullName} 
                className="w-32 h-32 rounded-full object-cover border border-gray-300"
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-bold text-gray-800">{fullName}</h2>
              <p className="text-md text-gray-600">{title || 'Mentor'} {company && `at ${company}`}</p>
              
              <div className="mt-4 space-y-2">
                <p><strong>ID:</strong> {_id}</p>
                <p><strong>Account Type:</strong> {mentor.accountType || 'Mentor'}</p>
                <p><strong>Email:</strong> {mentor.email}</p>
                {mentor.phone && <p><strong>Phone:</strong> {mentor.phone}</p>}
                <p><strong>Professional Experience:</strong> {formatExperience(mentor.professionalExperience)}</p>
                {linkedIn && (
                  <p>
                    <strong>LinkedIn:</strong> <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{linkedIn}</a>
                  </p>
                )}
                {mentor.createdAt && (
                  <p><strong>Joined:</strong> {new Date(mentor.createdAt).toLocaleDateString()}</p>
                )}
              </div>
              
              <div className="mt-4">
                <h3 className="font-semibold text-gray-700">Areas of Expertise:</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {expertise && expertise.length > 0 ? (
                    expertise.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">No expertise listed</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

const MentorList = () => {
  const [mentors, setMentors] = useState([]);
  const [applyModalVisible, setApplyModalVisible] = useState(false);
  const [selectedMentorId, setSelectedMentorId] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get('https://unlock-to-thrive-backend.onrender.com/api/mentors');
        if (response.data && response.data.data) {
          setMentors(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };
    fetchMentors();
  }, []);

  const handleRequestMentorship = (mentorId) => {
    setSelectedMentorId(mentorId);
    setApplyModalVisible(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {mentors.length > 0 ? (
          mentors.map((mentor) => (
            <MentorCard key={mentor._id} mentor={mentor} onRequest={handleRequestMentorship} />
          ))
        ) : (
          <p className="text-center text-gray-500 w-full">No mentors available</p>
        )}
      </div>
      <ApplicationModal 
        visible={applyModalVisible} 
        onClose={() => setApplyModalVisible(false)} 
        mentorId={selectedMentorId} 
      />
    </>
  );
};

export default MentorList;
