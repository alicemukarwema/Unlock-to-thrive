import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Button, message, Select, Space } from 'antd';
import axios from 'axios';

const API_BASE_URL = 'https://unlock-to-thrive-backend.onrender.com/api';

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for sending cookies with requests
});

const MentorDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch available careers and student applications
  useEffect(() => {
    const fetchData = async () => {
      try {
        const careerResponse = await api.get('/careers');
        setCareers(careerResponse.data.careers || []);
      } catch (error) {
        message.error('Failed to fetch careers');
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Fetch applications when career is selected
  useEffect(() => {
    const fetchApplications = async () => {
      if (!selectedCareer) return;
      
      setLoading(true);
      try {
        const response = await api.get(`/mentors/applications/${selectedCareer}`);
        setApplications(response.data.data || []);
        setLoading(false);
      } catch (error) {
        message.error('Failed to fetch applications');
        console.error(error);
        setLoading(false);
      }
    };
    fetchApplications();
  }, [selectedCareer]);

  // Handle application status update
  const handleStatusUpdate = async (studentId, status) => {
    try {
      await api.put(`/mentors/applications/${studentId}/${selectedCareer}`, { status });
      message.success(`Application ${status} successfully`);
      
      // Refresh applications
      const response = await api.get(`/mentors/applications/${selectedCareer}`);
      setApplications(response.data.data || []);
    } catch (error) {
      message.error('Failed to update application status');
      console.error(error);
    }
  };

  const columns = [
    {
      title: 'Student Name',
      dataIndex: ['student', 'fullName'],
      key: 'studentName',
      render: (name) => name || 'N/A'
    },
    {
      title: 'Email',
      dataIndex: ['student', 'email'],
      key: 'email',
      render: (email) => email || 'N/A'
    },
    {
      title: 'Applied Date',
      dataIndex: 'appliedDate',
      key: 'appliedDate',
      render: (date) => date ? new Date(date).toLocaleDateString() : 'N/A'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusColors = {
          pending: 'orange',
          approved: 'green',
          rejected: 'red'
        };
        return (
          <Tag color={statusColors[status] || 'default'}>
            {status ? status.toUpperCase() : 'PENDING'}
          </Tag>
        );
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            onClick={() => handleStatusUpdate(record.studentId, 'approved')}
            disabled={record.status !== 'pending'}
          >
            Approve
          </Button>
          <Button 
            danger 
            onClick={() => handleStatusUpdate(record.studentId, 'rejected')}
            disabled={record.status !== 'pending'}
          >
            Reject
          </Button>
        </Space>
      )
    }
  ];

  return (
    <Card 
      title="Mentor Dashboard" 
      style={{ 
        backgroundColor: '#6a5acd', 
        color: 'white', 
        minHeight: '100vh' 
      }}
    >
      <Select
        placeholder="Select Career Program"
        style={{ width: '100%', marginBottom: 16 }}
        onChange={(value) => setSelectedCareer(value)}
      >
        {careers.map(career => (
          <Option key={career._id} value={career._id}>
            {career.title}
          </Option>
        ))}
      </Select>

      <Table 
        columns={columns}
        dataSource={applications}
        loading={loading}
        rowKey={(record) => record.studentId || Math.random()}
        style={{ backgroundColor: 'white' }}
        locale={{
          emptyText: selectedCareer 
            ? 'No applications found for this career' 
            : 'Please select a career program'
        }}
      />
    </Card>
  );
};

export default MentorDashboard;