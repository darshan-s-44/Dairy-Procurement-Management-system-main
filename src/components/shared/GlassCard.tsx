import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isDarkMode?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  onClick,
  isDarkMode = false 
}) => {
  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-2xl backdrop-blur-md border transition-all duration-300
        ${isDarkMode 
          ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' 
          : 'bg-white/20 border-white/30 hover:bg-white/30 hover:border-white/40'
        }
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Glass effect overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${
        isDarkMode 
          ? 'from-white/5 to-transparent' 
          : 'from-white/40 to-transparent'
      }`} />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Subtle glow effect */}
      <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${
        onClick ? 'group-hover:opacity-100' : ''
      } bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10`} />
    </motion.div>
  );
};

export default GlassCard;