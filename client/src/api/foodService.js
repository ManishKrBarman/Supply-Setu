import api from './axios';

// Food Service functions
export const getFoods = async () => {
    try {
        const response = await api.get('/foods');
        return response.data;
    } catch (error) {
        console.error('Error fetching foods:', error);
        throw error;
    }
};

export const getFoodById = async (id) => {
    try {
        const response = await api.get(`/foods/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching food ${id}:`, error);
        throw error;
    }
};

export const createFood = async (foodData) => {
    try {
        const response = await api.post('/foods', foodData);
        return response.data;
    } catch (error) {
        console.error('Error creating food:', error);
        throw error;
    }
};

export const updateFood = async (id, foodData) => {
    try {
        const response = await api.put(`/foods/${id}`, foodData);
        return response.data;
    } catch (error) {
        console.error(`Error updating food ${id}:`, error);
        throw error;
    }
};

export const deleteFood = async (id) => {
    try {
        const response = await api.delete(`/foods/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting food ${id}:`, error);
        throw error;
    }
};

// Mock data for street foods
export const mockFoods = [
    {
        _id: "61dbae02fc13ae1d39000050",
        name: "Aloo Tikki Chaat",
        description: "Crispy potato patties topped with yogurt, chutneys and spices",
        category: "Chaat",
        price: 50,
        preparationTime: 10,
        ingredients: [
            { name: "Potatoes", quantity: "500g", productId: "61dbae02fc13ae1d39000012" },
            { name: "Green Chutney", quantity: "50g" },
            { name: "Tamarind Chutney", quantity: "50g" },
            { name: "Yogurt", quantity: "100g" },
            { name: "Chaat Masala", quantity: "10g" }
        ],
        nutritionalInfo: {
            calories: 250,
            protein: 5,
            carbs: 35,
            fat: 10
        },
        allergens: ["Dairy"],
        popularity: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
        isTrending: true,
        tags: ["spicy", "popular", "vegetarian"],
        region: "North India",
        servingSize: "1 plate (2 tikkis)",
        costAnalysis: {
            ingredientCost: 22,
            laborCost: 8,
            overheadCost: 5,
            profitMargin: 15
        },
        supplierInfo: [
            { supplierId: "61dbae02fc13ae1d39000001", name: "Singh Vegetable Supply", items: ["Potatoes"] },
            { supplierId: "61dbae02fc13ae1d39000002", name: "Sharma Masala Mart", items: ["Chaat Masala"] }
        ]
    },
    {
        _id: "61dbae02fc13ae1d39000051",
        name: "Pav Bhaji",
        description: "Spicy mixed vegetable curry served with buttered bread rolls",
        category: "Street Food",
        price: 80,
        preparationTime: 15,
        ingredients: [
            { name: "Potatoes", quantity: "250g", productId: "61dbae02fc13ae1d39000012" },
            { name: "Tomatoes", quantity: "250g", productId: "61dbae02fc13ae1d39000010" },
            { name: "Onions", quantity: "150g", productId: "61dbae02fc13ae1d39000011" },
            { name: "Butter", quantity: "50g" },
            { name: "Pav Bhaji Masala", quantity: "15g" },
            { name: "Pav (Bread Rolls)", quantity: "4 pieces" }
        ],
        nutritionalInfo: {
            calories: 450,
            protein: 8,
            carbs: 65,
            fat: 18
        },
        allergens: ["Gluten", "Dairy"],
        popularity: 4.9,
        imageUrl: "https://images.unsplash.com/photo-1606491048802-8342506d6471",
        isTrending: true,
        tags: ["spicy", "popular", "vegetarian"],
        region: "Maharashtra",
        servingSize: "1 plate (1 bhaji with 2 pavs)",
        costAnalysis: {
            ingredientCost: 35,
            laborCost: 12,
            overheadCost: 8,
            profitMargin: 25
        },
        supplierInfo: [
            { supplierId: "61dbae02fc13ae1d39000001", name: "Singh Vegetable Supply", items: ["Potatoes", "Tomatoes", "Onions"] },
            { supplierId: "61dbae02fc13ae1d39000002", name: "Sharma Masala Mart", items: ["Pav Bhaji Masala"] }
        ]
    },
    {
        _id: "61dbae02fc13ae1d39000052",
        name: "Vada Pav",
        description: "Spicy potato fritter in a bread bun with chutneys",
        category: "Street Food",
        price: 30,
        preparationTime: 5,
        ingredients: [
            { name: "Potatoes", quantity: "200g", productId: "61dbae02fc13ae1d39000012" },
            { name: "Bread Buns", quantity: "1 piece" },
            { name: "Green Chutney", quantity: "20g" },
            { name: "Garlic Chutney", quantity: "20g" },
            { name: "Gram Flour", quantity: "50g", productId: "61dbae02fc13ae1d39000023" }
        ],
        nutritionalInfo: {
            calories: 350,
            protein: 7,
            carbs: 55,
            fat: 12
        },
        allergens: ["Gluten"],
        popularity: 4.7,
        imageUrl: "https://images.unsplash.com/photo-1606755136004-02b3d9a4b262",
        isTrending: true,
        tags: ["spicy", "quick", "vegetarian"],
        region: "Maharashtra",
        servingSize: "1 piece",
        costAnalysis: {
            ingredientCost: 12,
            laborCost: 5,
            overheadCost: 3,
            profitMargin: 10
        },
        supplierInfo: [
            { supplierId: "61dbae02fc13ae1d39000001", name: "Singh Vegetable Supply", items: ["Potatoes"] },
            { supplierId: "61dbae02fc13ae1d39000005", name: "Pure Flour Mills", items: ["Gram Flour"] }
        ]
    },
    {
        _id: "61dbae02fc13ae1d39000053",
        name: "Pani Puri",
        description: "Hollow crispy puris filled with spicy tangy water, potatoes and chickpeas",
        category: "Chaat",
        price: 40,
        preparationTime: 5,
        ingredients: [
            { name: "Puri Shells", quantity: "10 pieces" },
            { name: "Potatoes", quantity: "100g", productId: "61dbae02fc13ae1d39000012" },
            { name: "Chickpeas", quantity: "50g" },
            { name: "Mint", quantity: "20g" },
            { name: "Tamarind", quantity: "20g" },
            { name: "Chaat Masala", quantity: "5g" }
        ],
        nutritionalInfo: {
            calories: 200,
            protein: 5,
            carbs: 30,
            fat: 8
        },
        allergens: ["Gluten"],
        popularity: 5.0,
        imageUrl: "https://images.unsplash.com/photo-1625398407937-2510ffdf27e5",
        isTrending: true,
        tags: ["spicy", "tangy", "vegetarian", "popular"],
        region: "All India",
        servingSize: "1 plate (8 puris)",
        costAnalysis: {
            ingredientCost: 15,
            laborCost: 8,
            overheadCost: 5,
            profitMargin: 12
        },
        supplierInfo: [
            { supplierId: "61dbae02fc13ae1d39000001", name: "Singh Vegetable Supply", items: ["Potatoes"] },
            { supplierId: "61dbae02fc13ae1d39000002", name: "Sharma Masala Mart", items: ["Chaat Masala"] },
            { supplierId: "61dbae02fc13ae1d39000005", name: "Pure Flour Mills", items: ["Wheat Flour"] }
        ]
    },
    {
        _id: "61dbae02fc13ae1d39000054",
        name: "Paneer Tikka",
        description: "Marinated and grilled cottage cheese cubes with vegetables",
        category: "Tikka & Kebab",
        price: 120,
        preparationTime: 20,
        ingredients: [
            { name: "Paneer", quantity: "250g", productId: "61dbae02fc13ae1d39000016" },
            { name: "Bell Peppers", quantity: "100g" },
            { name: "Onions", quantity: "100g", productId: "61dbae02fc13ae1d39000011" },
            { name: "Tikka Masala", quantity: "20g" },
            { name: "Yogurt", quantity: "50g" }
        ],
        nutritionalInfo: {
            calories: 380,
            protein: 22,
            carbs: 15,
            fat: 25
        },
        allergens: ["Dairy"],
        popularity: 4.6,
        imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0",
        isTrending: false,
        tags: ["protein-rich", "vegetarian", "grilled"],
        region: "North India",
        servingSize: "1 plate (8-10 pieces)",
        costAnalysis: {
            ingredientCost: 65,
            laborCost: 20,
            overheadCost: 10,
            profitMargin: 25
        },
        supplierInfo: [
            { supplierId: "61dbae02fc13ae1d39000003", name: "Fresh Dairy Supplies", items: ["Paneer", "Yogurt"] },
            { supplierId: "61dbae02fc13ae1d39000001", name: "Singh Vegetable Supply", items: ["Bell Peppers", "Onions"] },
            { supplierId: "61dbae02fc13ae1d39000002", name: "Sharma Masala Mart", items: ["Tikka Masala"] }
        ]
    },
    {
        _id: "61dbae02fc13ae1d39000055",
        name: "Chole Bhature",
        description: "Spicy chickpea curry served with deep-fried bread",
        category: "Street Food",
        price: 70,
        preparationTime: 15,
        ingredients: [
            { name: "Chickpeas", quantity: "200g" },
            { name: "Tomatoes", quantity: "100g", productId: "61dbae02fc13ae1d39000010" },
            { name: "Onions", quantity: "100g", productId: "61dbae02fc13ae1d39000011" },
            { name: "Wheat Flour", quantity: "150g", productId: "61dbae02fc13ae1d39000022" },
            { name: "Refined Oil", quantity: "50ml", productId: "61dbae02fc13ae1d39000019" },
            { name: "Spices", quantity: "20g" }
        ],
        nutritionalInfo: {
            calories: 550,
            protein: 15,
            carbs: 80,
            fat: 22
        },
        allergens: ["Gluten"],
        popularity: 4.7,
        imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
        isTrending: false,
        tags: ["spicy", "popular", "vegetarian"],
        region: "North India",
        servingSize: "1 plate (2 bhature with chole)",
        costAnalysis: {
            ingredientCost: 30,
            laborCost: 15,
            overheadCost: 8,
            profitMargin: 17
        },
        supplierInfo: [
            { supplierId: "61dbae02fc13ae1d39000001", name: "Singh Vegetable Supply", items: ["Tomatoes", "Onions"] },
            { supplierId: "61dbae02fc13ae1d39000004", name: "Gupta Oil Traders", items: ["Refined Oil"] },
            { supplierId: "61dbae02fc13ae1d39000005", name: "Pure Flour Mills", items: ["Wheat Flour"] }
        ]
    }
];

// Function to seed mock data (in a real app, this would be a server-side operation)
export const seedMockFoods = async () => {
    try {
        for (const food of mockFoods) {
            await api.post('/foods/seed', food);
        }
        return { success: true, message: 'Foods data seeded successfully' };
    } catch (error) {
        console.error('Error seeding foods data:', error);
        throw error;
    }
};

// Mock trending street food data
export const mockTrendingFoods = [
    {
        id: "61dbae02fc13ae1d39000050",
        name: "Aloo Tikki Chaat",
        popularity: 4.8,
        priceRange: "₹40-60",
        description: "Crispy potato patties topped with yogurt and chutneys",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
        region: "North India",
        keyIngredients: ["Potatoes", "Yogurt", "Green Chutney", "Tamarind Chutney"]
    },
    {
        id: "61dbae02fc13ae1d39000051",
        name: "Pav Bhaji",
        popularity: 4.9,
        priceRange: "₹70-90",
        description: "Spicy mixed vegetable curry served with buttered bread rolls",
        image: "https://images.unsplash.com/photo-1606491048802-8342506d6471",
        region: "Maharashtra",
        keyIngredients: ["Mixed Vegetables", "Butter", "Pav Bhaji Masala", "Bread Rolls"]
    },
    {
        id: "61dbae02fc13ae1d39000053",
        name: "Pani Puri",
        popularity: 5.0,
        priceRange: "₹30-50",
        description: "Hollow crispy puris with spicy tangy water, potatoes and chickpeas",
        image: "https://images.unsplash.com/photo-1625398407937-2510ffdf27e5",
        region: "All India",
        keyIngredients: ["Puri Shells", "Mint Water", "Potatoes", "Chickpeas", "Tamarind"]
    },
    {
        id: "61dbae02fc13ae1d39000052",
        name: "Vada Pav",
        popularity: 4.7,
        priceRange: "₹25-35",
        description: "Spicy potato fritter in a bread bun with chutneys",
        image: "https://images.unsplash.com/photo-1606755136004-02b3d9a4b262",
        region: "Maharashtra",
        keyIngredients: ["Potatoes", "Bread Buns", "Green Chutney", "Garlic Chutney"]
    }
];

// Mock recipe ideas for street food vendors
export const mockStreetFoodRecipes = [
    {
        id: 1,
        name: "Moong Dal Chilla",
        description: "Healthy and delicious savory pancakes made with yellow moong dal",
        ingredients: ["Yellow Moong Dal", "Green Chillies", "Ginger", "Cumin Seeds", "Salt", "Oil"],
        preparationTime: "20 minutes",
        costEstimate: "₹15 per serving",
        sellingPrice: "₹40-50",
        profitMargin: "60-70%",
        popularityPotential: "High"
    },
    {
        id: 2,
        name: "Kathi Roll",
        description: "Flavorful wrap with paneer or vegetable filling and spices",
        ingredients: ["Wheat Flour", "Paneer/Vegetables", "Spices", "Chaat Masala", "Onions"],
        preparationTime: "15 minutes",
        costEstimate: "₹25 per serving",
        sellingPrice: "₹60-80",
        profitMargin: "55-65%",
        popularityPotential: "Very High"
    },
    {
        id: 3,
        name: "Dahi Puri",
        description: "Sweet, tangy and spicy chaat with yogurt and chutneys",
        ingredients: ["Puri Shells", "Potatoes", "Yogurt", "Green Chutney", "Tamarind Chutney", "Sev"],
        preparationTime: "10 minutes",
        costEstimate: "₹18 per serving",
        sellingPrice: "₹50-60",
        profitMargin: "65-70%",
        popularityPotential: "High"
    },
    {
        id: 4,
        name: "Vegetable Frankie",
        description: "Spiced vegetable wrap with special masala",
        ingredients: ["All Purpose Flour", "Mixed Vegetables", "Frankie Masala", "Chilli Sauce", "Mayonnaise"],
        preparationTime: "12 minutes",
        costEstimate: "₹20 per serving",
        sellingPrice: "₹50-70",
        profitMargin: "60-65%",
        popularityPotential: "High"
    }
];