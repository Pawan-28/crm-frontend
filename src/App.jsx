import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';
import Loader from './components/common/Loader';
import LandingPage from './components/public/LandingPage';


// Lazy load pages

const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const AdminDashboard = lazy(() => import('./pages/dashboard/AdminDashboard'));
const MemberDashboard = lazy(() => import('./pages/dashboard/MemberDashboard'));
const LeadList = lazy(() => import('./pages/leads/LeadList'));
const LeadDetails = lazy(() => import('./pages/leads/LeadDetails'));
const LeadCreate = lazy(() => import('./pages/leads/LeadCreate'));
const LeadEdit = lazy(() => import('./pages/leads/LeadEdit'));
const UserList = lazy(() => import('./pages/users/UserList'));
const UserCreate = lazy(() => import('./pages/users/UserCreate'));

// Role-based Dashboard Redirect
const DashboardRedirect = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <Loader />;
  }
  
  // Redirect based on role
  if (user?.role === 'admin') {
    return <AdminDashboard />;
  } else if (user?.role === 'member') {
    return <MemberDashboard />;
  }
  
  // Fallback - should not happen if user is authenticated
  return <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#10B981',
                },
              },
              error: {
                style: {
                  background: '#EF4444',
                },
              },
            }}
          />
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Public Routes - Everyone can access */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes - Authentication required */}
              <Route element={<PrivateRoute />}>
                {/* Dashboard - Role based */}
                <Route path="/dashboard" element={<DashboardRedirect />} />
                
                {/* Lead Routes - Both Admin & Member */}
                <Route path="/leads" element={<LeadList />} />
                <Route path="/leads/:id" element={<LeadDetails />} />
                
                {/* Admin Only Routes */}
                <Route element={<AdminRoute />}>
                  <Route path="/leads/create" element={<LeadCreate />} />
                  <Route path="/leads/:id/edit" element={<LeadEdit />} />
                  <Route path="/users" element={<UserList />} />
                  <Route path="/users/create" element={<UserCreate />} />
                </Route>
              </Route>
              
              {/* Fallback - Redirect to home */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;