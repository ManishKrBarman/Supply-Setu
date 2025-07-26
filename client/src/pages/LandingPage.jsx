import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaChartLine, 
  FaBoxOpen, 
  FaUsers, 
  FaTruckMoving, 
  FaClipboardCheck, 
  FaChartBar,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaArrowUp,
  FaArrowDown,
  FaSearch,
  FaStore,
  FaShoppingBasket,
  FaFire,
  FaStar,
  FaUtensils
} from 'react-icons/fa';
import NearbySuppliers from '../components/NearbySuppliers';

// Mock data for trending items
const trendingItems = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    category: "Vegetables",
    priceChange: -15,
    currentPrice: 38,
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 2,
    name: "Red Chili Powder",
    category: "Spices",
    priceChange: 8,
    currentPrice: 358,
    image: "https://images.unsplash.com/photo-1635341814161-75a3ba85cd96?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 3,
    name: "Refined Oil",
    category: "Oils",
    priceChange: -5,
    currentPrice: 110,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 4,
    name: "Paneer",
    category: "Dairy",
    priceChange: 3,
    currentPrice: 350,
    image: "https://images.unsplash.com/photo-1551653281-b5f6978a4e7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  }
];

// Mock popular street food recipes
const streetFoodRecipes = [
  {
    id: 1,
    name: "Pav Bhaji",
    ingredients: ["Tomatoes", "Potatoes", "Peas", "Butter", "Pav Bhaji Masala"],
    profitMargin: 65,
    popularity: "High",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 2,
    name: "Chole Bhature",
    ingredients: ["Chickpeas", "All-Purpose Flour", "Yogurt", "Spices", "Oil"],
    profitMargin: 70,
    popularity: "High",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 3,
    name: "Vada Pav",
    ingredients: ["Potatoes", "Gram Flour", "Bread Buns", "Green Chutney", "Spices"],
    profitMargin: 75,
    popularity: "Very High",
    image: "https://images.unsplash.com/photo-1630409346824-4f0e7b080087?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  }
];

const LandingPage = () => {
  const [locationSearch, setLocationSearch] = useState('');
  
  return (
    <div className="landing-page">
      {/* Hero Section - Modern and more street food focused */}
      <section className="relative bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="wave-bottom text-white">
          <svg viewBox="0 0 1440 120" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 120L48 105C96 90 192 60 288 45C384 30 480 30 576 40C672 50 768 70 864 75C960 80 1056 70 1152 65C1248 60 1344 60 1392 60L1440 60V0H0V120Z"></path>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-block px-3 py-1 bg-orange-700 bg-opacity-50 rounded-full text-sm font-medium mb-4">
                For Street Food Vendors
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Source Better. Sell Better. Profit Better.
              </h1>
              <p className="text-xl mb-8">
                Supply Setu helps street food vendors source quality ingredients at the best prices, track market trends, and connect with reliable suppliers nearby.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register" className="px-8 py-3 text-lg font-medium text-white bg-orange-500 rounded-md hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300">
                  Get Started
                </Link>
                <Link to="#nearby-suppliers" className="px-8 py-3 text-lg font-medium text-orange-100 border border-orange-100 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-300">
                  Find Suppliers
                </Link>
              </div>
              
              {/* Enhanced Location search bar with auto-detection */}
              <div className="mt-8 max-w-md mx-auto lg:mx-0">
                <div className="flex bg-white rounded-lg overflow-hidden p-1 shadow-lg">
                  <div className="flex-grow">
                    <input 
                      type="text" 
                      className="w-full py-2 px-4 text-gray-800 focus:outline-none" 
                      placeholder="Enter your location or use GPS..."
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                    />
                  </div>
                  <button 
                    className="bg-orange-500 text-white px-3 py-2 rounded-md flex items-center hover:bg-orange-600 transition-colors"
                    onClick={() => document.getElementById('nearby-suppliers')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <FaMapMarkerAlt className="mr-2" /> Find Now
                  </button>
                </div>
                <div className="mt-3 text-center text-orange-100 text-sm">
                  🗺️ <strong>New!</strong> Real-time location detection & interactive maps
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              
            </div>
          </div>
        </div>
      </section>

      {/* Trending Items Section */}
      <section id="trending-items" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center text-orange-500 mb-2">
              <FaFire className="mr-2" />
              <span className="text-sm font-bold uppercase tracking-wider">Trending Now</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Today's Market Trends</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest price trends to make smart purchasing decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingItems.map(item => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-800">{item.category}</span>
                    <div className={`flex items-center text-sm font-medium ${item.priceChange < 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.priceChange < 0 ? <FaArrowDown className="mr-1" /> : <FaArrowUp className="mr-1" />}
                      <span>{Math.abs(item.priceChange)}%</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mt-2">{item.name}</h3>
                  <div className="flex items-center mt-2">
                    <FaRupeeSign className="text-gray-600" />
                    <span className="text-xl font-bold text-gray-900">{item.currentPrice}</span>
                    <span className="text-sm text-gray-500 ml-1">
                      {item.category === 'Vegetables' || item.category === 'Fruits' ? '/kg' : 
                       item.category === 'Spices' ? '/kg' : 
                       item.category === 'Oils' ? '/L' : '/unit'}
                    </span>
                  </div>
                  <div className="mt-3">
                    <Link 
                      to="/login" 
                      className="block text-center py-2 px-4 bg-orange-100 text-orange-700 font-medium rounded hover:bg-orange-200 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center text-orange-600 font-medium hover:text-orange-800 transition-colors"
            >
              See all market trends
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Nearby Suppliers Section - Enhanced with Location Detection */}
      <section id="nearby-suppliers" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NearbySuppliers />
        </div>
      </section>

      {/* Features Section - Updated for street food vendors */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center text-orange-500 mb-2">
              <FaUtensils className="mr-2" />
              <span className="text-sm font-bold uppercase tracking-wider">For Food Vendors</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tailored for Street Food Success</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Features designed specifically for street food vendors to maximize profits and minimize hassle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center text-orange-600 mb-4">
                <FaBoxOpen className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Raw Material Management</h3>
              <p className="text-gray-600">
                Easily track ingredients, set minimum stock alerts, and manage your food supplies more efficiently.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center text-orange-600 mb-4">
                <FaUsers className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Supplier Directory</h3>
              <p className="text-gray-600">
                Find and connect with reliable local suppliers offering the best prices for your specific needs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center text-orange-600 mb-4">
                <FaChartLine className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Price Analytics</h3>
              <p className="text-gray-600">
                Track market price trends and receive alerts when it's the best time to purchase ingredients.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center text-orange-600 mb-4">
                <FaShoppingBasket className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Bulk Ordering</h3>
              <p className="text-gray-600">
                Get exclusive discounts when ordering ingredients in bulk for your street food business.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center text-orange-600 mb-4">
                <FaStore className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Recipe Costing</h3>
              <p className="text-gray-600">
                Calculate exact costs for each dish, optimize profit margins, and price your menu items strategically.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center text-orange-600 mb-4">
                <FaChartBar className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Seasonal Insights</h3>
              <p className="text-gray-600">
                Get recommendations for seasonal menu items based on ingredient availability and pricing trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Street Food Recipes Section */}
      <section id="street-food-recipes" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center text-orange-500 mb-2">
              <FaUtensils className="mr-2" />
              <span className="text-sm font-bold uppercase tracking-wider">Popular Recipes</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Street Food Recipes</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover high-profit street food recipes with cost-optimized ingredients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {streetFoodRecipes.map(recipe => (
              <div key={recipe.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
                <div className="h-56 overflow-hidden">
                  <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{recipe.name}</h3>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {recipe.ingredients.map((ingredient, idx) => (
                      <span key={idx} className="inline-block px-2 py-1 bg-orange-50 rounded-md text-xs text-orange-700">{ingredient}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <span className="block text-sm text-gray-500">Profit Margin</span>
                      <span className="font-bold text-green-600">{recipe.profitMargin}%</span>
                    </div>
                    <div>
                      <span className="block text-sm text-gray-500">Popularity</span>
                      <span className="font-bold text-orange-600">{recipe.popularity}</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link 
                      to="/login" 
                      className="block text-center py-2 px-4 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors"
                    >
                      View Full Recipe
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Link 
              to="/login" 
              className="inline-block py-3 px-8 bg-orange-100 text-orange-700 font-medium rounded-lg hover:bg-orange-200 transition-colors"
            >
              View All Recipes & Cost Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* About Section - Updated for street food focus */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center text-orange-500 mb-2">
              <FaStore className="mr-2" />
              <span className="text-sm font-bold uppercase tracking-wider">Our Mission</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Supply Setu</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering street food entrepreneurs with better supply chain solutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src="/image.png" alt="About Supply Setu" className="w-full rounded-lg shadow-lg" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-orange-600">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                At Supply Setu, we're on a mission to transform how street food vendors source ingredients and manage their supply chains. 
                We believe that street food entrepreneurs deserve access to the same quality ingredients at competitive prices as larger establishments.
              </p>
              <h3 className="text-2xl font-bold mb-4 text-orange-600">Why Street Food Vendors Choose Us</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-orange-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Access to nearby verified suppliers with competitive prices</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-orange-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Real-time price alerts to maximize your profit margins</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-orange-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Bulk ordering benefits specifically for small-scale vendors</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-orange-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Recipe cost calculator to optimize your menu pricing</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link 
                  to="/register" 
                  className="inline-block py-3 px-6 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors"
                >
                  Join Our Community of Vendors
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Prediction Section */}
      <section id="price-prediction" className="py-16 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center text-orange-500 mb-2">
              <FaChartLine className="mr-2" />
              <span className="text-sm font-bold uppercase tracking-wider">Smart Purchasing</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Price Prediction & Insights</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Make data-driven decisions with our market price forecasting
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold">Tomatoes</h3>
                    <div className="flex items-center text-green-600">
                      <FaArrowDown className="mr-1" />
                      <span>15%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Current: ₹38/kg</p>
                  <p className="text-sm text-gray-600">Next Week: <span className="text-green-600 font-medium">₹32/kg</span></p>
                  <div className="mt-3 pt-3 border-t border-green-100 text-sm">
                    <span className="font-medium text-green-700">Recommendation: </span>
                    <span className="text-gray-700">Wait to buy</span>
                  </div>
                </div>
                
                <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold">Red Chili Powder</h3>
                    <div className="flex items-center text-red-600">
                      <FaArrowUp className="mr-1" />
                      <span>8%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Current: ₹358/kg</p>
                  <p className="text-sm text-gray-600">Next Week: <span className="text-red-600 font-medium">₹387/kg</span></p>
                  <div className="mt-3 pt-3 border-t border-red-100 text-sm">
                    <span className="font-medium text-red-700">Recommendation: </span>
                    <span className="text-gray-700">Buy now</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold">Refined Oil</h3>
                    <div className="flex items-center text-green-600">
                      <FaArrowDown className="mr-1" />
                      <span>5%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Current: ₹110/L</p>
                  <p className="text-sm text-gray-600">Next Week: <span className="text-green-600 font-medium">₹105/L</span></p>
                  <div className="mt-3 pt-3 border-t border-blue-100 text-sm">
                    <span className="font-medium text-blue-700">Recommendation: </span>
                    <span className="text-gray-700">Maintain stock</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Our AI-powered system analyzes historical data, seasonal patterns, and market trends to predict ingredient prices.
                </p>
                <Link 
                  to="/login" 
                  className="inline-block py-3 px-6 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors"
                >
                  View Detailed Price Analytics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center text-orange-500 mb-2">
              <FaStar className="mr-2" />
              <span className="text-sm font-bold uppercase tracking-wider">Success Stories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Vendors Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from street food entrepreneurs who've transformed their businesses with Supply Setu
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4 text-amber-400">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "Supply Setu has completely changed how I source ingredients. I'm saving at least 15% on my monthly supplies and the price alerts have been a game-changer."
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold">
                    RS
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">Rajesh Singh</h4>
                  <p className="text-sm text-gray-500">Chaat Stall Owner, Delhi</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4 text-amber-400">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "The recipe cost calculator helped me optimize my menu pricing. Now I know exactly which items bring in the most profit and how to adjust during price fluctuations."
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold">
                    PP
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">Priya Patel</h4>
                  <p className="text-sm text-gray-500">South Indian Food Cart, Mumbai</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4 text-amber-400">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                "Finding reliable suppliers was always a challenge until I found Supply Setu. The supplier ratings and proximity search saved me so much time and headache."
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold">
                    AK
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">Ahmed Khan</h4>
                  <p className="text-sm text-gray-500">Kebab Stand Owner, Hyderabad</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Updated with street food focus */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center text-orange-500 mb-2">
              <FaUsers className="mr-2" />
              <span className="text-sm font-bold uppercase tracking-wider">Support</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions or need help optimizing your street food business? We're here for you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold mb-6 text-orange-600">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-orange-500 mt-1">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 font-medium">Email</p>
                    <p className="text-gray-600">support@supplysetu.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-orange-500 mt-1">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 font-medium">Phone</p>
                    <p className="text-gray-600">+91 1234567890</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 text-orange-500 mt-1">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 font-medium">Address</p>
                    <p className="text-gray-600">123 Food Tech Hub, Delhi, India</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-bold mb-3">Our Support Hours</h4>
                  <p className="text-gray-600">Monday - Saturday: 9:00 AM - 8:00 PM</p>
                  <p className="text-gray-600">Sunday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold mb-6 text-orange-600">Send us a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" id="name" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                </div>
                <div>
                  <label htmlFor="business" className="block text-sm font-medium text-gray-700 mb-1">Type of Food Business</label>
                  <select id="business" name="business" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500">
                    <option value="">Select your business type</option>
                    <option value="chaat">Chaat/Snack Stall</option>
                    <option value="south_indian">South Indian Food</option>
                    <option value="chinese">Chinese Street Food</option>
                    <option value="rolls">Rolls & Wraps</option>
                    <option value="beverages">Beverages</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">How can we help?</label>
                  <textarea id="message" name="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Updated for street food vendors */}
      <section className="py-12 bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to boost your street food business?</h2>
            <p className="text-xl mb-8">
              Join Supply Setu today and connect with suppliers, track prices, and increase your profits.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register" className="inline-block px-8 py-3 text-lg font-medium text-orange-700 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white">
                Create Your Account
              </Link>
              <Link to="/login" className="inline-block px-8 py-3 text-lg font-medium text-white border border-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-white">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start">
              <h3 className="text-xl font-bold">Supply Setu</h3>
            </div>
            <div className="mt-8 md:mt-0">
              <div className="flex justify-center md:justify-end space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  Privacy Policy
                </a>
                <Link to="/admin/login" className="text-gray-400 hover:text-gray-300">
                  Admin Login
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center md:text-left md:flex md:items-center md:justify-between">
            <div>
              <p className="text-sm text-gray-400">
                &copy; 2025 Supply Setu. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;