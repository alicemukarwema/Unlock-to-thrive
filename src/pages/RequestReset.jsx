import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import axios from 'axios';

const RequestResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('https://unlock-to-thrive-backend.onrender.com/api/request-reset-password', values);
      message.success(response.data.message);
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to send reset request.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <Card className="w-full max-w-md p-6">
        <h2 className="text-center text-2xl font-bold">Request Password Reset</h2>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Enter a valid email!' },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="w-full bg-purple-600">
            Send Reset Link
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default RequestResetPassword;
