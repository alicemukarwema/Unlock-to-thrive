import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const ContactForm = () => {
  const [form] = Form.useForm();
  
  const onFinish = (values) => {
    console.log('Form values:', values);
    // Handle form submission
    form.resetFields();
  };
  
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="max-w-lg mx-auto"
    >
      <Form.Item
        name="name"
        label="Your Name"
        rules={[{ required: true, message: 'Please enter your name' }]}
      >
        <Input placeholder="Enter your full name" />
      </Form.Item>
      
      <Form.Item
        name="email"
        label="Email Address"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email' }
        ]}
      >
        <Input placeholder="Enter your email address" />
      </Form.Item>
      
      <Form.Item
        name="subject"
        label="Subject"
        rules={[{ required: true, message: 'Please select a subject' }]}
      >
        <Select placeholder="Select a subject">
          <Option value="general">General Inquiry</Option>
          <Option value="career">Career</Option>
          <Option value="mentorship">Mentorship</Option>
          <Option value="financial">Financial Aid</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>
      
      <Form.Item
        name="message"
        label="Message"
        rules={[{ required: true, message: 'Please enter your message' }]}
      >
        <TextArea 
          placeholder="Enter your message here..." 
          rows={5}
        />
      </Form.Item>
      
      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit"
          className="bg-purple-600 hover:bg-purple-700 border-purple-600"
          style={{ width: '100%' }}
        >
          Send Message
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;