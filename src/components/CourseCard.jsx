import React, { useState } from 'react';
import { Card, Tag, Rate, Button, message } from 'antd';
import { UserOutlined, RightOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const [loved, setLoved] = useState(false);
  
  // Make sure course exists before trying to use it
  if (!course) {
    return null; // Or return a placeholder card if course is not available
  }

  // Generate tag color based on category
  const getTagColor = (category) => {
    const colors = {
      'Technology': 'blue',
      'Business': 'green',
      'Marketing': 'orange',
      'Design': 'purple',
      'Personal Development': 'cyan'
    };
    return colors[category] || 'default';
  };

  // Generate level indicator
  const getLevelColor = (level) => {
    const colors = {
      'Beginner': 'success',
      'Intermediate': 'warning',
      'Advanced': 'error'
    };
    return colors[level] || 'default';
  };

  // Format image URL properly
  const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/300x200'; // Fallback image URL

    // If it's already a full URL (from Cloudinary), use it directly
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }

    // Otherwise, it's a relative path that needs the backend URL
    return `https://unlock-to-thrive-backend.onrender.com/api${path}`;
  };

  const handleCardClick = () => {
    navigate(`/career/${course._id}`);
  };
  
  const handleLoveClick = (e) => {
    e.stopPropagation(); // Prevent the card click event from firing
    setLoved(!loved);
    
    // You can add API call here to save the favorite status
    // Example: api.saveFavorite(course._id, !loved)
    
    message.success(loved ? `Removed ${course.title} from favorites` : `Added ${course.title} to favorites`);
  };

  const imageUrl = getImageUrl(course.imagePath);

  return (
    <Card
      hoverable
      className="overflow-hidden h-full flex flex-col relative"
      onClick={handleCardClick}
      cover={
        <div className="h-48 overflow-hidden">
          <img
            alt={course.title || 'Course'}
            src={imageUrl}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200'; // Default image on error
            }}
          />
        </div>
      }
      actions={[
        <Button 
          type="primary" 
          icon={<RightOutlined />}
          onClick={handleCardClick}
        >
          Learn More
        </Button>
      ]}
    >
      {/* Love Button */}
      <button 
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
        onClick={handleLoveClick}
      >
        {loved ? 
          <HeartFilled style={{ color: '#ff4d4f', fontSize: '20px' }} /> : 
          <HeartOutlined style={{ fontSize: '20px' }} />
        }
      </button>
      
      <div className="mb-2 flex justify-between">
        <Tag color={getTagColor(course.category)}>{course.category || 'Uncategorized'}</Tag>
        <Tag color={getLevelColor(course.level)}>{course.level || 'Unspecified'}</Tag>
      </div>

      <h3 className="text-lg font-medium mb-2">{course.title || 'Untitled Course'}</h3>

      {course.description ? (
        <p className="text-gray-600 mb-4 flex-grow">
          {course.description.length > 100
            ? `${course.description.substring(0, 100)}...`
            : course.description}
        </p>
      ) : (
        <p className="text-gray-600 mb-4 flex-grow">No description available</p>
      )}

      <div className="mt-auto mb-4">
        {course.instructor ? (
          <div className="flex items-center text-gray-500 mb-2">
            <UserOutlined className="mr-1" />
            <span>{course.instructor}</span>
          </div>
        ) : null}

        {course.rating !== undefined ? (
          <div className="mb-1">
            <Rate disabled defaultValue={course.rating} allowHalf />
            <span className="ml-2 text-gray-500">{course.rating.toFixed(1)}</span>
          </div>
        ) : null}
      </div>
    </Card>
  );
};

export default CourseCard;