import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { FormGroup, Label, Input, Select, Textarea, Checkbox } from '../components/FormElements';
import Button from '../components/Button';
import { Card, Badge } from '../components/DataDisplay';
import { FaRupeeSign, FaFire, FaClock, FaShoppingCart } from 'react-icons/fa';

const FoodForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  // State for tracking selected ingredients and their costs
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [showIngredientSelector, setShowIngredientSelector] = useState(false);
  
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: isEditMode ? 'Chole Bhature' : '',
      category: isEditMode ? 'north_indian' : '',
      description: isEditMode ? 'Traditional North Indian street food consisting of spicy chickpea curry (chole) with deep-fried bread (bhature).' : '',
      preparationTime: isEditMode ? '15' : '',
      sellingPrice: isEditMode ? '80' : '',
      costPrice: isEditMode ? '45' : '',
      isSpecialty: isEditMode,
      isVegetarian: isEditMode ? true : false,
      isSpicy: isEditMode ? true : false
    }
  });

  // Mock data - to be replaced with API calls
  // Street food categories from across India
  const categories = [
    { value: 'north_indian', label: 'North Indian Street Food' },
    { value: 'south_indian', label: 'South Indian Street Food' },
    { value: 'chaat', label: 'Chaat' },
    { value: 'rolls_wraps', label: 'Rolls & Wraps' },
    { value: 'chinese', label: 'Indo-Chinese' },
    { value: 'beverages', label: 'Beverages' },
    { value: 'desserts', label: 'Desserts & Sweets' }
  ];

  // Mock data for raw ingredients that the vendor can select
  const availableIngredients = [
    { id: 1, name: 'Onions', category: 'vegetables', price: 30, unit: 'kg', estimatedUsage: '50g' },
    { id: 2, name: 'Tomatoes', category: 'vegetables', price: 40, unit: 'kg', estimatedUsage: '100g' },
    { id: 3, name: 'Potatoes', category: 'vegetables', price: 25, unit: 'kg', estimatedUsage: '150g' },
    { id: 4, name: 'Red Chili Powder', category: 'spices', price: 350, unit: 'kg', estimatedUsage: '5g' },
    { id: 5, name: 'Chickpeas', category: 'grains', price: 110, unit: 'kg', estimatedUsage: '100g' },
    { id: 6, name: 'Wheat Flour', category: 'grains', price: 42, unit: 'kg', estimatedUsage: '100g' },
    { id: 7, name: 'Refined Oil', category: 'oils', price: 110, unit: 'liter', estimatedUsage: '50ml' },
    { id: 8, name: 'Paneer', category: 'dairy', price: 340, unit: 'kg', estimatedUsage: '50g' },
  ];
  
  // Add ingredient to the selected list
  const addIngredient = (ingredient) => {
    if (!selectedIngredients.find(item => item.id === ingredient.id)) {
      setSelectedIngredients([...selectedIngredients, {
        ...ingredient,
        quantity: 1
      }]);
      
      // Recalculate cost price
      const newCostPrice = selectedIngredients.reduce((sum, item) => {
        // Basic calculation for demonstration
        const itemCost = (item.price / 1000) * parseFloat(item.estimatedUsage);
        return sum + itemCost;
      }, 0);
      
      setValue('costPrice', newCostPrice.toFixed(2));
    }
  };
  
  // Remove ingredient from the selected list
  const removeIngredient = (id) => {
    setSelectedIngredients(selectedIngredients.filter(item => item.id !== id));
  };

  const onSubmit = (data) => {
    // Combine all data
    const formattedData = {
      ...data,
      ingredients: selectedIngredients.map(item => ({
        id: item.id,
        name: item.name,
        estimatedUsage: item.estimatedUsage
      })),
      profit: (data.sellingPrice - data.costPrice).toFixed(2),
      profitMargin: ((data.sellingPrice - data.costPrice) / data.sellingPrice * 100).toFixed(2) + '%'
    };
    
    console.log('Food item data submitted:', formattedData);
    // Here you would typically make an API call to save the food item
    
    navigate('/dashboard/foods');
  };

  // Watch form values for calculations
  const sellingPrice = watch('sellingPrice') || 0;
  const costPrice = watch('costPrice') || 0;
  const profit = sellingPrice - costPrice;
  const profitMargin = sellingPrice > 0 ? ((profit / sellingPrice) * 100).toFixed(1) : 0;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        {isEditMode ? 'Edit Street Food Item' : 'Add Street Food Item'}
      </h1>
      
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-700 mb-3">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup>
                <Label htmlFor="name" required>Food Item Name</Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Food name is required' })}
                  error={errors.name?.message}
                  placeholder="E.g., Chole Bhature, Pav Bhaji, etc."
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="category" required>Category</Label>
                <Select
                  id="category"
                  options={categories}
                  {...register('category', { required: 'Category is required' })}
                  error={errors.category?.message}
                  placeholder="Select food category"
                />
              </FormGroup>
            </div>
            
            <div className="mt-4">
              <FormGroup>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={3}
                  {...register('description')}
                  error={errors.description?.message}
                  placeholder="Describe your food item - what makes it special?"
                />
              </FormGroup>
            </div>
          </div>
          
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-medium text-gray-700">Attributes</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-2">
                <div className="flex h-5 items-center">
                  <Controller
                    name="isVegetarian"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="isVegetarian"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    )}
                  />
                </div>
                <div className="text-sm">
                  <Label htmlFor="isVegetarian" className="font-medium text-gray-700">Vegetarian</Label>
                  <p className="text-gray-500">Pure vegetarian dish</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="flex h-5 items-center">
                  <Controller
                    name="isSpicy"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="isSpicy"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    )}
                  />
                </div>
                <div className="text-sm">
                  <Label htmlFor="isSpicy" className="font-medium text-gray-700">Spicy</Label>
                  <div className="flex">
                    <p className="text-gray-500">Hot and spicy </p>
                    <FaFire className="ml-1 text-red-500" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <div className="flex h-5 items-center">
                  <Controller
                    name="isSpecialty"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="isSpecialty"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    )}
                  />
                </div>
                <div className="text-sm">
                  <Label htmlFor="isSpecialty" className="font-medium text-gray-700">Specialty Dish</Label>
                  <p className="text-gray-500">Your signature item</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center">
                <FaClock className="mr-2 text-indigo-500" />
                <Label htmlFor="preparationTime" required>Preparation Time (minutes)</Label>
              </div>
              <Input
                id="preparationTime"
                type="number"
                min="1"
                className="w-32"
                {...register('preparationTime', { 
                  required: 'Preparation time is required',
                  min: {
                    value: 1,
                    message: 'Preparation time must be at least 1 minute'
                  }
                })}
                error={errors.preparationTime?.message}
                placeholder="Minutes"
              />
            </div>
          </div>
          
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-700 mb-3">Pricing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup>
                <Label htmlFor="sellingPrice" required>Selling Price</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaRupeeSign className="text-gray-500" />
                  </div>
                  <Input
                    id="sellingPrice"
                    type="number"
                    className="pl-8"
                    min="0"
                    step="0.01"
                    {...register('sellingPrice', { 
                      required: 'Selling price is required',
                      min: {
                        value: 0,
                        message: 'Price cannot be negative'
                      }
                    })}
                    error={errors.sellingPrice?.message}
                    placeholder="Enter selling price"
                  />
                </div>
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="costPrice" required>Cost Price</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaRupeeSign className="text-gray-500" />
                  </div>
                  <Input
                    id="costPrice"
                    type="number"
                    className="pl-8"
                    min="0"
                    step="0.01"
                    {...register('costPrice', { 
                      required: 'Cost price is required',
                      min: {
                        value: 0,
                        message: 'Price cannot be negative'
                      }
                    })}
                    error={errors.costPrice?.message}
                    placeholder="Enter cost price"
                  />
                </div>
              </FormGroup>
            </div>
            
            {sellingPrice > 0 && costPrice > 0 && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Profit per item:</span>
                    <div className="font-bold text-lg text-green-600">
                      <FaRupeeSign className="inline-block text-sm" /> {profit.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Profit margin:</span>
                    <div className="font-bold text-lg text-green-600">
                      {profitMargin}%
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-medium text-gray-700">Ingredients</h2>
              <Button 
                type="button" 
                size="sm" 
                onClick={() => setShowIngredientSelector(!showIngredientSelector)}
              >
                {showIngredientSelector ? 'Hide Selector' : 'Add Ingredients'}
              </Button>
            </div>
            
            {showIngredientSelector && (
              <div className="mb-4 p-3 border border-gray-200 rounded-md">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Select ingredients:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {availableIngredients.map(ingredient => (
                    <Button 
                      key={ingredient.id}
                      type="button"
                      size="sm"
                      variant={selectedIngredients.some(item => item.id === ingredient.id) ? "secondary" : "outline"}
                      className="text-xs py-1"
                      onClick={() => addIngredient(ingredient)}
                    >
                      {ingredient.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {selectedIngredients.length > 0 ? (
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ingredient</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Usage</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedIngredients.map(ingredient => (
                      <tr key={ingredient.id}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {ingredient.name}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {ingredient.estimatedUsage}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          <Button 
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="text-red-500 text-xs py-0"
                            onClick={() => removeIngredient(ingredient.id)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No ingredients selected yet. Add ingredients to calculate accurate cost price.
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => navigate('/dashboard/foods')}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? 'Update Food Item' : 'Save Food Item'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default FoodForm;