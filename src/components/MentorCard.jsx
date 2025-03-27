import React, { useEffect, useState } from 'react';
import { Modal, Input, message } from 'antd';
import { LinkedinOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TextArea } = Input;

const ApplicationModal = ({ visible, onClose, mentorId }) => {
  const [applicationForm, setApplicationForm] = useState({ motivation: '', skills: '', resumeFile: null });

  const handleSubmit = async () => {
   const UserId =localStorage.getItem("userId")
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

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition flex flex-col border border-gray-200 p-4">
      <div className="text-center">
        <img 
          src={avatarUrl} 
          alt={fullName} 
          className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border border-gray-300"
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
        <button onClick={() => onRequest(_id)} className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm">
          Request Mentorship
        </button>
      </div>
    </div>
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
