import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingCart, TrendingUp, Clock, Star, DollarSign } from 'lucide-react';
import Navbar from '../shared/Navbar';
import MetricCard from '../shared/MetricCard';
import ChartCard from '../shared/ChartCard';
import DataTable from '../shared/DataTable';
import GlassCard from '../shared/GlassCard';
import { supabaseService, Product, Order } from '../../lib/supabaseService';

interface RetailerDashboardProps {
  onLogout: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const RetailerDashboard: React.FC<RetailerDashboardProps> = ({ onLogout, isDarkMode, toggleDarkMode }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    products: Product[];
    orders: Order[];
  }>({
    products: [],
    orders: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const dashboardData = await supabaseService.getRetailerDashboardData();
      setData(dashboardData);
    } catch (error) {
      console.error('Error fetching retailer dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate metrics
  const totalProducts = data.products.length;
  const totalOrders = data.orders.length;
  const pendingOrders = data.orders.filter(o => o.status === 'pending').length;
  const deliveredOrders = data.orders.filter(o => o.status === 'delivered').length;
  const totalRevenue = data.orders
    .filter(o => o.status === 'delivered')
    .reduce((sum, o) => sum + o.total_amount, 0);

  const orderTrends = supabaseService.processOrderTrends(data.orders);
  const orderStatusData = [
    { name: 'Delivered', value: deliveredOrders },
    { name: 'Pending', value: pendingOrders },
    { name: 'Shipped', value: data.orders.filter(o => o.status === 'shipped').length },
    { name: 'Cancelled', value: data.orders.filter(o => o.status === 'cancelled').length }
  ];

  const productColumns = [
    { key: 'name', label: 'Product', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'price_per_unit', label: 'Price (₹)', sortable: true },
    { key: 'unit', label: 'Unit', sortable: false },
    { key: 'stock_quantity', label: 'Stock', sortable: true }
  ];

  const orderColumns = [
    { key: 'order_date', label: 'Date', sortable: true },
    { key: 'customer_name', label: 'Customer', sortable: true },
    { key: 'quantity', label: 'Quantity', sortable: true },
    { key: 'total_amount', label: 'Amount (₹)', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'milk': return '🥛';
      case 'curd': return '🥄';
      case 'ghee': return '🧈';
      case 'butter': return '🧈';
      case 'cheese': return '🧀';
      case 'paneer': return '🧀';
      default: return '📦';
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'text-red-500' };
    if (stock < 20) return { label: 'Low Stock', color: 'text-yellow-500' };
    return { label: 'In Stock', color: 'text-green-500' };
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900'
          : 'bg-gradient-to-br from-purple-50 via-white to-pink-50'
      }`}>
        <Navbar title="Retailer Dashboard" onLogout={onLogout} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Loading your store...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDarkMode
        ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900'
        : 'bg-gradient-to-br from-purple-50 via-white to-pink-50'
    }`}>
      <Navbar title="Retailer Dashboard" onLogout={onLogout} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-1 p-6 space-y-8">
        {/* Metrics Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <MetricCard
            title="Total Products"
            value={totalProducts}
            change="+2 new this week"
            changeType="positive"
            icon={Package}
            iconColor="bg-gradient-to-r from-blue-500 to-blue-600"
            isDarkMode={isDarkMode}
          />
          <MetricCard
            title="Total Orders"
            value={totalOrders}
            change="+15% from last month"
            changeType="positive"
            icon={ShoppingCart}
            iconColor="bg-gradient-to-r from-green-500 to-green-600"
            isDarkMode={isDarkMode}
          />
          <MetricCard
            title="Pending Orders"
            value={pendingOrders}
            change="Needs attention"
            changeType="neutral"
            icon={Clock}
            iconColor="bg-gradient-to-r from-orange-500 to-orange-600"
            isDarkMode={isDarkMode}
          />
          <MetricCard
            title="Total Revenue"
            value={`₹${Math.round(totalRevenue)}`}
            change="+22% from last month"
            changeType="positive"
            icon={DollarSign}
            iconColor="bg-gradient-to-r from-purple-500 to-purple-600"
            isDarkMode={isDarkMode}
          />
        </motion.div>

        {/* Product Catalog */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <GlassCard isDarkMode={isDarkMode} className="p-6">
            <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Product Catalog
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.products.map((product) => {
                const stockStatus = getStockStatus(product.stock_quantity);
                return (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <GlassCard isDarkMode={isDarkMode} className="p-4 h-full">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getCategoryIcon(product.category)}</span>
                          <div>
                            <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {product.name}
                            </h4>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              {product.category}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            ₹{product.price_per_unit}
                          </p>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            per {product.unit}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${stockStatus.color}`}>
                          {stockStatus.label}
                        </span>
                        <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {product.stock_quantity} {product.unit}s
                        </span>
                      </div>
                      <p className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {product.description}
                      </p>
                    </GlassCard>
                  </motion.div>
                );
              })}
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
            title="Order Trends"
            data={orderTrends}
            type="line"
            dataKey="value"
            color="#10B981"
            isDarkMode={isDarkMode}
          />
          <ChartCard
            title="Order Status Distribution"
            data={orderStatusData}
            type="pie"
            dataKey="value"
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
            title="Recent Orders"
            columns={orderColumns}
            data={data.orders}
            isDarkMode={isDarkMode}
            onExport={() => supabaseService.exportToCSV(data.orders, 'orders')}
          />
          
          <DataTable
            title="Product Inventory"
            columns={productColumns}
            data={data.products}
            isDarkMode={isDarkMode}
            onExport={() => supabaseService.exportToCSV(data.products, 'products')}
          />
        </motion.div>
      </main>
    </div>
  );
};

export default RetailerDashboard;