import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminStats } from '../api/adminService';
import { 
  FaUsers, 
  FaStore, 
  FaTruckMoving, 
  FaBoxOpen, 
  FaShoppingCart, 
  FaUserClock 
} from 'react-icons/fa';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    pendingApprovals: 0,
    totalUsers: 0,
    totalVendors: 0,
    totalSuppliers: 0,
    totalProducts: 0,
    totalOrders: 0,
    recentUsers: [],
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getAdminStats();
        setStats(data);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard statistics');
        console.error('Error fetching admin stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const StatCard = ({ title, value, icon: Icon, bgColor, textColor }) => (
    <div className={`${bgColor} rounded-lg shadow-md p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${textColor}`}>{title}</p>
          <h3 className={`text-2xl font-bold ${textColor} mt-1`}>{value}</h3>
        </div>
        <div className={`${textColor} text-opacity-80`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to the Supply Setu admin control panel.</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Users Pending Approval"
          value={stats.pendingApprovals}
          icon={FaUserClock}
          bgColor="bg-amber-100"
          textColor="text-amber-800"
        />

        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={FaUsers}
          bgColor="bg-blue-100"
          textColor="text-blue-800"
        />

        <StatCard
          title="Vendors"
          value={stats.totalVendors}
          icon={FaStore}
          bgColor="bg-green-100"
          textColor="text-green-800"
        />

        <StatCard
          title="Suppliers"
          value={stats.totalSuppliers}
          icon={FaTruckMoving}
          bgColor="bg-purple-100"
          textColor="text-purple-800"
        />

        <StatCard
          title="Products"
          value={stats.totalProducts}
          icon={FaBoxOpen}
          bgColor="bg-indigo-100"
          textColor="text-indigo-800"
        />

        <StatCard
          title="Orders"
          value={stats.totalOrders}
          icon={FaShoppingCart}
          bgColor="bg-pink-100"
          textColor="text-pink-800"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Users</h2>
            <Link to="/admin/users" className="text-blue-600 hover:text-blue-800 text-sm">
              View All
            </Link>
          </div>
          {stats.recentUsers && stats.recentUsers.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {stats.recentUsers.map(user => (
                <li key={user._id} className="py-3">
                  <div className="flex items-center">
                    <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-700 font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email} • {user.role}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">No recent users found</p>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Link to="/admin/orders" className="text-blue-600 hover:text-blue-800 text-sm">
              View All
            </Link>
          </div>
          {stats.recentOrders && stats.recentOrders.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {stats.recentOrders.map(order => (
                <li key={order._id} className="py-3">
                  <p className="text-sm font-medium text-gray-900">{order.orderNumber}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₹{order.grandTotal.toFixed(2)}</span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">No recent orders found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
