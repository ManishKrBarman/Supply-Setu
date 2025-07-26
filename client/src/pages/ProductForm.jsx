import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { FormGroup, Label, Input, Select, Textarea, Checkbox } from '../components/FormElements';
import Button from '../components/Button';
import { Card } from '../components/DataDisplay';
import { FaRupeeSign, FaTag, FaPercent } from 'react-icons/fa';

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const [showBulkOptions, setShowBulkOptions] = useState(false);

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: isEditMode ? 'Onions (Premium Quality)' : '',
      category: isEditMode ? 'vegetables' : '',
      supplier: isEditMode ? '1' : '',
      price: isEditMode ? '32' : '',
      minOrder: isEditMode ? '5' : '',
      unit: isEditMode ? 'kg' : 'kg',
      description: isEditMode ? 'Premium quality onions sourced directly from farms in Maharashtra. Ideal for street food vendors due to their flavor and freshness.' : '',
      offersBulkDiscount: isEditMode,
      bulkDiscount: isEditMode ? '10' : '',
      bulkMinQuantity: isEditMode ? '25' : '',
      availableRegions: isEditMode ? ['North Delhi', 'South Delhi', 'East Delhi'] : []
    }
  });

  // Watch for bulk discount checkbox
  const hasBulkDiscount = watch('offersBulkDiscount');
  
  // Categories relevant for street food vendors
  const categories = [
    { value: 'vegetables', label: 'Vegetables & Fruits' },
    { value: 'spices', label: 'Spices & Condiments' },
    { value: 'grains', label: 'Grains & Flours' },
    { value: 'dairy', label: 'Dairy Products' },
    { value: 'oils', label: 'Cooking Oils' },
    { value: 'packaging', label: 'Packaging Materials' },
    { value: 'meat', label: 'Meat & Poultry' }
  ];

  // Suppliers relevant for street food vendors
  const suppliers = [
    { value: '1', label: 'Singh Vegetable Supply (North Delhi)' },
    { value: '2', label: 'Sharma Masala Mart (Central Delhi)' },
    { value: '3', label: 'Fresh Dairy Supplies (Noida)' },
    { value: '4', label: 'Gupta Oil Traders (South Delhi)' },
    { value: '5', label: 'Eco Food Packaging (Gurgaon)' },
    { value: '6', label: 'Malhotra Rice & Flour (Central Delhi)' }
  ];

  // Units for products
  const units = [
    { value: 'kg', label: 'Kilogram (kg)' },
    { value: 'g', label: 'Gram (g)' },
    { value: 'liter', label: 'Liter' },
    { value: 'piece', label: 'Piece' },
    { value: 'packet', label: 'Packet' },
    { value: 'bundle', label: 'Bundle' }
  ];
  
  // Available regions for delivery
  const regions = [
    { value: 'North Delhi', label: 'North Delhi' },
    { value: 'South Delhi', label: 'South Delhi' },
    { value: 'East Delhi', label: 'East Delhi' },
    { value: 'West Delhi', label: 'West Delhi' },
    { value: 'Central Delhi', label: 'Central Delhi' },
    { value: 'Noida', label: 'Noida' },
    { value: 'Gurgaon', label: 'Gurgaon' },
    { value: 'Faridabad', label: 'Faridabad' },
    { value: 'Ghaziabad', label: 'Ghaziabad' }
  ];

  const onSubmit = (data) => {
    // Combine the price and unit information
    const formattedData = {
      ...data,
      pricePerUnit: `per ${data.unit}`,
      offers: []
    };
    
    if (data.offersBulkDiscount) {
      formattedData.offers.push(`${data.bulkDiscount}% off on ${data.bulkMinQuantity}${data.unit}+`);
    }
    
    console.log('Form data submitted:', formattedData);
    // Here you would typically make an API call to save the product
    
    navigate('/dashboard/products');
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        {isEditMode ? 'Edit Raw Material' : 'Add Raw Material'}
      </h1>
      
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-700 mb-3">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup>
                <Label htmlFor="name" required>Material Name</Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Material name is required' })}
                  error={errors.name?.message}
                  placeholder="E.g., Onions (Premium Quality)"
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="category" required>Category</Label>
                <Select
                  id="category"
                  options={categories}
                  {...register('category', { required: 'Category is required' })}
                  error={errors.category?.message}
                  placeholder="Select a category"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="supplier" required>Supplier</Label>
                <Select
                  id="supplier"
                  options={suppliers}
                  {...register('supplier', { required: 'Supplier is required' })}
                  error={errors.supplier?.message}
                  placeholder="Select a supplier"
                />
              </FormGroup>
              
              <div className="grid grid-cols-3 gap-3">
                <FormGroup className="col-span-1">
                  <Label htmlFor="price" required>Price</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaRupeeSign className="text-gray-500 text-sm" />
                    </div>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      className="pl-8"
                      {...register('price', { 
                        required: 'Price is required',
                        min: {
                          value: 0,
                          message: 'Price cannot be negative'
                        }
                      })}
                      error={errors.price?.message}
                      placeholder="Price"
                    />
                  </div>
                </FormGroup>
                
                <FormGroup className="col-span-1">
                  <Label htmlFor="minOrder" required>Min Order</Label>
                  <Input
                    id="minOrder"
                    type="number"
                    min="1"
                    {...register('minOrder', { 
                      required: 'Minimum order is required',
                      min: {
                        value: 1,
                        message: 'Minimum order must be at least 1'
                      }
                    })}
                    error={errors.minOrder?.message}
                    placeholder="Min qty"
                  />
                </FormGroup>
                
                <FormGroup className="col-span-1">
                  <Label htmlFor="unit" required>Unit</Label>
                  <Select
                    id="unit"
                    options={units}
                    {...register('unit', { required: 'Unit is required' })}
                    error={errors.unit?.message}
                  />
                </FormGroup>
              </div>
            </div>
          </div>
          
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-700 mb-3">
              <button
                type="button"
                className="flex items-center focus:outline-none"
                onClick={() => setShowBulkOptions(!showBulkOptions)}
              >
                <span className="mr-2">{showBulkOptions ? '−' : '+'}</span>
                <span>Bulk Order Options</span>
              </button>
            </h2>
            
            {showBulkOptions && (
              <div className="pl-4 border-l-4 border-indigo-100">
                <div className="mb-4">
                  <Controller
                    name="offersBulkDiscount"
                    control={control}
                    render={({ field }) => (
                      <FormGroup>
                        <div className="flex items-center">
                          <Checkbox
                            id="offersBulkDiscount"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                          <Label htmlFor="offersBulkDiscount" className="ml-2 mb-0">
                            Offer bulk discount
                          </Label>
                        </div>
                      </FormGroup>
                    )}
                  />
                </div>
                
                {hasBulkDiscount && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormGroup>
                      <Label htmlFor="bulkDiscount" required>Discount Percentage</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaPercent className="text-gray-500 text-sm" />
                        </div>
                        <Input
                          id="bulkDiscount"
                          type="number"
                          className="pl-8"
                          min="1"
                          max="99"
                          {...register('bulkDiscount', {
                            required: 'Discount percentage is required',
                            min: {
                              value: 1,
                              message: 'Discount must be at least 1%'
                            },
                            max: {
                              value: 99,
                              message: 'Discount cannot exceed 99%'
                            }
                          })}
                          error={errors.bulkDiscount?.message}
                          placeholder="Discount percentage"
                        />
                      </div>
                    </FormGroup>
                    
                    <FormGroup>
                      <Label htmlFor="bulkMinQuantity" required>Minimum Quantity</Label>
                      <Input
                        id="bulkMinQuantity"
                        type="number"
                        min="1"
                        {...register('bulkMinQuantity', {
                          required: 'Minimum bulk quantity is required',
                          min: {
                            value: 1,
                            message: 'Quantity must be at least 1'
                          }
                        })}
                        error={errors.bulkMinQuantity?.message}
                        placeholder="Min quantity for discount"
                      />
                    </FormGroup>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-700 mb-3">Availability</h2>
            <FormGroup>
              <Label>Available Regions</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {regions.map((region) => (
                  <div key={region.value} className="flex items-center">
                    <Controller
                      name="availableRegions"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id={`region-${region.value}`}
                          checked={field.value?.includes(region.value)}
                          onChange={(e) => {
                            const updatedRegions = e.target.checked
                              ? [...(field.value || []), region.value]
                              : (field.value || []).filter(r => r !== region.value);
                            field.onChange(updatedRegions);
                          }}
                        />
                      )}
                    />
                    <Label htmlFor={`region-${region.value}`} className="ml-2 mb-0">
                      {region.label}
                    </Label>
                  </div>
                ))}
              </div>
            </FormGroup>
          </div>

          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={4}
              {...register('description')}
              error={errors.description?.message}
              placeholder="Describe the quality, source, and other relevant details"
            />
          </FormGroup>

          <div className="mt-8 flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => navigate('/dashboard/products')}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? 'Update Material' : 'Add Material'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProductForm;