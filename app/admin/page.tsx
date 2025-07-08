'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StatsCard from '@/components/ui/stats-card';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  TrendingUp,
  Eye
} from 'lucide-react';
import { analyticsData, orders } from '@/lib/data';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   Cell
// } from 'recharts';

const AdminDashboard = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const recentOrders = orders.slice(0, 5);
  
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Sales"
          value={formatCurrency(analyticsData.totalSales)}
          change="+12.5% from last month"
          changeType="positive"
          icon={DollarSign}
          iconColor="text-green-600"
        />
        <StatsCard
          title="Total Orders"
          value={analyticsData.totalOrders.toLocaleString()}
          change="+8.2% from last month"
          changeType="positive"
          icon={ShoppingCart}
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Active Users"
          value={analyticsData.activeUsers.toLocaleString()}
          change="+15.3% from last month"
          changeType="positive"
          icon={Users}
          iconColor="text-purple-600"
        />
        <StatsCard
          title="Inventory Count"
          value={analyticsData.inventoryCount.toLocaleString()}
          change="-2.1% from last month"
          changeType="negative"
          icon={Package}
          iconColor="text-orange-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          {/* <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent> */}
        </Card>

        {/* Sales by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.salesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="sales"
                >
                  {analyticsData.salesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer> */}
          </CardContent>
        </Card>
      </div>

      {/* Top Products and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.topProducts} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="sales" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer> */}
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Orders
              <Badge variant="secondary">{orders.length} total</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{order.id}</p>
                      <Badge 
                        variant={
                          order.status === 'delivered' ? 'default' :
                          order.status === 'shipped' ? 'secondary' :
                          order.status === 'confirmed' ? 'outline' :
                          'destructive'
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{order.customerName}</p>
                    <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{order.orderDate}</p>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      <Eye className="h-4 w-4 inline mr-1" />
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;