import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Droplets, CreditCard, Award, AlertTriangle, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import Navbar from '../shared/Navbar';
import MetricCard from '../shared/MetricCard';
import ChartCard from '../shared/ChartCard';
import DataTable from '../shared/DataTable';
import GlassCard from '../shared/GlassCard';
import { supabaseService, MilkCollection, Payment, QualityTest } from '../../lib/supabaseService';

interface FarmerDashboardProps {
  onLogout: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const FarmerDashboard: React.FC<FarmerDashboardProps> = ({ onLogout, isDarkMode, toggleDarkMode }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    collections: MilkCollection[];
    payments: Payment[];
    qualityTests: QualityTest[];
  }>({
    collections: [],
    payments: [],
    qualityTests: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const dashboardData = await supabaseService.getFarmerDashboardData();
      setData(dashboardData);
    } catch (error) {
      console.error('Error fetching farmer dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate metrics
  const totalCollection = data.collections.reduce((sum, c) => sum + c.total_quantity, 0);
  const monthlyCollection = data.collections
    .filter(c => new Date(c.collection_date).getMonth() === new Date().getMonth())
    .reduce((sum, c) => sum + c.total_quantity, 0);
  const pendingPayments = data.payments.filter(p => p.status === 'pending').length;
  const totalEarnings = data.payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);
  const averageQuality = data.qualityTests.length > 0 
    ? data.qualityTests.reduce((sum, q) => sum + q.fat_percentage, 0) / data.qualityTests.length 
    : 0;

  const collectionTrends = supabaseService.processDailyCollections(data.collections);
  const qualityData = supabaseService.processQualityData(data.qualityTests);

  const paymentColumns = [
    { key: 'payment_date', label: 'Date', sortable: true },
    { key: 'amount', label: 'Amount (₹)', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'payment_method', label: 'Method', sortable: true },
    { key: 'reference_number', label: 'Reference', sortable: false }
  ];

  const collectionColumns = [
    { key: 'collection_date', label: 'Date', sortable: true },
    { key: 'morning_quantity', label: 'Morning (L)', sortable: true },
    { key: 'evening_quantity', label: 'Evening (L)', sortable: true },
    { key: 'total_quantity', label: 'Total (L)', sortable: true },
    { key: 'fat_percentage', label: 'Fat %', sortable: true },
    { key: 'total_amount', label: 'Amount (₹)', sortable: true }
  ];

  const qualityColumns = [
    { key: 'test_date', label: 'Date', sortable: true },
    { key: 'fat_percentage', label: 'Fat %', sortable: true },
    { key: 'snf_percentage', label: 'SNF %', sortable: true },
    { key: 'protein_percentage', label: 'Protein %', sortable: true },
    { key: 'grade', label: 'Grade', sortable: true },
    { key: 'passed', label: 'Status', sortable: true }
  ];

  // Alerts and notifications
  const alerts = [
    ...(pendingPayments > 0 ? [{
      type: 'warning' as const,
      message: `You have ${pendingPayments} pending payment${pendingPayments > 1 ? 's' : ''}`
    }] : []),
    ...(data.qualityTests.some(q => !q.passed) ? [{
      type: 'error' as const,
      message: 'Recent quality test failed. Please check milk quality.'
    }] : []),
    ...(averageQuality > 4.0 ? [{
      type: 'success' as const,
      message: 'Excellent milk quality! Keep up the good work.'
    }] : [])
  ];

  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900'
          : 'bg-gradient-to-br from-green-50 via-white to-blue-50'
      }`}>
        <Navbar title="Farmer Dashboard" onLogout={onLogout} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Loading your dashboard...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDarkMode
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900'
        : 'bg-gradient-to-br from-green-50 via-white to-blue-50'
    }`}>
      <Navbar title="Farmer Dashboard" onLogout={onLogout} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-1 p-6 space-y-8">
        {/* Alerts Section */}
        {alerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            {alerts.map((alert, index) => (
              <GlassCard key={index} isDarkMode={isDarkMode} className="p-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className={`w-5 h-5 ${
                    alert.type === 'error' ? 'text-red-500' :
                    alert.type === 'warning' ? 'text-yellow-500' :
                    'text-green-500'
                  }`} />
                  <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {alert.message}
                  </p>
                </div>
              </GlassCard>
            ))}
          </motion.div>
        )}

        {/* Metrics Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <MetricCard
            title="Total Collection"
            value={`${Math.round(totalCollection)}L`}
            change="+5% from last month"
            changeType="positive"
            icon={Droplets}
            iconColor="bg-gradient-to-r from-blue-500 to-blue-600"
            isDarkMode={isDarkMode}
          />
          <MetricCard
            title="Monthly Collection"
            value={`${Math.round(monthlyCollection)}L`}
            change="This month"
            changeType="neutral"
            icon={Calendar}
            iconColor="bg-gradient-to-r from-green-500 to-green-600"
            isDarkMode={isDarkMode}
          />
          <MetricCard
            title="Total Earnings"
            value={`₹${Math.round(totalEarnings)}`}
            change="+12% from last month"
            changeType="positive"
            icon={DollarSign}
            iconColor="bg-gradient-to-r from-purple-500 to-purple-600"
            isDarkMode={isDarkMode}
          />
          <MetricCard
            title="Average Quality"
            value={`${averageQuality.toFixed(1)}%`}
            change="Fat percentage"
            changeType={averageQuality > 4.0 ? "positive" : "neutral"}
            icon={Award}
            iconColor="bg-gradient-to-r from-orange-500 to-orange-600"
            isDarkMode={isDarkMode}
          />
        </motion.div>

        {/* Charts */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ChartCard
            title="Daily Milk Collection Trends"
            data={collectionTrends}
            type="area"
            dataKey="value"
            color="#10B981"
            isDarkMode={isDarkMode}
          />
          <ChartCard
            title="Quality Test Results"
            data={qualityData}
            type="bar"
            dataKey="fat"
            color="#3B82F6"
            isDarkMode={isDarkMode}
          />
        </motion.div>

        {/* Data Tables */}
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <DataTable
            title="Recent Milk Collections"
            columns={collectionColumns}
            data={data.collections.slice(0, 10)}
            isDarkMode={isDarkMode}
            onExport={() => supabaseService.exportToCSV(data.collections, 'my_collections')}
          />
          
          <DataTable
            title="Payment History"
            columns={paymentColumns}
            data={data.payments}
            isDarkMode={isDarkMode}
            onExport={() => supabaseService.exportToCSV(data.payments, 'my_payments')}
          />
          
          <DataTable
            title="Quality Test Reports"
            columns={qualityColumns}
            data={data.qualityTests}
            isDarkMode={isDarkMode}
            onExport={() => supabaseService.exportToCSV(data.qualityTests, 'quality_reports')}
          />
        </motion.div>
      </main>
    </div>
  );
};

export default FarmerDashboard;