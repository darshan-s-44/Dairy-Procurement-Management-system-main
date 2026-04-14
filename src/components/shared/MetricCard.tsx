import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import GlassCard from './GlassCard';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor: string;
  isDarkMode?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor,
  isDarkMode = false
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return isDarkMode ? 'text-green-400' : 'text-green-600';
      case 'negative':
        return isDarkMode ? 'text-red-400' : 'text-red-600';
      default:
        return isDarkMode ? 'text-gray-400' : 'text-gray-500';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <GlassCard isDarkMode={isDarkMode} className="p-6 h-full">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
              {title}
            </p>
            <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
              {value}
            </p>
            {change && (
              <p className={`text-sm ${getChangeColor()}`}>
                {change}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-xl ${iconColor}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default MetricCard;