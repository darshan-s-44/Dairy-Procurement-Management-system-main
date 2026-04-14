import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Copy, Check, Eye, EyeOff } from 'lucide-react';
import GlassCard from './shared/GlassCard';

interface CredentialsPageProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onClose: () => void;
}

interface Credential {
  role: string;
  username: string;
  password: string;
  full_name: string;
}

const CredentialsPage: React.FC<CredentialsPageProps> = ({ isDarkMode, toggleDarkMode, onClose }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState(false);

  const credentials: Credential[] = [
    { role: 'Administrator', username: 'admin', password: 'admin123', full_name: 'System Administrator' },
    { role: 'Administrator', username: 'priya_qual', password: 'qual123', full_name: 'Priya Desai' },
    { role: 'Administrator', username: 'ram_tech', password: 'tech123', full_name: 'Ram Prasad' },
    { role: 'Farmer', username: 'farmer_demo', password: 'farmer123', full_name: 'Rajesh Kumar' },
    { role: 'Farmer', username: 'lakshmi_f', password: 'farmer123', full_name: 'Lakshmi Devi' },
    { role: 'Farmer', username: 'venkat_f', password: 'farmer123', full_name: 'Venkat Rao' },
    { role: 'Distributor', username: 'dist_demo', password: 'dist123', full_name: 'Vikram Transport' },
    { role: 'Distributor', username: 'ravi_dist', password: 'dist123', full_name: 'Ravi Transport Services' },
    { role: 'Retailer', username: 'retail_demo', password: 'retail123', full_name: 'Priya Sharma' },
    { role: 'Retailer', username: 'mohan_retail', password: 'retail123', full_name: 'Mohan Das' }
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Administrator':
        return 'from-blue-500 to-blue-600';
      case 'Farmer':
        return 'from-green-500 to-green-600';
      case 'Distributor':
        return 'from-orange-500 to-orange-600';
      case 'Retailer':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Administrator':
        return isDarkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700';
      case 'Farmer':
        return isDarkMode ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700';
      case 'Distributor':
        return isDarkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-700';
      case 'Retailer':
        return isDarkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700';
      default:
        return isDarkMode ? 'bg-gray-500/20 text-gray-300' : 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Test Credentials
              </h1>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Demo login credentials for all user roles
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowPasswords(!showPasswords)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isDarkMode
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-black/10 text-gray-900 hover:bg-black/20'
                }`}
              >
                {showPasswords ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                <span>{showPasswords ? 'Hide' : 'Show'} Passwords</span>
              </button>
              <button
                onClick={onClose}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isDarkMode
                    ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                Back to Login
              </button>
            </div>
          </div>
        </motion.div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((cred, index) => (
            <motion.div
              key={`${cred.role}-${cred.username}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <GlassCard isDarkMode={isDarkMode} className="p-6 h-full">
                <div className="flex flex-col h-full">
                  {/* Role Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(cred.role)}`}>
                      {cred.role}
                    </span>
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getRoleColor(cred.role)} flex items-center justify-center`}>
                      <User className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Full Name */}
                  <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {cred.full_name}
                  </h3>

                  {/* Username */}
                  <div className="mb-3">
                    <label className={`text-xs font-medium mb-1 block ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Username
                    </label>
                    <div className={`flex items-center justify-between p-3 rounded-lg ${
                      isDarkMode ? 'bg-white/5' : 'bg-black/5'
                    }`}>
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <User className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`font-mono text-sm truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          {cred.username}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(cred.username, `user-${cred.username}`)}
                        className={`ml-2 p-1.5 rounded transition-colors ${
                          isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
                        }`}
                      >
                        {copiedId === `user-${cred.username}` ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className={`text-xs font-medium mb-1 block ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Password
                    </label>
                    <div className={`flex items-center justify-between p-3 rounded-lg ${
                      isDarkMode ? 'bg-white/5' : 'bg-black/5'
                    }`}>
                      <div className="flex items-center space-x-2 flex-1 min-w-0">
                        <Lock className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`font-mono text-sm truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                          {showPasswords ? cred.password : '••••••••'}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(cred.password, `pass-${cred.username}`)}
                        className={`ml-2 p-1.5 rounded transition-colors ${
                          isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'
                        }`}
                      >
                        {copiedId === `pass-${cred.username}` ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <GlassCard isDarkMode={isDarkMode} className="p-6">
            <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Quick Access Guide
            </h3>
            <div className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <p>• Click the copy icon to copy username or password to clipboard</p>
              <p>• Use "Show Passwords" toggle to reveal all passwords at once</p>
              <p>• All demo accounts use simple passwords for testing purposes</p>
              <p>• Each role has different dashboard features and permissions</p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default CredentialsPage;
