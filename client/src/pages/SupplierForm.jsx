import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormGroup, Label, Input, Textarea, Select, Checkbox } from '../components/FormElements';
import Button from '../components/Button';
import { Card, Alert } from '../components/DataDisplay';

const SupplierForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const [successMessage, setSuccessMessage] = useState('');

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
      region: '',
      supplierType: '',
      qualityAssurance: false,
      deliveryOptions: false,
      bulkDiscounts: false,
      specializations: [],
      priceRange: '',
      notes: ''
    }
  });

  // Supplier types specific to street food vendors
  const supplierTypes = [
    { value: 'vegetables', label: 'Vegetables & Fruits' },
    { value: 'spices', label: 'Spices & Condiments' },
    { value: 'grains', label: 'Grains & Flours' },
    { value: 'dairy', label: 'Dairy Products' },
    { value: 'oils', label: 'Cooking Oils' },
    { value: 'packaging', label: 'Packaging Materials' },
    { value: 'meat', label: 'Meat & Poultry' },
    { value: 'general', label: 'General Supplies' }
  ];
  
  // Regions for local sourcing
  const regions = [
    { value: 'north_delhi', label: 'North Delhi' },
    { value: 'south_delhi', label: 'South Delhi' },
    { value: 'east_delhi', label: 'East Delhi' },
    { value: 'west_delhi', label: 'West Delhi' },
    { value: 'central_delhi', label: 'Central Delhi' },
    { value: 'noida', label: 'Noida' },
    { value: 'gurgaon', label: 'Gurgaon' },
    { value: 'faridabad', label: 'Faridabad' },
    { value: 'ghaziabad', label: 'Ghaziabad' }
  ];

  // Price ranges
  const priceRanges = [
    { value: 'budget', label: 'Budget - Lowest Prices' },
    { value: 'affordable', label: 'Affordable - Good Value' },
    { value: 'premium', label: 'Premium - Higher Quality' },
    { value: 'wholesale', label: 'Wholesale - Bulk Pricing' }
  ];
  
  const onSubmit = (data) => {
    console.log('Form data submitted:', data);
    // Here you would typically make an API call to save the supplier
    setSuccessMessage('Supplier details saved successfully! They will be verified within 24 hours.');
    setTimeout(() => {
      navigate('/dashboard/suppliers');
    }, 2000);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        {isEditMode ? 'Edit Raw Material Supplier' : 'Add New Raw Material Supplier'}
      </h1>
      
      <Card>
        {successMessage && (
          <Alert variant="success" className="mb-6">
            {successMessage}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormGroup>
              <Label htmlFor="name" required>Supplier/Shop Name</Label>
              <Input
                id="name"
                {...register('name', { required: 'Supplier name is required' })}
                error={errors.name?.message}
                placeholder="Enter shop or supplier name"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="contactPerson" required>Contact Person</Label>
              <Input
                id="contactPerson"
                {...register('contactPerson', { required: 'Contact person is required' })}
                error={errors.contactPerson?.message}
                placeholder="Enter contact person name"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone" required>Phone Number</Label>
              <Input
                id="phone"
                {...register('phone', { 
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Please enter a valid 10-digit phone number'
                  }
                })}
                error={errors.phone?.message}
                placeholder="Enter phone number"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                {...register('email', { 
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                error={errors.email?.message}
                placeholder="Enter email address (if available)"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="region" required>Region/Area</Label>
              <Select
                id="region"
                options={regions}
                {...register('region', { required: 'Region is required' })}
                error={errors.region?.message}
                placeholder="Select supplier's region"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="supplierType" required>Supplier Category</Label>
              <Select
                id="supplierType"
                options={supplierTypes}
                {...register('supplierType', { required: 'Supplier category is required' })}
                error={errors.supplierType?.message}
                placeholder="Select supplier category"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="priceRange" required>Price Range</Label>
              <Select
                id="priceRange"
                options={priceRanges}
                {...register('priceRange', { required: 'Price range is required' })}
                error={errors.priceRange?.message}
                placeholder="Select typical price range"
              />
            </FormGroup>
            
            <FormGroup className="md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                rows={3}
                {...register('address')}
                error={errors.address?.message}
                placeholder="Enter supplier's shop/warehouse address"
              />
            </FormGroup>

            <FormGroup className="md:col-span-2">
              <Label>Supplier Features</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <Checkbox
                  id="qualityAssurance"
                  label="Quality Assurance"
                  {...register('qualityAssurance')}
                />
                <Checkbox
                  id="deliveryOptions"
                  label="Offers Delivery"
                  {...register('deliveryOptions')}
                />
                <Checkbox
                  id="bulkDiscounts"
                  label="Bulk Discounts"
                  {...register('bulkDiscounts')}
                />
              </div>
            </FormGroup>

            <FormGroup className="md:col-span-2">
              <Label htmlFor="notes">Special Notes</Label>
              <Textarea
                id="notes"
                rows={4}
                {...register('notes')}
                error={errors.notes?.message}
                placeholder="Enter any special details about this supplier (payment terms, minimum order quantity, specific quality notes, etc.)"
              />
            </FormGroup>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => navigate('/dashboard/suppliers')}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? 'Update Supplier' : 'Add Supplier'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SupplierForm;