import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, Clock, CheckCircle, AlertTriangle, TrendingUp, Route } from 'lucide-react';
import Navbar from '../shared/Navbar';
import MetricCard from '../shared/MetricCard';
import ChartCard from '../shared/ChartCard';
import DataTable from '../shared/DataTable';
import GlassCard from '../shared/GlassCard';
import { supabaseService, Shipment } from '../../lib/supabaseService';

interface DistributorDashboardProps {
  onLogout: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DistributorDashboard: React.FC<DistributorDashboardProps> = ({ onLogout, isDarkMode, toggleDarkMode }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    shipments: Shipment[];
  }>({
    shipments: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const dashboardData = await supabaseService.getDistributorDashboardData();
      setData(dashboardData);
    } catch (error) {
      console.error('Error fetching distributor dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate metrics
  const totalShipments = data.shipments.length;
  const inTransitShipments = data.shipments.filter(s => s.status === 'in_transit').length;
  const deliveredShipments = data.shipments.filter(s => s.status === 'delivered').length;
  const delayedShipments = data.shipments.filter(s => s.status === 'delayed').length;
  const totalQuantity = data.shipments.reduce((sum, s) => sum + s.total_quantity, 0);

  const shipmentStatusData = supabaseService.processShipmentStatus(data.shipments);
  
  // Process delivery performance data
  const deliveryPerformance = data.shipments
    .filter(s => s.status === 'delivered')
    .slice(-7)
    .map((shipment, index) => ({
      name: `Day ${index + 1}`,
      value: 1,
      efficiency: Math.random() * 20 + 80 // Mock efficiency percentage
    }));

  const shipmentColumns = [
    { key: 'shipment_id', label: 'Shipment ID', sortable: true },
    { key: 'destination', label: 'Destination', sortable: true },
    { key: 'driver_name', label: 'Driver', sortable: true },
    { key: 'vehicle_number', label: 'Vehicle', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'total_quantity', label: 'Quantity (L)', sortable: true }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in_transit': return <Truck className="w-4 h-4 text-blue-500" />;
      case 'delayed': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  // Mock route data
  const routes = [
    { name: 'Hyderabad Central', distance: '25 km', efficiency: 92, shipments: 8 },
    { name: 'Secunderabad Market', distance: '18 km', efficiency: 88, shipments: 6 },
    { name: 'Cyberabad Hub', distance: '32 km', efficiency: 85, shipments: 5 },
    { name: 'Medak District', distance: '45 km', efficiency: 78, shipments: 4 }
  ];

  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900'
          : 'bg-gradient-to-br from-orange-50 via-white to-yellow-50'
      }`}>
        <Navbar title="Distributor Dashboard" onLogout={onLogout} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Loading logistics data...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDarkMode
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900'
        : 'bg-gradient-to-br from-orange-50 via-white to-yellow-50'
    }`}>
      <Navbar title="Distributor Dashboard" onLogout={onLogout} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-1 p-6 space-y-8">
        {/* Metrics Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MetricCard
            title="Total Shipments"
            value={totalShipments}
            change="+8% from last week"
            changeType="positive"
            icon={Truck}
            iconColor="bg-gradient-to-r from-blue-500 to-blue-600"
            isDarkMode={isDarkMode}
          />
          <MetricCard
            title="In Transit"
            value={inTransitShipments}
            change="Active deliveries"
            changeType="neutral"
            icon={MapPin}
            iconColor="bg-gradient-to-r from-orange-500 to-orange-600"
            isDarkMode={isDarkMode}
          />
          <MetricCard
            title="Delivered Today"
            value={deliveredShipments}
            change="+12% efficiency"
            changeType="positive"
            icon={CheckCircle}
            iconColor="bg-gradient-to-r from-green-500 to-green-600"
            isDarkMode={isDarkMode}
          />
          <MetricCard
            title="Total Volume"
            value={`${Math.round(totalQuantity)}L`}
            change="This week"
            changeType="neutral"
            icon={TrendingUp}
            iconColor="bg-gradient-to-r from-purple-500 to-purple-600"
            isDarkMode={isDarkMode}
          />
        </motion.div>

        {/* Route Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <GlassCard isDarkMode={isDarkMode} className="p-6">
            <h3 className={`text-xl font-semibold mb-6 flex items-center space-x-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <Route className="w-5 h-5" />
              <span>Route Performance Summary</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {routes.map((route, index) => (
                <motion.div
                  key={route.name}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <GlassCard isDarkMode={isDarkMode} className="p-4 h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {route.name}
                        </h4>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {route.distance}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${
                          route.efficiency > 90 ? 'text-green-500' :
                          route.efficiency > 80 ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                          {route.efficiency}%
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Efficiency
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {route.shipments} shipments
                      </span>
                      <div className={`w-full max-w-20 bg-gray-200 rounded-full h-2 ml-3`}>
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${route.efficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Charts */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ChartCard
            title="Daily Delivery Performance"
            data={deliveryPerformance}
            type="line"
            dataKey="efficiency"
            color="#10B981"
            isDarkMode={isDarkMode}
          />
          <ChartCard
            title="Shipment Status Distribution"
            data={shipmentStatusData}
            type="pie"
            dataKey="value"
            isDarkMode={isDarkMode}
          />
        </motion.div>

        {/* Active Shipments Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <GlassCard isDarkMode={isDarkMode} className="p-6">
            <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Active Shipments
            </h3>
            <div className="space-y-4">
              {data.shipments.filter(s => s.status !== 'delivered').slice(0, 5).map((shipment) => (
                <motion.div
                  key={shipment.id}
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    isDarkMode 
                      ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                      : 'bg-white/50 border-white/30 hover:bg-white/70'
                  }`}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(shipment.status)}
                      <div>
                        <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {shipment.shipment_id}
                        </h4>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {shipment.destination} • {shipment.driver_name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {shipment.total_quantity}L
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {shipment.vehicle_number}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                        {shipment.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Shipment Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <DataTable
            title="All Shipments"
            columns={shipmentColumns}
            data={data.shipments}
            isDarkMode={isDarkMode}
            onExport={() => supabaseService.exportToCSV(data.shipments, 'shipments')}
          />
        </motion.div>
      </main>
    </div>
  );
};

export default DistributorDashboard;