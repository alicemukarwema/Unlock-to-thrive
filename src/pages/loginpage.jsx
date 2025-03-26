import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  
  const handleSubmit = async (values) => {
    try {
      console.log("Submitting login request with:", values);

      const response = await axios.post('http://localhost:5000/api/signin', values);
      
      if (response.status === 200) {
        const { token, user } = response.data;
        const accountType = user.accountType;

        message.success('Login successful!');

        // Debugging logs
        console.log("Token received:", token);
        console.log("User data:", user);
        console.log("Account type:", accountType);

        // Store token in localStorage
        localStorage.setItem('token', token); 

        // Store user info including accountType
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userId', user.id);

        if (onLogin) {
          onLogin(user);
        } else {
          console.error("onLogin function is not provided!");
        }

        // Redirect based on account type
        if (accountType === "mentor") {
          navigate('/dashboard/mentor');
        } else if (accountType === "student") {
          navigate('/dashboard/student');
        } else {
          navigate('/dashboard/student'); 
        }
      } else {
        message.error(response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error(error.response?.data?.message || 'An error occurred during login.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Log in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form
            form={form}
            name="login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="Email" 
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <div className="flex items-center justify-between">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="font-medium text-indigo-600 hover:text-indigo-500" href="/request-reset-password">
                  Forgot your password?
                </a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button 
                htmlType="submit" 
                size="large"
                className="w-full text-white font-bold bg-purple-600 hover:bg-purple-700 border-purple-600"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;