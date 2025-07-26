import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaStar, FaPhone, FaFilter, FaMap, FaList } from 'react-icons/fa';
import LocationDetector from './LocationDetector';
import SuppliersMap from './SuppliersMap';
import LocationService from '../utils/locationService';

const NearbySuppliers = ({ className = "" }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [nearbySuppliers, setNearbySuppliers] = useState([]);
  const [searchRadius, setSearchRadius] = useState(10); // kilometers
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  // Categories for filtering
  const categories = [
    { value: 'all', label: 'All Categories', icon: '🏪' },
    { value: 'vegetables', label: 'Vegetables', icon: '🥬' },
    { value: 'spices', label: 'Spices', icon: '🌶️' },
    { value: 'dairy', label: 'Dairy', icon: '🥛' },
    { value: 'grains & flour', label: 'Grains & Flour', icon: '🌾' },
    { value: 'oils & condiments', label: 'Oils', icon: '🫒' },
    { value: 'sweets & snacks', label: 'Sweets', icon: '🍯' }
  ];

  useEffect(() => {
    // Load mock suppliers
    const mockSuppliers = LocationService.getMockSuppliersWithLocation();
    setAllSuppliers(mockSuppliers);
  }, []);

  useEffect(() => {
    if (userLocation && allSuppliers.length > 0) {
      updateNearbySuppliers();
    }
  }, [userLocation, allSuppliers, searchRadius, selectedCategory]);

  const updateNearbySuppliers = () => {
    let filtered = LocationService.getNearbySuppliers(userLocation, allSuppliers, searchRadius);
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(supplier => 
        supplier.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setNearbySuppliers(filtered);
  };

  const handleLocationDetected = (location) => {
    setUserLocation(location);
  };

  const handleLocationError = (error) => {
    console.error('Location detection error:', error);
    // You could show a fallback location or error message
  };

  const handleSupplierSelect = (supplier) => {
    setSelectedSupplier(supplier);
  };

  const renderSupplierCard = (supplier) => (
    <div 
      key={supplier.id}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border border-gray-200"
    >
      <div className="flex items-start space-x-4">
        {/* Supplier Image */}
        <div className="flex-shrink-0">
          <img 
            src={supplier.image} 
            alt={supplier.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
        </div>

        {/* Supplier Info */}
        <div className="flex-grow">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-lg text-gray-800">{supplier.name}</h3>
              <div className="flex items-center space-x-2 text-sm">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {supplier.category}
                </span>
                <span className="text-green-600 font-medium">
                  📍 {LocationService.formatDistance(supplier.distance)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-lg mb-1">
                <FaStar className="text-yellow-500 text-sm mr-1" />
                <span className="font-bold text-yellow-700">{supplier.rating}</span>
              </div>
              <div className="text-xs text-gray-500">
                {LocationService.getDeliveryTime(supplier.distance)}
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="mb-2">
            <div className="flex flex-wrap gap-1">
              {supplier.specialties.slice(0, 3).map((specialty, index) => (
                <span 
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="mb-3">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Products: </span>
              {supplier.products.slice(0, 4).join(', ')}
              {supplier.products.length > 4 && '...'}
            </div>
          </div>

          {/* Price Range */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-green-600">
              💰 {supplier.priceRange}
            </span>
            <div className="flex space-x-2">
              {supplier.contact.phone && (
                <button className="text-blue-600 hover:text-blue-800">
                  <FaPhone className="text-sm" />
                </button>
              )}
              <button 
                onClick={() => handleSupplierSelect(supplier)}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`nearby-suppliers ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Find Nearby Suppliers</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover local suppliers in your area with our location-based search. 
          Get real-time distance calculations and find the best suppliers near you.
        </p>
      </div>

      {/* Location Detector */}
      <div className="mb-8">
        <LocationDetector 
          onLocationDetected={handleLocationDetected}
          onLocationError={handleLocationError}
          className="text-center"
        />
      </div>

      {/* Controls */}
      {userLocation && (
        <div className="mb-6 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'map'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <FaMap className="mr-2 inline" />
                Map View
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <FaList className="mr-2 inline" />
                List View
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-3">
              <FaFilter className="text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.icon} {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Radius */}
            <div className="flex items-center space-x-3">
              <label className="text-sm font-medium text-gray-700">
                Search Radius:
              </label>
              <select
                value={searchRadius}
                onChange={(e) => setSearchRadius(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={5}>5 km</option>
                <option value={10}>10 km</option>
                <option value={15}>15 km</option>
                <option value={25}>25 km</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 text-sm text-gray-600">
            Found <span className="font-semibold text-blue-600">{nearbySuppliers.length}</span> suppliers
            {selectedCategory !== 'all' && (
              <span> in <span className="font-medium">{categories.find(c => c.value === selectedCategory)?.label}</span></span>
            )}
            {userLocation && (
              <span> within <span className="font-medium">{searchRadius}km</span> of your location</span>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      {userLocation && nearbySuppliers.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map or List View */}
          <div className={viewMode === 'map' ? 'lg:col-span-2' : 'lg:col-span-3'}>
            {viewMode === 'map' ? (
              <SuppliersMap
                suppliers={nearbySuppliers}
                userLocation={userLocation}
                searchRadius={searchRadius}
                height="500px"
                onSupplierSelect={handleSupplierSelect}
              />
            ) : (
              <div className="space-y-4">
                {nearbySuppliers.map(supplier => renderSupplierCard(supplier))}
              </div>
            )}
          </div>

          {/* Sidebar (only in map view) */}
          {viewMode === 'map' && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-800 mb-4">
                Nearby Suppliers ({nearbySuppliers.length})
              </h3>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {nearbySuppliers.map(supplier => (
                  <div 
                    key={supplier.id}
                    className="bg-white rounded-lg shadow-sm p-3 border border-gray-200 hover:border-blue-300 cursor-pointer transition-colors"
                    onClick={() => handleSupplierSelect(supplier)}
                  >
                    <div className="flex items-center space-x-3">
                      <img 
                        src={supplier.image} 
                        alt={supplier.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-grow">
                        <h4 className="font-semibold text-gray-800 text-sm">{supplier.name}</h4>
                        <div className="text-xs text-gray-600 flex items-center space-x-2">
                          <span>{supplier.category}</span>
                          <span>•</span>
                          <span className="text-green-600">
                            {LocationService.formatDistance(supplier.distance)}
                          </span>
                        </div>
                        <div className="flex items-center mt-1">
                          <FaStar className="text-yellow-500 text-xs mr-1" />
                          <span className="text-xs font-medium">{supplier.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* No Location Message */}
      {!userLocation && (
        <div className="text-center py-16">
          <FaMapMarkerAlt className="text-6xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Enable Location Access
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Allow location access to discover suppliers near you and get accurate distance calculations.
          </p>
        </div>
      )}

      {/* No Suppliers Found */}
      {userLocation && nearbySuppliers.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No Suppliers Found
          </h3>
          <p className="text-gray-500 max-w-md mx-auto mb-4">
            No suppliers found within {searchRadius}km of your location
            {selectedCategory !== 'all' && ` for ${categories.find(c => c.value === selectedCategory)?.label}`}.
          </p>
          <button
            onClick={() => {
              setSearchRadius(25);
              setSelectedCategory('all');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Expand Search
          </button>
        </div>
      )}
    </div>
  );
};

export default NearbySuppliers;
