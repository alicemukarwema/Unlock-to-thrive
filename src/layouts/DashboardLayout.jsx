import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import StudentSidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';

const StudentDashboardLayout = () => {
  // Check if user is authenticated and is a student
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.accountType === 'student';
  };

  // Redirect to login if not authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <StudentSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader userType="student" />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentDashboardLayout;