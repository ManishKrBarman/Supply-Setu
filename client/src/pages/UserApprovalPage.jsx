import React, { useState, useEffect } from 'react';
import { getUsersForApproval, approveUser, rejectUser } from '../api/adminService';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const UserApprovalPage = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      setLoading(true);
      const users = await getUsersForApproval();
      setPendingUsers(users);
      setError(null);
    } catch (err) {
      setError('Failed to fetch users waiting for approval');
      console.error('Error fetching pending users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await approveUser(userId);
      setPendingUsers(pendingUsers.filter(user => user._id !== userId));
    } catch (err) {
      setError('Failed to approve user');
      console.error('Error approving user:', err);
    }
  };

  const openRejectModal = (user) => {
    setSelectedUser(user);
    setRejectionReason('');
    setShowRejectModal(true);
  };

  const handleReject = async () => {
    if (!selectedUser) return;
    
    try {
      await rejectUser(selectedUser._id, { reason: rejectionReason });
      setPendingUsers(pendingUsers.filter(user => user._id !== selectedUser._id));
      setShowRejectModal(false);
      setSelectedUser(null);
    } catch (err) {
      setError('Failed to reject user');
      console.error('Error rejecting user:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">User Approval Management</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {pendingUsers.length === 0 ? (
        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <p className="text-lg text-blue-800">No users are currently waiting for approval.</p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingUsers.map(user => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                    <button
                      onClick={() => handleApprove(user._id)}
                      className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200"
                    >
                      <FaCheckCircle className="mr-1" /> Approve
                    </button>
                    <button
                      onClick={() => openRejectModal(user)}
                      className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                    >
                      <FaTimesCircle className="mr-1" /> Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Reject User: {selectedUser?.name}
                </h3>
                <div className="mt-2">
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    rows="4"
                    placeholder="Reason for rejection (optional)"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleReject}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => setShowRejectModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserApprovalPage;
