// Location service for handling geolocation and distance calculations
export class LocationService {

    /**
     * Get current user location using browser's geolocation API
     * @returns {Promise} Promise that resolves to {lat, lng} coordinates
     */
    static async getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by this browser'));
                return;
            }

            const options = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes
            };

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    });
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            reject(new Error('Location access denied by user'));
                            break;
                        case error.POSITION_UNAVAILABLE:
                            reject(new Error('Location information is unavailable'));
                            break;
                        case error.TIMEOUT:
                            reject(new Error('Location request timed out'));
                            break;
                        default:
                            reject(new Error('An unknown error occurred while getting location'));
                            break;
                    }
                },
                options
            );
        });
    }

    /**
     * Calculate distance between two points using Haversine formula
     * @param {number} lat1 - Latitude of first point
     * @param {number} lng1 - Longitude of first point
     * @param {number} lat2 - Latitude of second point
     * @param {number} lng2 - Longitude of second point
     * @returns {number} Distance in kilometers
     */
    static calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // Earth's radius in kilometers
        const dLat = this.toRadians(lat2 - lat1);
        const dLng = this.toRadians(lng2 - lng1);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    /**
     * Convert degrees to radians
     * @param {number} degrees - Degrees to convert
     * @returns {number} Radians
     */
    static toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    /**
     * Get nearby suppliers within specified range
     * @param {object} userLocation - User's current location {lat, lng}
     * @param {array} suppliers - Array of suppliers with location data
     * @param {number} maxDistance - Maximum distance in kilometers (default: 10km)
     * @returns {array} Filtered and sorted suppliers by distance
     */
    static getNearbySuppliers(userLocation, suppliers, maxDistance = 10) {
        if (!userLocation || !suppliers || suppliers.length === 0) {
            return [];
        }

        const nearbySuppliers = suppliers
            .map(supplier => {
                // Ensure supplier has location data
                if (!supplier.location || !supplier.location.lat || !supplier.location.lng) {
                    return null;
                }

                const distance = this.calculateDistance(
                    userLocation.lat,
                    userLocation.lng,
                    supplier.location.lat,
                    supplier.location.lng
                );

                return {
                    ...supplier,
                    distance: parseFloat(distance.toFixed(2))
                };
            })
            .filter(supplier => supplier !== null && supplier.distance <= maxDistance)
            .sort((a, b) => a.distance - b.distance);

        return nearbySuppliers;
    }

    /**
     * Get mock suppliers with location data for demonstration
     * @returns {array} Array of suppliers with location data
     */
    static getMockSuppliersWithLocation() {
        // Mock suppliers around Delhi NCR area for demonstration
        return [
            {
                id: 1,
                name: "Singh Vegetable Supply",
                category: "Vegetables",
                rating: 4.8,
                specialties: ["Fresh onions", "Seasonal vegetables", "Organic produce"],
                image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                location: {
                    lat: 28.7041,
                    lng: 77.1025,
                    address: "Connaught Place, New Delhi"
                },
                contact: {
                    phone: "+91 98765 43210",
                    email: "singh.vegetables@example.com"
                },
                products: ["Onions", "Potatoes", "Tomatoes", "Green Vegetables"],
                priceRange: "₹20-150/kg"
            },
            {
                id: 2,
                name: "Sharma Masala Mart",
                category: "Spices",
                rating: 4.9,
                specialties: ["Authentic spices", "Pure quality", "Wholesale rates"],
                image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                location: {
                    lat: 28.6562,
                    lng: 77.2410,
                    address: "Karol Bagh, New Delhi"
                },
                contact: {
                    phone: "+91 98765 43211",
                    email: "sharma.spices@example.com"
                },
                products: ["Turmeric", "Red Chilli", "Coriander", "Garam Masala"],
                priceRange: "₹50-500/kg"
            },
            {
                id: 3,
                name: "Fresh Dairy Supplies",
                category: "Dairy",
                rating: 4.7,
                specialties: ["Fresh paneer", "Direct from farms", "Daily delivery"],
                image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                location: {
                    lat: 28.5355,
                    lng: 77.3910,
                    address: "Noida Sector 18"
                },
                contact: {
                    phone: "+91 98765 43212",
                    email: "fresh.dairy@example.com"
                },
                products: ["Milk", "Paneer", "Butter", "Yogurt"],
                priceRange: "₹30-200/kg"
            },
            {
                id: 4,
                name: "Mumbai Flour Mills",
                category: "Grains & Flour",
                rating: 4.6,
                specialties: ["Fresh grinding", "Quality grains", "Bulk supply"],
                image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                location: {
                    lat: 28.6139,
                    lng: 77.2090,
                    address: "Paharganj, New Delhi"
                },
                contact: {
                    phone: "+91 98765 43213",
                    email: "mumbai.flour@example.com"
                },
                products: ["Wheat Flour", "Rice", "Besan", "Suji"],
                priceRange: "₹25-80/kg"
            },
            {
                id: 5,
                name: "Green Valley Oils",
                category: "Oils & Condiments",
                rating: 4.8,
                specialties: ["Pure oils", "Cold pressed", "Organic options"],
                image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                location: {
                    lat: 28.7196,
                    lng: 77.0621,
                    address: "Rohini, New Delhi"
                },
                contact: {
                    phone: "+91 98765 43214",
                    email: "greenvalley.oils@example.com"
                },
                products: ["Mustard Oil", "Sunflower Oil", "Olive Oil", "Coconut Oil"],
                priceRange: "₹100-400/L"
            },
            {
                id: 6,
                name: "Rajesh Sweet Supplies",
                category: "Sweets & Snacks",
                rating: 4.5,
                specialties: ["Traditional sweets", "Fresh preparation", "Festival specials"],
                image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                location: {
                    lat: 28.6692,
                    lng: 77.4538,
                    address: "Ghaziabad, UP"
                },
                contact: {
                    phone: "+91 98765 43215",
                    email: "rajesh.sweets@example.com"
                },
                products: ["Jalebi Mix", "Gulab Jamun", "Samosa Sheets", "Namkeen"],
                priceRange: "₹150-800/kg"
            }
        ];
    }

    /**
     * Format distance for display
     * @param {number} distance - Distance in kilometers
     * @returns {string} Formatted distance string
     */
    static formatDistance(distance) {
        if (distance < 1) {
            return `${Math.round(distance * 1000)}m`;
        }
        return `${distance.toFixed(1)}km`;
    }

    /**
     * Get delivery time estimate based on distance
     * @param {number} distance - Distance in kilometers
     * @returns {string} Estimated delivery time
     */
    static getDeliveryTime(distance) {
        if (distance <= 2) return "15-30 mins";
        if (distance <= 5) return "30-45 mins";
        if (distance <= 10) return "45-60 mins";
        return "1-2 hours";
    }

    /**
     * Check if location permission is granted
     * @returns {Promise} Promise that resolves to permission status
     */
    static async checkLocationPermission() {
        if (!navigator.permissions) {
            return 'prompt'; // Default assumption
        }

        try {
            const permission = await navigator.permissions.query({ name: 'geolocation' });
            return permission.state; // 'granted', 'denied', or 'prompt'
        } catch (error) {
            console.error('Error checking location permission:', error);
            return 'prompt';
        }
    }

    /**
     * Get user's approximate location based on IP (fallback method)
     * This would typically use a service like ipapi.co or similar
     * @returns {Promise} Promise that resolves to approximate location
     */
    static async getApproximateLocation() {
        try {
            // For demo purposes, return Delhi coordinates
            // In production, you would use an IP geolocation service
            return {
                lat: 28.6139,
                lng: 77.2090,
                city: 'New Delhi',
                accuracy: 'approximate'
            };
        } catch (error) {
            console.error('Error getting approximate location:', error);
            throw new Error('Unable to determine location');
        }
    }
}

export default LocationService;
