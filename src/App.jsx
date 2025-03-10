import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
// import AboutPage from './pages/AboutPage';
import CoursesPage from './pages/CoursesPage';
import MentorshipPage from './pages/MentorshipPage';
import ResourcesPage from './pages/ResourcesPage';
import FinancialAidPage from './pages/FinancialAidPage';
import LoginPage from './pages/loginpage.jsx';
import SignupPage from './pages/Signup.jsx';
// import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/about" element={<AboutPage />} /> */}
            <Route path="/career" element={<CoursesPage />} />
            <Route path="/mentorship" element={<MentorshipPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/financial-aid" element={<FinancialAidPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<SignupPage />} />
            {/* <Route path="/contact" element={<ContactPage />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;