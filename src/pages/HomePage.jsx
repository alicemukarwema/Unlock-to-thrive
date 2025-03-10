import React from 'react';
import { Link } from 'react-router-dom';
import { BookOutlined, TeamOutlined, BulbOutlined, DollarOutlined } from '@ant-design/icons';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import CourseCard from '../components/CourseCard';
import MentorCard from '../components/MentorCard';
import TestimonialCard from '../components/TestimonialCard';
import image1 from "../assets/pexels-goumbik-574077.jpg";
import image2 from "../assets/business.jpg";
import image3 from "../assets/pexels-mikhail-nilov-6930542.jpg";
import image4 from "../assets/1733282555445.jpeg";
import image5 from "../assets/lisa.jpeg";

const HomePage = () => {
  
  const features = [
    {
      icon: <BookOutlined />,
      title: 'Skills Development',
      description: 'Access high-quality Career designed to build in-demand skills for today s workforce.'
    },
    {
      icon: <TeamOutlined />,
      title: 'Mentorship',
      description: 'Connect with experienced professionals who provide guidance and support on your journey.'
    },
    {
      icon: <BulbOutlined />,
      title: 'Career Guidance',
      description: 'Receive personalized career advice and discover opportunities aligned with your goals.'
    },
    {
      icon: <DollarOutlined />,
      title: 'Financial Aid',
      description: 'Discover the scholarships and fundings opportunities available to help you pursue your education.'
    }
  ];
  
  const featuredCareer = [
    {
      id: 1,
      title: 'Developer',
       category: 'Technology',
       image:image1
   
     
    
    },
    {
      id: 2,
      title: 'Digital marketer',
      category: 'Marketing',

      image:image2
     
      },
    {
      id: 3,
      title: 'Enterprenuer',
      category: 'Business',
      image:image3
    }
  ];
  
  const featuredMentors = [
    {
      id: 1,
      name: 'Dr. Maya Patel',
      title: 'Senior Software Engineer',
      company: 'Tech Innovations Inc.',
      expertise: ['Computer Science', 'AI', 'Career Development'],
      linkedIn: '#',
      image:image4
    },
    {
      id: 2,
      name: 'Lisa Thompson',
      title: 'Marketing Director',
      company: 'Global Brands Agency',
      expertise: ['Digital Marketing', 'Branding', 'Content Strategy'],
      linkedIn: '#',
      image:image5
    }
  ];
  
  const testimonials = [
    {
      id: 1,
      name: 'Sophia Martinez',
      role: 'Software Developer',
      rating: 5,
      content: 'The web development course and mentorship program completely changed my career trajectory. I was able to transition from retail to tech in just 6 months!'
    },
    {
      id: 2,
      name: 'Aisha Johnson',
      role: 'Digital Marketing Specialist',
      rating: 5,
      content: 'I would not have been able to pursue my education without the financial aid provided. Now I have a thriving career in marketing.'
    }
  ];
  
  return (
    <div>
      <Hero />
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How We Help You Thrive</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides everything you need to develop skills, connect with mentors, and explore careers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Career</h2>
              <p className="text-gray-600 max-w-2xl">
                Discover our most popular Career designed to help you build in-demand skills.
              </p>
            </div>
            <Link to="/career" className="text-purple-600 font-medium hover:underline">
              View All Career
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCareer.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Mentorship Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Mentors</h2>
              <p className="text-gray-600 max-w-2xl">
                Connect with experienced professionals who are ready to guide you on your journey.
              </p>
            </div>
            <Link to="/mentorship" className="text-purple-600 font-medium hover:underline">
              View All Mentors
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
            <div className="bg-purple-50 rounded-lg p-6 flex flex-col justify-center items-center text-center">
              <h3 className="text-xl font-semibold text-purple-700 mb-4">Become a Mentor</h3>
              <p className="text-gray-600 mb-6">
                Share your expertise and help empower the next generation of leaders.
              </p>
              <Link 
                to="/become-mentor" 
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Hear from alumin who have transformed their lives through our platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/success-stories" className="text-purple-600 font-medium hover:underline">
              Read More Success Stories
            </Link>
          </div>
        </div>
      </section> */}
      
      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-purple-100 max-w-2xl mx-auto mb-8">
            Join thousands of students who are building skills, connecting with mentors, and advancing their careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="px-8 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Register Now
            </Link>
            <Link 
              to="/about" 
              className="px-8 py-3 bg-transparent text-white border border-white rounded-lg font-medium hover:bg-purple-500 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;