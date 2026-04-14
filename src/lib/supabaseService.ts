import { supabase } from './supabase';

export interface Farmer {
  id: string;
  name: string;
  phone: string;
  address: string;
  village: string;
  registration_date: string;
  status: string;
}

export interface MilkCollection {
  id: string;
  farmer_id: string;
  collection_date: string;
  morning_quantity: number;
  evening_quantity: number;
  total_quantity: number;
  fat_percentage: number;
  snf_percentage: number;
  rate_per_liter: number;
  total_amount: number;
}

export interface Payment {
  id: string;
  farmer_id: string;
  payment_date: string;
  amount: number;
  status: string;
  payment_method: string;
  reference_number: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price_per_unit: number;
  unit: string;
  stock_quantity: number;
  description: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  order_date: string;
  status: string;
  delivery_address: string;
}

export interface Shipment {
  id: string;
  shipment_id: string;
  destination: string;
  driver_name: string;
  vehicle_number: string;
  departure_time: string;
  estimated_arrival: string;
  actual_arrival?: string;
  status: string;
  total_quantity: number;
}

export interface QualityTest {
  id: string;
  farmer_id: string;
  test_date: string;
  fat_percentage: number;
  snf_percentage: number;
  protein_percentage: number;
  lactose_percentage: number;
  ph_level: number;
  bacteria_count: number;
  grade: string;
  passed: boolean;
}

export interface ProcessingPlant {
  id: string;
  plant_name: string;
  location: string;
  daily_capacity: number;
  current_usage: number;
  utilization_percentage: number;
  operational_date: string;
}

class SupabaseService {
  // Admin Dashboard Data
  async getAdminDashboardData() {
    try {
      const [
        farmersResult,
        collectionsResult,
        paymentsResult,
        ordersResult
      ] = await Promise.all([
        supabase.from('farmers_auth').select('id, full_name, phone, village, created_at, status').order('created_at', { ascending: false }),
        supabase.from('milk_collections').select('*').order('collection_date', { ascending: false }).limit(100),
        supabase.from('payments').select('*').order('payment_date', { ascending: false }).limit(50),
        supabase.from('orders').select('*').order('order_date', { ascending: false }).limit(20)
      ]);

      if (farmersResult.error) throw farmersResult.error;
      if (collectionsResult.error) throw collectionsResult.error;
      if (paymentsResult.error) throw paymentsResult.error;
      if (ordersResult.error) throw ordersResult.error;

      return {
        farmers: (farmersResult.data || []).map((f: any) => ({
          id: f.id,
          name: f.full_name,
          phone: f.phone,
          village: f.village,
          registration_date: new Date(f.created_at).toLocaleDateString(),
          status: f.status
        })),
        collections: (collectionsResult.data || []).map((c: any) => ({
          id: c.id,
          farmer_id: c.farmer_id,
          collection_date: c.collection_date,
          morning_quantity: parseFloat(c.morning_quantity) || 0,
          evening_quantity: parseFloat(c.evening_quantity) || 0,
          total_quantity: parseFloat(c.total_quantity) || 0,
          fat_percentage: parseFloat(c.fat_percentage) || 0,
          snf_percentage: parseFloat(c.snf_percentage) || 0,
          rate_per_liter: parseFloat(c.price_per_liter) || 0,
          total_amount: parseFloat(c.total_amount) || 0
        })),
        payments: (paymentsResult.data || []).map((p: any) => ({
          id: p.id,
          farmer_id: p.user_id,
          payment_date: p.payment_date,
          amount: parseFloat(p.amount) || 0,
          status: p.status,
          payment_method: p.payment_method,
          reference_number: p.transaction_id
        })),
        plants: [],
        shipments: (ordersResult.data || []).map((o: any) => ({
          id: o.id,
          shipment_id: `SHP-${o.id.slice(0, 8).toUpperCase()}`,
          destination: 'Retail Store',
          driver_name: 'Assigned Driver',
          status: o.status === 'delivered' ? 'delivered' : o.status === 'shipped' ? 'in_transit' : 'pending',
          total_quantity: Math.round(parseFloat(o.total_amount) / 30)
        }))
      };
    } catch (error) {
      console.error('Error fetching admin dashboard data:', error);
      throw error;
    }
  }

  // Farmer Dashboard Data
  async getFarmerDashboardData(farmerId?: string) {
    try {
      const [
        collectionsResult,
        paymentsResult,
        qualityTestsResult
      ] = await Promise.all([
        supabase.from('milk_collections').select('*').order('collection_date', { ascending: false }).limit(30),
        supabase.from('payments').select('*').eq('user_type', 'farmer').order('payment_date', { ascending: false }).limit(10),
        supabase.from('quality_tests').select('*').order('test_date', { ascending: false }).limit(10)
      ]);

      if (collectionsResult.error) throw collectionsResult.error;
      if (paymentsResult.error) throw paymentsResult.error;
      if (qualityTestsResult.error) throw qualityTestsResult.error;

      return {
        collections: (collectionsResult.data || []).map((c: any) => ({
          id: c.id,
          farmer_id: c.farmer_id,
          collection_date: c.collection_date,
          morning_quantity: parseFloat(c.morning_quantity) || 0,
          evening_quantity: parseFloat(c.evening_quantity) || 0,
          total_quantity: parseFloat(c.total_quantity) || 0,
          fat_percentage: parseFloat(c.fat_percentage) || 0,
          snf_percentage: parseFloat(c.snf_percentage) || 0,
          rate_per_liter: parseFloat(c.price_per_liter) || 0,
          total_amount: parseFloat(c.total_amount) || 0
        })),
        payments: (paymentsResult.data || []).map((p: any) => ({
          id: p.id,
          farmer_id: p.user_id,
          payment_date: p.payment_date,
          amount: parseFloat(p.amount) || 0,
          status: p.status,
          payment_method: p.payment_method,
          reference_number: p.transaction_id
        })),
        qualityTests: (qualityTestsResult.data || []).map((q: any) => ({
          id: q.id,
          farmer_id: q.collection_id,
          test_date: q.test_date,
          fat_percentage: parseFloat(q.fat_content) || 0,
          snf_percentage: parseFloat(q.snf_content) || 0,
          protein_percentage: parseFloat(q.protein_content) || 0,
          lactose_percentage: parseFloat(q.lactose_content) || 0,
          ph_level: 6.7,
          bacteria_count: q.bacteria_count || 0,
          grade: q.result === 'pass' ? 'A' : q.result === 'warning' ? 'B' : 'C',
          passed: q.result === 'pass'
        }))
      };
    } catch (error) {
      console.error('Error fetching farmer dashboard data:', error);
      throw error;
    }
  }

  // Retailer Dashboard Data
  async getRetailerDashboardData() {
    try {
      const [
        productsResult,
        ordersResult
      ] = await Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('orders').select('*').order('order_date', { ascending: false }).limit(20)
      ]);

      if (productsResult.error) throw productsResult.error;
      if (ordersResult.error) throw ordersResult.error;

      return {
        products: (productsResult.data || []).map((p: any) => ({
          id: p.id,
          name: p.name,
          category: p.category,
          price_per_unit: p.price_per_unit,
          unit: p.unit,
          stock_quantity: p.stock_quantity,
          description: p.description
        })),
        orders: (ordersResult.data || []).map((o: any) => ({
          id: o.id,
          customer_name: 'Customer',
          customer_phone: '+91-9876543210',
          product_id: o.retailer_id,
          quantity: o.total_amount / 100,
          unit_price: 100,
          total_amount: o.total_amount,
          order_date: o.order_date,
          status: o.status,
          delivery_address: 'Delivery Address'
        }))
      };
    } catch (error) {
      console.error('Error fetching retailer dashboard data:', error);
      throw error;
    }
  }

  // Distributor Dashboard Data
  async getDistributorDashboardData() {
    try {
      const [
        ordersResult
      ] = await Promise.all([
        supabase.from('orders').select('*').order('order_date', { ascending: false }).limit(20)
      ]);

      if (ordersResult.error) throw ordersResult.error;

      return {
        shipments: (ordersResult.data || []).map((o: any) => ({
          id: o.id,
          shipment_id: `SHP-${o.id.slice(0, 8).toUpperCase()}`,
          destination: 'Retail Store',
          driver_name: 'Assigned Driver',
          vehicle_number: 'TS09AB1234',
          departure_time: o.order_date,
          estimated_arrival: o.delivery_date,
          actual_arrival: o.status === 'delivered' ? o.delivery_date : null,
          status: o.status === 'delivered' ? 'delivered' : o.status === 'shipped' ? 'in_transit' : 'pending',
          total_quantity: Math.round(o.total_amount / 30)
        }))
      };
    } catch (error) {
      console.error('Error fetching distributor dashboard data:', error);
      throw error;
    }
  }

  // Utility functions for data processing
  processDailyCollections(collections: MilkCollection[]) {
    if (!collections || collections.length === 0) {
      // Return sample data if no collections
      return [
        { name: 'Mon', value: 450, date: '2025-10-01' },
        { name: 'Tue', value: 520, date: '2025-10-02' },
        { name: 'Wed', value: 480, date: '2025-10-03' },
        { name: 'Thu', value: 550, date: '2025-10-04' },
        { name: 'Fri', value: 510, date: '2025-10-05' },
        { name: 'Sat', value: 490, date: '2025-10-06' },
        { name: 'Sun', value: 470, date: '2025-10-07' }
      ];
    }

    const dailyData = collections.reduce((acc, collection) => {
      const date = collection.collection_date;
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += Number(collection.total_quantity) || 0;
      return acc;
    }, {} as Record<string, number>);

    const result = Object.entries(dailyData)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .slice(-7) // Last 7 days
      .map(([date, quantity]) => ({
        name: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        value: Math.round(quantity),
        date: date
      }));

    return result.length > 0 ? result : [
      { name: 'Mon', value: 450, date: '2025-10-01' },
      { name: 'Tue', value: 520, date: '2025-10-02' },
      { name: 'Wed', value: 480, date: '2025-10-03' },
      { name: 'Thu', value: 550, date: '2025-10-04' },
      { name: 'Fri', value: 510, date: '2025-10-05' },
      { name: 'Sat', value: 490, date: '2025-10-06' },
      { name: 'Sun', value: 470, date: '2025-10-07' }
    ];
  }

  processPaymentStatus(payments: Payment[]) {
    if (!payments || payments.length === 0) {
      return [
        { name: 'Completed', value: 35 },
        { name: 'Pending', value: 8 },
        { name: 'Failed', value: 2 }
      ];
    }

    const statusCount = payments.reduce((acc, payment) => {
      acc[payment.status] = (acc[payment.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const result = Object.entries(statusCount).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count
    }));

    return result.length > 0 ? result : [
      { name: 'Completed', value: 35 },
      { name: 'Pending', value: 8 },
      { name: 'Failed', value: 2 }
    ];
  }

  processOrderTrends(orders: Order[]) {
    if (!orders || orders.length === 0) {
      return [
        { name: 'Sep', value: 12 },
        { name: 'Oct', value: 18 },
        { name: 'Nov', value: 15 },
        { name: 'Dec', value: 22 }
      ];
    }

    const monthlyData = orders.reduce((acc, order) => {
      const month = new Date(order.order_date).toLocaleDateString('en-US', { month: 'short' });
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month] += 1;
      return acc;
    }, {} as Record<string, number>);

    const result = Object.entries(monthlyData).map(([month, count]) => ({
      name: month,
      value: count
    }));

    return result.length > 0 ? result : [
      { name: 'Sep', value: 12 },
      { name: 'Oct', value: 18 },
      { name: 'Nov', value: 15 },
      { name: 'Dec', value: 22 }
    ];
  }

  processShipmentStatus(shipments: Shipment[]) {
    if (!shipments || shipments.length === 0) {
      return [
        { name: 'Delivered', value: 18 },
        { name: 'In transit', value: 12 },
        { name: 'Pending', value: 5 }
      ];
    }

    const statusCount = shipments.reduce((acc, shipment) => {
      acc[shipment.status] = (acc[shipment.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const result = Object.entries(statusCount).map(([status, count]) => ({
      name: status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1),
      value: count
    }));

    return result.length > 0 ? result : [
      { name: 'Delivered', value: 18 },
      { name: 'In transit', value: 12 },
      { name: 'Pending', value: 5 }
    ];
  }

  processQualityData(qualityTests: QualityTest[]) {
    if (!qualityTests || qualityTests.length === 0) {
      return [
        { name: 'Test 1', fat: 4.5, snf: 8.5, protein: 3.2, lactose: 4.8 },
        { name: 'Test 2', fat: 4.8, snf: 8.7, protein: 3.4, lactose: 4.9 },
        { name: 'Test 3', fat: 4.6, snf: 8.6, protein: 3.3, lactose: 4.7 },
        { name: 'Test 4', fat: 4.9, snf: 8.8, protein: 3.5, lactose: 5.0 },
        { name: 'Test 5', fat: 4.7, snf: 8.5, protein: 3.3, lactose: 4.8 },
        { name: 'Test 6', fat: 5.0, snf: 8.9, protein: 3.6, lactose: 5.1 },
        { name: 'Test 7', fat: 4.8, snf: 8.7, protein: 3.4, lactose: 4.9 }
      ];
    }

    const result = qualityTests.slice(0, 7).map((test, index) => ({
      name: `Test ${index + 1}`,
      fat: Number(test.fat_percentage) || 0,
      snf: Number(test.snf_percentage) || 0,
      protein: Number(test.protein_percentage) || 0,
      lactose: Number(test.lactose_percentage) || 0
    }));

    return result.length > 0 ? result : [
      { name: 'Test 1', fat: 4.5, snf: 8.5, protein: 3.2, lactose: 4.8 },
      { name: 'Test 2', fat: 4.8, snf: 8.7, protein: 3.4, lactose: 4.9 },
      { name: 'Test 3', fat: 4.6, snf: 8.6, protein: 3.3, lactose: 4.7 },
      { name: 'Test 4', fat: 4.9, snf: 8.8, protein: 3.5, lactose: 5.0 },
      { name: 'Test 5', fat: 4.7, snf: 8.5, protein: 3.3, lactose: 4.8 },
      { name: 'Test 6', fat: 5.0, snf: 8.9, protein: 3.6, lactose: 5.1 },
      { name: 'Test 7', fat: 4.8, snf: 8.7, protein: 3.4, lactose: 4.9 }
    ];
  }

  processPlantCapacity(plants: ProcessingPlant[]) {
    if (!plants || plants.length === 0) {
      return [
        { name: 'Plant A', capacity: 10000, usage: 8500, utilization: 85 },
        { name: 'Plant B', capacity: 8000, usage: 7200, utilization: 90 },
        { name: 'Plant C', capacity: 12000, usage: 9600, utilization: 80 },
        { name: 'Plant D', capacity: 6000, usage: 5100, utilization: 85 }
      ];
    }

    const result = plants.map(plant => ({
      name: plant.plant_name.split(' ')[0], // Short name
      capacity: Number(plant.daily_capacity) || 0,
      usage: Number(plant.current_usage) || 0,
      utilization: Number(plant.utilization_percentage) || 0
    }));

    return result.length > 0 ? result : [
      { name: 'Plant A', capacity: 10000, usage: 8500, utilization: 85 },
      { name: 'Plant B', capacity: 8000, usage: 7200, utilization: 90 },
      { name: 'Plant C', capacity: 12000, usage: 9600, utilization: 80 },
      { name: 'Plant D', capacity: 6000, usage: 5100, utilization: 85 }
    ];
  }

  // Export functions
  exportToCSV(data: any[], filename: string) {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Calculate metrics
  calculateMetrics(data: any) {
    const totalFarmers = data.farmers?.length || 0;
    const totalCollection = data.collections?.reduce((sum: number, c: MilkCollection) => sum + c.total_quantity, 0) || 0;
    const pendingPayments = data.payments?.filter((p: Payment) => p.status === 'pending').length || 0;
    const activeShipments = data.shipments?.filter((s: Shipment) => s.status === 'in_transit').length || 0;
    
    return {
      totalFarmers,
      totalCollection: Math.round(totalCollection),
      pendingPayments,
      activeShipments
    };
  }
}

export const supabaseService = new SupabaseService();