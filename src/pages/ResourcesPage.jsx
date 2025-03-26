import React, { useState } from 'react';
import { Tabs, Card, Input, Tag, List, Button, Typography, Row, Col, Modal } from 'antd';
import { 
  SearchOutlined, 
  DownloadOutlined, 
  ReadOutlined, 
  VideoCameraOutlined, 
  LinkOutlined,
  StarOutlined,
  TrophyOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const ResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  

  // Function to extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return videoId;
  };

  // Expanded Articles Data
  const articles = [
    {
        id: 1,
        title: 'The Importance of Effective Communication',
        author: 'Ashveen Sahni',
        category: 'Professional Development',
        tags: ['Communication', 'Teamwork', 'Soft Skills'],
        url: 'https://kapable.club/blog/communication-skills/importance-of-effective-communication/',
        readTime: '30 min',
        relevantSkills: ['Communication Skills', 'Soft Skills (ICT)']
    },
    {
        id: 2,
        title: 'Problem-Solving Strategies',
        author: 'Indeed Editorial Team',
        category: 'Professional Development',
        tags: ['Problem Solving', 'Coding', 'Debugging'],
        url: 'https://www.indeed.com/career-advice/career-development/problem-solving-strategies',
        readTime: '20 min',
        relevantSkills: ['Problem Solving', 'problem analysis']
    },
    {
        id: 3,
        title: 'Potential leadership',
        author: 'Indeed Editorial Team',
        category: 'Leadership skills',
        tags: ['Leadership', 'Team Management', 'Digital Transformation'],
        url: 'https://www.indeed.com/career-advice/career-development/potential-leaders',
        readTime: '40 min',
        relevantSkills: ['Leadership Skills', 'Communication Skills', 'Soft Skills']
    },
    {
        id: 4,
        title: 'English profiencey',
        author: 'International Language Centers',             
        category: 'Professional Development',
        tags: ['English', 'Communication', 'Career'],
        url: 'https://ilcentres.com/post/what-is-english-proficiency-and-why-is-it-important',
        readTime: '45 min',
        relevantSkills: ['Language Skills (English)', 'Communication Skills']
    },
    {
        id: 5,
        title: 'Why soft skills are important',
        author: 'Indeed Editorial Team',
        category: 'Professional Development',
        tags: ['Soft Skills', 'Communication', 'Teamwork'],
        url: 'https://www.indeed.com/career-advice/interviewing/why-are-soft-skills-important',
        readTime: '25 min',
        relevantSkills: ['Soft Skills (ICT)', 'Communication Skills']
    }
];

const videos = [
    {
        id: 1,
        title: 'Art of Effective Communication Techniques',
        presenter: 'Marcus Alexander Velazquez in TEDxWolcottSchool',
        category: 'Communication',
        url: 'https://www.youtube.com/watch?v=2Yw6dFQBklA',
        duration: '12.7 min',
        relevantSkills: ['Communication Skills', 'Proble Solving']
    },
    {
        id: 2,
        title: ' 15 Strategies to Improve Your Problem Solving Skills',
        presenter: 'Alux.com',
        category: 'Problem solving',
        url: 'https://www.youtube.com/watch?v=kRtdcBfvixE&t=233s',
        duration: '14.16 min',
        relevantSkills: ['Problem Solving', 'Critical thinking']
    },
    {
        id: 3,
        title: 'How to Inspire and Motivate Your self?',
        presenter: 'Tali Sharot | TEDxCambridge',
        category: 'Leadership skills',
        url: 'https://www.youtube.com/watch?v=xp0O2vi8DX4',
        duration: '16.48 min',
        relevantSkills: ['Leadership Skills', 'Communication Skills']
    },
    {
        id: 4,
        title: 'Hard and Soft Skills for Resumes',
        presenter: 'Indeed',
        category: 'Professional Development',
        url: 'https://www.youtube.com/watch?v=vOiNxyfCsaA',
        duration: '2.30 min',
        relevantSkills: ['Soft Skills (ICT)', 'Communication Skills']
    }
];

const downloads = [
    {
        id: 1,
        title: 'Project Management Communication Toolkit',
        type: 'PDF',
        category: 'Project Management',
        downloadUrl: 'https://www.projectmanager.com/guides/project-communication-plan',
        description: 'Templates and guides for effective project communication.',
        relevantSkills: ['Communication Skills', 'Leadership Skills']
    },
    {
        id: 2,
        title: 'Problem-Solving Techniques for Technical Roles',
        type: 'PDF',
        category: 'Critical thinking',
        downloadUrl: 'https://www.mindtools.com/pages/article/newTED_79.htm',
        description: 'A guide to various methods for solving complex technical problems.',
        relevantSkills: ['Problem Solving']
    },
    {
        id: 3,
        title: 'English for Professional Communication',
        type: 'PDF',
        category: 'Language',
        downloadUrl: 'https://www.nu.edu/blog/how-to-improve-communication-skills-in-english/',
        description: 'A toolkit for improving English communication in professional settings.',
        relevantSkills: ['Language Skills (English)', 'Communication Skills']
    }
];

const links = [
    {
        id: 1,
        title: 'Global Leadership Summit',
        url: 'https://globalleadership.org/',
        category: 'Conferences',
        description: 'A conference for developing leadership skills.',
        relevantSkills: ['Leadership Skills', 'Communication Skills']
    },
    {
        id: 2,
        title: 'Toastmasters International',
        url: 'https://www.toastmasters.org/',
        category: 'Networking',
        description: 'A platform for improving communication and leadership skills.',
        relevantSkills: ['Communication Skills', 'Leadership Skills', 'Soft Skills (ICT)']
    },
    {
        id: 3,
        title: 'Stack Overflow',
        url: 'https://stackoverflow.com/',
        category: 'Collaboration',
        description: 'A community for developers to collaborate and solve problems.',
        relevantSkills: ['Problem Solving', 'Communication Skills']
    }
];

  // Filter function
  const filterItems = (items, term) => {
    if (!term) return items;
    return items.filter(item => 
      item.title.toLowerCase().includes(term.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(term.toLowerCase())) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase())))
    );
  };

  // Shared styles
  const cardStyle = {
    width: '100%', 
    borderRadius: '12px', 
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    backgroundColor: 'white',
    border: '1px solid #8a4fff'
  };

  const coverStyle = (gradientColors) => ({
    height: '180px', 
    background: `linear-gradient(135deg, ${gradientColors[0]} 0%, ${gradientColors[1]} 100%)`, 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center' 
  });

  const iconStyle = {
    fontSize: '64px', 
    color: 'white' 
  };

  const buttonStyle = (backgroundColor) => ({
    backgroundColor: backgroundColor, 
    borderColor: backgroundColor,
    color: 'white'
  });
  const getYouTubeThumbnail = (url) => {
    const videoId = getYouTubeId(url);
    return videoId 
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : null;
  };
  
  // Function to extract YouTube video  ID from URL
  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  // Render function for different resource types
  const renderResourceItem = (item, type) => {
    const itemConfig = {
      'articles': {
        icon: <ReadOutlined style={iconStyle} />,
        gradient: ['#6a11cb', '#2575fc'],
        buttonColor: '#6a11cb',
        buttonText: 'Read Article',
        extraContent: (
          <>
            <Text type="secondary">By {item.author}</Text>
            <div style={{ marginTop: '10px' }}>
              <Tag color="purple">{item.category}</Tag>
              {item.tags?.map(tag => (
                <Tag key={tag} color="cyan">{tag}</Tag>
              ))}
            </div>
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <Tag icon={<StarOutlined />} color="gold">{item.difficulty}</Tag>
              <Text type="secondary">{item.readTime}</Text>
            </div>
          </>
        ),
        url: item.url
      },
      'videos': {
        icon: <VideoCameraOutlined style={iconStyle} />,
        gradient: ['#8a4fff', '#5f2ca5'],
        buttonColor: '#8a4fff',
        buttonText: 'Watch Video',
        extraContent: (
          <>
            <Text type="secondary">Presented by {item.presenter}</Text>
            <div style={{ marginTop: '10px' }}>
              <Tag color="purple">{item.category}</Tag>
            </div>
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Tag icon={<TrophyOutlined />} color="gold">{item.level}</Tag>
              <Text type="secondary">{item.duration}</Text>
            </div>
          </>
        ),
        url: item.url
      },
      'downloads': {
        icon: <DownloadOutlined style={iconStyle} />,
        gradient: ['#8a4fff', '#5f2ca5'],
        buttonColor: '#8a4fff',
        buttonText: 'Download',
        extraContent: (
          <>
            <Text type="secondary">{item.description}</Text>
            <div style={{ marginTop: '10px' }}>
              <Tag color="purple">{item.category}</Tag>
            </div>
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <Text type="secondary">{item.size}</Text>
            </div>
          </>
        ),
        url: item.downloadUrl
      },
      'links': {
        icon: <LinkOutlined style={iconStyle} />,
        gradient: ['#8a4fff', '#5f2ca5'],
        buttonColor: '#8a4fff',
        buttonText: 'Visit Link',
        extraContent: (
          <>
            <Text type="secondary">{item.description}</Text>
            <div style={{ marginTop: '10px' }}>
              <Tag color="purple">{item.category}</Tag>
            </div>
          </>
        ),
        url: item.url
      }
    };

    const config = itemConfig[type];

    // Special handling for videos to add preview button
    const handleVideoPreview = () => {
      const embedUrl = getYouTubeEmbedUrl(item.url);
      setSelectedVideo({
        title: item.title,
        embedUrl: embedUrl
      });
    };
    const coverContent = type === 'videos' ? (
      <div 
        style={{
          height: '180px', 
          backgroundImage: `url(${getYouTubeThumbnail(item.url)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <PlayCircleOutlined style={{ fontSize: '64px', color: 'white' }} />
        </div>
      </div>
    ) : (
      <div style={coverStyle(config.gradient)}>
        {config.icon}
      </div>
    );
    return (
      <List.Item>
      <Card 
        hoverable
        style={cardStyle}
        cover={coverContent}
      >
        <Card.Meta 
          title={
            <Title level={4} style={{ margin: 0, color: '#6a11cb' }}>
              {item.title}
            </Title>
          }
          description={config.extraContent}
        />
        <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
          {type === 'videos' && (
            <Button 
              type="default" 
              icon={<PlayCircleOutlined />}
              onClick={handleVideoPreview}
              style={{ flex: 1 }}
            >
              Preview
            </Button>
          )}
          <Button 
            type="primary" 
            block 
            href={config.url} 
            target="_blank"
            style={buttonStyle(config.buttonColor)}
          >
            {config.buttonText}
          </Button>
        </div>
      </Card>
    </List.Item>

    );
  };

  // Close video modal
  const handleCloseVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div 
      className="resources-page" 
      style={{ 
        padding: '20px', 
        background: '#f0f2f5', 
        minHeight: '100vh' 
      }}
    >
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <Input
            size="large"
            placeholder="Search resources..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', 
              borderRadius: '20px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              border: '1px solid #8a4fff'
            }}
          />
        </Col>
      </Row>

      <Tabs
        defaultActiveKey="1"
        centered
        size="large"
        tabBarStyle={{
          marginBottom: '20px',
          fontWeight: 'bold'
        }}
      >
        <TabPane tab="Articles" key="2">
          <List
            grid={{ 
              gutter: 16, 
              xs: 1, 
              sm: 2, 
              md: 2, 
              lg: 3, 
              xl: 4, 
              xxl: 4 
            }}
            dataSource={filterItems(articles, searchTerm)}
            renderItem={(item) => renderResourceItem(item, 'articles')}
            pagination={{
              pageSize: 8,
              showSizeChanger: false,
            }}
          />
        </TabPane>
        
        <TabPane tab="Videos" key="1">
          <List
            grid={{ 
              gutter: 16, 
              xs: 1, 
              sm: 2, 
              md: 2, 
              lg: 3, 
              xl: 4, 
              xxl: 4 
            }}
            dataSource={filterItems(videos, searchTerm)}
            renderItem={(item) => renderResourceItem(item, 'videos')}
            pagination={{
              pageSize: 8,
              showSizeChanger: false,
            }}
          />
        </TabPane>

        <TabPane tab="Downloads" key="3">
          <List
            grid={{ 
              gutter: 16, 
              xs: 1, 
              sm: 2, 
              md: 2, 
              lg: 3, 
              xl: 4, 
              xxl: 4 
            }}
            dataSource={filterItems(downloads, searchTerm)}
            renderItem={(item) => renderResourceItem(item, 'downloads')}
            pagination={{
              pageSize: 8,
              showSizeChanger: false,
            }}
          />
        </TabPane>

        <TabPane tab="Links" key="4">
          <List
            grid={{ 
              gutter: 16, 
              xs: 1, 
              sm: 2, 
              md: 2, 
              lg: 3, 
              xl: 4, 
              xxl: 4 
            }}
            dataSource={filterItems(links, searchTerm)}
            renderItem={(item) => renderResourceItem(item, 'links')}
            pagination={{
              pageSize: 8,
              showSizeChanger: false,
            }}
          />
        </TabPane>
      </Tabs>

      {/* Video Preview Modal */}
      <Modal
        title={selectedVideo?.title}
        visible={!!selectedVideo}
        onCancel={handleCloseVideoModal}
        footer={null}
        width={720}
      >
        {selectedVideo?.embedUrl && (
          <div 
            style={{ 
              position: 'relative', 
              paddingTop: '56.25%', // 16:9 aspect ratio
              height: 0 
            }}
          >
            <iframe
              src={selectedVideo.embedUrl}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={selectedVideo.title}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ResourcesPage;