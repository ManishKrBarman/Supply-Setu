import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Table, Badge, Alert } from '../components/DataDisplay';
import Button from '../components/Button';
import { FormGroup, Label, Input, Select } from '../components/FormElements';
import { FaFilter, FaStar, FaMapMarkerAlt, FaPhoneAlt, FaMotorcycle, FaCheck, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';
import { getSuppliers } from '../api/supplierService';
import { getUserRole, getCurrentUser } from '../api/authService';

const SuppliersPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const filters = {};
        if (selectedCategory !== 'all') filters.category = selectedCategory;
        if (selectedRegion !== 'all') filters.region = selectedRegion;
        
        const suppliersData = await getSuppliers(filters);
        
        // Handle different response formats
        if (Array.isArray(suppliersData)) {
          setSuppliers(suppliersData);
        } else if (suppliersData && Array.isArray(suppliersData.data)) {
          setSuppliers(suppliersData.data);
        } else if (suppliersData && Array.isArray(suppliersData.suppliers)) {
          setSuppliers(suppliersData.suppliers);
        } else {
          console.warn('Unexpected suppliers data format:', suppliersData);
          setSuppliers([]); // Fallback to empty array
        }
        
        const role = getUserRole();
        setUserRole(role);
        
        const user = getCurrentUser();
        setCurrentUser(user);
      } catch (err) {
        console.error('Error fetching suppliers:', err);
        setError('Failed to load suppliers. Please try again later.');
        setSuppliers([]); // Ensure suppliers is always an array
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [selectedCategory, selectedRegion]);
  
  // If we still need some mock data for testing until backend is fully implemented
  const testSuppliers = suppliers.length > 0 ? suppliers : [
    { 
      _id: '1', 
      name: 'Singh Vegetable Supply', 
      category: 'vegetables',
      categoryLabel: 'Vegetables & Fruits',
      contact: 'Harpreet Singh', 
      email: '',
      phone: '9876543210', 
      address: 'Shop 12, Sadar Bazaar Market, Delhi',
      region: 'north_delhi',
      regionLabel: 'North Delhi',
      rating: 4.7,
      features: ['Delivery Available', 'Bulk Discount', 'Quality Assured'],
      isVerified: true,
      verificationStatus: 'verified'
    },
    { 
      _id: '2', 
      name: 'Sharma Masala Mart', 
      category: 'spices',
      categoryLabel: 'Spices & Condiments',
      contact: 'Ramesh Sharma', 
      email: 'sharmamasala@gmail.com',
      phone: '9812345670', 
      address: 'Shop 45, Khari Baoli, Old Delhi',
      region: 'central_delhi',
      regionLabel: 'Central Delhi',
      rating: 4.9,
      features: ['Premium Quality', 'Bulk Discount'],
      isVerified: true,
      verificationStatus: 'verified'
    },
    { 
      id: 3, 
      name: 'Fresh Dairy Supplies', 
      category: 'dairy',
      categoryLabel: 'Dairy Products',
      contact: 'Rajesh Kumar', 
      email: 'freshdairy@yahoo.com',
      phone: '9898767654', 
      address: '23-A, Sector 18, Noida',
      region: 'noida',
      regionLabel: 'Noida',
      rating: 4.5,
      features: ['Morning Delivery', 'Quality Assured'],
      status: 'Verified' 
    },
    { 
      id: 4, 
      name: 'Gupta Oil Traders', 
      category: 'oils',
      categoryLabel: 'Cooking Oils',
      contact: 'Mukesh Gupta', 
      email: 'guptaoils@gmail.com',
      phone: '9876123450', 
      address: 'Shop 5, Sarojini Nagar Market',
      region: 'south_delhi',
      regionLabel: 'South Delhi',
      rating: 4.2,
      features: ['Wholesale Prices', 'Multiple Brands'],
      status: 'Verified' 
    },
    { 
      id: 5, 
      name: 'Eco Food Packaging', 
      category: 'packaging',
      categoryLabel: 'Packaging Materials',
      contact: 'Priya Patel', 
      email: 'ecopackage@gmail.com',
      phone: '9977885566', 
      address: 'Plot 34, Udyog Vihar Phase 5, Gurgaon',
      region: 'gurgaon',
      regionLabel: 'Gurgaon',
      rating: 4.4,
      features: ['Eco-friendly Options', 'Custom Sizes'],
      status: 'Pending Verification' 
    },
    { 
      id: 6, 
      name: 'Malhotra Rice & Flour', 
      category: 'grains',
      categoryLabel: 'Grains & Flours',
      contact: 'Vijay Malhotra', 
      email: '',
      phone: '9811223344', 
      address: 'Shop 78, Chandni Chowk, Delhi',
      region: 'central_delhi',
      regionLabel: 'Central Delhi',
      rating: 4.8,
      features: ['Bulk Discount', 'Free Delivery (Min Order)'],
      status: 'Verified' 
    },
  ];

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
  
  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'north_delhi', label: 'North Delhi' },
    { value: 'south_delhi', label: 'South Delhi' },
    { value: 'east_delhi', label: 'East Delhi' },
    { value: 'west_delhi', label: 'West Delhi' },
    { value: 'central_delhi', label: 'Central Delhi' },
    { value: 'noida', label: 'Noida' },
    { value: 'gurgaon', label: 'Gurgaon' },
    { value: 'faridabad', label: 'Faridabad' },
    { value: 'ghaziabad', label: 'Ghaziabad' },
  ];

  // Filter suppliers based on selected category and region
  const filteredSuppliers = Array.isArray(suppliers) ? suppliers.filter(supplier => {
    const categoryMatch = selectedCategory === 'all' || supplier.category === selectedCategory;
    const regionMatch = selectedRegion === 'all' || supplier.region === selectedRegion;
    return categoryMatch && regionMatch;
  }) : [];

  const columns = [
    { 
      header: 'Supplier Details', 
      accessor: 'name',
      render: (row) => (
        <div>
          <div className="font-medium text-indigo-700">{row.name}</div>
          <div className="text-sm text-gray-600">{row.categoryLabel}</div>
          <div className="flex items-center mt-1">
            <span className="flex items-center text-amber-500">
              <FaStar className="mr-1" size={14} /> 
              {row.rating}
            </span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="flex items-center text-gray-600 text-sm">
              <FaMapMarkerAlt className="mr-1" size={12} /> 
              {row.regionLabel}
            </span>
          </div>
        </div>
      )
    },
    { 
      header: 'Contact', 
      accessor: 'contact',
      render: (row) => (
        <div>
          <div>{row.contact}</div>
          <div className="flex items-center text-gray-600 text-sm mt-1">
            <FaPhoneAlt className="mr-1" size={12} /> 
            {row.phone}
          </div>
          {row.email && <div className="text-sm">{row.email}</div>}
        </div>
      )
    },
    { 
      header: 'Features', 
      accessor: 'features',
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          {row.features.map((feature, index) => (
            <Badge key={index} variant={index % 2 === 0 ? 'primary' : 'info'}>
              {feature}
            </Badge>
          ))}
        </div>
      )
    },
    { 
      header: 'Verification', 
      accessor: 'verificationStatus',
      render: (row) => {
        if (row.isVerified) {
          return (
            <div className="flex items-center">
              <Badge variant="success" className="flex items-center">
                <FaShieldAlt className="mr-1" /> Verified
              </Badge>
              <div className="ml-2 text-green-700">
                <FaCheckCircle />
              </div>
            </div>
          );
        } else if (row.verificationStatus === 'pending') {
          return <Badge variant="warning">Pending Verification</Badge>;
        } else {
          return <Badge variant="secondary">Not Verified</Badge>;
        }
      }
    },
    {
      header: 'Actions',
      render: (row) => {
        // If this is the supplier viewing their own page
        const isOwnSupplier = currentUser?.id === row._id || currentUser?.supplierId === row._id;
        
        return (
          <div className="flex flex-col space-y-2">
            {userRole === 'vendor' && (
              <Link to={`/dashboard/products?supplier=${row._id}`} className="w-full">
                <Button size="sm" variant="primary" fullWidth>
                  <FaMotorcycle className="mr-1" /> Order Now
                </Button>
              </Link>
            )}
            
            <Link to={`/dashboard/suppliers/ratings/${row._id}`} className="w-full">
              <Button size="sm" variant="info" fullWidth>
                <FaStar className="mr-1" /> See Reviews
              </Button>
            </Link>
            
            {isOwnSupplier && !row.isVerified && (
              <Link to={`/dashboard/suppliers/verify/${row._id}`} className="w-full">
                <Button size="sm" variant="success" fullWidth>
                  <FaShieldAlt className="mr-1" /> Get Verified
                </Button>
              </Link>
            )}
            
            {userRole === 'admin' && (
              <Link to={`/dashboard/suppliers/edit/${row._id}`} className="w-full">
                <Button size="sm" variant="secondary" fullWidth>Edit</Button>
              </Link>
            )}
          </div>
        );
      }
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Raw Material Suppliers</h1>
          <p className="text-gray-600 mt-1">Find and connect with verified suppliers for your street food business</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter className="mr-2" /> Filter
          </Button>
          <Link to="/dashboard/suppliers/new">
            <Button>Add New Supplier</Button>
          </Link>
        </div>
      </div>
      
      {showFilters && (
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <Label htmlFor="regionFilter">Filter by Region</Label>
              <Select
                id="regionFilter"
                options={regionOptions}
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="searchSupplier">Search by Name</Label>
              <div className="flex">
                <Input
                  id="searchSupplier"
                  placeholder="Search suppliers..."
                />
              </div>
            </FormGroup>
          </div>
          
          <div className="mt-4 flex items-center">
            <Alert variant="info" className="text-sm flex-grow">
              <p>Pro Tip: Suppliers with the "Verified" badge have been vetted for quality and reliability.</p>
            </Alert>
            <Button 
              variant="secondary" 
              size="sm" 
              className="ml-4"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedRegion('all');
              }}
            >
              Reset Filters
            </Button>
          </div>
        </Card>
      )}
      
      <Card>
        <Table 
          columns={columns}
          data={filteredSuppliers}
          emptyMessage="No suppliers found matching your criteria"
        />
      </Card>
      
      <div className="mt-6 bg-indigo-50 p-4 rounded-lg">
        <h3 className="font-medium text-indigo-700">Need Help Finding Suppliers?</h3>
        <p className="text-gray-700 mt-1">Join our WhatsApp group to connect with other street food vendors and get recommendations for trusted suppliers in your area.</p>
        <Button 
          variant="ghost" 
          className="mt-2 text-indigo-600 hover:bg-indigo-100"
          onClick={() => window.open('https://chat.whatsapp.com/supplysetu', '_blank')}
        >
          Join WhatsApp Community
        </Button>
      </div>
    </div>
  );
};

export default SuppliersPage;