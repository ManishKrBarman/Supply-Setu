import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaSpinner, FaExclamationTriangle, FaLocationArrow } from 'react-icons/fa';
import LocationService from '../utils/locationService';

const LocationDetector = ({ onLocationDetected, onLocationError, className = "" }) => {
  const [locationStatus, setLocationStatus] = useState('idle'); // idle, detecting, success, error, permission_denied
  const [error, setError] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('prompt');

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    try {
      const permission = await LocationService.checkLocationPermission();
      setPermissionStatus(permission);
      
      if (permission === 'granted') {
        detectLocation();
      }
    } catch (error) {
      console.error('Error checking permission:', error);
    }
  };

  const detectLocation = async () => {
    setLocationStatus('detecting');
    setError(null);

    try {
      const location = await LocationService.getCurrentLocation();
      setLocationStatus('success');
      onLocationDetected && onLocationDetected(location);
    } catch (error) {
      setLocationStatus('error');
      setError(error.message);
      onLocationError && onLocationError(error);
      
      // Try approximate location as fallback
      try {
        const approximateLocation = await LocationService.getApproximateLocation();
        setLocationStatus('success');
        onLocationDetected && onLocationDetected({
          ...approximateLocation,
          isApproximate: true
        });
      } catch (fallbackError) {
        console.error('Fallback location failed:', fallbackError);
      }
    }
  };

  const requestLocation = () => {
    if (permissionStatus === 'denied') {
      // Show instructions for enabling location
      setError('Please enable location access in your browser settings and refresh the page.');
      return;
    }
    detectLocation();
  };

  const renderLocationButton = () => {
    switch (locationStatus) {
      case 'detecting':
        return (
          <button
            disabled
            className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-lg cursor-not-allowed"
          >
            <FaSpinner className="animate-spin mr-2" />
            Detecting Location...
          </button>
        );

      case 'success':
        return (
          <button
            onClick={detectLocation}
            className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            <FaLocationArrow className="mr-2" />
            Update Location
          </button>
        );

      case 'error':
        return (
          <button
            onClick={requestLocation}
            className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            <FaExclamationTriangle className="mr-2" />
            Retry Location
          </button>
        );

      default:
        return (
          <button
            onClick={requestLocation}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaMapMarkerAlt className="mr-2" />
            Find Nearby Suppliers
          </button>
        );
    }
  };

  return (
    <div className={`location-detector ${className}`}>
      <div className="flex flex-col items-center space-y-3">
        {renderLocationButton()}
        
        {error && (
          <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg max-w-md text-center">
            <FaExclamationTriangle className="inline mr-1" />
            {error}
          </div>
        )}
        
        {locationStatus === 'success' && (
          <div className="text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
            ✅ Location detected successfully!
          </div>
        )}

        {permissionStatus === 'denied' && (
          <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg max-w-md text-center">
            💡 To find nearby suppliers, please enable location access in your browser settings
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationDetector;
