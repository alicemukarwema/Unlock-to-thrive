import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message } from 'antd';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('https://unlock-to-thrive-backend.onrender.com/api/reset-password', { ...values, token });
      message.success(response.data.message);
      navigate('/login');
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to reset password.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <Card className="w-full max-w-md p-6">
        <h2 className="text-center text-2xl font-bold">Reset Password</h2>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Enter a new password!' }, { min: 6, message: 'At least 6 characters!' }]}
          >
            <Input.Password placeholder="New Password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[{ required: true, message: 'Confirm your password!' }]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="w-full bg-purple-600">
            Reset Password
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPassword;
