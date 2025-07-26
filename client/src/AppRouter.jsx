import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PendingApprovalPage from './pages/PendingApprovalPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import ProductForm from './pages/ProductForm';
import SuppliersPage from './pages/SuppliersPage';
import SupplierForm from './pages/SupplierForm';
import SupplierVerificationPage from './pages/SupplierVerificationPage';
import SupplierRatingsPage from './pages/SupplierRatingsPage';
import FoodsPage from './pages/FoodsPage';
import FoodForm from './pages/FoodForm';
import OrdersPage from './pages/OrdersPage';
import SupplierOrdersPage from './pages/SupplierOrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import AnalyticsPage from './pages/AnalyticsPage';

// Admin imports
import AdminLoginPage from './admin/pages/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import UserApprovalPage from './pages/admin/UserApprovalPage';

import ProtectedRoute from './components/ProtectedRoute';
import LandingLayout from './layouts/LandingLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AdminLayout from './layouts/AdminLayout';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes with LandingLayout */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        
        {/* Account status pages */}
        <Route path="/pending-approval" element={<PendingApprovalPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        
        {/* Admin Portal Routes - Separate from main app */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboardPage />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="approvals" element={<UserApprovalPage />} />
          <Route path="users" element={<UserApprovalPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="suppliers" element={<SuppliersPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
        
        {/* Protected routes with DashboardLayout */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardPage />} />
          
          {/* Product routes */}
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id/edit" element={<ProductForm />} />
          
          {/* Supplier routes */}
          <Route path="suppliers" element={<SuppliersPage />} />
          <Route path="suppliers/new" element={<SupplierForm />} />
          <Route path="suppliers/:id/edit" element={<SupplierForm />} />
          <Route path="suppliers/:id/verification" element={<SupplierVerificationPage />} />
          <Route path="suppliers/:id/ratings" element={<SupplierRatingsPage />} />
          
          {/* Food routes */}
          <Route path="foods" element={<FoodsPage />} />
          <Route path="foods/new" element={<FoodForm />} />
          <Route path="foods/:id/edit" element={<FoodForm />} />
          
          {/* Order routes - role-specific access */}
          <Route path="orders" element={
            <ProtectedRoute allowedRoles={['vendor', 'admin']}>
              <OrdersPage />
            </ProtectedRoute>
          } />
          <Route path="supplier-orders" element={
            <ProtectedRoute allowedRoles={['supplier', 'admin']}>
              <SupplierOrdersPage />
            </ProtectedRoute>
          } />
          <Route path="orders/:id" element={
            <ProtectedRoute allowedRoles={['vendor', 'supplier', 'admin']}>
              <OrderDetailPage />
            </ProtectedRoute>
          } />
          
          {/* Analytics route - all users */}
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;