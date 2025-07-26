import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById, updateOrderStatus, cancelOrder } from '../api/orderService';
import { getUserRole } from '../api/authService';
import { Alert } from '../components/DataDisplay';
import Button from '../components/Button';
import { 
  FaArrowLeft, 
  FaSpinner, 
  FaBox, 
  FaTruck, 
  FaCheckCircle,
  FaTimes,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCalendarAlt
} from 'react-icons/fa';

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userRole = getUserRole();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getOrderById(id);
      setOrder(data);
    } catch (err) {
      setError(err.message || 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    setActionLoading(true);
    try {
      await updateOrderStatus(id, {
        status: newStatus,
        note: `Order ${newStatus.toLowerCase()} by supplier`,
        expectedDeliveryDate: newStatus === 'Shipped' ? new Date(Date.now() + 2*24*60*60*1000).toISOString() : undefined
      });
      fetchOrderDetails();
    } catch (err) {
      setError(err.message || 'Failed to update order status');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    setActionLoading(true);
    try {
      await cancelOrder(id, 'Cancelled by vendor');
      fetchOrderDetails();
    } catch (err) {
      setError(err.message || 'Failed to cancel order');
    } finally {
      setActionLoading(false);
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
    if (userRole !== 'supplier') return [];
    
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="error">{error}</Alert>;
  }

  if (!order) {
    return <Alert variant="error">Order not found</Alert>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-indigo-600 hover:text-indigo-900"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main order details */}
        <div className="lg:w-2/3">
          <div className="bg-white shadow overflow-hidden rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Order #{order.orderNumber}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(order.orderStatus)}`}>
                {order.orderStatus}
              </span>
            </div>
            
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                {/* Status actions */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {getNextStatusOptions(order.orderStatus).map((option, index) => (
                    <Button
                      key={index}
                      variant="primary"
                      onClick={() => handleUpdateStatus(option.status)}
                      isLoading={actionLoading}
                      className="flex items-center"
                    >
                      <span className="mr-2">{option.icon}</span>
                      {option.label}
                    </Button>
                  ))}
                  
                  {userRole === 'vendor' && ['Pending', 'Processing'].includes(order.orderStatus) && (
                    <Button
                      variant="danger"
                      onClick={handleCancelOrder}
                      isLoading={actionLoading}
                      className="flex items-center"
                    >
                      <FaTimes className="mr-2" /> Cancel Order
                    </Button>
                  )}
                </div>
                
                {/* Order Items */}
                <h4 className="text-lg font-medium text-gray-900 mb-3">Order Items</h4>
                <div className="bg-gray-50 rounded-md overflow-hidden mb-6">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Item
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Unit Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {order.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.quantity} {item.unit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₹{item.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₹{item.total.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Order Summary */}
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                          <table className="min-w-full text-right">
                            <tbody>
                              <tr>
                                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">Subtotal</td>
                                <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">₹{order.totalAmount.toFixed(2)}</td>
                              </tr>
                              <tr>
                                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">Tax</td>
                                <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">₹{order.taxAmount.toFixed(2)}</td>
                              </tr>
                              <tr>
                                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">Shipping</td>
                                <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">₹{order.shippingCharges.toFixed(2)}</td>
                              </tr>
                              <tr>
                                <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">Discount</td>
                                <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">-₹{order.discountAmount.toFixed(2)}</td>
                              </tr>
                              <tr className="border-t border-gray-200">
                                <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">Total</td>
                                <td className="whitespace-nowrap px-2 py-2 text-sm font-bold text-gray-900">₹{order.grandTotal.toFixed(2)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar - Order Info */}
        <div className="lg:w-1/3 space-y-6">
          {/* Delivery Information */}
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Delivery Information
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="mt-1 mr-2 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Address</p>
                    <p className="text-sm text-gray-500">{order.deliveryAddress.street}</p>
                    <p className="text-sm text-gray-500">{order.deliveryAddress.city}, {order.deliveryAddress.state}</p>
                    <p className="text-sm text-gray-500">{order.deliveryAddress.country} - {order.deliveryAddress.pincode}</p>
                  </div>
                </div>
                
                {order.expectedDeliveryDate && (
                  <div className="flex items-start">
                    <FaCalendarAlt className="mt-1 mr-2 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Expected Delivery</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.expectedDeliveryDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
                
                {order.actualDeliveryDate && (
                  <div className="flex items-start">
                    <FaCalendarAlt className="mt-1 mr-2 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Delivered On</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.actualDeliveryDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Payment Information */}
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Payment Information
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-900">Method</p>
                  <p className="text-sm text-gray-500">{order.paymentMethod}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-900">Status</p>
                  <p className="text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.paymentStatus === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {userRole === 'vendor' ? 'Supplier Information' : 'Customer Information'}
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="space-y-3">
                {userRole === 'vendor' ? (
                  <>
                    <p className="text-sm font-medium text-gray-900">{order.supplierDetails.businessName}</p>
                    <div className="flex items-center">
                      <FaPhoneAlt className="mr-2 text-gray-500" />
                      <p className="text-sm text-gray-500">{order.supplierDetails.contactPhone}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-gray-900">{order.vendorDetails.businessName}</p>
                    <div className="flex items-center">
                      <FaPhoneAlt className="mr-2 text-gray-500" />
                      <p className="text-sm text-gray-500">{order.vendorDetails.contactPhone}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Order Status History */}
          {order.statusHistory && order.statusHistory.length > 0 && (
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Order History
                </h3>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {order.statusHistory.map((item, index) => (
                    <li key={index} className="px-4 py-3">
                      <div className="flex justify-between">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(item.timestamp).toLocaleString()}
                        </span>
                      </div>
                      {item.note && (
                        <p className="mt-1 text-sm text-gray-500">{item.note}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
