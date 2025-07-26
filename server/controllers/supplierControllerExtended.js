import { Supplier } from '../models/index.js';
import { asyncHandler, ErrorResponse } from '../middleware/errorMiddleware.js';
import { mockSuppliers } from '../mockData/supplierMockData.js';

// Helper function to calculate distance between two points using Haversine formula
const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
};

// Generate mock suppliers with location data (Delhi NCR area)
const getMockSuppliersWithLocation = () => {
    return [
        {
            _id: "61dbae02fc13ae1d39000001",
            name: "Singh Vegetable Supply",
            category: "Vegetables",
            contactPerson: "Rajinder Singh",
            email: "rajinder@singhvegetables.com",
            phone: "9876543210",
            rating: 4.8,
            specialties: ["Fresh onions", "Seasonal vegetables", "Organic produce"],
            image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            location: {
                type: "Point",
                coordinates: [77.1025, 28.7041], // Connaught Place, Delhi
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
            _id: "61dbae02fc13ae1d39000002",
            name: "Sharma Masala Mart",
            category: "Spices",
            contactPerson: "Amit Sharma",
            email: "amit@sharmamasala.com",
            phone: "9876543211",
            rating: 4.9,
            specialties: ["Authentic spices", "Pure quality", "Wholesale rates"],
            image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            location: {
                type: "Point",
                coordinates: [77.2410, 28.6562], // Karol Bagh, Delhi
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
            _id: "61dbae02fc13ae1d39000003",
            name: "Fresh Dairy Supplies",
            category: "Dairy",
            contactPerson: "Mohan Kumar",
            email: "mohan@freshdairy.com",
            phone: "9876543212",
            rating: 4.7,
            specialties: ["Fresh paneer", "Direct from farms", "Daily delivery"],
            image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            location: {
                type: "Point",
                coordinates: [77.3910, 28.5355], // Noida Sector 18
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
            _id: "61dbae02fc13ae1d39000004",
            name: "Mumbai Flour Mills",
            category: "Grains & Flour",
            contactPerson: "Suresh Patel",
            email: "suresh@mumbaiflour.com",
            phone: "9876543213",
            rating: 4.6,
            specialties: ["Fresh grinding", "Quality grains", "Bulk supply"],
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            location: {
                type: "Point",
                coordinates: [77.2090, 28.6139], // Paharganj, Delhi
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
            _id: "61dbae02fc13ae1d39000005",
            name: "Green Valley Oils",
            category: "Oils & Condiments",
            contactPerson: "Vikram Singh",
            email: "vikram@greenvalley.com",
            phone: "9876543214",
            rating: 4.8,
            specialties: ["Pure oils", "Cold pressed", "Organic options"],
            image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            location: {
                type: "Point",
                coordinates: [77.0621, 28.7196], // Rohini, Delhi
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
            _id: "61dbae02fc13ae1d39000006",
            name: "Rajesh Sweet Supplies",
            category: "Sweets & Snacks",
            contactPerson: "Rajesh Kumar",
            email: "rajesh@sweetcity.com",
            phone: "9876543215",
            rating: 4.5,
            specialties: ["Traditional sweets", "Fresh preparation", "Festival specials"],
            image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            location: {
                type: "Point",
                coordinates: [77.4538, 28.6692], // Ghaziabad, UP
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
};

// Get nearby suppliers
export const getNearbySuppliers = asyncHandler(async (req, res) => {
    const { lat, lng, radius = 10, category } = req.query;

    if (!lat || !lng) {
        // If no location provided, return mock data for demonstration
        const mockSuppliers = getMockSuppliersWithLocation();
        let filteredSuppliers = mockSuppliers;

        if (category && category !== 'all') {
            filteredSuppliers = mockSuppliers.filter(supplier =>
                supplier.category.toLowerCase().includes(category.toLowerCase())
            );
        }

        return res.status(200).json({
            success: true,
            count: filteredSuppliers.length,
            data: filteredSuppliers,
            message: "Mock data returned - enable location for accurate results"
        });
    }

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    const searchRadius = parseFloat(radius);

    if (isNaN(userLat) || isNaN(userLng) || isNaN(searchRadius)) {
        throw new ErrorResponse('Invalid coordinates or radius', 400);
    }

    try {
        // Try to get suppliers from database first
        let query = {};
        if (category && category !== 'all') {
            query.category = new RegExp(category, 'i');
        }

        const dbSuppliers = await Supplier.find(query);

        if (dbSuppliers.length === 0) {
            // Fallback to mock data with location filtering
            const mockSuppliers = getMockSuppliersWithLocation();
            let filteredSuppliers = mockSuppliers;

            if (category && category !== 'all') {
                filteredSuppliers = mockSuppliers.filter(supplier =>
                    supplier.category.toLowerCase().includes(category.toLowerCase())
                );
            }

            // Calculate distances for mock suppliers
            const nearbySuppliers = filteredSuppliers
                .map(supplier => {
                    const [supplierLng, supplierLat] = supplier.location.coordinates;
                    const distance = calculateDistance(userLat, userLng, supplierLat, supplierLng);

                    if (distance <= searchRadius) {
                        return {
                            ...supplier,
                            distance: parseFloat(distance.toFixed(2))
                        };
                    }
                    return null;
                })
                .filter(supplier => supplier !== null)
                .sort((a, b) => a.distance - b.distance);

            return res.status(200).json({
                success: true,
                count: nearbySuppliers.length,
                data: nearbySuppliers,
                searchParams: {
                    userLocation: { lat: userLat, lng: userLng },
                    radius: searchRadius,
                    category: category || 'all'
                },
                message: "Results from mock data"
            });
        }

        // Filter database suppliers by distance
        const nearbySuppliers = dbSuppliers
            .map(supplier => {
                if (!supplier.location || !supplier.location.coordinates) {
                    return null;
                }

                const [supplierLng, supplierLat] = supplier.location.coordinates;
                const distance = calculateDistance(userLat, userLng, supplierLat, supplierLng);

                if (distance <= searchRadius) {
                    return {
                        ...supplier.toObject(),
                        distance: parseFloat(distance.toFixed(2))
                    };
                }
                return null;
            })
            .filter(supplier => supplier !== null)
            .sort((a, b) => a.distance - b.distance);

        res.status(200).json({
            success: true,
            count: nearbySuppliers.length,
            data: nearbySuppliers,
            searchParams: {
                userLocation: { lat: userLat, lng: userLng },
                radius: searchRadius,
                category: category || 'all'
            },
            message: "Results from database"
        });

    } catch (error) {
        console.error('Database error, falling back to mock data:', error);

        // Fallback to mock data
        const mockSuppliers = getMockSuppliersWithLocation();
        let filteredSuppliers = mockSuppliers;

        if (category && category !== 'all') {
            filteredSuppliers = mockSuppliers.filter(supplier =>
                supplier.category.toLowerCase().includes(category.toLowerCase())
            );
        }

        const nearbySuppliers = filteredSuppliers
            .map(supplier => {
                const [supplierLng, supplierLat] = supplier.location.coordinates;
                const distance = calculateDistance(userLat, userLng, supplierLat, supplierLng);

                if (distance <= searchRadius) {
                    return {
                        ...supplier,
                        distance: parseFloat(distance.toFixed(2))
                    };
                }
                return null;
            })
            .filter(supplier => supplier !== null)
            .sort((a, b) => a.distance - b.distance);

        res.status(200).json({
            success: true,
            count: nearbySuppliers.length,
            data: nearbySuppliers,
            searchParams: {
                userLocation: { lat: userLat, lng: userLng },
                radius: searchRadius,
                category: category || 'all'
            },
            message: "Fallback to mock data due to database issue"
        });
    }
});

// Seed mock supplier data
export const seedMockSuppliers = asyncHandler(async (req, res) => {
    try {
        // Clear existing data
        await Supplier.deleteMany({});

        // Insert mock suppliers
        const suppliers = await Supplier.insertMany(req.body || mockSuppliers);

        res.status(201).json({
            success: true,
            message: 'Mock supplier data seeded successfully',
            count: suppliers.length
        });
    } catch (error) {
        throw new ErrorResponse(error.message, 400);
    }
});
