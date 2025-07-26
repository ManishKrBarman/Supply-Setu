// Server-side mock data for suppliers

export const mockSuppliers = [
    {
        _id: "61dbae02fc13ae1d39000001",
        name: "Singh Vegetable Supply",
        category: "Vegetables & Fruits",
        contactName: "Rajinder Singh",
        contactEmail: "rajinder@singhvegetables.com",
        contactPhone: "+91 9876543210",
        address: {
            street: "45 Sabji Market",
            city: "Delhi",
            state: "Delhi",
            country: "India",
            zipCode: "110001"
        },
        rating: 4.8,
        preferredPaymentTerms: "Net 15",
        onboardingDate: "2022-08-15",
        status: "Active",
        description: "Premium supplier of fresh vegetables and fruits directly from farms",
        tags: ["vegetables", "fruits", "organic"],
        specialties: ["Fresh onions", "Seasonal vegetables"],
        priceRange: "Competitive",
        deliveryOptions: ["Same Day", "Next Day"],
        minOrderValue: 500,
        reliabilityScore: 98,
        region: "North Delhi",
        distance: 2.5,
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
        products: [
            {
                productId: "61dbae02fc13ae1d39000010",
                name: "Fresh Tomatoes",
                price: 38,
                quality: "Premium",
                availability: true
            },
            {
                productId: "61dbae02fc13ae1d39000011",
                name: "Onions",
                price: 30,
                quality: "Standard",
                availability: true
            },
            {
                productId: "61dbae02fc13ae1d39000012",
                name: "Potatoes",
                price: 24,
                quality: "Standard",
                availability: true
            }
        ]
    },
    {
        _id: "61dbae02fc13ae1d39000002",
        name: "Sharma Masala Mart",
        category: "Spices & Condiments",
        contactName: "Vivek Sharma",
        contactEmail: "vivek@sharmamasala.com",
        contactPhone: "+91 9876543211",
        address: {
            street: "22 Spice Market",
            city: "Delhi",
            state: "Delhi",
            country: "India",
            zipCode: "110002"
        },
        rating: 4.9,
        preferredPaymentTerms: "Net 30",
        onboardingDate: "2022-07-05",
        status: "Active",
        description: "Authentic spices and condiments with traditional processing methods",
        tags: ["spices", "condiments", "premium"],
        specialties: ["Authentic spices", "Pure quality"],
        priceRange: "Premium",
        deliveryOptions: ["Next Day"],
        minOrderValue: 1000,
        reliabilityScore: 99,
        region: "Central Delhi",
        distance: 3.8,
        image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757",
        products: [
            {
                productId: "61dbae02fc13ae1d39000013",
                name: "Red Chili Powder",
                price: 358,
                quality: "Premium",
                availability: true
            },
            {
                productId: "61dbae02fc13ae1d39000014",
                name: "Turmeric Powder",
                price: 220,
                quality: "Premium",
                availability: true
            },
            {
                productId: "61dbae02fc13ae1d39000015",
                name: "Cumin Seeds",
                price: 260,
                quality: "Premium",
                availability: true
            }
        ]
    },
    {
        _id: "61dbae02fc13ae1d39000003",
        name: "Fresh Dairy Supplies",
        category: "Dairy Products",
        contactName: "Anand Patel",
        contactEmail: "anand@freshdairy.com",
        contactPhone: "+91 9876543212",
        address: {
            street: "7 Dairy Complex",
            city: "Noida",
            state: "Uttar Pradesh",
            country: "India",
            zipCode: "201301"
        },
        rating: 4.7,
        preferredPaymentTerms: "COD",
        onboardingDate: "2022-09-20",
        status: "Active",
        description: "Fresh dairy products from local farms delivered daily",
        tags: ["dairy", "fresh", "local"],
        specialties: ["Fresh paneer", "Direct from farms"],
        priceRange: "Standard",
        deliveryOptions: ["Early Morning", "Evening"],
        minOrderValue: 300,
        reliabilityScore: 97,
        region: "Noida",
        distance: 4.2,
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150",
        products: [
            {
                productId: "61dbae02fc13ae1d39000016",
                name: "Fresh Paneer",
                price: 350,
                quality: "Premium",
                availability: true
            },
            {
                productId: "61dbae02fc13ae1d39000017",
                name: "Curd",
                price: 60,
                quality: "Standard",
                availability: true
            },
            {
                productId: "61dbae02fc13ae1d39000018",
                name: "Milk",
                price: 55,
                quality: "Premium",
                availability: true
            }
        ]
    },
    {
        _id: "61dbae02fc13ae1d39000004",
        name: "Gupta Oil Traders",
        category: "Cooking Oils",
        contactName: "Ramesh Gupta",
        contactEmail: "ramesh@guptaoils.com",
        contactPhone: "+91 9876543213",
        address: {
            street: "35 Market Road",
            city: "Delhi",
            state: "Delhi",
            country: "India",
            zipCode: "110034"
        },
        rating: 4.6,
        preferredPaymentTerms: "Net 15",
        onboardingDate: "2022-06-10",
        status: "Active",
        description: "Quality cooking oils for all culinary needs",
        tags: ["oils", "cooking", "bulk"],
        specialties: ["Cold pressed oils", "Bulk packages"],
        priceRange: "Competitive",
        deliveryOptions: ["Same Day", "Next Day"],
        minOrderValue: 800,
        reliabilityScore: 96,
        region: "South Delhi",
        distance: 3.0,
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
        products: [
            {
                productId: "61dbae02fc13ae1d39000019",
                name: "Refined Oil",
                price: 110,
                quality: "Standard",
                availability: true
            },
            {
                productId: "61dbae02fc13ae1d39000020",
                name: "Mustard Oil",
                price: 140,
                quality: "Premium",
                availability: true
            },
            {
                productId: "61dbae02fc13ae1d39000021",
                name: "Groundnut Oil",
                price: 180,
                quality: "Premium",
                availability: true
            }
        ]
    },
    {
        _id: "61dbae02fc13ae1d39000005",
        name: "Pure Flour Mills",
        category: "Flours & Grains",
        contactName: "Suresh Kumar",
        contactEmail: "suresh@pureflour.com",
        contactPhone: "+91 9876543214",
        address: {
            street: "12 Industrial Area",
            city: "Gurgaon",
            state: "Haryana",
            country: "India",
            zipCode: "122001"
        },
        rating: 4.5,
        preferredPaymentTerms: "Net 30",
        onboardingDate: "2022-05-12",
        status: "Active",
        description: "Premium quality flour and grain products",
        tags: ["flour", "grains", "wholesale"],
        specialties: ["Fine wheat flour", "Multi-grain flour"],
        priceRange: "Standard",
        deliveryOptions: ["Next Day"],
        minOrderValue: 600,
        reliabilityScore: 94,
        region: "Gurgaon",
        distance: 15.5,
        image: "https://images.unsplash.com/photo-1586444248879-9aedddc6b8eb",
        products: [
            {
                productId: "61dbae02fc13ae1d39000022",
                name: "Wheat Flour",
                price: 40,
                quality: "Standard",
                availability: true
            },
            {
                productId: "61dbae02fc13ae1d39000023",
                name: "Besan (Gram Flour)",
                price: 85,
                quality: "Premium",
                availability: true
            },
            {
                productId: "61dbae02fc13ae1d39000024",
                name: "Rice Flour",
                price: 55,
                quality: "Standard",
                availability: false
            }
        ]
    }
];
