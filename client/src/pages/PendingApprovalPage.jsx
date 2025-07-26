import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getCurrentUser } from '../api/authService';
import { FaCheckCircle, FaExclamationTriangle, FaSignOutAlt } from 'react-icons/fa';
import Button from '../components/Button';

const PendingApprovalPage = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // If user is approved or active, redirect to dashboard
  React.useEffect(() => {
    if (user?.status === 'approved' || user?.status === 'active') {
      navigate('/dashboard');
    }
  }, [user?.status, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            {user?.status === 'pending' ? (
              <>
                <FaExclamationTriangle className="mx-auto h-12 w-12 text-yellow-500" />
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                  Account Pending Approval
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Your account is currently under review by our admin team. 
                  Once approved, you'll be able to access all features.
                </p>
                <div className="mt-8 bg-yellow-50 border border-yellow-100 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        What happens next?
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Our team will verify your information</li>
                          <li>This usually takes 1-2 business days</li>
                          <li>You'll receive an email once your account is approved</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : user?.status === 'approved' || user?.status === 'active' ? (
              <>
                <FaCheckCircle className="mx-auto h-12 w-12 text-green-500" />
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                  Account Approved!
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Your account has been approved. Redirecting to dashboard...
                </p>
              </>
            ) : user?.status === 'rejected' ? (
              <>
                <FaExclamationTriangle className="mx-auto h-12 w-12 text-red-500" />
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                  Account Rejected
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Unfortunately, your account registration has been rejected.
                </p>
                <div className="mt-8 bg-red-50 border border-red-100 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FaExclamationTriangle className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        Reason for rejection:
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>{user?.rejectionReason || 'Please contact support for more information.'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <FaCheckCircle className="mx-auto h-12 w-12 text-green-500" />
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                  Account Status
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  There was an issue determining your account status.
                </p>
              </>
            )}
            
            <div className="mt-6">
              <Button 
                onClick={handleLogout}
                variant="outline"
                fullWidth
                className="flex justify-center items-center"
              >
                <FaSignOutAlt className="mr-2" />
                Sign Out
              </Button>
            </div>
            
            <div className="mt-4 text-sm">
              <p className="text-gray-600">
                Need help? <a href="mailto:support@supplysetu.com" className="text-indigo-600 hover:text-indigo-500">Contact support</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingApprovalPage;
