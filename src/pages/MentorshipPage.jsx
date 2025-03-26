import React, { useState } from 'react';
import { Input, Select, Button, Pagination, Tabs } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import MentorList from '../components/MentorCard';  // Import the new MentorList component

const { Option } = Select;
const { TabPane } = Tabs;

// Sample data - in a real app, these would come from a backend or configuration file
const industries = [
  'Technology', 
  'Finance', 
  'Healthcare', 
  'Marketing', 
  'Education', 
  'Consulting', 
  'Entrepreneurship'
];

const expertiseAreas = [
  'Leadership', 
  'Career Development', 
  'Technical Skills', 
  'Networking', 
  'Product Management', 
  'Entrepreneurship', 
  'Design', 
  'Data Science'
];

const MentorshipPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [expertiseFilter, setExpertiseFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Connect with Mentors</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Find experienced professionals who can provide guidance and support on your journey.
          </p>
        </div>
        
        <Tabs defaultActiveKey="find" centered className="mb-8">
          <TabPane tab="Find a Mentor" key="find">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Input
                    placeholder="Search mentors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    prefix={<SearchOutlined />}
                    allowClear
                  />
                </div>
                <div>
                  <Select
                    placeholder="Industry"
                    style={{ width: '100%' }}
                    value={industryFilter}
                    onChange={(value) => setIndustryFilter(value)}
                  >
                    <Option value="all">All Industries</Option>
                    {industries.map((industry) => (
                      <Option key={industry} value={industry}>{industry}</Option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Select
                    placeholder="Expertise"
                    style={{ width: '100%' }}
                    value={expertiseFilter}
                    onChange={(value) => setExpertiseFilter(value)}
                  >
                    <Option value="all">All Expertise</Option>
                    {expertiseAreas.map((expertise) => (
                      <Option key={expertise} value={expertise}>{expertise}</Option>
                    ))}
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Mentors List */}
            <MentorList 
              searchTerm={searchTerm}
              industryFilter={industryFilter}
              expertiseFilter={expertiseFilter}
            />
          </TabPane>
          
          <TabPane tab="Become a Mentor" key="become">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
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
              
              <div className="text-center mt-8">
                <Button 
                  type="primary" 
                  size="large"
                  className="bg-purple-600 hover:bg-purple-700 border-purple-600 px-8"
                >
                  Apply to Become a Mentor
                </Button>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default MentorshipPage;