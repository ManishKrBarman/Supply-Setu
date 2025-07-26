import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { logout, getCurrentUser } from '../api/authService';
import { 
  FaHome, 
  FaBox, 
  FaUsers, 
  FaUtensils, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt,
  FaBell,
  FaUser,
  FaSearch,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // User role from auth service
  const userRole = user?.role || 'vendor';
  
  // Navigation items for the sidebar based on role
  const getNavItems = () => {
    const commonItems = [
      { icon: <FaHome />, label: 'Dashboard', path: '/dashboard' },
      { icon: <FaChartBar />, label: 'Analytics', path: '/dashboard/analytics' },
    ];
    
    // Vendor specific items
    if (userRole === 'vendor') {
      return [
        ...commonItems,
        { icon: <FaUsers />, label: 'Suppliers', path: '/dashboard/suppliers' },
        { icon: <FaBox />, label: 'My Orders', path: '/dashboard/orders' },
        { icon: <FaUtensils />, label: 'My Foods', path: '/dashboard/foods' },
      ];
    }
    
    // Supplier specific items
    if (userRole === 'supplier') {
      return [
        ...commonItems,
        { icon: <FaBox />, label: 'My Products', path: '/dashboard/products' },
        { icon: <FaBox />, label: 'Customer Orders', path: '/dashboard/supplier-orders' },
      ];
    }
    
    // Admin items
    if (userRole === 'admin') {
      return [
        ...commonItems,
        { icon: <FaUsers />, label: 'Users', path: '/dashboard/users' },
        { icon: <FaBox />, label: 'Products', path: '/dashboard/products' },
        { icon: <FaUsers />, label: 'Suppliers', path: '/dashboard/suppliers' },
        { icon: <FaUtensils />, label: 'Foods', path: '/dashboard/foods' },
        { icon: <FaBox />, label: 'Orders', path: '/dashboard/admin-orders' },
      ];
    }
    
    return commonItems;
  };
  
  const navItems = getNavItems();

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Mobile sidebar */}
      <div className={`
        fixed inset-y-0 left-0 w-64 transition duration-300 transform bg-indigo-700 md:relative md:translate-x-0 z-50
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex items-center justify-between h-16 px-4 bg-indigo-800">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-white">Supply Setu</Link>
          </div>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center p-2 mb-4 bg-indigo-800 rounded-lg">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white text-lg font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
              <p className="text-xs text-indigo-200 truncate">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
          
          <nav className="mt-5 space-y-1">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`
                    group flex items-center px-4 py-2 text-sm font-medium rounded-md
                    ${isActive 
                      ? 'bg-indigo-800 text-white' 
                      : 'text-indigo-100 hover:bg-indigo-600 hover:text-white'}
                  `}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-10 pt-4 border-t border-indigo-600 space-y-1">
            <Link
              to="/dashboard/settings"
              className="group flex items-center px-4 py-2 text-sm font-medium rounded-md text-indigo-100 hover:bg-indigo-600 hover:text-white"
            >
              <span className="mr-3"><FaCog /></span>
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left group flex items-center px-4 py-2 text-sm font-medium rounded-md text-indigo-100 hover:bg-indigo-600 hover:text-white"
            >
              <span className="mr-3"><FaSignOutAlt /></span>
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              {/* Mobile menu button */}
              <button
                className="md:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <FaBars size={20} />
              </button>
              
              {/* Search */}
              <div className="hidden md:block flex-1 px-4 max-w-lg">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch />
                  </div>
                  <input
                    className="block w-full h-full pl-10 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
              
              {/* Right section */}
              <div className="flex items-center">
                {/* Notification dropdown */}
                <button className="p-1 rounded-full text-gray-500 hover:text-gray-900 focus:outline-none">
                  <span className="sr-only">View notifications</span>
                  <FaBell size={20} />
                </button>
                
                {/* Profile dropdown */}
                <div className="ml-4 relative flex-shrink-0">
                  <button className="flex items-center p-1 rounded-full text-gray-500 hover:text-gray-900 focus:outline-none">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;