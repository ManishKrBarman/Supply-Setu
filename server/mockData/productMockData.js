// Server-side mock data for products

export const mockProducts = [
    {
        _id: "61dbae02fc13ae1d39000010",
        name: "Fresh Tomatoes",
        category: "Vegetables",
        description: "Fresh, ripe tomatoes perfect for chutneys and curries",
        price: 38,
        unit: "kg",
        stockQuantity: 500,
        supplierId: "61dbae02fc13ae1d39000001",
        supplierName: "Singh Vegetable Supply",
        imageUrl: "https://images.unsplash.com/photo-1561136594-7f68413baa99",
        tags: ["fresh", "vegetable", "essential"],
        quality: "Premium",
        origin: "Nashik, Maharashtra",
        packaging: "5kg bag",
        minOrderQuantity: 5,
        isOrganic: false,
        isTrending: true,
        nutritionalInfo: "Rich in vitamins A, C and K",
        storageInstructions: "Store in a cool, dry place",
        shelfLife: "5-7 days",
        usageIdeas: "Ideal for chutneys and curries",
        averageRating: 4.8,
        seasonality: "Year-round",
        alternativeProducts: ["Cherry Tomatoes", "Canned Tomatoes"],
        priceHistory: [
            { date: "2023-06-01", price: 45 },
            { date: "2023-07-01", price: 42 },
            { date: "2023-08-01", price: 40 },
            { date: "2023-09-01", price: 38 },
            { date: "2023-10-01", price: 38 }
        ],
        predictedPrices: [
            { date: "2023-11-01", price: 36 },
            { date: "2023-12-01", price: 34 },
            { date: "2024-01-01", price: 40 }
        ]
    },
    {
        _id: "61dbae02fc13ae1d39000011",
        name: "Onions",
        category: "Vegetables",
        description: "Fresh onions, essential for almost all Indian street foods",
        price: 30,
        unit: "kg",
        stockQuantity: 800,
        supplierId: "61dbae02fc13ae1d39000001",
        supplierName: "Singh Vegetable Supply",
        imageUrl: "https://images.unsplash.com/photo-1620574387735-3624d75b2dbc",
        tags: ["fresh", "vegetable", "essential"],
        quality: "Standard",
        origin: "Nashik, Maharashtra",
        packaging: "10kg bag",
        minOrderQuantity: 10,
        isOrganic: false,
        isTrending: true,
        nutritionalInfo: "Good source of vitamin C and fiber",
        storageInstructions: "Store in a cool, dry place with good ventilation",
        shelfLife: "2-3 weeks",
        usageIdeas: "Base for most street food preparations",
        averageRating: 4.7,
        seasonality: "Year-round",
        alternativeProducts: ["Shallots", "Spring Onions"],
        priceHistory: [
            { date: "2023-06-01", price: 25 },
            { date: "2023-07-01", price: 28 },
            { date: "2023-08-01", price: 32 },
            { date: "2023-09-01", price: 35 },
            { date: "2023-10-01", price: 30 }
        ],
        predictedPrices: [
            { date: "2023-11-01", price: 28 },
            { date: "2023-12-01", price: 25 },
            { date: "2024-01-01", price: 22 }
        ]
    },
    {
        _id: "61dbae02fc13ae1d39000012",
        name: "Potatoes",
        category: "Vegetables",
        description: "Fresh potatoes, perfect for aloo tikki and other snacks",
        price: 24,
        unit: "kg",
        stockQuantity: 1000,
        supplierId: "61dbae02fc13ae1d39000001",
        supplierName: "Singh Vegetable Supply",
        imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
        tags: ["fresh", "vegetable", "essential"],
        quality: "Standard",
        origin: "Shimla, Himachal Pradesh",
        packaging: "10kg bag",
        minOrderQuantity: 10,
        isOrganic: false,
        isTrending: false,
        nutritionalInfo: "Good source of carbohydrates and potassium",
        storageInstructions: "Store in a cool, dark place",
        shelfLife: "2-3 weeks",
        usageIdeas: "Perfect for aloo tikki, samosas, and fries",
        averageRating: 4.6,
        seasonality: "Year-round",
        alternativeProducts: ["Sweet Potatoes", "Yams"],
        priceHistory: [
            { date: "2023-06-01", price: 22 },
            { date: "2023-07-01", price: 23 },
            { date: "2023-08-01", price: 24 },
            { date: "2023-09-01", price: 24 },
            { date: "2023-10-01", price: 24 }
        ],
        predictedPrices: [
            { date: "2023-11-01", price: 25 },
            { date: "2023-12-01", price: 26 },
            { date: "2024-01-01", price: 28 }
        ]
    },
    {
        _id: "61dbae02fc13ae1d39000013",
        name: "Red Chili Powder",
        category: "Spices",
        description: "Premium quality red chili powder for spicy street food preparations",
        price: 358,
        unit: "kg",
        stockQuantity: 200,
        supplierId: "61dbae02fc13ae1d39000002",
        supplierName: "Sharma Masala Mart",
        imageUrl: "https://images.unsplash.com/photo-1613758235402-745466bb7aca",
        tags: ["spice", "essential", "premium"],
        quality: "Premium",
        origin: "Guntur, Andhra Pradesh",
        packaging: "500g packets",
        minOrderQuantity: 1,
        isOrganic: false,
        isTrending: true,
        nutritionalInfo: "Rich in capsaicin and vitamin A",
        storageInstructions: "Store in airtight containers away from light",
        shelfLife: "8-10 months",
        usageIdeas: "Essential for adding heat to chutneys and marinades",
        averageRating: 4.9,
        seasonality: "Year-round",
        alternativeProducts: ["Kashmiri Chili Powder", "Cayenne Pepper"],
        priceHistory: [
            { date: "2023-06-01", price: 340 },
            { date: "2023-07-01", price: 345 },
            { date: "2023-08-01", price: 350 },
            { date: "2023-09-01", price: 355 },
            { date: "2023-10-01", price: 358 }
        ],
        predictedPrices: [
            { date: "2023-11-01", price: 360 },
            { date: "2023-12-01", price: 365 },
            { date: "2024-01-01", price: 370 }
        ]
    },
    {
        _id: "61dbae02fc13ae1d39000016",
        name: "Fresh Paneer",
        category: "Dairy",
        description: "Premium quality fresh paneer for tikkas and curries",
        price: 350,
        unit: "kg",
        stockQuantity: 100,
        supplierId: "61dbae02fc13ae1d39000003",
        supplierName: "Fresh Dairy Supplies",
        imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
        tags: ["dairy", "fresh", "premium"],
        quality: "Premium",
        origin: "Locally produced",
        packaging: "500g blocks",
        minOrderQuantity: 2,
        isOrganic: false,
        isTrending: true,
        nutritionalInfo: "High in protein and calcium",
        storageInstructions: "Refrigerate and consume within 3-4 days",
        shelfLife: "3-4 days",
        usageIdeas: "Perfect for paneer tikka, butter paneer, and street wraps",
        averageRating: 4.9,
        seasonality: "Year-round",
        alternativeProducts: ["Tofu", "Cottage Cheese"],
        priceHistory: [
            { date: "2023-06-01", price: 330 },
            { date: "2023-07-01", price: 335 },
            { date: "2023-08-01", price: 340 },
            { date: "2023-09-01", price: 345 },
            { date: "2023-10-01", price: 350 }
        ],
        predictedPrices: [
            { date: "2023-11-01", price: 355 },
            { date: "2023-12-01", price: 360 },
            { date: "2024-01-01", price: 365 }
        ]
    }
];

// Mock price trend data for analytics
export const mockPriceTrends = {
    daily: [
        { date: "2023-10-01", average: 120 },
        { date: "2023-10-02", average: 122 },
        { date: "2023-10-03", average: 125 },
        { date: "2023-10-04", average: 123 },
        { date: "2023-10-05", average: 126 },
        { date: "2023-10-06", average: 128 },
        { date: "2023-10-07", average: 127 }
    ],
    weekly: [
        { date: "Week 40", average: 118 },
        { date: "Week 41", average: 125 },
        { date: "Week 42", average: 127 },
        { date: "Week 43", average: 124 },
        { date: "Week 44", average: 130 }
    ],
    monthly: [
        { date: "May 2023", average: 110 },
        { date: "Jun 2023", average: 112 },
        { date: "Jul 2023", average: 115 },
        { date: "Aug 2023", average: 118 },
        { date: "Sep 2023", average: 122 },
        { date: "Oct 2023", average: 125 }
    ],
    predictions: [
        { date: "Nov 2023", predicted: 128, lowerBound: 124, upperBound: 132 },
        { date: "Dec 2023", predicted: 132, lowerBound: 126, upperBound: 138 },
        { date: "Jan 2024", predicted: 130, lowerBound: 124, upperBound: 136 }
    ]
};
