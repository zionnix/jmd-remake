import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DisclaimerPopup from './components/DisclaimerPopup';
import Home from './pages/Home';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppointmentsProvider } from './context/AppointmentsContext';

// Composant pour protéger les routes admin
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="loading">Chargement...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  
  return children;
};

// Layout pour les pages publiques (avec header/footer)
const PublicLayout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

const AppContent = () => {
  return (
    <div className="app">
      <DisclaimerPopup />
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        
        {/* Routes admin */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppointmentsProvider>
        <Router>
          <AppContent />
        </Router>
      </AppointmentsProvider>
    </AuthProvider>
  );
};

export default App;
