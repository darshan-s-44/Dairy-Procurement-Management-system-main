import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Droplets, CreditCard, Truck, Factory, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import Navbar from '../shared/Navbar';
import MetricCard from '../shared/MetricCard';
import ChartCard from '../shared/ChartCard';
import DataTable from '../shared/DataTable';
import GlassCard from '../shared/GlassCard';
import { supabaseService, Farmer, MilkCollection, Payment, Shipment, ProcessingPlant } from '../../lib/supabaseService';

interface AdminDashboardProps {
  onLogout: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, isDarkMode, toggleDarkMode }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    farmers: Farmer[];
    collections: MilkCollection[];
    payments: Payment[];
    plants: ProcessingPlant[];
    shipments: Shipment[];
  }>({
    farmers: [],
    collections: [],
    payments: [],
    plants: [],
    shipments: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const dashboardData = await supabaseService.getAdminDashboardData();
      setData(dashboardData);
    } catch (error) {
      console.error('Error fetching admin dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const metrics = supabaseService.calculateMetrics(data);
  const collectionTrends = supabaseService.processDailyCollections(data.collections);
  const paymentStatus = supabaseService.processPaymentStatus(data.payments);
  const shipmentStatus = supabaseService.processShipmentStatus(data.shipments);
  const plantCapacity = supabaseService.processPlantCapacity(data.plants);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'farmers', label: 'Farmers', icon: Users },
    { id: 'collection', label: 'Collection', icon: Droplets },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'shipments', label: 'Shipments', icon: Truck }
  ];

  const farmerColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'phone', label: 'Phone', sortable: false },
    { key: 'village', label: 'Village', sortable: true },
    { key: 'registration_date', label: 'Registered', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  const collectionColumns = [
    { key: 'collection_date', label: 'Date', sortable: true },
    { key: 'total_quantity', label: 'Quantity (L)', sortable: true },
    { key: 'fat_percentage', label: 'Fat %', sortable: true },
    { key: 'snf_percentage', label: 'SNF %', sortable: true },
    { key: 'total_amount', label: 'Amount (₹)', sortable: true }
  ];

  const paymentColumns = [
    { key: 'payment_date', label: 'Date', sortable: true },
    { key: 'amount', label: 'Amount (₹)', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'payment_method', label: 'Method', sortable: true },
    { key: 'reference_number', label: 'Reference', sortable: false }
  ];

  const shipmentColumns = [
    { key: 'shipment_id', label: 'Shipment ID', sortable: true },
    { key: 'destination', label: 'Destination', sortable: true },
    { key: 'driver_name', label: 'Driver', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'total_quantity', label: 'Quantity (L)', sortable: true }
  ];

  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900'
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}>
        <Navbar title="Administrator Dashboard" onLogout={onLogout} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Loading dashboard data...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDarkMode
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900'
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <Navbar title="Administrator Dashboard" onLogout={onLogout} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-1 p-6">
        {/* Tab Navigation */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard isDarkMode={isDarkMode} className="p-2">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? isDarkMode
                        ? 'bg-blue-500/30 text-blue-300'
                        : 'bg-blue-100 text-blue-600'
                      : isDarkMode
                        ? 'text-gray-300 hover:bg-white/10'
                        : 'text-gray-600 hover:bg-black/5'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  title="Total Farmers"
                  value={metrics.totalFarmers}
                  change="+12% from last month"
                  changeType="positive"
                  icon={Users}
                  iconColor="bg-gradient-to-r from-blue-500 to-blue-600"
                  isDarkMode={isDarkMode}
                />
                <MetricCard
                  title="Daily Collection"
                  value={`${metrics.totalCollection}L`}
                  change="+8% from yesterday"
                  changeType="positive"
                  icon={Droplets}
                  iconColor="bg-gradient-to-r from-green-500 to-green-600"
                  isDarkMode={isDarkMode}
                />
                <MetricCard
                  title="Pending Payments"
                  value={metrics.pendingPayments}
                  change="-5% from last week"
                  changeType="positive"
                  icon={CreditCard}
                  iconColor="bg-gradient-to-r from-orange-500 to-orange-600"
                  isDarkMode={isDarkMode}
                />
                <MetricCard
                  title="Active Shipments"
                  value={metrics.activeShipments}
                  change="+3 new today"
                  changeType="positive"
                  icon={Truck}
                  iconColor="bg-gradient-to-r from-purple-500 to-purple-600"
                  isDarkMode={isDarkMode}
                />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard
                  title="Weekly Milk Collection Trends"
                  data={collectionTrends}
                  type="line"
                  dataKey="value"
                  color="#10B981"
                  isDarkMode={isDarkMode}
                />
                <ChartCard
                  title="Payment Status Distribution"
                  data={paymentStatus}
                  type="pie"
                  dataKey="value"
                  isDarkMode={isDarkMode}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard
                  title="Processing Plant Capacity"
                  data={plantCapacity}
                  type="bar"
                  dataKey="utilization"
                  color="#3B82F6"
                  isDarkMode={isDarkMode}
                />
                <ChartCard
                  title="Shipment Status Overview"
                  data={shipmentStatus}
                  type="pie"
                  dataKey="value"
                  isDarkMode={isDarkMode}
                />
              </div>
            </div>
          )}

          {activeTab === 'farmers' && (
            <DataTable
              title="Registered Farmers"
              columns={farmerColumns}
              data={data.farmers}
              isDarkMode={isDarkMode}
              onExport={() => supabaseService.exportToCSV(data.farmers, 'farmers')}
            />
          )}

          {activeTab === 'collection' && (
            <DataTable
              title="Milk Collection Records"
              columns={collectionColumns}
              data={data.collections}
              isDarkMode={isDarkMode}
              onExport={() => supabaseService.exportToCSV(data.collections, 'milk_collections')}
            />
          )}

          {activeTab === 'payments' && (
            <DataTable
              title="Payment Records"
              columns={paymentColumns}
              data={data.payments}
              isDarkMode={isDarkMode}
              onExport={() => supabaseService.exportToCSV(data.payments, 'payments')}
            />
          )}

          {activeTab === 'shipments' && (
            <DataTable
              title="Shipment Tracking"
              columns={shipmentColumns}
              data={data.shipments}
              isDarkMode={isDarkMode}
              onExport={() => supabaseService.exportToCSV(data.shipments, 'shipments')}
            />
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;