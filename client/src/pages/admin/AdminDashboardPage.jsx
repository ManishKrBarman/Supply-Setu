import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAdminStats } from '../../api/adminService';
import { FaUsers, FaStore, FaBoxOpen, FaShoppingCart, FaUserClock } from 'react-icons/fa';

const StatCard = ({ icon: Icon, title, value, color, linkTo }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center">
      <div className={`p-3 rounded-full ${color} mr-4`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
    {linkTo && (
      <Link to={linkTo} className="text-indigo-600 text-sm mt-4 inline-block hover:underline">
        View all &rarr;
      </Link>
    )}
  </div>
);

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
      } catch (err) {
        console.error('Error fetching admin stats:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard 
          icon={FaUserClock}
          title="Pending Approvals"
          value={stats.pendingApprovals}
          color="bg-yellow-100 text-yellow-800"
          linkTo="/admin/approvals"
        />
        <StatCard 
          icon={FaUsers}
          title="Total Users"
          value={stats.totalUsers}
          color="bg-blue-100 text-blue-800"
          linkTo="/admin/users"
        />
        <StatCard 
          icon={FaStore}
          title="Total Suppliers"
          value={stats.totalSuppliers}
          color="bg-green-100 text-green-800"
          linkTo="/admin/suppliers"
        />
        <StatCard 
          icon={FaBoxOpen}
          title="Total Products"
          value={stats.totalProducts}
          color="bg-purple-100 text-purple-800"
          linkTo="/admin/products"
        />
        <StatCard 
          icon={FaUsers}
          title="Total Vendors"
          value={stats.totalVendors}
          color="bg-indigo-100 text-indigo-800"
          linkTo="/admin/users"
        />
        <StatCard 
          icon={FaShoppingCart}
          title="Total Orders"
          value={stats.totalOrders}
          color="bg-pink-100 text-pink-800"
          linkTo="/admin/orders"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent users */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Registrations</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {stats.recentUsers.map(user => (
                  <tr key={user._id}>
                    <td className="px-4 py-2 whitespace-nowrap">{user.name}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'vendor' ? 'bg-indigo-100 text-indigo-800' :
                        user.role === 'supplier' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        user.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {stats.recentUsers.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-4 py-4 text-center text-gray-500">No recent registrations</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Link to="/admin/users" className="text-indigo-600 text-sm mt-4 inline-block hover:underline">
            View all users &rarr;
          </Link>
        </div>
        
        {/* Recent orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {stats.recentOrders.map(order => (
                  <tr key={order._id}>
                    <td className="px-4 py-2 whitespace-nowrap">#{order._id.slice(-6)}</td>
                    <td className="px-4 py-2">{order.vendorName}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">₹{order.total.toFixed(2)}</td>
                  </tr>
                ))}
                {stats.recentOrders.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-4 py-4 text-center text-gray-500">No recent orders</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Link to="/admin/orders" className="text-indigo-600 text-sm mt-4 inline-block hover:underline">
            View all orders &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
