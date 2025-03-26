import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Row, Col, Typography, Tag, Rate, Button, Divider, Skeleton, 
  Card, Image, Breadcrumb, Space, message, Modal, Tabs, List, Avatar, Input
} from 'antd';
import { 
  ArrowLeftOutlined, UserOutlined, CalendarOutlined, 
  TagOutlined, BookOutlined, EditOutlined, DeleteOutlined,
  ExclamationCircleOutlined, TeamOutlined, ClockCircleOutlined,
  TrophyOutlined, CheckCircleOutlined, MessageOutlined, 
  LinkOutlined, PlayCircleOutlined, ReadOutlined, YoutubeOutlined
} from '@ant-design/icons';
import axios from 'axios';

const { Title, Paragraph, Text } = Typography;
const { confirm } = Modal;
const { TabPane } = Tabs;
const { TextArea } = Input;

const MentorshipDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPrograms, setRelatedPrograms] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [applyModalVisible, setApplyModalVisible] = useState(false);
  
  // Form state for application
  const [applicationForm, setApplicationForm] = useState({
    motivation: '',
    skills: '',
    resumeFile: null
  });

  // API base URL
  const API_BASE_URL = 'http://localhost:5000/api';
  
  // Fetch program details
  useEffect(() => {
    const fetchProgramDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/careers/${id}`);
        
        // Validate response data
        if (response.data && Object.keys(response.data).length > 0) {
          setProgram(response.data);
          
          // Fetch related programs
          if (response.data.category) {
            fetchRelatedPrograms(response.data.category);
          }
        } else {
          message.warning('No program details found');
          navigate('/careers');
        }
      } catch (error) {
        message.error('Failed to load program details: ' + (error.response?.data?.message || error.message));
        console.error(error);
        navigate('/careers');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProgramDetails();
    }
  }, [id, navigate]);

  // Fetch related programs
  const fetchRelatedPrograms = async (category) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/careers`, {
        params: {
          category,
          limit: 3
        }
      });
      
      // Filter out the current program
      const filteredPrograms = response.data.careers.filter(item => item._id !== id);
      setRelatedPrograms(filteredPrograms.slice(0, 3));
    } catch (error) {
      console.error('Failed to fetch related programs:', error);
      message.error('Could not load related programs');
    }
  };

  // Render key information sections
  const renderKeyInformation = () => {
    if (!program) return null;

    const keyInfo = [
      { 
        icon: <TeamOutlined />, 
        label: 'Mentees', 
        value: `${program.currentMentees || 0} / ${program.maxMentees || 5} spots filled` 
      },
      { 
        icon: <ClockCircleOutlined />, 
        label: 'Weekly Commitment', 
        value: program.weeklyCommitment || "2 hours" 
      },
      { 
        icon: <TrophyOutlined />, 
        label: 'Level', 
        value: program.level || "Not Specified"
      }
    ];

    return (
      <div className="grid grid-cols-3 gap-4 mb-6">
        {keyInfo.map((info, index) => (
          <div 
            key={index} 
            className="bg-gray-100 rounded-lg p-4 text-center hover:shadow-md transition-all"
          >
            <div className="text-2xl text-purple-600 mb-2">{info.icon}</div>
            <Text strong className="block mb-1">{info.label}</Text>
            <Text type="secondary">{info.value}</Text>
          </div>
        ))}
      </div>
    );
  };

  // Render skill requirements
  const renderSkillRequirements = () => {
    if (!program || !program.requiredSkills || program.requiredSkills.length === 0) {
      return (
        <Card title="Required Skills" className="mb-6">
          <Paragraph type="secondary">No specific skills requirements defined.</Paragraph>
        </Card>
      );
    }

    return (
      <Card title="Required Skills" className="mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          {program.requiredSkills.map((skill, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <Text strong className="text-xl">{skill.name || 'Unnamed Skill'}</Text>
                <Tag color="purple">{skill.proficiencyLevel || 'Not Specified'}</Tag>
              </div>
              <Paragraph type="secondary">{skill.description || 'No description available'}</Paragraph>
              {skill.learningResources && skill.learningResources.length > 0 && (
                <div className="mt-2">
                  <Text type="secondary">Learning Resources:</Text>
                  {skill.learningResources.map((resource, idx) => (
                    <Link 
                      key={idx} 
                      to={resource.url || '#'} 
                      target="_blank" 
                      className="block text-purple-600 hover:underline"
                    >
                      <PlayCircleOutlined className="mr-2" />
                      {resource.title || 'Untitled Resource'}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    );
  };

  // Render professional networks
  const renderProfessionalNetworks = () => {
    if (!program || !program.professionalNetworks || program.professionalNetworks.length === 0) {
      return (
        <Card title="Professional Networks" className="mb-6">
          <Paragraph type="secondary">No professional networks listed.</Paragraph>
        </Card>
      );
    }

    return (
      <Card title="Professional Networks" className="mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          {program.professionalNetworks.map((network, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <Text strong>{network.name || 'Unnamed Network'}</Text>
                <LinkOutlined className="text-purple-600" />
              </div>
              <Paragraph type="secondary">{network.description || 'No description available'}</Paragraph>
              <Link 
                to={network.url || '#'} 
                target="_blank" 
                className="text-purple-600 hover:underline"
              >
                Visit Network
              </Link>
            </div>
          ))}
        </div>
      </Card>
    );
  };

  // Render recommended resources
  const renderRecommendedResources = () => {
    if (!program || !program.recommendedResources || program.recommendedResources.length === 0) {
      return (
        <Card title="Recommended Resources" className="mb-6">
          <Paragraph type="secondary">No recommended resources available.</Paragraph>
        </Card>
      );
    }

    return (
      <Card title="Recommended Resources" className="mb-6">
        <List
          itemLayout="horizontal"
          dataSource={program.recommendedResources}
          renderItem={(resource, index) => (
            <List.Item
              actions={[
                <Button 
                  key="preview"
                  type="link" 
                  icon={<YoutubeOutlined />} 
                  onClick={() => handleResourcePreview(resource)}
                >
                  Preview
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar 
                    icon={<ReadOutlined />} 
                    className="bg-purple-500 text-white" 
                  />
                }
                title={
                  <div className="flex justify-between items-center">
                    <Link to={resource.url || '#'} target="_blank">
                      {resource.title || 'Untitled Resource'}
                    </Link>
                    <Tag color="green">{resource.type || 'Unknown'}</Tag>
                  </div>
                }
                description={
                  <div>
                    <Paragraph type="secondary">
                      {resource.description || 'No description available'}
                    </Paragraph>
                    <div className="flex space-x-2">
                      <Tag color="purple">{resource.difficulty || 'Not Specified'}</Tag>
                      <Tag color="orange">{resource.cost || 'Unknown'}</Tag>
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    );
  };

  // Mentor profile
  const renderMentorProfile = () => {
    if (!program) return null;

    return (
      <Card 
        title="Program Mentor" 
        className="mb-6"
        extra={<Rate disabled value={program.rating || 0} />}
      >
        <div className="text-center">
          <Image 
            width={150} 
            height={150} 
            src={program.imagePath || '/default-avatar.png'}
            fallback="/default-avatar.png"
            preview={false}
            className="mb-4 rounded-full object-cover mx-auto"
            alt={program.instructor || 'Mentor'}
          />
          <Title level={4} className="mb-2">
            {program.instructor || 'Unnamed Mentor'}
          </Title>
          <Text type="secondary">
            {program.mentorTitle || "Professional Mentor"}
          </Text>
          <Paragraph className="mt-4" type="secondary">
            {program.mentorBio || "An experienced mentor dedicated to helping professionals grow."}
          </Paragraph>
          
        </div>
      </Card>
    );
  };

  // Related programs
  const renderRelatedPrograms = () => {
    if (!relatedPrograms || relatedPrograms.length === 0) {
      return (
        <Card title="Related Programs" className="mb-6">
          <Paragraph type="secondary">No related programs found.</Paragraph>
        </Card>
      );
    }

    return (
      <Card title="Related Programs" className="mb-6">
        <List
          itemLayout="horizontal"
          dataSource={relatedPrograms}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<Link to={`/career/${item._id}`}>{item.title}</Link>}
                description={item.category}
              />
              <Rate disabled value={item.rating || 0} />
            </List.Item>
          )}
        />
      </Card>
    );
  };

  // Resource preview handler
  const handleResourcePreview = (resource) => {
    setSelectedResource(resource);
  };

  // YouTube Preview Modal
  const YouTubePreviewModal = () => {
    const extractYouTubeId = (url) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    };

    const videoId = selectedResource ? extractYouTubeId(selectedResource.url) : null;

    return (
      <Modal
        title={selectedResource?.title || 'Resource Preview'}
        visible={!!selectedResource}
        onCancel={() => setSelectedResource(null)}
        footer={[
          <Button 
            key="external" 
            type="primary" 
            icon={<YoutubeOutlined />}
            onClick={() => window.open(selectedResource.url, '_blank')}
          >
            Watch on YouTube
          </Button>,
          <Button key="close" onClick={() => setSelectedResource(null)}>
            Close
          </Button>
        ]}
        width={600}
      >
        {videoId ? (
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={selectedResource.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : (
          <Paragraph type="secondary">Unable to preview video</Paragraph>
        )}
        <div className="mt-4">
          <Text strong>Description: </Text>
          <Paragraph>{selectedResource?.description || 'No description available'}</Paragraph>
          <Space>
            <Tag color="purple">{selectedResource?.difficulty || 'Not Specified'}</Tag>
            <Tag color="orange">{selectedResource?.cost || 'Unknown'}</Tag>
          </Space>
        </div>
      </Modal>
    );
  };

  // Application Modal
  const ApplicationModal = () => {
    const handleSubmit = async () => {
      try {
        // Implement application submission logic
        await axios.post(`${API_BASE_URL}/applications`, {
          programId: id,
          ...applicationForm
        });
        message.success('Application submitted successfully!');
        setApplyModalVisible(false);
      } catch (error) {
        message.error('Failed to submit application');
        console.error(error);
      }
    };

    return (
      <Modal
        title="Apply to Mentorship Program"
        visible={applyModalVisible}
        onOk={handleSubmit}
        onCancel={() => setApplyModalVisible(false)}
        okText="Submit Application"
      >
        <div className="space-y-4">
          <div>
            <Text strong>Motivation</Text>
            <TextArea 
              rows={4} 
              placeholder="Why are you interested in this mentorship program?"
              value={applicationForm.motivation}
              onChange={(e) => setApplicationForm({
                ...applicationForm, 
                motivation: e.target.value
              })}
            />
          </div>
          <div>
            <Text strong>Relevant Skills</Text>
            <TextArea 
              rows={4} 
              placeholder="Describe your relevant skills and experience"
              value={applicationForm.skills}
              onChange={(e) => setApplicationForm({
                ...applicationForm, 
                skills: e.target.value
              })}
            />
          </div>
          <div>
            <Text strong>Resume/CV</Text>
            <Input 
              type="file" 
              onChange={(e) => setApplicationForm({
                ...applicationForm, 
                resumeFile: e.target.files[0]
              })}
            />
          </div>
        </div>
      </Modal>
    );
  };

  // Main render
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="container mx-auto py-8 px-4">
        {loading ? (
          <Skeleton active />
        ) : program ? (
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              {renderKeyInformation()}
              {renderSkillRequirements()}
              {renderProfessionalNetworks()}
              {renderRecommendedResources()}
            </Col>
            <Col xs={24} lg={8}>
              {renderMentorProfile()}
              {renderRelatedPrograms()}
            </Col>
          </Row>
        ) : (
          <div className="text-center">
            <Title level={3}>Program Not Found</Title>
            <Button onClick={() => navigate('/careers')}>
              Back to Programs
            </Button>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedResource && <YouTubePreviewModal />}
      {applyModalVisible && <ApplicationModal />}
    </div>
  );
};

export default MentorshipDetail;