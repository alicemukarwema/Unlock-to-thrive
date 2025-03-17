import React, { useState, useEffect } from "react";
import { Card, Row, Col, Badge, Progress, Statistic, List, Avatar, Calendar, Tag, Button } from "antd";
import { UserOutlined, ClockCircleOutlined, TeamOutlined, TrophyOutlined, CalendarOutlined, MessageOutlined } from "@ant-design/icons";
import axios from "axios";

const MentorDashboardHome = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    statistics: {
      totalStudents: 0,
      sessionsCompleted: 0,
      upcomingSessions: 0,
      averageRating: 0,
    },
    upcomingSessions: [],
    recentMessages: [],
    studentProgress: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // Replace this with actual API call in production
        // const response = await axios.get("https://unlock-to-thrive-backend.onrender.com/api/mentor/dashboard", {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        // setDashboardData(response.data);

        // Mock data for testing
        setTimeout(() => {
          setDashboardData({
            statistics: {
              totalStudents: 14,
              sessionsCompleted: 56,
              upcomingSessions: 8,
              averageRating: 4.7,
            },
            upcomingSessions: [
              { id: 1, studentName: "Emma Thompson", avatar: null, date: "2025-03-16T14:00:00", topic: "Career Path Planning", duration: 60 },
              { id: 2, studentName: "James Wilson", avatar: null, date: "2025-03-17T10:30:00", topic: "Resume Review", duration: 45 },
              { id: 3, studentName: "Sophie Chen", avatar: null, date: "2025-03-18T16:00:00", topic: "Technical Interview Prep", duration: 90 },
            ],
            recentMessages: [
              { id: 1, sender: "David Kim", content: "Thanks for the feedback on my project!", time: "2 hours ago", unread: true },
              { id: 2, sender: "Aisha Patel", content: "Can we reschedule our session?", time: "5 hours ago", unread: true },
              { id: 3, sender: "Miguel Rodriguez", content: "I've completed the assignment", time: "Yesterday", unread: false }
            ],
            studentProgress: [
              { id: 1, name: "Alex Johnson", progress: 78, goal: "Full Stack Developer" },
              { id: 2, name: "Taylor Smith", progress: 45, goal: "Data Science" },
              { id: 3, name: "Jordan Lee", progress: 92, goal: "UX Design" },
              { id: 4, name: "Casey Brown", progress: 30, goal: "Cybersecurity" },
            ],
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Mentor Dashboard</h1>

      {/* Statistics Section */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={6}>
          <Card loading={loading}>
            <Statistic title="Total Students" value={dashboardData.statistics.totalStudents} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card loading={loading}>
            <Statistic title="Sessions Completed" value={dashboardData.statistics.sessionsCompleted} prefix={<ClockCircleOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card loading={loading}>
            <Statistic title="Upcoming Sessions" value={dashboardData.statistics.upcomingSessions} prefix={<CalendarOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card loading={loading}>
            <Statistic title="Average Rating" value={dashboardData.statistics.averageRating} prefix={<TrophyOutlined />} precision={1} suffix="/ 5.0" />
          </Card>
        </Col>
      </Row>

      {/* Main Content Section */}
      <Row gutter={[16, 16]}>
        <Col span={16}>
          {/* Upcoming Sessions */}
          <Card title="Upcoming Sessions" loading={loading}>
            <List
              dataSource={dashboardData.upcomingSessions}
              renderItem={(item) => (
                <List.Item actions={[<Button type="primary">Join</Button>, <Button>Reschedule</Button>]}>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.studentName}
                    description={
                      <>
                        <p>{formatDate(item.date)}</p>
                        <Tag color="blue">{item.topic}</Tag>
                        <Tag color="green">{item.duration} min</Tag>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* Student Progress */}
          <Card title="Student Progress" loading={loading} className="mt-6">
            <List
              dataSource={dashboardData.studentProgress}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.name}
                    description={
                      <>
                        <p>{item.goal}</p>
                        <Progress percent={item.progress} />
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Right Sidebar */}
        <Col span={8}>
          {/* Recent Messages */}
          <Card title="Recent Messages" loading={loading}>
            <List
              dataSource={dashboardData.recentMessages}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.sender}
                    description={<p>{item.content}</p>}
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* Quick Actions */}
          <Card title="Quick Actions" className="mt-6">
            <Button type="primary" block className="mb-2">
              Schedule Session
            </Button>
            <Button block className="mb-2">
              Send Message
            </Button>
            <Button block className="mb-2">
              Add Student
            </Button>
            <Button block>Upload Resource</Button>
          </Card>

          {/* Calendar */}
          <Card title="Calendar" className="mt-6">
            <Calendar fullscreen={false} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MentorDashboardHome;
