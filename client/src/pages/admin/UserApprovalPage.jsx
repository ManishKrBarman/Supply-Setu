import React, { useState, useEffect } from 'react';
import { getUsersForApproval, approveUser, rejectUser } from '../../api/adminService';
import Button from '../../components/Button';

const UserApprovalPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsersForApproval();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users for approval:', err);
        setError('Failed to load users awaiting approval');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  const handleApprove = async (userId) => {
    try {
      await approveUser(userId);
      setUsers(users.filter(user => user._id !== userId));
      setSuccessMessage('User approved successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error approving user:', err);
      setError('Failed to approve user');
      
      // Clear error message after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleReject = async (userId, reason = 'Application rejected by admin') => {
    try {
      await rejectUser(userId, { reason });
      setUsers(users.filter(user => user._id !== userId));
      setSuccessMessage('User rejected successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Error rejecting user:', err);
      setError('Failed to reject user');
      
      // Clear error message after 3 seconds
      setTimeout(() => setError(null), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Approval Requests</h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
          <p>{successMessage}</p>
        </div>
      )}
      
      {users.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
          No users waiting for approval at the moment.
        </div>
      ) : (
        <div className="grid gap-6">
          {users.map(user => (
            <div key={user._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="mt-1">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      user.role === 'vendor' ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      Registered: {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="success"
                    onClick={() => handleApprove(user._id)}
                  >
                    Approve
                  </Button>
                  <Button 
                    variant="danger"
                    onClick={() => handleReject(user._id)}
                  >
                    Reject
                  </Button>
                </div>
              </div>
              
              {user.role === 'vendor' && user.vendorProfile && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Vendor Details:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <p><span className="font-medium">Business Name:</span> {user.vendorProfile.businessName || 'N/A'}</p>
                    <p><span className="font-medium">Food Type:</span> {user.vendorProfile.foodType || 'N/A'}</p>
                    <p><span className="font-medium">Location:</span> {user.vendorProfile.location || 'N/A'}</p>
                    <p><span className="font-medium">Experience:</span> {user.vendorProfile.experience || 'N/A'} years</p>
                  </div>
                </div>
              )}
              
              {user.role === 'supplier' && user.supplierProfile && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Supplier Details:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <p><span className="font-medium">Business Name:</span> {user.supplierProfile.businessName || 'N/A'}</p>
                    <p><span className="font-medium">Business Type:</span> {user.supplierProfile.businessType || 'N/A'}</p>
                    <p><span className="font-medium">GST Number:</span> {user.supplierProfile.gstNumber || 'N/A'}</p>
                    <p><span className="font-medium">Registration Number:</span> {user.supplierProfile.registrationNumber || 'N/A'}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserApprovalPage;
