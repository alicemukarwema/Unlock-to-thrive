import React, { useState } from 'react';
import { Input, Select, Button, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import CourseCard from '../components/CourseCard';
import image1 from "../assets/pexels-goumbik-574077.jpg";
import image2 from "../assets/business.jpg";
import image3 from "../assets/pexels-mikhail-nilov-6930542.jpg";
import image4 from "../assets/UI design.jpg";
import image5 from "../assets/data science.jpg";
import image6 from "../assets/financial literacy.jpg";
import image7 from "../assets/public speaking skills.jpg";
import image8 from "../assets/social media marketing.jpg";
import image9 from "../assets/mobile app.jpg"

const { Option } = Select;

const CareerPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Sample data
  const categories = ['Technology', 'Business', 'Marketing', 'Design', 'Personal Development'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  
  const Career = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      category: 'Technology',
      level: 'Beginner',
      image:image1
    
     
      
    },
    {
      id: 2,
      title: 'Digital Marketing Essentials',
      category: 'Marketing',
      level: 'Beginner',
      image:image2
     
   
    },
    {
      id: 3,
      title: 'Enterprenuer Leardership',
      category: 'Business',
      level: 'Intermediate',
      image:image3
      
      
    },
    {
      id: 4,
      title: 'User Experience Design Fundamentals',
      category: 'Design',
      level: 'Beginner',
      image:image4
     
   
    },
    {
      id: 5,
      title: 'Advanced Data Science for Business',
      category: 'Technology',
      level: 'Advanced',
      image:image5
    
     
    },
    {
      id: 6,
      title: 'Financial Literacy for Entrepreneurs',
      category: 'Business',
      level: 'Intermediate',
      image:image6
      
     
    },
    {
      id: 7,
      title: 'Public Speaking and Communication',
      category: 'Personal Development',
      level: 'Beginner',
      image:image7
     
    },
    {
      id: 8,
      title: 'Social Media Marketing Strategy',
      category: 'Marketing',
      level: 'Intermediate',
      image:image8
     
     
    },
    {
      id: 9,
      title: 'Mobile App Development with React Native',
      category: 'Technology',
      level: 'Advanced',
      image:image9
    
      
    }
  ];
  
  // Filter Career based on search and filters
  const filteredCareer = Career.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });
  
  // Pagination logic
  const pageSize = 6;
  const paginatedCareer = filteredCareer.slice(
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
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Explore Your Career</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Discover a wide range of Career designed to help you develop in-demand skills and advance your career.
          </p>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                placeholder="Search Career or instructors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                prefix={<SearchOutlined />}
                allowClear
              />
            </div>
            <div>
              <Select
                placeholder="Category"
                style={{ width: '100%' }}
                value={categoryFilter}
                onChange={(value) => setCategoryFilter(value)}
              >
                <Option value="all">All Categories</Option>
                {categories.map((category) => (
                  <Option key={category} value={category}>{category}</Option>
                ))}
              </Select>
            </div>
            <div>
              <Select
                placeholder="Level"
                style={{ width: '100%' }}
                value={levelFilter}
                onChange={(value) => setLevelFilter(value)}
              >
                <Option value="all">All Levels</Option>
                {levels.map((level) => (
                  <Option key={level} value={level}>{level}</Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        
        {/* Course List */}
        {paginatedCareer.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedCareer.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredCareer.length}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <h3 className="text-xl font-medium text-gray-800 mb-2">No Career found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
            <Button 
              type="primary" 
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
                setLevelFilter('all');
              }}
              className="mt-4 bg-purple-600 hover:bg-purple-700 border-purple-600"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerPage;