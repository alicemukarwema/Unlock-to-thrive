import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Input, Pagination, Empty, Spin, Typography, Space, Alert } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import CourseCard from '../components/CourseCard'; // You might want to rename this to CareerCard

const { Title } = Typography;
const { Option } = Select;

const CareersPage = () => {
  // State for careers and loading
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for filters and pagination
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCareers, setTotalCareers] = useState(0);
  const [pageSize, setPageSize] = useState(9);

  // Load categories and levels on mount
  useEffect(() => {
    const fetchMetadata = async () => {
      // try {
      //   const [categoriesRes, levelsRes] = await Promise.all([
      //     axios.get('http://localhost:5000/api/careers/meta/categories'),
      //     axios.get('http://localhost:5000/api/careers/meta/levels')
      //   ]);
        
      //   setCategories(categoriesRes.data);
      //   setLevels(levelsRes.data);
      // } catch (err) {
      //   console.error('Error fetching metadata:', err);
      //   setError('Failed to load filter options. Please try again later.');
      // }

    };
    
    fetchMetadata();
  }, []);

  // Fetch careers based on filters and pagination
  useEffect(() => {
    const fetchCareers = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get('http://localhost:5000/api/careers', {
          params: {
            page: currentPage,
            limit: pageSize,
            category: selectedCategory,
            level: selectedLevel,
            search: searchTerm
          }
        });
        
        setCareers(response.data.careers);
        setTotalPages(response.data.totalPages);
        setTotalCareers(response.data.total);
        setCurrentPage(response.data.currentPage);
      } catch (err) {
        console.error('Error fetching careers:', err);
        setError('Failed to load career paths. Please try again later.');
        setCareers([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCareers();
  }, [currentPage, pageSize, selectedCategory, selectedLevel, searchTerm]);

  // Handle filter changes
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1); // Reset to first page when filters change
  };
  
  const handleLevelChange = (value) => {
    setSelectedLevel(value);
    setCurrentPage(1);
  };
  
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };
  
  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Title level={2} className="mb-8 text-center">Explore Career Paths</Title>
      
      {/* Filter and search section */}
      <div className="mb-8">
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={24} md={8} lg={6}>
            <Input
              placeholder="Search career paths"
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              allowClear
              size="large"
            />
          </Col>
          
       
          
        
        </Row>
      </div>
      
      {/* Error message if any */}
      {error && (
        <Alert 
          message="Error" 
          description={error} 
          type="error" 
          showIcon 
          className="mb-8" 
        />
      )}
      
      {/* Careers grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Spin size="large" tip="Loading career paths..." />
        </div>
      ) : careers.length > 0 ? (
        <div>
          <Row gutter={[24, 24]}>
            {careers.map(career => (
              <Col xs={24} sm={12} md={8} lg={8} key={career._id}>
                <CourseCard course={career} />
              </Col>
            ))}
          </Row>
          
          {/* Pagination */}
          <div className="mt-12 text-center">
            <Pagination
              current={currentPage}
              total={totalCareers}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger
              showTotal={(total) => `Total ${total} career paths`}
            />
          </div>
        </div>
      ) : (
        <Empty 
          description={
            <span>
              No career paths found. Try adjusting your filters or search terms.
            </span>
          }
          className="py-12"
        />
      )}
    </div>
  );
};

export default CareersPage;