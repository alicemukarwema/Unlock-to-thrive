import React, { useState, useEffect } from 'react';
import { 
  Table, Button, Modal, Form, Input, Select, Upload, InputNumber, 
  Space, Popconfirm, message, Card, Statistic, Row, Col, Divider, Typography, Tabs
} from 'antd';
import { 
  PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined,
  UserOutlined, BookOutlined, StarOutlined, TagOutlined,
  TeamOutlined, TrophyOutlined, CommentOutlined, LinkOutlined
} from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const API_URL = 'http://localhost:5000/api/careers';

const MentorshipDashboard = () => {
  // State variables
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [resourceForm] = Form.useForm();
  const [resourceModalVisible, setResourceModalVisible] = useState(false);
  const [addResourceModalVisible, setAddResourceModalVisible] = useState(false);
  const [currentCareerResources, setCurrentCareerResources] = useState({
    requiredSkills: [],
    recommendedResources: [],
    careerPathways: [],
    industryTrends: [],
    professionalNetworks: []
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [currentCareer, setCurrentCareer] = useState(null);
  const [dashboardStats, setDashboardStats] = useState({
    totalCareers: 0,
    totalMentees: 0,
    averageRating: 0
  });

  
  // Categories and levels
  const categories = ['Technology', 'Business', 'Marketing', 'Design', 'Personal Development', 'Healthcare', 'Education'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  // Resource type options
  const resourceTypes = [
    'Required Skills', 
    'Recommended Resources', 
    'Career Pathways', 
    'Industry Trends', 
    'Professional Networks'
  ];

  // Calculate dashboard statistics
  const calculateStats = (careers, total) => {
    const totalMentees = careers.reduce((sum, career) => sum + (career.maxMentees || 0), 0);
    const averageRating = careers.reduce((sum, career) => sum + (career.rating || 0), 0) / careers.length;

    setDashboardStats({
      totalCareers: total,
      totalMentees,
      averageRating: averageRating.toFixed(1)
    });
  };

  // Fetch careers
  const fetchCareers = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          page,
          limit: pageSize
        }
      });
      
      setCareers(response.data.careers);
      setPagination({
        ...pagination,
        current: response.data.currentPage,
        total: response.data.total
      });
      
      // Calculate stats
      calculateStats(response.data.careers, response.data.total);
    } catch (error) {
      message.error('Failed to fetch mentorship opportunities: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Lifecycle hook to fetch careers on component mount
  useEffect(() => {
    fetchCareers();
  }, []);

  // Fetch career resources
  const fetchCareerResources = async (careerId) => {
    try {
      const response = await axios.get(`${API_URL}/resources/${careerId}`);
      setCurrentCareerResources(response.data);
    } catch (error) {
      message.error('Failed to fetch career resources: ' + error.message);
    }
  };

  // Table columns
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div className="flex items-center">
          <img 
            src={record.imagePath || '/default-career.jpg'} 
            alt={text} 
            className="w-10 h-10 mr-3 rounded-full object-cover" 
          />
          <span>{text}</span>
        </div>
      )
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: categories.map(cat => ({ text: cat, value: cat })),
      onFilter: (value, record) => record.category === value
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      filters: levels.map(level => ({ text: level, value: level })),
      onFilter: (value, record) => record.level === value
    },
    {
      title: 'Instructor',
      dataIndex: 'instructor',
      key: 'instructor'
    },
    {
      title: 'Max Mentees',
      dataIndex: 'maxMentees',
      key: 'maxMentees'
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <div className="flex items-center text-yellow-500">
          <StarOutlined />
          <span className="ml-1">{rating.toFixed(1)}</span>
        </div>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this career?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              type="danger" 
              icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
          <Button 
            type="link" 
            onClick={() => showResourceModal(record)}
          >
            Resources
          </Button>
        </Space>
      )
    }
  ];

  // Show resources modal
  const showResourceModal = (record) => {
    setCurrentCareer(record); // Set the current career before showing the modal
    fetchCareerResources(record._id);
    setResourceModalVisible(true);
  };

  // Edit career
  const handleEdit = (record) => {
    setEditingCareer(record);
    setModalVisible(true);
    form.setFieldsValue({
      ...record,
      requiredSkills: record.requiredSkills ? JSON.stringify(record.requiredSkills) : '',
      recommendedResources: record.recommendedResources ? JSON.stringify(record.recommendedResources) : '',
      careerPathways: record.careerPathways ? JSON.stringify(record.careerPathways) : '',
      industryTrends: record.industryTrends ? JSON.stringify(record.industryTrends) : '',
      professionalNetworks: record.professionalNetworks ? JSON.stringify(record.professionalNetworks) : ''
    });
  };

  // Delete career
  const handleDelete = async (careerId) => {
    try {
      await axios.delete(`${API_URL}/${careerId}`);
      message.success('Career deleted successfully');
      fetchCareers(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error('Failed to delete career: ' + error.message);
    }
  };

  // Submit career form
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const token = localStorage.getItem('token');
      // Create form data for file upload
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        if (key !== 'image') {
          formData.append(key, values[key]);
        }
      });
      
      // Add file if exists in fileList
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('image', fileList[0].originFileObj);
      }
      
      if (editingCareer) {
        // Update existing career
        await axios.put(`${API_URL}/${editingCareer._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          }
        });
        message.success('Mentorship opportunity updated successfully');
      } else {
        // Create new career
        await axios.post(API_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        message.success('Mentorship opportunity created successfully');
      }
      
      // Reset and refresh
      setModalVisible(false);
      form.resetFields();
      setFileList([]);
      fetchCareers(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error('Submission failed: ' + error.message);
    }
  };

  // Render resource columns
  const resourceColumns = {
    recommendedResources: [
      { title: 'Title', dataIndex: 'title', key: 'title' },
      { title: 'Type', dataIndex: 'type', key: 'type' },
      { 
        title: 'Action', 
        key: 'action', 
        render: (_, record) => (
          <Button 
            type="link" 
            icon={<LinkOutlined />} 
            onClick={() => window.open(record.url, '_blank')}
          >
            Open Resource
          </Button>
        )
      }
    ],
    careerPathways: [
      { title: 'Title', dataIndex: 'title', key: 'title' },
      { title: 'Potential Roles', dataIndex: 'potentialRoles', key: 'potentialRoles', 
        render: (roles) => roles ? roles.join(', ') : 'N/A' 
      },
      { 
        title: 'Action', 
        key: 'action', 
        render: (_, record) => (
          <Button 
            type="link" 
            icon={<LinkOutlined />} 
            onClick={() => window.open(record.url, '_blank')}
          >
            Open Pathway
          </Button>
        )
      }
    ],
    industryTrends: [
      { title: 'Title', dataIndex: 'title', key: 'title' },
      { 
        title: 'Description', 
        dataIndex: 'description', 
        key: 'description' 
      },
      { 
        title: 'Action', 
        key: 'action', 
        render: (_, record) => (
          <Button 
            type="link" 
            icon={<LinkOutlined />} 
            onClick={() => window.open(record.url, '_blank')}
          >
            Open Trend
          </Button>
        )
      }
    ],
    professionalNetworks: [
      { title: 'Network', dataIndex: 'network', key: 'network' },
      { 
        title: 'Action', 
        key: 'action', 
        render: (_, record) => (
          <Button 
            type="link" 
            icon={<LinkOutlined />} 
            onClick={() => window.open(record.url, '_blank')}
          >
            Join Network
          </Button>
        )
      }
    ]
  };
  

  // Add Resource
  const handleAddResource = async (values) => {
    try {
      await axios.post(`${API_URL}/${currentCareer._id}/resources`, values);
      message.success('Resource added successfully');
      fetchCareerResources(currentCareer._id);
      setAddResourceModalVisible(false);
    } catch (error) {
      message.error('Failed to add resource: ' + error.message);
    }
  };
  const handleAddCareer = () => {
    setEditingCareer(null);
    setModalVisible(true);
    form.resetFields();
    setFileList([]);
  };

  return (
    <div>
      <Row>
        <Col span={24} className="mb-4">
          <Title level={3}>Dashboard</Title>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Careers" value={dashboardStats.totalCareers} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Mentees" value={dashboardStats.totalMentees} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Average Rating" value={dashboardStats.averageRating} />
          </Card>
        </Col>
      </Row>
      <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAddCareer}
          >
            Add Career
          </Button>
      <Table
        columns={columns}
        dataSource={careers}
        loading={loading}
        rowKey="_id"
        pagination={pagination}
        onChange={(_, filters, sorter, extra) => {
          if (extra.action === 'paginate') {
            fetchCareers(extra.pagination.current, extra.pagination.pageSize);
          }
        }}
      />
      
      <Modal
        title={editingCareer ? "Edit Career" : "Add New Career"}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleSubmit}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input the career title' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select>
              {categories.map((category, idx) => (
                <Option key={idx} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Level"
            name="level"
            rules={[{ required: true, message: 'Please select a level' }]}
          >
            <Select>
              {levels.map((level, idx) => (
                <Option key={idx} value={level}>
                  {level}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Instructor" name="instructor">
            <Input />
          </Form.Item>

          <Form.Item label="Max Mentees" name="maxMentees">
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item label="Rating" name="rating">
            <InputNumber min={0} max={5} />
          </Form.Item>

          <Form.Item label="Required Skills" name="requiredSkills">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Recommended Resources" name="recommendedResources">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Career Pathways" name="careerPathways">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Industry Trends" name="industryTrends">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Professional Networks" name="professionalNetworks">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Career Image" valuePropName="fileList">
            <Upload
              beforeUpload={() => false} 
              onChange={({ fileList }) => setFileList(fileList)}
              listType="picture-card"
              fileList={fileList}
            >
              <UploadOutlined />
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={`Resources for ${currentCareer ? currentCareer.title : ''}`}
        visible={resourceModalVisible}
        onCancel={() => setResourceModalVisible(false)}
        footer={null}
      >
        <Tabs defaultActiveKey="1">
          {Object.keys(currentCareerResources).map((key) => (
            <TabPane tab={key} key={key}>
              <Table
                columns={resourceColumns[key]}
                dataSource={currentCareerResources[key]}
                rowKey="_id"
                pagination={false}
              />
            </TabPane>
          ))}
        </Tabs>

        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => setAddResourceModalVisible(true)}
        >
          Add Resource
        </Button>
      </Modal>
      
      <Modal
        title="Add Resource"
        visible={addResourceModalVisible}
        onCancel={() => setAddResourceModalVisible(false)}
        onOk={() => {
          resourceForm.submit();
          setAddResourceModalVisible(false);
        }}
      >
        <Form
          form={resourceForm}
          layout="vertical"
          onFinish={handleAddResource}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input resource title' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
    label="Type"  // Add this new field
    name="type"
    rules={[{ required: true, message: 'Please select resource type' }]}
  >
    <Select>
      {[
        'YouTube Video', 
        'Online Course', 
        'Article', 
        'Book', 
        'Podcast', 
        'Tutorial', 
        'Certification', 
        'Workshop', 
        'Conference', 
        'Webinar'
      ].map((type) => (
        <Option key={type} value={type}>
          {type}
        </Option>
      ))}
    </Select>
  </Form.Item>
          <Form.Item
    label="Category"
    name="category"
    rules={[{ required: true, message: 'Please select resource category' }]}
  >
    <Select>
      {[
        'Required Skills', 
        'Recommended Resources', 
        'Career Pathways', 
        'Industry Trends', 
        'Professional Networks'
      ].map((category) => (
        <Option key={category} value={category}>
          {category}
        </Option>
      ))}
    </Select>
  </Form.Item>

          <Form.Item
            label="URL"
            name="url"
            rules={[{ required: true, message: 'Please input resource URL' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MentorshipDashboard;
