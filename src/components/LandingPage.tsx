import React from 'react';
import { motion } from 'framer-motion';
import { Shield, User, Truck, Store, Moon, Sun, Droplets } from 'lucide-react';
import GlassCard from './shared/GlassCard';
import { UserRole } from '../App';

interface LandingPageProps {
  onRoleSelect: (role: UserRole) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onShowCredentials: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onRoleSelect, isDarkMode, toggleDarkMode, onShowCredentials }) => {
  const roles = [
    {
      id: 'Administrator' as UserRole,
      title: 'Administrator',
      description: 'Manage farmers, payments, and inventory.',
      icon: Shield,
      color: 'from-blue-500 to-indigo-600',
      hoverColor: 'hover:from-blue-600 hover:to-indigo-700'
    },
    {
      id: 'Farmer' as UserRole,
      title: 'Farmer',
      description: 'Track collections, quality, and payments.',
      icon: User,
      color: 'from-green-500 to-emerald-600',
      hoverColor: 'hover:from-green-600 hover:to-emerald-700'
    },
    {
      id: 'Distributor' as UserRole,
      title: 'Distributor',
      description: 'Plan routes and manage shipments.',
      icon: Truck,
      color: 'from-orange-500 to-red-600',
      hoverColor: 'hover:from-orange-600 hover:to-red-700'
    },
    {
      id: 'Retailer' as UserRole,
      title: 'Retailer',
      description: 'Place orders, track deliveries, view invoices.',
      icon: Store,
      color: 'from-purple-500 to-pink-600',
      hoverColor: 'hover:from-purple-600 hover:to-pink-700'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="relative z-20 p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <Droplets className={`w-10 h-10 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                DairyFlow
              </h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                v1.0 - 2025
              </p>
            </div>
          </motion.div>
          
          <motion.button
            onClick={toggleDarkMode}
            className={`p-3 rounded-full backdrop-blur-md border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
                : 'bg-white/30 border-white/40 text-gray-700 hover:bg-white/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <motion.div 
          className="text-center mb-16 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r ${
            isDarkMode 
              ? 'from-white via-blue-200 to-purple-200' 
              : 'from-gray-900 via-blue-800 to-purple-800'
          } bg-clip-text text-transparent`}>
            DairyFlow
          </h2>
          <p className={`text-xl md:text-2xl mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            From Farmers to Families
          </p>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Smarter Dairy Management & Supply Chain Solutions
          </p>
        </motion.div>

        {/* Role Selection Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <GlassCard
                className="h-full cursor-pointer group transition-all duration-300 hover:scale-105"
                onClick={() => onRoleSelect(role.id)}
                isDarkMode={isDarkMode}
              >
                <div className="p-8 text-center h-full flex flex-col justify-between">
                  <div>
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${role.color} ${role.hoverColor} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <role.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {role.title}
                    </h3>
                    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {role.description}
                    </p>
                  </div>
                  <div className={`mt-6 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-white/10 text-white group-hover:bg-white/20' 
                      : 'bg-black/5 text-gray-700 group-hover:bg-black/10'
                  }`}>
                    Access Dashboard
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* View Credentials Button */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button
            onClick={onShowCredentials}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-md ${
              isDarkMode
                ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                : 'bg-white/50 text-gray-800 border border-white/40 hover:bg-white/70'
            }`}
          >
            View Test Credentials
          </button>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className={`relative z-20 py-8 px-6 border-t ${
        isDarkMode ? 'border-white/10' : 'border-black/10'
      } backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex space-x-6">
            {['About', 'Contact', 'Help', 'Privacy Policy'].map((item) => (
              <button
                key={item}
                className={`text-sm transition-colors duration-200 ${
                  isDarkMode
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            DairyFlow v1.0 – 2025 | Dairy Procurement & Supply Chain Management
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;