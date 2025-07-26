import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaStar, FaMapMarkerAlt, FaPhone, FaBox } from 'react-icons/fa';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different supplier categories
const createCustomIcon = (category, color = '#3B82F6') => {
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        border: 3px solid white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        font-size: 12px;
        color: white;
      ">
        ${getCategoryIcon(category)}
      </div>
    `,
    className: 'custom-div-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const getCategoryIcon = (category) => {
  switch (category?.toLowerCase()) {
    case 'vegetables': return '🥬';
    case 'spices': return '🌶️';
    case 'dairy': return '🥛';
    case 'grains & flour': return '🌾';
    case 'oils & condiments': return '🫒';
    case 'sweets & snacks': return '🍯';
    default: return '📦';
  }
};

const getCategoryColor = (category) => {
  switch (category?.toLowerCase()) {
    case 'vegetables': return '#22C55E';
    case 'spices': return '#EF4444';
    case 'dairy': return '#3B82F6';
    case 'grains & flour': return '#F59E0B';
    case 'oils & condiments': return '#8B5CF6';
    case 'sweets & snacks': return '#EC4899';
    default: return '#6B7280';
  }
};

const userIcon = L.divIcon({
  html: `
    <div style="
      background-color: #DC2626;
      border: 3px solid white;
      border-radius: 50%;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 12px rgba(220,38,38,0.4);
      font-size: 14px;
      color: white;
      animation: pulse 2s infinite;
    ">
      📍
    </div>
  `,
  className: 'user-location-icon',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const SuppliersMap = ({ 
  suppliers = [], 
  userLocation = null, 
  searchRadius = 10,
  height = "400px",
  onSupplierSelect = null 
}) => {
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090]); // Default to Delhi
  const [mapZoom, setMapZoom] = useState(12);

  useEffect(() => {
    if (userLocation) {
      setMapCenter([userLocation.lat, userLocation.lng]);
      setMapZoom(13);
    }
  }, [userLocation]);

  const handleSupplierClick = (supplier) => {
    if (onSupplierSelect) {
      onSupplierSelect(supplier);
    }
  };

  return (
    <div className="relative">
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .user-location-icon {
          animation: pulse 2s infinite;
        }
      `}</style>
      
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height, width: '100%' }}
        className="rounded-lg overflow-hidden border-2 border-gray-200"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* User Location Marker */}
        {userLocation && (
          <>
            <Marker 
              position={[userLocation.lat, userLocation.lng]} 
              icon={userIcon}
            >
              <Popup>
                <div className="text-center p-2">
                  <div className="font-bold text-red-600 mb-1">Your Location</div>
                  <div className="text-sm text-gray-600">
                    📍 Current Position
                  </div>
                </div>
              </Popup>
            </Marker>
            
            {/* Search Radius Circle */}
            <Circle
              center={[userLocation.lat, userLocation.lng]}
              radius={searchRadius * 1000} // Convert km to meters
              color="#3B82F6"
              fillColor="#3B82F6"
              fillOpacity={0.1}
              weight={2}
              dashArray="5,5"
            />
          </>
        )}
        
        {/* Supplier Markers */}
        {suppliers.map((supplier) => (
          <Marker
            key={supplier.id}
            position={[supplier.location.lat, supplier.location.lng]}
            icon={createCustomIcon(supplier.category, getCategoryColor(supplier.category))}
            eventHandlers={{
              click: () => handleSupplierClick(supplier)
            }}
          >
            <Popup maxWidth={300}>
              <div className="p-3 min-w-[280px]">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{supplier.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs mr-2">
                        {supplier.category}
                      </span>
                      {supplier.distance && (
                        <span className="text-green-600 font-medium">
                          📍 {supplier.distance}km away
                        </span>
                      )}
                    </div>
                  </div>
                  {supplier.image && (
                    <img 
                      src={supplier.image} 
                      alt={supplier.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-lg">
                    <FaStar className="text-yellow-500 text-sm mr-1" />
                    <span className="font-bold text-yellow-700">{supplier.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500 ml-2">Supplier Rating</span>
                </div>

                {/* Specialties */}
                {supplier.specialties && supplier.specialties.length > 0 && (
                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-700 text-sm mb-1">Specialties:</h4>
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
                )}

                {/* Products */}
                {supplier.products && supplier.products.length > 0 && (
                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-700 text-sm mb-1 flex items-center">
                      <FaBox className="mr-1" /> Products:
                    </h4>
                    <div className="text-sm text-gray-600">
                      {supplier.products.slice(0, 4).join(', ')}
                      {supplier.products.length > 4 && '...'}
                    </div>
                  </div>
                )}

                {/* Price Range */}
                {supplier.priceRange && (
                  <div className="mb-3">
                    <span className="text-sm font-semibold text-green-600">
                      💰 {supplier.priceRange}
                    </span>
                  </div>
                )}

                {/* Contact Info */}
                {supplier.contact && (
                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-700 text-sm mb-1 flex items-center">
                      <FaPhone className="mr-1" /> Contact:
                    </h4>
                    <div className="text-sm text-gray-600">
                      {supplier.contact.phone && (
                        <div>📞 {supplier.contact.phone}</div>
                      )}
                      {supplier.contact.email && (
                        <div>✉️ {supplier.contact.email}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Address */}
                <div className="text-sm text-gray-500 flex items-center">
                  <FaMapMarkerAlt className="mr-1" />
                  {supplier.location.address}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleSupplierClick(supplier)}
                  className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-10">
        <h4 className="font-semibold text-sm mb-2 text-gray-800">Map Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
            <span>Your Location</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span>Vegetable Suppliers</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-400 rounded-full mr-2"></div>
            <span>Spice Suppliers</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            <span>Dairy Suppliers</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
            <span>Other Suppliers</span>
          </div>
        </div>
      </div>

      {/* Search Radius Info */}
      {userLocation && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-10">
          <div className="text-sm">
            <div className="font-semibold text-gray-800">Search Radius</div>
            <div className="text-blue-600">{searchRadius} km around your location</div>
            <div className="text-gray-500 text-xs mt-1">
              {suppliers.length} suppliers found
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuppliersMap;
