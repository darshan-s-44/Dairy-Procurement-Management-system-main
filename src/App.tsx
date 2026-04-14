import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/dashboards/AdminDashboard';
import FarmerDashboard from './components/dashboards/FarmerDashboard';
import DistributorDashboard from './components/dashboards/DistributorDashboard';
import RetailerDashboard from './components/dashboards/RetailerDashboard';
import CredentialsPage from './components/CredentialsPage';

export type UserRole = 'Administrator' | 'Farmer' | 'Distributor' | 'Retailer' | null;

function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setCurrentRole(role as UserRole);
  };

  const handleBackToLanding = () => {
    setCurrentRole(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Show credentials page if requested
  if (showCredentials) {
    return <CredentialsPage isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} onClose={() => setShowCredentials(false)} />;
  }

  // Show landing page if no role selected
  if (!currentRole) {
    return <LandingPage onRoleSelect={handleRoleSelect} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} onShowCredentials={() => setShowCredentials(true)} />;
  }

  const renderDashboard = () => {
    switch (currentRole) {
      case 'Administrator':
        return <AdminDashboard onLogout={handleBackToLanding} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />;
      case 'Farmer':
        return <FarmerDashboard onLogout={handleBackToLanding} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />;
      case 'Distributor':
        return <DistributorDashboard onLogout={handleBackToLanding} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />;
      case 'Retailer':
        return <RetailerDashboard onLogout={handleBackToLanding} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />;
      default:
        return <LandingPage onRoleSelect={handleRoleSelect} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900'
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className={`absolute inset-0 ${
        isDarkMode
          ? 'bg-gradient-to-r from-blue-900/10 via-slate-800/10 to-blue-900/10'
          : 'bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10'
      } animate-pulse`}></div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentRole || 'landing'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          {renderDashboard()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;