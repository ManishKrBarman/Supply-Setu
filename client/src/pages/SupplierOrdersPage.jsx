import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getSupplierOrders, updateOrderStatus } from '../api/orderService';
import { Alert } from '../components/DataDisplay';
import Button from '../components/Button';
import { 
  FaEye, 
  FaSpinner, 
  FaBox, 
  FaTruck, 
  FaCheckCircle 
} from 'react-icons/fa';

const SupplierOrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);
  const [updateOrderId, setUpdateOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getSupplierOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = (orderId) => {
    navigate(`/dashboard/orders/${orderId}`);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    setUpdateOrderId(orderId);
    setUpdating(true);
    try {
      await updateOrderStatus(orderId, {
        status: newStatus,
        note: `Order ${newStatus.toLowerCase()} by supplier`,
        expectedDeliveryDate: newStatus === 'Shipped' ? new Date(Date.now() + 2*24*60*60*1000).toISOString() : undefined
      });
      // Update orders list after status change
      fetchOrders();
    } catch (err) {
      setError(err.message || 'Failed to update order status');
    } finally {
      setUpdating(false);
      setUpdateOrderId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-indigo-100 text-indigo-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Returned': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNextStatusOptions = (currentStatus) => {
    switch (currentStatus) {
      case 'Pending': 
        return [
          { status: 'Processing', icon: <FaBox />, label: 'Process Order' }
        ];
      case 'Processing': 
        return [
          { status: 'Shipped', icon: <FaTruck />, label: 'Mark Shipped' }
        ];
      case 'Shipped': 
        return [
          { status: 'Delivered', icon: <FaCheckCircle />, label: 'Mark Delivered' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Customer Orders</h1>
      </div>

      {error && <Alert variant="error" className="mb-6">{error}</Alert>}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-indigo-600" />
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Yet</h3>
          <p className="text-gray-600 mb-4">
            You haven't received any orders yet. Add more products to attract customers.
          </p>
          <Button 
            variant="primary"
            onClick={() => navigate('/dashboard/products/new')}
          >
            Add New Product
          </Button>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.vendorDetails?.businessName || 'Unknown Vendor'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{order.grandTotal.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewOrder(order._id)}
                        className="text-indigo-600 hover:text-indigo-900 flex items-center"
                      >
                        <FaEye className="mr-1" /> View
                      </button>
                      
                      {getNextStatusOptions(order.orderStatus).map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleUpdateStatus(order._id, option.status)}
                          disabled={updating && updateOrderId === order._id}
                          className="text-indigo-600 hover:text-indigo-900 flex items-center"
                        >
                          {updating && updateOrderId === order._id ? (
                            <FaSpinner className="animate-spin mr-1" />
                          ) : (
                            <span className="mr-1">{option.icon}</span>
                          )}
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SupplierOrdersPage;
