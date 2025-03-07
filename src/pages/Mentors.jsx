import React, { useState } from "react";
import { Layout, Typography, Input, Button, Tag, Card, Avatar, Rate, Tabs, List, Badge, Space, Divider, Row, Col, Grid } from "antd";
import { SearchOutlined, FilterOutlined, BookOutlined, MessageOutlined, StarFilled, EnvironmentOutlined, ClockCircleOutlined, CalendarOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { useBreakpoint } = Grid;

// Sample mentors data
const MENTORS_DATA = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Software Engineering Lead",
    company: "Google",
    expertise: ["Computer Science", "AI", "Career Development"],
    image: "/placeholder.svg",
    experience: "12 years",
    bio: "Award-winning software engineering lead with expertise in AI and machine learning. Passionate about mentoring women in tech.",
    location: "San Francisco, CA",
    languages: ["English", "Spanish"],
    rating: 4.9,
    reviews: 42,
    availability: "Weekends, Evenings"
  },
  {
    id: 2,
    name: "Prof. Emily Chen",
    title: "Professor of Education",
    company: "Harvard University",
    expertise: ["Higher Education", "Research", "Grant Writing"],
    image: "/placeholder.svg",
    experience: "15 years",
    bio: "Professor of Education specializing in equality and inclusion. Experienced in mentoring students through academic challenges.",
    location: "Boston, MA",
    languages: ["English", "Mandarin"],
    rating: 4.8,
    reviews: 38,
    availability: "Weekdays"
  },
  {
    id: 3,
    name: "Maria Gonzalez",
    title: "Financial Advisor",
    company: "Morgan Stanley",
    expertise: ["Financial Planning", "Scholarships", "Investment"],
    image: "/placeholder.svg",
    experience: "8 years",
    bio: "Financial advisor who helps students navigate scholarship applications and financial planning for higher education.",
    location: "New York, NY",
    languages: ["English", "Spanish"],
    rating: 4.7,
    reviews: 29,
    availability: "Flexible"
  },
  {
    id: 4,
    name: "Dr. Amara Okafor",
    title: "Research Scientist",
    company: "National Science Foundation",
    expertise: ["STEM Education", "Research", "Grant Writing"],
    image: "/placeholder.svg",
    experience: "10 years",
    bio: "Research scientist focused on increasing diversity in STEM fields. Provides guidance on research opportunities and career paths.",
    location: "Atlanta, GA",
    languages: ["English", "French"],
    rating: 4.9,
    reviews: 35,
    availability: "Weekends"
  },
  {
    id: 5,
    name: "Jennifer Nguyen",
    title: "UX Design Director",
    company: "Adobe",
    expertise: ["UX/UI Design", "Creative Arts", "Portfolio Development"],
    image: "/placeholder.svg",
    experience: "14 years",
    bio: "Design director who mentors aspiring designers. Specializes in helping build impressive portfolios and navigate the creative industry.",
    location: "Seattle, WA",
    languages: ["English", "Vietnamese"],
    rating: 4.8,
    reviews: 41,
    availability: "Evenings"
  },
  {
    id: 6,
    name: "Sophia Rodriguez",
    title: "Data Scientist",
    company: "Microsoft",
    expertise: ["Data Analysis", "Machine Learning", "Python"],
    image: "/placeholder.svg",
    experience: "7 years",
    bio: "Data scientist helping students develop technical skills in data analysis and machine learning. Provides guidance on tech career paths.",
    location: "Austin, TX",
    languages: ["English", "Spanish"],
    rating: 4.6,
    reviews: 26,
    availability: "Weekends, Evenings"
  }
];

const expertiseOptions = ["All", "Computer Science", "STEM Education", "Financial Planning", "UX/UI Design", "Research", "Career Development", "Grant Writing"];

const Mentors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExpertise, setSelectedExpertise] = useState("All");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const screens = useBreakpoint();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMentors = MENTORS_DATA.filter(mentor => {
    const matchesSearch = 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesExpertise = 
      selectedExpertise === "All" || 
      mentor.expertise.some(exp => exp === selectedExpertise);
    
    return matchesSearch && matchesExpertise;
  });

  const NavbarComponent = () => (
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
        <div className="logo">
          <a href="/" style={{ fontSize: '18px', fontWeight: 'bold' }}>MentorMatch</a>
        </div>
        <div className="menu">
          <Space size={20}>
            <a href="/">Home</a>
            <a href="/mentors" style={{ color: '#1890ff' }}>Mentors</a>
            <a href="/how-it-works">How it Works</a>
            <Button type="primary">Sign In</Button>
          </Space>
        </div>
      </div>
    </Header>
  );

  const FooterComponent = () => (
    <Footer style={{ textAlign: 'center', background: '#f5f5f5' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 0' }}>
        <Text type="secondary">MentorMatch © {new Date().getFullYear()}</Text>
      </div>
    </Footer>
  );

  return (
    <Layout className="min-h-screen">
      <NavbarComponent />
      <Content style={{ paddingTop: 64, minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
          <div style={{ textAlign: 'center', maxWidth: '768px', margin: '0 auto 48px auto' }}>
            <Title level={2} style={{ marginBottom: '16px' }}>Find Your Perfect Mentor</Title>
            <Paragraph type="secondary" style={{ fontSize: '16px' }}>
              Connect with experienced professionals who can guide you on your educational and career journey.
            </Paragraph>
          </div>
          
          <div style={{ marginBottom: '32px' }}>
            <Input
              size="large"
              placeholder="Search mentors by name, title, or company..."
              prefix={<SearchOutlined />}
              onChange={handleSearch}
              style={{ marginBottom: '24px' }}
            />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', overflow: 'auto', paddingBottom: '8px', gap: '8px' }}>
                {expertiseOptions.map(expertise => (
                  <Tag
                    key={expertise}
                    color={selectedExpertise === expertise ? "blue" : "default"}
                    style={{ padding: '4px 12px', cursor: 'pointer', borderRadius: '16px' }}
                    onClick={() => setSelectedExpertise(expertise)}
                  >
                    {expertise}
                  </Tag>
                ))}
              </div>
              
              <Button icon={<FilterOutlined />} size="middle">
                More Filters
              </Button>
            </div>
          </div>

          <Row gutter={24}>
            <Col xs={24} lg={10} style={{ marginBottom: screens.lg ? 0 : 24 }}>
              {filteredMentors.length > 0 ? (
                <Space direction="vertical" size={16} style={{ width: '100%' }}>
                  {filteredMentors.map((mentor) => (
                    <Card
                      key={mentor.id}
                      style={{ 
                        cursor: 'pointer', 
                        borderColor: selectedMentor?.id === mentor.id ? '#1890ff' : '#f0f0f0',
                        transition: 'all 0.3s'
                      }}
                      bodyStyle={{ padding: '24px' }}
                      onClick={() => setSelectedMentor(mentor)}
                      hoverable
                    >
                      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                        <Avatar size={56} src={mentor.image}>
                          {mentor.name.charAt(0)}
                        </Avatar>
                        <div>
                          <Text strong style={{ fontSize: '16px', display: 'block' }}>{mentor.name}</Text>
                          <Text type="secondary" style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>
                            {mentor.title} at {mentor.company}
                          </Text>
                          <Space>
                            <Rate disabled defaultValue={mentor.rating} style={{ fontSize: '12px' }} />
                            <Text type="secondary" style={{ fontSize: '12px' }}>({mentor.reviews} reviews)</Text>
                          </Space>
                        </div>
                      </div>
                      
                      <Space style={{ marginBottom: '16px' }}>
                        {mentor.expertise.slice(0, 2).map((exp, index) => (
                          <Tag key={index}>{exp}</Tag>
                        ))}
                        {mentor.expertise.length > 2 && (
                          <Tag>+{mentor.expertise.length - 2} more</Tag>
                        )}
                      </Space>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <Space>
                          <ClockCircleOutlined style={{ color: '#8c8c8c' }} />
                          <Text type="secondary">{mentor.experience}</Text>
                        </Space>
                        <Space>
                          <EnvironmentOutlined style={{ color: '#8c8c8c' }} />
                          <Text type="secondary">{mentor.location}</Text>
                        </Space>
                      </div>
                    </Card>
                  ))}
                </Space>
              ) : (
                <Card style={{ textAlign: 'center', padding: '32px' }}>
                  <p>No mentors found matching your criteria.</p>
                  <Button 
                    type="link"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedExpertise("All");
                    }}
                  >
                    Reset filters
                  </Button>
                </Card>
              )}
            </Col>

            <Col xs={24} lg={14}>
              {selectedMentor ? (
                <Card style={{ position: screens.lg ? 'sticky' : 'static', top: 84 }}>
                  <div style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '24px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: screens.md ? 'row' : 'column', gap: '24px', marginBottom: '24px', alignItems: screens.md ? 'center' : 'flex-start' }}>
                      <Avatar size={80} src={selectedMentor.image} style={{ border: '2px solid #e6f7ff' }}>
                        {selectedMentor.name.charAt(0)}
                      </Avatar>
                      <div>
                        <Title level={3} style={{ marginBottom: '4px' }}>{selectedMentor.name}</Title>
                        <Text type="secondary" style={{ fontSize: '16px' }}>
                          {selectedMentor.title} at {selectedMentor.company}
                        </Text>
                        <div style={{ marginTop: '8px' }}>
                          <Space>
                            <Rate disabled defaultValue={selectedMentor.rating} style={{ fontSize: '14px' }} />
                            <Text type="secondary">({selectedMentor.reviews} reviews)</Text>
                          </Space>
                        </div>
                      </div>
                    </div>
                    
                    <Row gutter={[16, 16]}>
                      <Col xs={24} md={8}>
                        <Space>
                          <ClockCircleOutlined style={{ color: '#1890ff' }} />
                          <div>
                            <Text strong style={{ display: 'block' }}>Experience</Text>
                            <Text type="secondary">{selectedMentor.experience}</Text>
                          </div>
                        </Space>
                      </Col>
                      <Col xs={24} md={8}>
                        <Space>
                          <EnvironmentOutlined style={{ color: '#1890ff' }} />
                          <div>
                            <Text strong style={{ display: 'block' }}>Location</Text>
                            <Text type="secondary">{selectedMentor.location}</Text>
                          </div>
                        </Space>
                      </Col>
                      <Col xs={24} md={8}>
                        <Space>
                          <CalendarOutlined style={{ color: '#1890ff' }} />
                          <div>
                            <Text strong style={{ display: 'block' }}>Availability</Text>
                            <Text type="secondary">{selectedMentor.availability}</Text>
                          </div>
                        </Space>
                      </Col>
                    </Row>
                    
                    <div style={{ margin: '24px 0' }}>
                      <Space size={8}>
                        {selectedMentor.expertise.map((exp, index) => (
                          <Tag key={index} color="blue">{exp}</Tag>
                        ))}
                      </Space>
                    </div>
                    
                    <Paragraph type="secondary">
                      {selectedMentor.bio}
                    </Paragraph>
                  </div>
                  
                  <div>
                    <Tabs defaultActiveKey="about">
                      <TabPane tab="About" key="about">
                        <Space direction="vertical" size={24} style={{ width: '100%' }}>
                          <div>
                            <Title level={5}>Languages</Title>
                            <Space size={8}>
                              {selectedMentor.languages.map((language, index) => (
                                <Tag key={index}>{language}</Tag>
                              ))}
                            </Space>
                          </div>
                          
                          <div>
                            <Title level={5}>Mentorship Style</Title>
                            <Paragraph type="secondary">
                              I believe in a collaborative approach to mentorship, focusing on empowering mentees to discover solutions through guided exploration rather than direct instruction. My goal is to help you develop critical thinking skills while providing practical advice from my years of industry experience.
                            </Paragraph>
                          </div>
                          
                          <div>
                            <Title level={5}>How I Can Help</Title>
                            <ul style={{ color: 'rgba(0, 0, 0, 0.45)', paddingLeft: '20px' }}>
                              <li>Career guidance and professional development</li>
                              <li>Industry-specific skill development</li>
                              <li>Navigating educational opportunities</li>
                              <li>Building professional networks</li>
                              <li>Overcoming challenges in your field</li>
                            </ul>
                          </div>
                        </Space>
                      </TabPane>
                      
                      <TabPane tab="Schedule" key="schedule">
                        <Space direction="vertical" size={24} style={{ width: '100%' }}>
                          <div>
                            <Title level={5}>Available Times</Title>
                            <Row gutter={[12, 12]}>
                              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                                <Col span={8} key={index}>
                                  <Card size="small" style={{ textAlign: 'center' }}>
                                    <Text strong>{day}</Text>
                                    <div>
                                      <Text type="secondary" style={{ fontSize: '12px' }}>
                                        {(day === "Sat" || day === "Sun") ? 
                                          (selectedMentor.availability.includes("Weekends") ? "Available" : "Unavailable") : 
                                          (selectedMentor.availability.includes("Weekdays") ? "Available" : 
                                            selectedMentor.availability.includes("Evenings") ? "Evenings only" : 
                                            selectedMentor.availability === "Flexible" ? "Available" : "Unavailable")}
                                      </Text>
                                    </div>
                                  </Card>
                                </Col>
                              ))}
                            </Row>
                          </div>
                          
                          <div>
                            <Title level={5}>Session Options</Title>
                            <Space direction="vertical" size={12} style={{ width: '100%' }}>
                              <Card size="small">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                  <div>
                                    <Text strong>30-Minute Introduction</Text>
                                    <div>
                                      <Text type="secondary">Get to know each other and discuss goals</Text>
                                    </div>
                                  </div>
                                  <Badge count="Free" style={{ backgroundColor: '#f0f0f0', color: 'rgba(0, 0, 0, 0.65)' }} />
                                </div>
                                <Button type="primary" block>Book Session</Button>
                              </Card>
                              <Card size="small">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                  <div>
                                    <Text strong>1-Hour Mentorship Session</Text>
                                    <div>
                                      <Text type="secondary">In-depth guidance and advice</Text>
                                    </div>
                                  </div>
                                  <Badge count="40 points" style={{ backgroundColor: '#f0f0f0', color: 'rgba(0, 0, 0, 0.65)' }} />
                                </div>
                                <Button type="primary" block>Book Session</Button>
                              </Card>
                            </Space>
                          </div>
                        </Space>
                      </TabPane>
                      
                      <TabPane tab="Reviews" key="reviews">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                          <Title level={5}>Reviews ({selectedMentor.reviews})</Title>
                          <Space>
                            <Rate disabled defaultValue={selectedMentor.rating} style={{ fontSize: '16px' }} />
                            <Text type="secondary">/ 5</Text>
                          </Space>
                        </div>
                        
                        <List
                          itemLayout="vertical"
                          dataSource={[
                            {
                              name: "Jane D.",
                              date: "2 months ago",
                              rating: 5,
                              comment: "Amazing mentor! Dr. Johnson provided excellent guidance on my career transition into tech. Her advice was practical and actionable."
                            },
                            {
                              name: "Rebecca M.",
                              date: "4 months ago",
                              rating: 5,
                              comment: "Incredibly helpful sessions. I got specific feedback on my portfolio that helped me land my dream job."
                            },
                            {
                              name: "Maria L.",
                              date: "6 months ago",
                              rating: 4,
                              comment: "Very knowledgeable and supportive. Helped me navigate the challenges of graduate school applications."
                            }
                          ]}
                          renderItem={(review, index) => (
                            <List.Item key={index}>
                              <div style={{ borderBottom: index < 2 ? '1px solid #f0f0f0' : 'none', paddingBottom: index < 2 ? '16px' : 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                  <Text strong>{review.name}</Text>
                                  <Text type="secondary" style={{ fontSize: '12px' }}>{review.date}</Text>
                                </div>
                                <Rate disabled defaultValue={review.rating} style={{ fontSize: '12px', marginBottom: '8px' }} />
                                <Paragraph type="secondary">{review.comment}</Paragraph>
                              </div>
                            </List.Item>
                          )}
                        />
                      </TabPane>
                    </Tabs>
                    
                    <div style={{ display: 'flex', marginTop: '32px', gap: '12px' }}>
                      <Button icon={<BookOutlined />} style={{ flex: 1 }}>
                        Save Profile
                      </Button>
                      <Button type="primary" icon={<MessageOutlined />} style={{ flex: 1 }}>
                        Message
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px 32px', textAlign: 'center' }}>
                  <div>
                    <Avatar size={64} style={{ backgroundColor: '#e6f7ff', color: '#1890ff', marginBottom: '16px' }}>
                      <MessageOutlined style={{ fontSize: '32px' }} />
                    </Avatar>
                    <Title level={4}>Select a Mentor</Title>
                    <Paragraph type="secondary" style={{ maxWidth: '400px' }}>
                      Choose a mentor from the list to view their profile, availability, and booking options.
                    </Paragraph>
                  </div>
                </Card>
              )}
            </Col>
          </Row>
        </div>
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default Mentors;