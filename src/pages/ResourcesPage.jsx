import React, { useState } from 'react';
import { Tabs, Card, Input, Tag, List, Button } from 'antd';
import { SearchOutlined, DownloadOutlined, ReadOutlined, VideoCameraOutlined, LinkOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const ResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data
  const articles = [
    {
      id: 1,
      title: 'Building a Career in Tech: A Guide for Women',
      author: 'Sarah Johnson',
      date: 'February 15, 2025',
      category: 'Career Development',
      tags: ['Technology', 'Career Growth'],
      readTime: '8 min read'
    },
    {
      id: 2,
      title: 'Financial Planning for Career Transitions',
      author: 'Michelle Rodriguez',
      date: 'January 28, 2025',
      category: 'Finance',
      tags: ['Financial Planning', 'Career Change'],
      readTime: '12 min read'
    },
    {
      id: 3,
      title: 'Overcoming Imposter Syndrome in the Workplace',
      author: 'Dr. Emily Chen',
      date: 'March 5, 2025',
      category: 'Personal Development',
      tags: ['Confidence', 'Mental Health'],
      readTime: '10 min read'
    },
    {
      id: 4,
      title: 'Negotiating Your Salary: Tips for Women',
      author: 'Jessica Williams',
      date: 'February 22, 2025',
      category: 'Career Development',
      tags: ['Negotiation', 'Salary'],
      readTime: '7 min read'
    }
  ];

  const videos = [
    {
      id: 1,
      title: 'Introduction to Coding for Beginners',
      presenter: 'Maya Patel',
      date: 'March 1, 2025',
      category: 'Technology',
      duration: '45 min'
    },
    {
      id: 2,
      title: 'Leadership Skills Workshop',
      presenter: 'Dr. Lisa Thompson',
      date: 'February 18, 2025',
      category: 'Leadership',
      duration: '60 min'
    },
    {
      id: 3,
      title: 'Digital Marketing Strategies for 2025',
      presenter: 'Emma Davis',
      date: 'January 30, 2025',
      category: 'Marketing',
      duration: '50 min'
    }
  ];

  const downloads = [
    {
      id: 1,
      title: 'Resume Templates for Various Industries',
      type: 'PDF',
      size: '2.4 MB',
      category: 'Career Development'
    },
    {
      id: 2,
      title: 'Interview Preparation Workbook',
      type: 'PDF',
      size: '3.1 MB',
      category: 'Career Development'
    },
    {
      id: 3,
      title: 'Financial Aid Application Guide',
      type: 'PDF',
      size: '1.8 MB',
      category: 'Financial Aid'
    },
    {
      id: 4,
      title: 'Career Transition Planner',
      type: 'Excel',
      size: '1.2 MB',
      category: 'Career Development'
    }
  ];

  const links = [
    {
      id: 1,
      title: 'Women in Tech Conference 2025',
      url: 'https://example.com/womenintech',
      category: 'Events',
      description: 'Annual conference focused on supporting women in technology fields.'
    },
    {
      id: 2,
      title: 'Government Grants for Women Entrepreneurs',
      url: 'https://example.com/grants',
      category: 'Funding',
      description: 'Information about government grants available for women entrepreneurs.'
    },
    {
      id: 3,
      title: 'Women\'s Leadership Network',
      url: 'https://example.com/leadership-network',
      category: 'Networking',
      description: 'Online network connecting women leaders across various industries.'
    },
    {
      id: 4,
      title: 'Mentorship Program for Women in STEM',
      url: 'https://example.com/mentorship',
      category: 'Mentorship',
      description: 'Program pairing experienced professionals with women entering STEM fields.'
    }
  ];

  // Filter function for search
  const filterItems = (items, term) => {
    if (!term) return items;
    return items.filter(item => 
      item.title.toLowerCase().includes(term.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(term.toLowerCase())) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase())))
    );
  };

  // Render article list item
  const renderArticleItem = item => (
    <List.Item>
      <Card style={{ width: '100%' }}>
        <h3>{item.title}</h3>
        <p>By {item.author} | {item.date} | {item.readTime}</p>
        <div style={{ marginBottom: '10px' }}>
          <Tag color="purple">{item.category}</Tag>
          {item.tags.map(tag => (
            <Tag key={tag} color="cyan">{tag}</Tag>
          ))}
        </div>
        <Button type="primary" icon={<ReadOutlined />}>Read Article</Button>
      </Card>
    </List.Item>
  );

  // Render video list item
  const renderVideoItem = item => (
    <List.Item>
      <Card style={{ width: '100%' }}>
        <h3>{item.title}</h3>
        <p>Presented by {item.presenter} | {item.date} | {item.duration}</p>
        <div style={{ marginBottom: '10px' }}>
          <Tag color="purple">{item.category}</Tag>
        </div>
        <Button type="primary" icon={<VideoCameraOutlined />}>Watch Video</Button>
      </Card>
    </List.Item>
  );

  // Render download list item
  const renderDownloadItem = item => (
    <List.Item>
      <Card style={{ width: '100%' }}>
        <h3>{item.title}</h3>
        <p>{item.type} | {item.size}</p>
        <div style={{ marginBottom: '10px' }}>
          <Tag color="purple">{item.category}</Tag>
        </div>
        <Button type="primary" icon={<DownloadOutlined />}>Download</Button>
      </Card>
    </List.Item>
  );

  // Render link list item
  const renderLinkItem = item => (
    <List.Item>
      <Card style={{ width: '100%' }}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div style={{ marginBottom: '10px' }}>
          <Tag color="purple">{item.category}</Tag>
        </div>
        <Button type="primary" icon={<LinkOutlined />} href={item.url} target="_blank">Visit Website</Button>
      </Card>
    </List.Item>
  );

  return (
    <div className="resources-page">
      <div className="search-container" style={{ marginBottom: '20px' }}>
        <Input
          size="large"
          placeholder="Search resources..."
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ width: '100%', maxWidth: '500px' }}
        />
      </div>

      <Tabs defaultActiveKey="1">
        <TabPane tab={<span><ReadOutlined />Articles</span>} key="1">
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 4 }}
            dataSource={filterItems(articles, searchTerm)}
            renderItem={renderArticleItem}
            pagination={{ pageSize: 8 }}
          />
        </TabPane>
        
        <TabPane tab={<span><VideoCameraOutlined />Videos</span>} key="2">
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 4 }}
            dataSource={filterItems(videos, searchTerm)}
            renderItem={renderVideoItem}
            pagination={{ pageSize: 8 }}
          />
        </TabPane>
        
        <TabPane tab={<span><DownloadOutlined />Downloads</span>} key="3">
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 4 }}
            dataSource={filterItems(downloads, searchTerm)}
            renderItem={renderDownloadItem}
            pagination={{ pageSize: 8 }}
          />
        </TabPane>
        
        <TabPane tab={<span><LinkOutlined />Useful Links</span>} key="4">
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 4 }}
            dataSource={filterItems(links, searchTerm)}
            renderItem={renderLinkItem}
            pagination={{ pageSize: 8 }}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ResourcesPage;