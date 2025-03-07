import React, { useState } from 'react';
import { Input, Select, Button, Pagination, Tabs } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import MentorCard from '../components/MentorCard';

const { Option } = Select;
const { TabPane } = Tabs;

const MentorshipPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [expertiseFilter, setExpertiseFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Sample data
  const industries = ['Technology', 'Business', 'Marketing', 'Healthcare', 'Education', 'Finance'];
  const expertiseAreas = ['Career Development', 'Leadership', 'Technical Skills', 'Entrepreneurship', 'Work-Life Balance'];
  
  const mentors = [
    {
      id: 1,
      name: 'Dr. Maya Patel',
      title: 'Senior Software Engineer',
      company: 'Tech Innovations Inc.',
      industry: 'Technology',
      expertise: ['Technical Skills', 'Career Development'],
      linkedIn: '#'
    },
    {
      id: 2,
      name: 'Lisa Thompson',
      title: 'Marketing Director',
      company: 'Global Brands Agency',
      industry: 'Marketing',
      expertise: ['Leadership', 'Career Development'],
      linkedIn: '#'
    },
    {
      id: 3,
      name: 'Dr. Sarah Johnson',
      title: 'Chief Medical Officer',
      company: 'City General Hospital',
      industry: 'Healthcare',
      expertise: ['Leadership', 'Work-Life Balance'],
      linkedIn: '#'
    },
    {
      id: 4,
      name: 'Jessica Williams',
      title: 'Founder & CEO',
      company: 'EduTech Solutions',
      industry: 'Education',
      expertise: ['Entrepreneurship', 'Leadership'],
      linkedIn: '#'
    },
    {
      id: 5,
      name: 'Michelle Rodriguez',
      title: 'Investment Banker',
      company: 'Global Financial Group',
      industry: 'Finance',
      expertise: ['Career Development', 'Technical Skills'],
      linkedIn: '#'
    },
    {
      id: 6,
      name: 'Emma Davis',
      title: 'Product Manager',
      company: 'InnovateTech',
      industry: 'Technology',
      expertise: ['Technical Skills', 'Leadership'],
      linkedIn: '#'
    },
    {
      id: 7,
      name: 'Jennifer Lopez',
      title: 'HR Director',
      company: 'Talent Solutions Corp',
      industry: 'Business',
      expertise: ['Career Development', 'Work-Life Balance'],
      linkedIn: '#'
    },
    {
      id: 8,
      name: 'Rebecca Taylor',
      title: 'Senior Professor',
      company: 'State University',
      industry: 'Education',
      expertise: ['Career Development', 'Leadership'],
      linkedIn: '#'
    }
  ];
  
  // Filter mentors based on search and filters
  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === 'all' || mentor.industry === industryFilter;
    const matchesExpertise = expertiseFilter === 'all' || mentor.expertise.includes(expertiseFilter);
    
    return matchesSearch && matchesIndustry && matchesExpertise;
  });
  
  // Pagination logic
  const pageSize = 8;
  const paginatedMentors = filteredMentors.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
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
            {paginatedMentors.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {paginatedMentors.map((mentor) => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                  ))}
                </div>
                
                {/* Pagination */}
                <div className="flex justify-center mt-8">
                  <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredMentors.length}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                  />
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-xl font-medium text-gray-800 mb-2">No mentors found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
                <Button 
                  type="primary" 
                  onClick={() => {
                    setSearchTerm('');
                    setIndustryFilter('all');
                    setExpertiseFilter('all');
                  }}
                  className="mt-4 bg-purple-600 hover:bg-purple-700 border-purple-600"
                >
                  Reset Filters
                </Button>
              </div>
            )}
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