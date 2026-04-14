import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, User, Lock, LogIn, Eye, EyeOff, Moon, Sun } from 'lucide-react';
import GlassCard from '../shared/GlassCard';
import { authService, LoginCredentials, UserRole } from '../../lib/authService';

interface LoginPageProps {
  onLogin: (role: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, isDarkMode, toggleDarkMode }) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
    role: 'administrator'
  });
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    full_name: '',
    email: '',
    phone: '',
    address: '',
    village: '',
    company_name: '',
    license_number: '',
    shop_name: '',
    shop_address: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const user = await authService.login(credentials);
      onLogin(user.role);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const user = await authService.register({
        ...registerData,
        role: credentials.role
      });
      onLogin(user.role);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof LoginCredentials, value: string | UserRole) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleRegisterInputChange = (field: string, value: string) => {
    setRegisterData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const demoCredentials = [
    { username: 'admin', password: 'admin123', role: 'administrator' as UserRole, label: 'Admin' },
  ];

  const fillDemoCredentials = (username: string, password: string, role: UserRole) => {
    setCredentials({ username, password, role });
    setError('');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-500 ${
      isDarkMode
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800'
        : 'bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50'
    }`}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-cyan-400/10 to-teal-400/10 animate-pulse"></div>

      <motion.button
        onClick={toggleDarkMode}
        className={`fixed top-6 right-6 p-3 rounded-full backdrop-blur-md border transition-all duration-300 z-50 ${
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            className="flex items-center justify-center space-x-3 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative">
              <Droplets className={`w-12 h-12 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                DairyFlow
              </h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Dairy Management System
              </p>
            </div>
          </motion.div>
        </div>

        <GlassCard isDarkMode={isDarkMode} className="p-8 mb-6">
          <div className="mb-6">
            <h2 className={`text-2xl font-bold text-center mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {showRegister ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {showRegister ? 'Register to get started' : 'Sign in to access your dashboard'}
            </p>
          </div>

          <form onSubmit={showRegister ? handleRegisterSubmit : handleSubmit} className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Select Role
              </label>
              <select
                value={credentials.role}
                onChange={(e) => handleInputChange('role', e.target.value as UserRole)}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                  isDarkMode
                    ? 'bg-white/5 border-white/10 text-white focus:bg-white/10 focus:border-white/20'
                    : 'bg-white/50 border-white/30 text-gray-900 focus:bg-white/70 focus:border-white/50'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              >
                <option value="administrator">Administrator</option>
                <option value="farmer">Farmer</option>
                <option value="distributor">Distributor</option>
                <option value="retailer">Retailer</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Username
              </label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  value={showRegister ? registerData.username : credentials.username}
                  onChange={(e) => showRegister ? handleRegisterInputChange('username', e.target.value) : handleInputChange('username', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:bg-white/10 focus:border-white/20'
                      : 'bg-white/50 border-white/30 text-gray-900 placeholder-gray-500 focus:bg-white/70 focus:border-white/50'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={showRegister ? registerData.password : credentials.password}
                  onChange={(e) => showRegister ? handleRegisterInputChange('password', e.target.value) : handleInputChange('password', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:bg-white/10 focus:border-white/20'
                      : 'bg-white/50 border-white/30 text-gray-900 placeholder-gray-500 focus:bg-white/70 focus:border-white/50'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {showRegister && (
              <>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={registerData.full_name}
                    onChange={(e) => handleRegisterInputChange('full_name', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                      isDarkMode
                        ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:bg-white/10 focus:border-white/20'
                        : 'bg-white/50 border-white/30 text-gray-900 placeholder-gray-500 focus:bg-white/70 focus:border-white/50'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {credentials.role === 'administrator' && (
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={registerData.email}
                      onChange={(e) => handleRegisterInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                        isDarkMode
                          ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:bg-white/10 focus:border-white/20'
                          : 'bg-white/50 border-white/30 text-gray-900 placeholder-gray-500 focus:bg-white/70 focus:border-white/50'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                )}

                {credentials.role === 'farmer' && (
                  <>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={registerData.phone}
                        onChange={(e) => handleRegisterInputChange('phone', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                          isDarkMode
                            ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:bg-white/10 focus:border-white/20'
                            : 'bg-white/50 border-white/30 text-gray-900 placeholder-gray-500 focus:bg-white/70 focus:border-white/50'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Enter your phone"
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Village
                      </label>
                      <input
                        type="text"
                        value={registerData.village}
                        onChange={(e) => handleRegisterInputChange('village', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                          isDarkMode
                            ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:bg-white/10 focus:border-white/20'
                            : 'bg-white/50 border-white/30 text-gray-900 placeholder-gray-500 focus:bg-white/70 focus:border-white/50'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Enter your village"
                      />
                    </div>
                  </>
                )}

                {credentials.role === 'distributor' && (
                  <>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Email
                      </label>
                      <input
                        type="email"
                        value={registerData.email}
                        onChange={(e) => handleRegisterInputChange('email', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                          isDarkMode
                            ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:bg-white/10 focus:border-white/20'
                            : 'bg-white/50 border-white/30 text-gray-900 placeholder-gray-500 focus:bg-white/70 focus:border-white/50'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={registerData.phone}
                        onChange={(e) => handleRegisterInputChange('phone', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                          isDarkMode
                            ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:bg-white/10 focus:border-white/20'
                            : 'bg-white/50 border-white/30 text-gray-900 placeholder-gray-500 focus:bg-white/70 focus:border-white/50'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Enter your phone"
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={registerData.company_name}
                        onChange={(e) => handleRegisterInputChange('company_name', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                          isDarkMode
                            ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:bg-white/10 focus:border-white/20'
                            : 'bg-white/50 border-white/30 text-gray-900 placeholder-gray-500 focus:bg-white/70 focus:border-white/50'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Enter company name"
                      />
                    </div>
                  </>
                )}

                {credentials.role === 'retailer' && (
                  <>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Email
                      </label>
                      <input
                        type="email"
                        value={registerData.email}
                        onChange={(e) => handleRegisterInputChange('email', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                          isDarkMode
                            ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:bg-white/10 focus:border-white/20'
                            : 'bg-white/50 border-white/30 text-gray-900 placeholder-gray-500 focus:bg-white/70 focus:border-white/50'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={registerData.phone}
                        onChange={(e) => handleRegisterInputChange('phone', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                          isDarkMode
                            ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:bg-white/10 focus:border-white/20'
                            : 'bg-white/50 border-white/30 text-gray-900 placeholder-gray-500 focus:bg-white/70 focus:border-white/50'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Enter your phone"
                        required
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Shop Name
                      </label>
                      <input
                        type="text"
                        value={registerData.shop_name}
                        onChange={(e) => handleRegisterInputChange('shop_name', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                          isDarkMode
                            ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:bg-white/10 focus:border-white/20'
                            : 'bg-white/50 border-white/30 text-gray-900 placeholder-gray-500 focus:bg-white/70 focus:border-white/50'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Enter shop name"
                      />
                    </div>
                  </>
                )}
              </>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-lg ${
                  isDarkMode ? 'bg-red-500/20 text-red-300' : 'bg-red-50 text-red-600'
                } text-sm`}
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                isDarkMode
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>{showRegister ? 'Create Account' : 'Sign In'}</span>
                </>
              )}
            </motion.button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setShowRegister(!showRegister);
                  setError('');
                }}
                className={`text-sm ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
              >
                {showRegister ? 'Already have an account? Sign in' : 'Need an account? Register'}
              </button>
            </div>
          </form>
        </GlassCard>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <GlassCard isDarkMode={isDarkMode} className="p-4">
            <h3 className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Demo Credentials
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {demoCredentials.map((cred) => (
                <button
                  key={cred.username}
                  onClick={() => fillDemoCredentials(cred.username, cred.password, cred.role)}
                  className={`p-2 rounded-lg text-xs transition-all duration-200 ${
                    isDarkMode
                      ? 'bg-white/5 hover:bg-white/10 text-gray-300'
                      : 'bg-white/30 hover:bg-white/50 text-gray-700'
                  }`}
                >
                  <div className="font-medium">{cred.label}</div>
                  <div className="opacity-75">{cred.username}</div>
                </button>
              ))}
            </div>
            <p className={`text-xs mt-2 opacity-75 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Click to auto-fill demo credentials
            </p>
          </GlassCard>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
