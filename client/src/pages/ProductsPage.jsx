import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, Table, Badge, Alert } from '../components/DataDisplay';
import Button from '../components/Button';
import { FormGroup, Label, Input, Select } from '../components/FormElements';
import { FaShoppingCart, FaSort, FaRupeeSign, FaTags, FaStore } from 'react-icons/fa';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const supplierIdFromUrl = searchParams.get('supplier');
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('price_low');
  const [showCompare, setShowCompare] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  
  // Mock data - to be replaced with actual API calls
  const products = [
    { 
      id: 1, 
      name: 'Onions (Premium Quality)', 
      category: 'vegetables', 
      categoryLabel: 'Vegetables & Fruits',
      supplier: 'Singh Vegetable Supply',
      supplierRegion: 'North Delhi',
      supplierId: 1,
      price: 32,
      pricePerUnit: 'per kg',
      minOrder: '5 kg',
      image: '/onions.jpg',
      availableUnits: ['5kg', '10kg', '25kg'],
      rating: 4.5,
      status: 'Available',
      offers: ['10% off on 25kg+']
    },
    { 
      id: 2, 
      name: 'Tomatoes (Grade A)', 
      category: 'vegetables', 
      categoryLabel: 'Vegetables & Fruits',
      supplier: 'Singh Vegetable Supply',
      supplierRegion: 'North Delhi',
      supplierId: 1,
      price: 40,
      pricePerUnit: 'per kg',
      minOrder: '3 kg',
      image: '/tomatoes.jpg',
      availableUnits: ['3kg', '5kg', '10kg'],
      rating: 4.2,
      status: 'Available',
      offers: []
    },
    { 
      id: 3, 
      name: 'Red Chili Powder', 
      category: 'spices', 
      categoryLabel: 'Spices & Condiments',
      supplier: 'Sharma Masala Mart',
      supplierRegion: 'Central Delhi',
      supplierId: 2,
      price: 350,
      pricePerUnit: 'per kg',
      minOrder: '500 g',
      image: '/chili.jpg',
      availableUnits: ['500g', '1kg', '5kg'],
      rating: 4.8,
      status: 'Available',
      offers: ['Free delivery on 2kg+']
    },
    { 
      id: 4, 
      name: 'Mustard Oil (Cold Pressed)', 
      category: 'oils', 
      categoryLabel: 'Cooking Oils',
      supplier: 'Gupta Oil Traders',
      supplierRegion: 'South Delhi',
      supplierId: 4,
      price: 180,
      pricePerUnit: 'per liter',
      minOrder: '5 liters',
      image: '/mustard-oil.jpg',
      availableUnits: ['5L', '15L'],
      rating: 4.6,
      status: 'Available',
      offers: ['15L tin at ₹2500']
    },
    { 
      id: 5, 
      name: 'Basmati Rice (Premium)', 
      category: 'grains', 
      categoryLabel: 'Grains & Flours',
      supplier: 'Malhotra Rice & Flour',
      supplierRegion: 'Central Delhi',
      supplierId: 6,
      price: 95,
      pricePerUnit: 'per kg',
      minOrder: '10 kg',
      image: '/basmati.jpg',
      availableUnits: ['10kg', '25kg', '50kg'],
      rating: 4.9,
      status: 'Available',
      offers: ['Free delivery on 25kg+']
    },
    { 
      id: 6, 
      name: 'Paneer (Fresh)', 
      category: 'dairy', 
      categoryLabel: 'Dairy Products',
      supplier: 'Fresh Dairy Supplies',
      supplierRegion: 'Noida',
      supplierId: 3,
      price: 340,
      pricePerUnit: 'per kg',
      minOrder: '2 kg',
      image: '/paneer.jpg',
      availableUnits: ['2kg', '5kg', '10kg'],
      rating: 4.7,
      status: 'Available',
      offers: ['Early morning delivery available']
    },
    { 
      id: 7, 
      name: 'Wheat Flour (Chakki Fresh)', 
      category: 'grains', 
      categoryLabel: 'Grains & Flours',
      supplier: 'Malhotra Rice & Flour',
      supplierRegion: 'Central Delhi',
      supplierId: 6,
      price: 42,
      pricePerUnit: 'per kg',
      minOrder: '10 kg',
      image: '/wheat-flour.jpg',
      availableUnits: ['10kg', '25kg', '50kg'],
      rating: 4.5,
      status: 'Available',
      offers: ['Price valid for this week only']
    },
    { 
      id: 8, 
      name: 'Paper Plates (Eco-friendly)', 
      category: 'packaging', 
      categoryLabel: 'Packaging Materials',
      supplier: 'Eco Food Packaging',
      supplierRegion: 'Gurgaon',
      supplierId: 5,
      price: 3,
      pricePerUnit: 'per piece',
      minOrder: '100 pieces',
      image: '/paper-plates.jpg',
      availableUnits: ['100pcs', '500pcs', '1000pcs'],
      rating: 4.3,
      status: 'Available',
      offers: ['500 pieces at ₹1400']
    },
  ];

  // Filter products based on selected supplier from URL and category
  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const supplierMatch = !supplierIdFromUrl || product.supplierId === parseInt(supplierIdFromUrl);
    return categoryMatch && supplierMatch;
  });

  // Sort products based on selection
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Filter options
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'vegetables', label: 'Vegetables & Fruits' },
    { value: 'spices', label: 'Spices & Condiments' },
    { value: 'grains', label: 'Grains & Flours' },
    { value: 'dairy', label: 'Dairy Products' },
    { value: 'oils', label: 'Cooking Oils' },
    { value: 'packaging', label: 'Packaging Materials' },
    { value: 'meat', label: 'Meat & Poultry' },
  ];

  const sortOptions = [
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rating' },
    { value: 'name', label: 'Name A-Z' },
  ];

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? {...item, quantity: item.quantity + 1} 
            : item
        );
      } else {
        return [...prev, {...product, quantity: 1}];
      }
    });
    setShowCompare(true);
  };

  // Format supplier name if filtered by supplier
  const getSupplierInfo = () => {
    if (supplierIdFromUrl) {
      const supplier = products.find(p => p.supplierId === parseInt(supplierIdFromUrl))?.supplier;
      if (supplier) {
        return (
          <Alert variant="info" className="mb-6">
            <div className="flex items-center">
              <FaStore className="mr-2 text-indigo-500" />
              <span>
                You are viewing products from <strong>{supplier}</strong>. 
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-2 text-indigo-600 underline"
                  onClick={() => window.history.pushState({}, "", "/dashboard/products")}
                >
                  View all suppliers
                </Button>
              </span>
            </div>
          </Alert>
        );
      }
    }
    return null;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Raw Materials Catalog</h1>
          <p className="text-gray-600 mt-1">Find quality ingredients at competitive prices for your street food business</p>
        </div>
        <div className="flex items-center space-x-4">
          {cartItems.length > 0 && (
            <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded">
              <FaShoppingCart className="mr-2" />
              <span>{cartItems.length} items</span>
              <Button 
                size="sm" 
                variant="ghost" 
                className="ml-2 text-green-800"
                onClick={() => setShowCompare(true)}
              >
                View Cart
              </Button>
            </div>
          )}
          <Link to="/dashboard/products/request">
            <Button variant="outline">Request Material</Button>
          </Link>
        </div>
      </div>
      
      {getSupplierInfo()}
      
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <FormGroup>
            <Label htmlFor="categoryFilter">Filter by Category</Label>
            <Select
              id="categoryFilter"
              options={categoryOptions}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="sortBy" className="flex items-center">
              <FaSort className="mr-2" /> Sort by
            </Label>
            <Select
              id="sortBy"
              options={sortOptions}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <Input
              id="searchProduct"
              placeholder="Search products..."
            />
          </FormGroup>
        </div>
      </Card>
      
      {/* Product Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {sortedProducts.length > 0 ? (
          sortedProducts.map(product => (
            <Card key={product.id} className="h-full flex flex-col">
              <div className="h-40 bg-gray-100 rounded-t flex items-center justify-center">
                {/* Placeholder for product image */}
                <div className="flex items-center justify-center bg-indigo-100 rounded-full w-20 h-20">
                  <FaTags className="text-indigo-500 text-2xl" />
                </div>
              </div>
              <div className="p-4 flex-grow">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-lg text-indigo-700">{product.name}</h3>
                  <Badge variant="info">{product.categoryLabel}</Badge>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-amber-500 flex items-center">
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                    <span className="ml-1 text-gray-600 text-sm">{product.rating}</span>
                  </span>
                </div>
                <div className="mt-3 flex items-center text-xl font-bold text-gray-800">
                  <FaRupeeSign className="text-sm" /> {product.price}
                  <span className="ml-1 text-sm font-normal text-gray-500">{product.pricePerUnit}</span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">Min Order:</span> {product.minOrder}
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  <span className="font-medium">Supplier:</span> {product.supplier} ({product.supplierRegion})
                </div>
                {product.offers.length > 0 && (
                  <div className="mt-3">
                    {product.offers.map((offer, i) => (
                      <Badge key={i} variant="success" className="mr-2 mb-1">{offer}</Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-4 pt-0 mt-auto">
                <Button 
                  variant="primary" 
                  fullWidth
                  onClick={() => addToCart(product)}
                >
                  <FaShoppingCart className="mr-2" /> Add to Cart
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No products found matching your criteria</p>
          </div>
        )}
      </div>
      
      {showCompare && cartItems.length > 0 && (
        <Card className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Your Shopping Cart</h2>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-500"
              onClick={() => setShowCompare(false)}
            >
              Hide
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.supplier}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <FaRupeeSign className="inline text-xs" /> {item.price} {item.pricePerUnit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <select 
                        className="border rounded px-2 py-1"
                        value={item.quantity}
                        onChange={(e) => {
                          const qty = parseInt(e.target.value);
                          setCartItems(prev => prev.map(i => 
                            i.id === item.id ? {...i, quantity: qty} : i
                          ));
                        }}
                      >
                        {[1, 2, 3, 5, 10, 15, 20].map(q => (
                          <option key={q} value={q}>{q}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <FaRupeeSign className="inline text-xs" /> {(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td colSpan="4" className="px-6 py-4 text-right font-medium">Total:</td>
                  <td className="px-6 py-4 font-bold text-lg">
                    <FaRupeeSign className="inline text-sm" /> {
                      cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-end space-x-4">
            <Button 
              variant="secondary" 
              onClick={() => setCartItems([])}
            >
              Clear Cart
            </Button>
            <Link to="/dashboard/checkout">
              <Button>Proceed to Checkout</Button>
            </Link>
          </div>
        </Card>
      )}
      
      <Card className="bg-amber-50 border-amber-200">
        <div className="flex items-start">
          <div className="bg-amber-100 rounded-full p-3 mr-4">
            <FaShoppingCart className="text-amber-600 text-xl" />
          </div>
          <div>
            <h3 className="font-medium text-lg text-amber-800 mb-2">Bulk Order Benefits</h3>
            <p className="text-amber-700 mb-3">
              Looking for regular supplies? Create a standing order and get access to:
            </p>
            <ul className="list-disc list-inside text-amber-700 space-y-1 mb-4">
              <li>Special bulk pricing with up to 20% savings</li>
              <li>Priority delivery slots, including early morning delivery</li>
              <li>Consistent quality with dedicated account manager</li>
              <li>Flexible payment terms for regular customers</li>
            </ul>
            <Button 
              variant="outline" 
              className="border-amber-500 text-amber-700 hover:bg-amber-100"
            >
              Set up Bulk Order
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductsPage;