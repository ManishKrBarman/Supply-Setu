import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import ProductForm from './pages/ProductForm';
import SuppliersPage from './pages/SuppliersPage';
import SupplierForm from './pages/SupplierForm';
import FoodsPage from './pages/FoodsPage';
import FoodForm from './pages/FoodForm';
import AnalyticsPage from './pages/AnalyticsPage';
import ProtectedRoute from './components/ProtectedRoute';
import LandingLayout from './layouts/LandingLayout';
import DashboardLayout from './layouts/DashboardLayout';

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
        
        {/* Protected routes with DashboardLayout */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardPage />} />
          
          {/* Products routes */}
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/edit/:id" element={<ProductForm />} />
          
          {/* Suppliers routes */}
          <Route path="suppliers" element={<SuppliersPage />} />
          <Route path="suppliers/new" element={<SupplierForm />} />
          <Route path="suppliers/edit/:id" element={<SupplierForm />} />
          
          {/* Foods routes */}
          <Route path="foods" element={<FoodsPage />} />
          <Route path="foods/new" element={<FoodForm />} />
          <Route path="foods/edit/:id" element={<FoodForm />} />
          
          {/* Analytics route */}
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;