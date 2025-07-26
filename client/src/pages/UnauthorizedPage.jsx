import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getCurrentUser, getUserRole } from '../api/authService';
import { FaLock, FaSignOutAlt, FaHome } from 'react-icons/fa';
import Button from '../components/Button';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const userRole = getUserRole();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <FaLock className="mx-auto h-12 w-12 text-red-500" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Access Denied
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              You don't have permission to access this page.
            </p>
            
            <div className="mt-8 bg-gray-50 border border-gray-100 rounded-md p-4">
              <div className="flex">
                <div className="ml-3 text-left">
                  <h3 className="text-sm font-medium text-gray-800">
                    Account Information:
                  </h3>
                  <div className="mt-2 text-sm text-gray-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Name: {user?.name}</li>
                      <li>Role: {userRole}</li>
                      <li>Status: {user?.status}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button 
                onClick={() => navigate('/dashboard')}
                variant="primary"
                className="flex justify-center items-center"
              >
                <FaHome className="mr-2" />
                Dashboard
              </Button>
              
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="flex justify-center items-center"
              >
                <FaSignOutAlt className="mr-2" />
                Sign Out
              </Button>
            </div>
            
            <div className="mt-4 text-sm">
              <p className="text-gray-600">
                If you believe this is an error, please <a href="mailto:support@supplysetu.com" className="text-indigo-600 hover:text-indigo-500">contact support</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
