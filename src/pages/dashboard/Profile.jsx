import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaEdit, FaTrash, FaKey, FaSignOutAlt } from 'react-icons/fa';

const API_BASE_URL = 'https://unlock-to-thrive-backend.onrender.com/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/students/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data && response.data.data) {
          setUser(response.data.data);
          setFormData(response.data.data);
        }
      } catch (error) {
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleExpertiseChange = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const newExpertise = [...(formData.expertise || []), e.target.value.trim()];
      setFormData({ ...formData, expertise: newExpertise });
      e.target.value = '';
    }
  };

  const removeExpertise = (index) => {
    const updatedExpertise = [...formData.expertise];
    updatedExpertise.splice(index, 1);
    setFormData({ ...formData, expertise: updatedExpertise });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_BASE_URL}/change-password`,
        passwordData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setError('');
      alert('Password updated successfully');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update password');
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_BASE_URL}/profile`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data?.data) {
        setUser(response.data.data);
        setFormData(response.data.data);
        setIsEditing(false);
        alert('Profile updated successfully');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/account`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete account');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading profile...</div>;
  }

  if (error && !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-900 p-6 text-white">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-white border-4 border-white shadow-lg mb-4 md:mb-0 md:mr-6">
            <div className="w-full h-full flex items-center justify-center bg-purple-200">
              <FaUser className="text-4xl text-purple-500" />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">{user?.fullName || 'Mentor'}</h1>
            <p className="text-purple-200">{user?.email}</p>
            <div className="mt-2 inline-block bg-purple-800 px-3 py-1 rounded-full text-sm">
              {user?.accountType === 'student' ? 'Student' : 'Mentor'}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <form onSubmit={handleProfileSubmit}>
          {/* Profile Actions */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
            <div className="flex space-x-2">
              {!isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <FaEdit className="mr-2" /> Edit Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <FaKey className="mr-2" /> Change Password
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(true)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(user);
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                  >
                    Save
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Personal Info Fields */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="py-2">{user?.fullName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-700 font-bold mb-2">Email</label>
                <p className="py-2 text-gray-500">{user?.email} <span className="text-xs">(cannot be changed)</span></p>
              </div>
              
              <div>
                <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="py-2">{user?.phone || 'Not specified'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-700 font-bold mb-2">Account Type</label>
                <p className="py-2 text-gray-500">{user?.accountType === 'mentor' ? 'Mentor' : 'Student'} <span className="text-xs">(cannot be changed)</span></p>
              </div>
            </div>
          </div>
          
          {/* Mentor Specific Fields */}
          {user?.accountType === 'mentor' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b">Mentor Information</h3>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Professional Experience</label>
                {isEditing ? (
                  <select
                    name="professionalExperience"
                    value={formData.professionalExperience || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select experience level</option>
                    <option value="3_5_years">3-5 years</option>
                    <option value="5_10_years">5-10 years</option>
                    <option value="10_plus_years">10+ years</option>
                  </select>
                ) : (
                  <p className="py-2">
                    {user?.professionalExperience === '3_5_years' && '3-5 years'}
                    {user?.professionalExperience === '5_10_years' && '5-10 years'}
                    {user?.professionalExperience === '10_plus_years' && '10+ years'}
                    {!user?.professionalExperience && 'Not specified'}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-700 font-bold mb-2">Areas of Expertise</label>
                {isEditing ? (
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.expertise?.map((item, index) => (
                        <div key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center">
                          {item}
                          <button
                            type="button"
                            onClick={() => removeExpertise(index)}
                            className="ml-2 text-purple-800 hover:text-purple-900"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Type and press Enter to add expertise"
                      onKeyDown={handleExpertiseChange}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                ) : (
                  <div className="py-2 flex flex-wrap gap-2">
                    {user?.expertise?.length > 0 ? (
                      user.expertise.map((item, index) => (
                        <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                          {item}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">No expertise specified</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Change Password</h3>
            
            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setError('');
                    setPasswordData({
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: ''
                    });
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Modal Component */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Delete Account</h3>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete your account? This action cannot be undone, and all your data will be permanently removed.
            </p>
            
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;