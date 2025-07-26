import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerVendor, registerSupplier } from '../api/authService';
import Button from '../components/Button';
import { FormGroup, Label, Input, ErrorMessage } from '../components/FormElements';
import { Alert } from '../components/DataDisplay';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('vendor');
  
  // Vendor registration form
  const vendorForm = useForm();
  const vendorPassword = vendorForm.watch('password', '');
  
  // Supplier registration form
  const supplierForm = useForm();
  const supplierPassword = supplierForm.watch('password', '');

  const onSubmitVendor = async (data) => {
    setIsLoading(true);
    setError('');
    
    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        businessName: data.businessName || data.name + "'s Food Stall",
        contactPhone: data.contactPhone,
        foodType: data.foodType,
        address: data.address
      };
      
      await registerVendor(userData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to register account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const onSubmitSupplier = async (data) => {
    setIsLoading(true);
    setError('');
    
    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        businessName: data.businessName,
        contactPerson: data.contactPerson || data.name,
        contactEmail: data.contactEmail || data.email,
        contactPhone: data.contactPhone,
        address: data.address,
        gstNumber: data.gstNumber,
        businessType: data.businessType,
        categories: data.categories ? data.categories.split(',').map(cat => cat.trim()) : []
      };
      
      await registerSupplier(userData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to register account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-600">Join Supply Setu to streamline your street food business</p>
        </div>
        
        {/* Registration Type Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'vendor' 
              ? 'border-b-2 border-indigo-600 text-indigo-600' 
              : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('vendor')}
          >
            Street Food Vendor
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'supplier' 
              ? 'border-b-2 border-indigo-600 text-indigo-600' 
              : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('supplier')}
          >
            Supplier
          </button>
        </div>

        {error && (
          <Alert variant="error" className="mb-6">
            {error}
          </Alert>
        )}

        {/* Vendor Registration Form */}
        {activeTab === 'vendor' && (
          <form onSubmit={vendorForm.handleSubmit(onSubmitVendor)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormGroup>
                <Label htmlFor="name" required>Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  {...vendorForm.register('name', { 
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    }
                  })}
                  error={vendorForm.formState.errors.name?.message}
                  placeholder="Enter your full name"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email" required>Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  {...vendorForm.register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  error={vendorForm.formState.errors.email?.message}
                  placeholder="Enter your email"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  type="text"
                  {...vendorForm.register('businessName')}
                  error={vendorForm.formState.errors.businessName?.message}
                  placeholder="Your food stall or business name"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="contactPhone" required>Contact Phone</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  {...vendorForm.register('contactPhone', { 
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Please enter a valid 10-digit phone number'
                    }
                  })}
                  error={vendorForm.formState.errors.contactPhone?.message}
                  placeholder="Your contact number"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="foodType" required>Food Type</Label>
                <Input
                  id="foodType"
                  type="text"
                  {...vendorForm.register('foodType', { 
                    required: 'Food type is required'
                  })}
                  error={vendorForm.formState.errors.foodType?.message}
                  placeholder="e.g., South Indian, Chaat, Chinese, etc."
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="address" required>Address</Label>
                <Input
                  id="address"
                  type="text"
                  {...vendorForm.register('address', { 
                    required: 'Address is required'
                  })}
                  error={vendorForm.formState.errors.address?.message}
                  placeholder="Your business location"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password" required>Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...vendorForm.register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    }
                  })}
                  error={vendorForm.formState.errors.password?.message}
                  placeholder="Create a password"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="confirmPassword" required>Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...vendorForm.register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => 
                      value === vendorPassword || 'The passwords do not match'
                  })}
                  error={vendorForm.formState.errors.confirmPassword?.message}
                  placeholder="Confirm your password"
                />
              </FormGroup>
            </div>

            <div className="mt-6">
              <Button 
                type="submit" 
                variant="primary" 
                fullWidth 
                size="lg"
                isLoading={isLoading}
              >
                Register as Vendor
              </Button>
            </div>
          </form>
        )}

        {/* Supplier Registration Form */}
        {activeTab === 'supplier' && (
          <form onSubmit={supplierForm.handleSubmit(onSubmitSupplier)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormGroup>
                <Label htmlFor="name" required>Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  {...supplierForm.register('name', { 
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    }
                  })}
                  error={supplierForm.formState.errors.name?.message}
                  placeholder="Enter your full name"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email" required>Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  {...supplierForm.register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  error={supplierForm.formState.errors.email?.message}
                  placeholder="Enter your email"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="businessName" required>Business Name</Label>
                <Input
                  id="businessName"
                  type="text"
                  {...supplierForm.register('businessName', {
                    required: 'Business name is required'
                  })}
                  error={supplierForm.formState.errors.businessName?.message}
                  placeholder="Your company or business name"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  type="text"
                  {...supplierForm.register('contactPerson')}
                  error={supplierForm.formState.errors.contactPerson?.message}
                  placeholder="Primary contact person"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="contactPhone" required>Contact Phone</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  {...supplierForm.register('contactPhone', { 
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Please enter a valid 10-digit phone number'
                    }
                  })}
                  error={supplierForm.formState.errors.contactPhone?.message}
                  placeholder="Business contact number"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="address" required>Address</Label>
                <Input
                  id="address"
                  type="text"
                  {...supplierForm.register('address', { 
                    required: 'Address is required'
                  })}
                  error={supplierForm.formState.errors.address?.message}
                  placeholder="Your business location"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="gstNumber" required>GST Number</Label>
                <Input
                  id="gstNumber"
                  type="text"
                  {...supplierForm.register('gstNumber', {
                    required: 'GST number is required',
                    pattern: {
                      value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                      message: 'Please enter a valid GST number'
                    }
                  })}
                  error={supplierForm.formState.errors.gstNumber?.message}
                  placeholder="Your GST registration number"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="businessType" required>Business Type</Label>
                <Input
                  id="businessType"
                  type="text"
                  {...supplierForm.register('businessType', {
                    required: 'Business type is required'
                  })}
                  error={supplierForm.formState.errors.businessType?.message}
                  placeholder="e.g., Wholesaler, Distributor, Manufacturer"
                />
              </FormGroup>

              <FormGroup className="md:col-span-2">
                <Label htmlFor="categories" required>Product Categories</Label>
                <Input
                  id="categories"
                  type="text"
                  {...supplierForm.register('categories', {
                    required: 'Product categories are required'
                  })}
                  error={supplierForm.formState.errors.categories?.message}
                  placeholder="e.g., Vegetables, Spices, Dairy (comma separated)"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="password" required>Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...supplierForm.register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    }
                  })}
                  error={supplierForm.formState.errors.password?.message}
                  placeholder="Create a password"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="confirmPassword" required>Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...supplierForm.register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => 
                      value === supplierPassword || 'The passwords do not match'
                  })}
                  error={supplierForm.formState.errors.confirmPassword?.message}
                  placeholder="Confirm your password"
                />
              </FormGroup>
            </div>

            <div className="mt-6">
              <Button 
                type="submit" 
                variant="primary" 
                fullWidth 
                size="lg"
                isLoading={isLoading}
              >
                Register as Supplier
              </Button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;