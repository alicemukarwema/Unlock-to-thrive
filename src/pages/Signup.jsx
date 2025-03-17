// pages/SignupPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Card, Radio, Tabs, Checkbox, message, Collapse } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, DownOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Panel } = Collapse;

const SignupPage = ({ onSignup }) => {
  const [form] = Form.useForm();
  const [accountType, setAccountType] = useState('student');
  const [showMentorInfo, setShowMentorInfo] = useState(false);
  const handleSubmit = async (values) => {
    try {
      const response = await fetch("https://unlock-to-thrive-backend.onrender.com/api/register", { // Adjust the backend URL if needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, accountType }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success("Account created successfully!");
        form.resetFields();
      } else {
        message.error(data.message || "Failed to create account.");
      }
    } catch (error) {
      message.error("An error occurred during signup.");
    }
  };

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
    form.resetFields();
    setShowMentorInfo(false);
  };

  const toggleMentorInfo = (checked) => {
    setShowMentorInfo(checked);
  };

  // Student Registration Form
  const StudentForm = () => (
    <Form
      form={form}
      name="student_signup"
      layout="vertical"
      initialValues={{ agree: false }}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="fullName"
        rules={[{ required: true, message: 'Please input your full name!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Full Name"
          size="large"
        />
      </Form.Item>
      
      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Please enter a valid email!' }
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
          size="large"
        />
      </Form.Item>
      
      <Form.Item
        name="phone"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input
          prefix={<PhoneOutlined className="site-form-item-icon" />}
          placeholder="Phone Number"
          size="large"
        />
      </Form.Item>
      
      <Form.Item
        name="education"
        rules={[{ required: true, message: 'Please select your education level!' }]}
      >
        <Radio.Group className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Radio.Button value="high_school" className="text-center">High School</Radio.Button>
            <Radio.Button value="undergraduate" className="text-center">Undergraduate</Radio.Button>
            <Radio.Button value="graduate" className="text-center">Graduate</Radio.Button>
            <Radio.Button value="other" className="text-center">Other</Radio.Button>
          </div>
        </Radio.Group>
      </Form.Item>
      
      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' },
          { min: 8, message: 'Password must be at least 8 characters!' }
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
          size="large"
        />
      </Form.Item>
      
      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords do not match!'));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Confirm Password"
          size="large"
        />
      </Form.Item>
      
      <Form.Item
        name="agree"
        valuePropName="checked"
        rules={[
          { validator: (_, value) => 
            value ? Promise.resolve() : Promise.reject(new Error('You must accept the terms and conditions')) 
          },
        ]}
      >
        <Checkbox>
          I agree to the <a href="#" className="text-indigo-600">Terms of Service</a> and <a href="#" className="text-indigo-600">Privacy Policy</a>
        </Checkbox>
      </Form.Item>
      
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="w-full bg-purple-600 hover:bg-purple-700 border-purple-600"
        >
          Create Student Account
        </Button>
      </Form.Item>
    </Form>
  );

  // Mentor Registration Form
  const MentorForm = () => (
    <Form
      form={form}
      name="mentor_signup"
      layout="vertical"
      initialValues={{ agree: false }}
      onFinish={handleSubmit}
    >
      {/* Mentor Information section - hidden initially, shown when Terms checkbox is checked */}
      {showMentorInfo && (
        <div className="mb-6 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Share Your Expertise</h2>
          <p className="text-gray-600 mb-6">
            Join our community of mentors and help empower the next generation of leaders.
            As a mentor, you'll have the opportunity to make a meaningful impact while developing
            your own leadership and coaching skills.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Benefits of Being a Mentor</h3>
          <ul className="list-disc pl-5 mb-6 text-gray-600">
            <li className="mb-2">Make a meaningful impact in someone's career journey</li>
            <li className="mb-2">Develop your leadership and coaching abilities</li>
            <li className="mb-2">Expand your professional network</li>
            <li className="mb-2">Gain recognition in your field</li>
            <li className="mb-2">Flexible time commitment (2-4 hours per month)</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Requirements</h3>
          <ul className="list-disc pl-5 mb-6 text-gray-600">
            <li className="mb-2">At least 3 years of professional experience</li>
            <li className="mb-2">Willingness to commit to at least 6 months of mentorship</li>
            <li className="mb-2">Passion for supporting women's career development</li>
          </ul>
        </div>
      )}

      <Form.Item
        name="fullName"
        rules={[{ required: true, message: 'Please input your full name!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Full Name"
          size="large"
        />
      </Form.Item>
      
      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Please enter a valid email!' }
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
          size="large"
        />
      </Form.Item>
      
      <Form.Item
        name="phone"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input
          prefix={<PhoneOutlined className="site-form-item-icon" />}
          placeholder="Phone Number"
          size="large"
        />
      </Form.Item>
      
      <Form.Item
        name="professionalExperience"
        rules={[{ required: true, message: 'Please select your professional experience!' }]}
      >
        <Radio.Group className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Radio.Button value="3_5_years" className="text-center">3-5 years</Radio.Button>
            <Radio.Button value="5_10_years" className="text-center">5-10 years</Radio.Button>
            <Radio.Button value="10_plus_years" className="text-center">10+ years</Radio.Button>
          </div>
        </Radio.Group>
      </Form.Item>
      
      <Form.Item
        name="expertise"
        rules={[{ required: true, message: 'Please select your areas of expertise!' }]}
      >
        <Checkbox.Group className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Checkbox value="tech">Technology</Checkbox>
            <Checkbox value="business">Business</Checkbox>
            <Checkbox value="education">Education</Checkbox>
            <Checkbox value="healthcare">Healthcare</Checkbox>
            <Checkbox value="science">Science</Checkbox>
            <Checkbox value="arts">Arts & Design</Checkbox>
          </div>
        </Checkbox.Group>
      </Form.Item>
      
      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' },
          { min: 8, message: 'Password must be at least 8 characters!' }
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
          size="large"
        />
      </Form.Item>
      
      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords do not match!'));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Confirm Password"
          size="large"
        />
      </Form.Item>
      
      <Form.Item
        name="agree"
        valuePropName="checked"
        rules={[
          { validator: (_, value) => 
            value ? Promise.resolve() : Promise.reject(new Error('You must accept the terms and conditions')) 
          },
        ]}
      >
        <Checkbox onChange={(e) => toggleMentorInfo(e.target.checked)}>
          I agree to the <a href="#" className="text-indigo-600">Terms of Service</a> and <a href="#" className="text-indigo-600">Privacy Policy</a>
        </Checkbox>
      </Form.Item>
      
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="w-full bg-purple-600 hover:bg-purple-700 border-purple-600"
        >
          Create Mentor Account
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or {' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            log in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-6">
            <Radio.Group 
              value={accountType} 
              onChange={handleAccountTypeChange}
              className="w-full "
              buttonStyle="solid"
            >
              <div className="grid grid-cols-2 gap-2">
                <Radio.Button value="student" className="text-center" style={{ borderColor: '#8B5CF6', backgroundColor: accountType === 'student' ? '#8B5CF6' : 'white' }}>Student</Radio.Button>
                <Radio.Button value="mentor" className="text-center" style={{ borderColor: '#8B5CF6', backgroundColor: accountType === 'mentor' ? '#8B5CF6' : 'white' }}>Mentor</Radio.Button>
              </div>
            </Radio.Group>
          </div>
          
          {accountType === 'student' ? <StudentForm /> : <MentorForm />}
        </Card>
      </div>
    </div>
  );
};

// Add necessary CSS for animation
const style = document.createElement('style');
style.innerHTML = `
  .animate-fade-in {
    animation: fadeIn 0.5s ease-in;
  }
  
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;
document.head.appendChild(style);

export default SignupPage;