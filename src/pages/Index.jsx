import React from "react";
import { Layout, Button, Typography, Row, Col, Card, Avatar } from "antd";
import { NavLink } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const Index = () => {
  return (
    <Layout className="min-h-screen">
      <Header>
        {/* Replace with your Ant Design header */}
      </Header>
      <Content>
        {/* Hero Section */}
        <div className="hero-section">
          {/* Add your Hero content here */}
        </div>

        {/* Features Section */}
        <div className="features-section">
          {/* Add your Features content here */}
        </div>

        {/* Testimonials Section */}
        <section className="py-20 bg-secondary/50">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
            <Title level={2}>Transforming Lives</Title>
            <Text className="text-lg text-muted-foreground">
              Hear from our community about how Unlock to Thrive has helped them achieve their goals.
            </Text>
          </div>

          <Row gutter={[16, 16]}>
            {[
              {
                quote: "The mentorship program connected me with an expert in my field who helped me navigate my career journey with confidence.",
                name: "Sarah Johnson",
                role: "Software Developer"
              },
              {
                quote: "I discovered a scholarship opportunity that made my education possible. The application guidance from Unlock to Thrive was invaluable.",
                name: "Emily Chen",
                role: "Medical Student"
              },
              {
                quote: "The skills development resources helped me gain the technical knowledge I needed to compete in today's job market.",
                name: "Maya Rodriguez",
                role: "Data Analyst"
              }
            ].map((testimonial, index) => (
              <Col xs={24} md={8} key={index}>
                <Card className="testimonial-card">
                  <svg className="h-8 w-8 text-accent/70 mb-4" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M14.1,7.4v8c0,2.7-2.2,4.9-4.9,4.9s-4.9-2.2-4.9-4.9s2.2-4.9,4.9-4.9c0.4,0,0.8,0,1.1,0.1V7.4c-0.4,0-0.7-0.1-1.1-0.1 C4.6,7.4,0.8,11.2,0.8,15.9s3.8,8.4,8.4,8.4s8.4-3.8,8.4-8.4V7.4H14.1z M31.7,7.4v8c0,2.7-2.2,4.9-4.9,4.9s-4.9-2.2-4.9-4.9s2.2-4.9,4.9-4.9 c0.4,0,0.8,0,1.1,0.1V7.4c-0.4,0-0.7-0.1-1.1-0.1c-4.7,0-8.4,3.8-8.4,8.4s3.8,8.4,8.4,8.4s8.4-3.8,8.4-8.4V7.4H31.7z"/>
                  </svg>
                  <Text className="testimonial-quote">{testimonial.quote}</Text>
                  <div className="testimonial-author">
                    <Avatar className="testimonial-avatar">{testimonial.name.split(' ')[0][0]}{testimonial.name.split(' ')[1][0]}</Avatar>
                    <div>
                      <Text className="testimonial-name">{testimonial.name}</Text>
                      <Text className="testimonial-role">{testimonial.role}</Text>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(161,165,255,0.15),transparent_70%)]"></div>
          </div>

          <div className="relative z-10 text-center">
            <Card className="cta-card">
              <Title level={2}>Ready to Begin Your Journey?</Title>
              <Text className="cta-text">
                Join our community of learners, mentors, and changemakers. Unlock your potential and thrive in your future career.
              </Text>
              <div className="cta-buttons">
                <NavLink to="/auth?mode=register">
                  <Button type="primary" size="large" className="cta-btn">Create an Account</Button>
                </NavLink>
                <NavLink to="/careers">
                  <Button size="large" className="cta-btn-outline">Explore Careers</Button>
                </NavLink>
              </div>
            </Card>
          </div>
        </section>
      </Content>
      <Footer>
        {/* Add Footer content here */}
      </Footer>
    </Layout>
  );
};

export default Index;
