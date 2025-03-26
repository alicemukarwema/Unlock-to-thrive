import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PublicLayout from './layouts/PublicLayout';
import StudentDashboardLayout from './layouts/StudentDashboardLayout';
import MentorDashboardLayout from './layouts/MentorDashboardLayout';

// Public pages
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import StudentDashboard from './pages/dashboard/mentor/Students';
import MentorshipPage from './pages/MentorshipPage';
import ResourcesPage from './pages/ResourcesPage';
import FinancialAidPage from './pages/FinancialAidPage';
import LoginPage from './pages/loginpage.jsx';
import SignupPage from './pages/Signup.jsx';
import RequestResetPassword from './pages/RequestReset.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

// Dashboard pages - Student
import StudentDashboardHome from './pages/dashboard/DashboardHome';
import StudentProfile from './pages/dashboard/Profile';

// Dashboard pages - Mentor
import MentorDashboardHome from './pages/dashboard/mentor/DashboardHome';
import MentorProfile from './pages/dashboard/mentor/Profile';
import Mentorcarrer from './pages/dashboard/mentor/CareerDashboard';
import CareerDetail from './pages/CareerDetail.jsx';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/career" element={<CoursesPage />} />
          <Route path="/career/:id" element={<CareerDetail />} />
          <Route path="/mentorship" element={<MentorshipPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/financial-aid" element={<FinancialAidPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/request-reset-password" element={<RequestResetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        {/* Student Dashboard Routes */}
        <Route path="/dashboard/student" element={<StudentDashboardLayout />}>
          <Route index element={<StudentDashboardHome />} />
          <Route path="profile" element={<StudentProfile />} />
        </Route>

        {/* Mentor Dashboard Routes */}
        <Route path="/dashboard/mentor" element={<MentorDashboardLayout />}>
          <Route index element={<MentorDashboardHome />} />
          <Route path="profile" element={<MentorProfile />} />
          <Route path="careers" element={<Mentorcarrer />} />
          <Route path="students" element={<StudentDashboard />} />
          
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
