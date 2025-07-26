import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FaUsers, FaBoxOpen, FaStore, FaChartBar, FaSignOutAlt, FaClipboardCheck } from 'react-icons/fa';
import { logout } from '../api/authService';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white">
        <div className="p-4 border-b border-indigo-700">
          <h1 className="text-xl font-bold">Supply Setu Admin</h1>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <NavLink 
                to="/admin" 
                end
                className={({isActive}) => 
                  `flex items-center p-3 rounded-lg ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`
                }
              >
                <FaChartBar className="mr-3" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/approvals" 
                className={({isActive}) => 
                  `flex items-center p-3 rounded-lg ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`
                }
              >
                <FaClipboardCheck className="mr-3" />
                Approval Requests
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/users" 
                className={({isActive}) => 
                  `flex items-center p-3 rounded-lg ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`
                }
              >
                <FaUsers className="mr-3" />
                Users
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/products" 
                className={({isActive}) => 
                  `flex items-center p-3 rounded-lg ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`
                }
              >
                <FaBoxOpen className="mr-3" />
                Products
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/suppliers" 
                className={({isActive}) => 
                  `flex items-center p-3 rounded-lg ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`
                }
              >
                <FaStore className="mr-3" />
                Suppliers
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/admin/analytics" 
                className={({isActive}) => 
                  `flex items-center p-3 rounded-lg ${isActive ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`
                }
              >
                <FaChartBar className="mr-3" />
                Analytics
              </NavLink>
            </li>
            <li className="mt-8">
              <button 
                onClick={handleLogout}
                className="flex items-center p-3 rounded-lg w-full text-left hover:bg-indigo-700"
              >
                <FaSignOutAlt className="mr-3" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Admin Portal</h2>
          <div className="text-sm text-gray-600">
            Admin Panel
          </div>
        </header>
        
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
