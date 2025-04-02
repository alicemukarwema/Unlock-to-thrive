import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Button, message, Space } from 'antd';
import axios from 'axios';

const API_BASE_URL = 'https://unlock-to-thrive-backend.onrender.com/api';

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for sending cookies with requests
});

const MentorDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const mentorId = localStorage.getItem('userId'); // Assuming mentorId is stored as 'mentorId'

  useEffect(() => {
    const fetchApplications = async () => {
      if (!mentorId) {
        message.error('Mentor ID not found in localStorage');
        return;
      }

      setLoading(true);
      try {
        // Send mentorId as part of the URL
        const response = await api.get(`/mentors/applications/${mentorId}`);
        setApplications(response.data.data || []);
      } catch (error) {
        message.error('Failed to fetch applications');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [mentorId]);

  const handleStatusUpdate = async (studentId, status) => {
    if (!mentorId) {
      message.error('Mentor ID not found in localStorage');
      return;
    }

    try {
      await api.put(`/mentors/applications/${studentId}`, 
        { status },
        {
          headers: {
            'Authorization': `Bearer ${mentorId}`,  // If you're using JWT, replace with your actual token logic
          },
        }
      );
      message.success(`Application ${status} successfully`);

      // Refresh applications
      const response = await api.get(`/mentors/applications`, {
        headers: {
          'Authorization': `Bearer ${mentorId}`,
        },
      });
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
      render: (name) => name || 'N/A',
    },
    {
      title: 'Email',
      dataIndex: ['student', 'email'],
      key: 'email',
      render: (email) => email || 'N/A',
    },
    {
      title: 'Applied Date',
      dataIndex: 'appliedDate',
      key: 'appliedDate',
      render: (date) => date ? new Date(date).toLocaleDateString() : 'N/A',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusColors = {
          pending: 'orange',
          approved: 'green',
          rejected: 'red',
        };
        return <Tag color={statusColors[status] || 'default'}>{status ? status.toUpperCase() : 'PENDING'}</Tag>;
      },
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
      ),
    },
  ];

  return (
    <Card 
      title="Mentor Dashboard" 
      style={{ 
        backgroundColor: 'white', 
        color: 'white', 
        minHeight: '100vh' 
      }}
    >
      <Table 
        columns={columns}
        dataSource={applications}
        loading={loading}
        rowKey={(record) => record.studentId}
        style={{ backgroundColor: 'white' }}
        locale={{
          emptyText: 'No applications found for this mentor',
        }}
      />
    </Card>
  );
};

export default MentorDashboard;
