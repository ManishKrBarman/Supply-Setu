import React, { useState, useEffect } from 'react';
import { Card, Badge } from '../components/DataDisplay';
import { FormGroup, Label, Select } from '../components/FormElements';
import Button from '../components/Button';
import { 
  FaChartLine, 
  FaRupeeSign, 
  FaArrowUp, 
  FaArrowDown, 
  FaExclamationTriangle, 
  FaRegCalendarAlt,
  FaMapMarkerAlt,
  FaFilter
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

// This would normally come from API - we'll create mock data
const mockPriceTrends = {
  vegetables: [
    { date: 'Jul 20', onion: 35, tomato: 40, potato: 25 },
    { date: 'Jul 21', onion: 37, tomato: 38, potato: 24 },
    { date: 'Jul 22', onion: 36, tomato: 42, potato: 24 },
    { date: 'Jul 23', onion: 32, tomato: 45, potato: 26 },
    { date: 'Jul 24', onion: 30, tomato: 44, potato: 25 },
    { date: 'Jul 25', onion: 32, tomato: 40, potato: 25 },
    { date: 'Jul 26', onion: 30, tomato: 38, potato: 24 },
  ],
  spices: [
    { date: 'Jul 20', redChili: 350, turmeric: 220, cumin: 260 },
    { date: 'Jul 21', redChili: 352, turmeric: 220, cumin: 265 },
    { date: 'Jul 22', redChili: 355, turmeric: 225, cumin: 262 },
    { date: 'Jul 23', redChili: 360, turmeric: 218, cumin: 258 },
    { date: 'Jul 24', redChili: 365, turmeric: 220, cumin: 255 },
    { date: 'Jul 25', redChili: 360, turmeric: 222, cumin: 260 },
    { date: 'Jul 26', redChili: 358, turmeric: 220, cumin: 260 },
  ],
  oils: [
    { date: 'Jul 20', refined: 110, mustard: 140 },
    { date: 'Jul 21', refined: 112, mustard: 140 },
    { date: 'Jul 22', refined: 115, mustard: 142 },
    { date: 'Jul 23', refined: 114, mustard: 145 },
    { date: 'Jul 24', refined: 110, mustard: 145 },
    { date: 'Jul 25', refined: 108, mustard: 142 },
    { date: 'Jul 26', refined: 110, mustard: 140 },
  ]
};

const pricePredictions = {
  vegetables: [
    { date: 'Jul 26', onion: 30, tomato: 38, potato: 24 },
    { date: 'Jul 27', onion: 29, tomato: 35, potato: 24 },
    { date: 'Jul 28', onion: 28, tomato: 33, potato: 23 },
    { date: 'Jul 29', onion: 27, tomato: 30, potato: 23 },
    { date: 'Jul 30', onion: 25, tomato: 28, potato: 23 },
  ],
  spices: [
    { date: 'Jul 26', redChili: 358, turmeric: 220, cumin: 260 },
    { date: 'Jul 27', redChili: 355, turmeric: 222, cumin: 258 },
    { date: 'Jul 28', redChili: 355, turmeric: 225, cumin: 255 },
    { date: 'Jul 29', redChili: 352, turmeric: 225, cumin: 255 },
    { date: 'Jul 30', redChili: 350, turmeric: 220, cumin: 255 },
  ],
  oils: [
    { date: 'Jul 26', refined: 110, mustard: 140 },
    { date: 'Jul 27', refined: 108, mustard: 138 },
    { date: 'Jul 28', refined: 105, mustard: 137 },
    { date: 'Jul 29', refined: 105, mustard: 135 },
    { date: 'Jul 30', refined: 100, mustard: 135 },
  ]
};

const bestSuppliers = [
  { 
    id: 1, 
    name: 'Singh Vegetable Supply', 
    category: 'Vegetables & Fruits',
    rating: 4.8, 
    distance: 2.5,
    region: 'North Delhi',
    pricing: 'Competitive',
    delivery: 'Same day',
    specialties: ['Fresh onions', 'Seasonal vegetables'],
    priceCompare: '10% below average',
    reliabilityScore: 98
  },
  { 
    id: 2, 
    name: 'Sharma Masala Mart', 
    category: 'Spices & Condiments',
    rating: 4.9, 
    distance: 3.8,
    region: 'Central Delhi',
    pricing: 'Premium',
    delivery: 'Next day',
    specialties: ['Authentic spices', 'Pure quality'],
    priceCompare: '5% above average',
    reliabilityScore: 99
  },
  { 
    id: 3, 
    name: 'Fresh Dairy Supplies', 
    category: 'Dairy Products',
    rating: 4.7, 
    distance: 4.2,
    region: 'Noida',
    pricing: 'Standard',
    delivery: 'Early morning',
    specialties: ['Fresh paneer', 'Direct from farms'],
    priceCompare: 'At market average',
    reliabilityScore: 97
  },
  { 
    id: 4, 
    name: 'Gupta Oil Traders', 
    category: 'Cooking Oils',
    rating: 4.6, 
    distance: 3.0,
    region: 'South Delhi',
    pricing: 'Competitive',
    delivery: 'Same day',
    specialties: ['Cold pressed oils', 'Bulk packages'],
    priceCompare: '8% below average',
    reliabilityScore: 96
  },
];

const seasonalInsights = [
  {
    id: 1,
    title: 'Tomato Price Drop Expected',
    description: 'Tomato prices expected to drop by 20-25% in the next week due to increased supply from Maharashtra farms.',
    impactLevel: 'High',
    category: 'Vegetables',
    action: 'Stock up on tomatoes next week for better pricing',
    priceChange: -25
  },
  {
    id: 2,
    title: 'Mustard Oil Price Stable',
    description: 'Mustard oil prices expected to remain stable for the next 2 weeks before showing a gradual decrease.',
    impactLevel: 'Medium',
    category: 'Oils',
    action: 'Maintain current stock levels',
    priceChange: -5
  },
  {
    id: 3,
    title: 'Red Chili Price Alert',
    description: 'Red chili powder prices expected to rise due to reduced crop output from Rajasthan.',
    impactLevel: 'Medium',
    category: 'Spices',
    action: 'Consider stocking up now',
    priceChange: 10
  },
  {
    id: 4,
    title: 'Potato Surplus Expected',
    description: 'Bumper potato crop leading to price decrease in the coming weeks across all regions.',
    impactLevel: 'High',
    category: 'Vegetables',
    action: 'Delay bulk potato purchases for 1-2 weeks',
    priceChange: -15
  },
];

// This would be a component that renders a price chart
// In a real implementation, you would use a charting library like Chart.js or Recharts
const PriceChart = ({ data, type, predictions = false, height = 220 }) => {
  // This is a simplified chart implementation - in production you'd use a proper chart library
  if (!data || data.length === 0) return <div>No data available</div>;
  
  const items = Object.keys(data[0]).filter(key => key !== 'date');
  const maxValue = Math.max(...data.flatMap(d => items.map(item => d[item])));
  const minValue = Math.min(...data.flatMap(d => items.map(item => d[item])));
  const range = maxValue - minValue;
  
  // Generate random colors for each item
  const colors = {
    onion: '#F87171', // red
    tomato: '#60A5FA', // blue
    potato: '#34D399', // green
    redChili: '#F87171', // red
    turmeric: '#FBBF24', // yellow
    cumin: '#A78BFA', // purple
    refined: '#60A5FA', // blue
    mustard: '#FBBF24', // yellow
  };
  
  return (
    <div className="relative" style={{ height: `${height}px` }}>
      <div className="absolute inset-0 flex items-end pb-6">
        {items.map((item, i) => (
          <div key={i} className="flex items-end h-full" style={{ width: `${100 / items.length}%` }}>
            <div className="w-full px-2">
              <div className="flex flex-col items-center">
                {/* Line for each data point */}
                {data.map((d, j) => {
                  const heightPercent = ((d[item] - minValue) / (range || 1)) * 100;
                  return (
                    <div
                      key={j}
                      className={`w-full my-1 rounded-sm ${predictions ? 'opacity-50' : ''}`}
                      style={{ 
                        height: '2px', 
                        backgroundColor: colors[item] || '#6366F1'
                      }}
                    />
                  );
                })}
                
                {/* Bar for current value */}
                <div
                  className="w-4 rounded-t transition-all duration-500 mt-1"
                  style={{ 
                    height: `${((data[data.length - 1][item] - minValue) / (range || 1)) * 80}%`,
                    backgroundColor: colors[item] || '#6366F1' 
                  }}
                ></div>
                <div className="text-xs font-medium mt-1 text-gray-700">{item}</div>
                <div className="text-xs font-bold">₹{data[data.length - 1][item]}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* X-axis labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-xs text-gray-500">
        <div>{data[0].date}</div>
        <div>{data[data.length - 1].date}</div>
      </div>
    </div>
  );
};

const AnalyticsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('vegetables');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [view, setView] = useState('trends'); // trends, predictions, suppliers, insights
  
  useEffect(() => {
    // This would normally fetch data from the API
    // api.getAnalytics().then(data => setAnalyticsData(data));
  }, []);
  
  // Generate price change data
  const getPriceChange = (category, item) => {
    const data = mockPriceTrends[category];
    if (!data || data.length < 2) return { change: 0, isUp: false };
    
    const current = data[data.length - 1][item];
    const previous = data[data.length - 2][item];
    const change = ((current - previous) / previous) * 100;
    
    return {
      change: Math.abs(change).toFixed(1),
      isUp: change > 0
    };
  };
  
  // Categories for filters
  const categories = [
    { value: 'vegetables', label: 'Vegetables' },
    { value: 'spices', label: 'Spices' },
    { value: 'oils', label: 'Oils' }
  ];
  
  const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'north_delhi', label: 'North Delhi' },
    { value: 'central_delhi', label: 'Central Delhi' },
    { value: 'south_delhi', label: 'South Delhi' },
    { value: 'noida', label: 'Noida' },
    { value: 'gurgaon', label: 'Gurgaon' }
  ];

  return (
    <div className="analytics-page">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Market Analytics</h1>
          <p className="text-sm text-gray-600 mt-1">
            Track price trends, predictions, and supplier analytics
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant={view === 'trends' ? 'primary' : 'outline'}
            onClick={() => setView('trends')}
          >
            <FaChartLine className="mr-2" /> Price Trends
          </Button>
          <Button 
            size="sm" 
            variant={view === 'predictions' ? 'primary' : 'outline'}
            onClick={() => setView('predictions')}
          >
            <FaChartLine className="mr-2" /> Price Predictions
          </Button>
          <Button 
            size="sm" 
            variant={view === 'suppliers' ? 'primary' : 'outline'}
            onClick={() => setView('suppliers')}
          >
            <FaMapMarkerAlt className="mr-2" /> Top Suppliers
          </Button>
          <Button 
            size="sm" 
            variant={view === 'insights' ? 'primary' : 'outline'}
            onClick={() => setView('insights')}
          >
            <FaExclamationTriangle className="mr-2" /> Market Insights
          </Button>
        </div>
      </div>
      
      {/* Filter Bar */}
      <Card className="mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-auto">
            <FormGroup className="mb-0">
              <Label htmlFor="categoryFilter" className="flex items-center">
                <FaFilter className="mr-2" /> Category
              </Label>
              <Select
                id="categoryFilter"
                options={categories}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="min-w-[200px]"
              />
            </FormGroup>
          </div>
          
          <div className="w-full md:w-auto">
            <FormGroup className="mb-0">
              <Label htmlFor="regionFilter" className="flex items-center">
                <FaMapMarkerAlt className="mr-2" /> Region
              </Label>
              <Select
                id="regionFilter"
                options={regions}
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="min-w-[200px]"
              />
            </FormGroup>
          </div>
          
          <div className="w-full md:w-auto flex items-end">
            <div className="text-sm text-gray-500 flex items-center">
              <FaRegCalendarAlt className="mr-2" /> Data as of: July 26, 2025
            </div>
          </div>
        </div>
      </Card>

      {view === 'trends' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Today's Prices Card */}
            <Card title="Today's Prices" className="col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {Object.keys(mockPriceTrends[selectedCategory][mockPriceTrends[selectedCategory].length - 1])
                  .filter(key => key !== 'date')
                  .map((item, i) => {
                    const { change, isUp } = getPriceChange(selectedCategory, item);
                    return (
                      <div key={i} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium capitalize">{item}</h3>
                            <div className="text-2xl font-bold mt-1 flex items-center">
                              <FaRupeeSign className="text-base" /> 
                              {mockPriceTrends[selectedCategory][mockPriceTrends[selectedCategory].length - 1][item]}
                              <span className="text-sm text-gray-500 ml-1 font-normal">
                                {selectedCategory === 'vegetables' ? '/kg' : 
                                  selectedCategory === 'spices' ? '/kg' : '/L'}
                              </span>
                            </div>
                          </div>
                          <div className={`flex items-center ${isUp ? 'text-red-500' : 'text-green-500'}`}>
                            {isUp ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                            <span className="font-medium">{change}%</span>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Price Trend (Last 7 Days)</h3>
                  <div className="text-sm text-gray-500">
                    {mockPriceTrends[selectedCategory][0].date} - {mockPriceTrends[selectedCategory][mockPriceTrends[selectedCategory].length - 1].date}
                  </div>
                </div>
                <PriceChart data={mockPriceTrends[selectedCategory]} type="line" height={250} />
              </div>
            </Card>

            <Card title="Price Analysis">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Price Volatility</h3>
                  <div className="space-y-3">
                    {Object.keys(mockPriceTrends[selectedCategory][0])
                      .filter(key => key !== 'date')
                      .map((item, i) => {
                        // Calculate mock volatility based on price changes
                        const prices = mockPriceTrends[selectedCategory].map(d => d[item]);
                        const volatility = Math.random() * 50; // Just for demonstration
                        let volatilityClass = "bg-green-500";
                        if (volatility > 30) volatilityClass = "bg-red-500";
                        else if (volatility > 15) volatilityClass = "bg-yellow-500";
                        
                        return (
                          <div key={i}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm capitalize">{item}</span>
                              <span className="text-xs font-medium">
                                {volatility < 15 ? 'Low' : volatility < 30 ? 'Medium' : 'High'}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div className={`${volatilityClass} h-1.5 rounded-full`} style={{ width: `${volatility}%` }}></div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-medium mb-2">Seasonal Factors</h3>
                  <div className="space-y-2 text-sm">
                    {selectedCategory === 'vegetables' && (
                      <>
                        <div className="flex items-start">
                          <Badge variant="info" className="mt-0.5 mr-2">Tomato</Badge>
                          <p>Peak harvest season starting, prices likely to decrease further</p>
                        </div>
                        <div className="flex items-start">
                          <Badge variant="warning" className="mt-0.5 mr-2">Onion</Badge>
                          <p>Off-season period ending, prices stabilizing</p>
                        </div>
                      </>
                    )}
                    {selectedCategory === 'spices' && (
                      <>
                        <div className="flex items-start">
                          <Badge variant="danger" className="mt-0.5 mr-2">Red Chili</Badge>
                          <p>Shortage due to weather conditions, prices rising</p>
                        </div>
                        <div className="flex items-start">
                          <Badge variant="success" className="mt-0.5 mr-2">Turmeric</Badge>
                          <p>Stable supply with consistent prices</p>
                        </div>
                      </>
                    )}
                    {selectedCategory === 'oils' && (
                      <>
                        <div className="flex items-start">
                          <Badge variant="success" className="mt-0.5 mr-2">Refined Oil</Badge>
                          <p>International prices falling, expect lower prices</p>
                        </div>
                        <div className="flex items-start">
                          <Badge variant="info" className="mt-0.5 mr-2">Mustard Oil</Badge>
                          <p>Prices stable with good domestic production</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <Card title="Price Comparison by Region" className="mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">North Delhi</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Central Delhi</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">South Delhi</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Noida</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gurgaon</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.keys(mockPriceTrends[selectedCategory][mockPriceTrends[selectedCategory].length - 1])
                    .filter(key => key !== 'date')
                    .map((item, i) => {
                      const basePrice = mockPriceTrends[selectedCategory][mockPriceTrends[selectedCategory].length - 1][item];
                      // Generate random price variations for different regions
                      const regions = {
                        northDelhi: basePrice * (1 + (Math.random() * 0.1 - 0.05)),
                        centralDelhi: basePrice * (1 + (Math.random() * 0.1 - 0.05)),
                        southDelhi: basePrice * (1 + (Math.random() * 0.1 - 0.05)),
                        noida: basePrice * (1 + (Math.random() * 0.1 - 0.05)),
                        gurgaon: basePrice * (1 + (Math.random() * 0.1 - 0.05))
                      };
                      
                      // Find lowest and highest price
                      const prices = Object.values(regions);
                      const minPrice = Math.min(...prices);
                      const maxPrice = Math.max(...prices);
                      
                      return (
                        <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">{item}</td>
                          {Object.values(regions).map((price, j) => (
                            <td 
                              key={j} 
                              className={`px-6 py-4 whitespace-nowrap text-sm ${
                                price === minPrice ? 'font-bold text-green-600' : 
                                price === maxPrice ? 'font-bold text-red-600' : 'text-gray-500'
                              }`}
                            >
                              <div className="flex items-center">
                                <FaRupeeSign className="text-xs mr-1" /> 
                                {Math.round(price)}
                                {price === minPrice && <Badge variant="success" className="ml-2 text-xs py-0">Lowest</Badge>}
                              </div>
                            </td>
                          ))}
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-sm text-gray-500 flex items-center">
              <FaExclamationTriangle className="text-yellow-500 mr-2" />
              <span>Prices may vary based on quality and vendor. Always confirm before ordering.</span>
            </div>
          </Card>
        </>
      )}
      
      {view === 'predictions' && (
        <>
          <Card title="Price Predictions (Next 5 Days)" className="mb-8">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Predicted Price Trend</h3>
                <div className="text-sm text-gray-500">
                  {pricePredictions[selectedCategory][0].date} - {pricePredictions[selectedCategory][pricePredictions[selectedCategory].length - 1].date}
                </div>
              </div>
              <PriceChart data={pricePredictions[selectedCategory]} type="line" predictions={true} height={250} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.keys(pricePredictions[selectedCategory][0])
                .filter(key => key !== 'date')
                .map((item, i) => {
                  const currentPrice = mockPriceTrends[selectedCategory][mockPriceTrends[selectedCategory].length - 1][item];
                  const predictedEndPrice = pricePredictions[selectedCategory][pricePredictions[selectedCategory].length - 1][item];
                  const change = ((predictedEndPrice - currentPrice) / currentPrice) * 100;
                  const isDecreasing = change < 0;
                  
                  return (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium capitalize">{item}</h3>
                        <Badge variant={isDecreasing ? 'success' : 'danger'}>
                          {isDecreasing ? 'Decreasing' : 'Increasing'}
                        </Badge>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm text-gray-600">Current Price:</div>
                          <div className="font-medium flex items-center">
                            <FaRupeeSign className="text-xs" /> {currentPrice}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">Predicted (Jul 30):</div>
                          <div className="font-medium flex items-center">
                            <FaRupeeSign className="text-xs" /> {predictedEndPrice}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex items-center">
                          <div className={`flex items-center ${isDecreasing ? 'text-green-500' : 'text-red-500'}`}>
                            {isDecreasing ? <FaArrowDown className="mr-1" /> : <FaArrowUp className="mr-1" />}
                            <span className="font-medium">{Math.abs(change).toFixed(1)}%</span>
                          </div>
                          <span className="ml-2 text-sm text-gray-600">expected change</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {isDecreasing 
                            ? 'Good time to delay purchasing' 
                            : 'Consider purchasing soon before prices rise'}
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            
            <div className="mt-6 bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <div className="flex items-start">
                <div className="text-blue-500 mr-2 mt-1">
                  <FaExclamationTriangle />
                </div>
                <div>
                  <h4 className="font-medium text-blue-800">About Price Predictions</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Predictions are based on historical data, seasonal trends, and market conditions. 
                    Actual prices may vary due to unforeseen circumstances. Use these predictions as a guide only.
                  </p>
                </div>
              </div>
            </div>
          </Card>
          
          <Card title="Recommended Buying Strategy" className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">Buy Now</h3>
                <div className="space-y-3">
                  {Object.keys(pricePredictions[selectedCategory][0])
                    .filter(key => key !== 'date')
                    .map((item, i) => {
                      const currentPrice = mockPriceTrends[selectedCategory][mockPriceTrends[selectedCategory].length - 1][item];
                      const predictedEndPrice = pricePredictions[selectedCategory][pricePredictions[selectedCategory].length - 1][item];
                      const change = ((predictedEndPrice - currentPrice) / currentPrice) * 100;
                      
                      if (change > 0) {
                        return (
                          <div key={i} className="flex items-center justify-between p-3 bg-red-50 border border-red-100 rounded-lg">
                            <div className="flex items-center">
                              <Badge variant="danger" className="mr-2 capitalize">{item}</Badge>
                              <span className="text-sm text-red-700">
                                Price expected to increase by {Math.abs(change).toFixed(1)}%
                              </span>
                            </div>
                            <Link to="/dashboard/products">
                              <Button size="sm">Order</Button>
                            </Link>
                          </div>
                        )
                      }
                      return null;
                    })
                  }
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Wait to Buy</h3>
                <div className="space-y-3">
                  {Object.keys(pricePredictions[selectedCategory][0])
                    .filter(key => key !== 'date')
                    .map((item, i) => {
                      const currentPrice = mockPriceTrends[selectedCategory][mockPriceTrends[selectedCategory].length - 1][item];
                      const predictedEndPrice = pricePredictions[selectedCategory][pricePredictions[selectedCategory].length - 1][item];
                      const change = ((predictedEndPrice - currentPrice) / currentPrice) * 100;
                      
                      if (change < 0) {
                        return (
                          <div key={i} className="flex items-center justify-between p-3 bg-green-50 border border-green-100 rounded-lg">
                            <div className="flex items-center">
                              <Badge variant="success" className="mr-2 capitalize">{item}</Badge>
                              <span className="text-sm text-green-700">
                                Price expected to decrease by {Math.abs(change).toFixed(1)}%
                              </span>
                            </div>
                            <Link to="#">
                              <Button size="sm" variant="outline">
                                Set Alert
                              </Button>
                            </Link>
                          </div>
                        )
                      }
                      return null;
                    })
                  }
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
      
      {view === 'suppliers' && (
        <>
          <Card title="Top Rated Suppliers Near You" className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bestSuppliers
                .filter(supplier => selectedRegion === 'all' || supplier.region.toLowerCase().includes(selectedRegion.replace('_', ' ')))
                .map((supplier, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{supplier.name}</h3>
                        <Badge variant="info" className="mt-1">{supplier.category}</Badge>
                      </div>
                      <div className="text-amber-500 flex items-center">
                        {'★'.repeat(Math.floor(supplier.rating))}
                        {'☆'.repeat(5 - Math.floor(supplier.rating))}
                        <span className="ml-1 text-gray-600 text-sm">{supplier.rating}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="text-sm">
                        <div className="text-gray-500">Region</div>
                        <div className="font-medium flex items-center">
                          <FaMapMarkerAlt className="mr-1 text-gray-400" /> {supplier.region}
                        </div>
                      </div>
                      <div className="text-sm">
                        <div className="text-gray-500">Distance</div>
                        <div className="font-medium">{supplier.distance} km</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-gray-500">Pricing</div>
                        <div className="font-medium">{supplier.pricing}</div>
                      </div>
                      <div className="text-sm">
                        <div className="text-gray-500">Delivery</div>
                        <div className="font-medium">{supplier.delivery}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="text-sm text-gray-500 mb-1">Specialties</div>
                      <div className="flex flex-wrap gap-2">
                        {supplier.specialties.map((specialty, j) => (
                          <Badge key={j} variant="success">{specialty}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                      <div className="text-sm">
                        <div className={supplier.priceCompare.includes('below') ? 'text-green-600' : supplier.priceCompare.includes('above') ? 'text-red-600' : 'text-gray-600'}>
                          {supplier.priceCompare}
                        </div>
                      </div>
                      <Link to={`/dashboard/suppliers/${supplier.id}`}>
                        <Button size="sm">View Products</Button>
                      </Link>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="mt-4 text-sm text-gray-500 flex justify-center">
              <Link to="/dashboard/suppliers" className="text-indigo-600 hover:text-indigo-800">
                View all suppliers →
              </Link>
            </div>
          </Card>
          
          <Card title="Supplier Comparison by Category" className="mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best Price</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best Quality</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fastest Delivery</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Most Reliable</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Vegetables & Fruits</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Singh Vegetable Supply</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fresh Farm Produce</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Singh Vegetable Supply</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fresh Farm Produce</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Spices & Condiments</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Delhi Spice Market</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sharma Masala Mart</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rapid Spice Delivery</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sharma Masala Mart</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cooking Oils</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Gupta Oil Traders</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Pure Oils Co.</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Gupta Oil Traders</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Pure Oils Co.</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Dairy Products</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Local Dairy Cooperative</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fresh Dairy Supplies</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fresh Dairy Supplies</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fresh Dairy Supplies</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
      
      {view === 'insights' && (
        <>
          <Card title="Market Insights & Alerts" className="mb-8">
            <div className="space-y-6">
              {seasonalInsights.map((insight, i) => (
                <div 
                  key={i} 
                  className={`p-4 rounded-lg border ${
                    insight.impactLevel === 'High' 
                      ? insight.priceChange < 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                      : 'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{insight.title}</h3>
                    <Badge 
                      variant={
                        insight.impactLevel === 'High' ? 'danger' :
                        insight.impactLevel === 'Medium' ? 'warning' : 'info'
                      }
                    >
                      {insight.impactLevel} Impact
                    </Badge>
                  </div>
                  <p className="text-sm mt-2 text-gray-700">{insight.description}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <Badge variant="info" className="mr-2">{insight.category}</Badge>
                      <div className={`flex items-center ${insight.priceChange < 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {insight.priceChange < 0 ? <FaArrowDown className="mr-1" /> : <FaArrowUp className="mr-1" />}
                        <span className="font-medium">{Math.abs(insight.priceChange)}%</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium">
                      {insight.action}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card title="Upcoming Events Affecting Prices">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="rounded-md bg-indigo-100 p-2 mr-3">
                    <FaRegCalendarAlt className="text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Seasonal Harvest Period</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Tomato and onion harvest season begins in August, likely leading to price drops of 15-20%.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="rounded-md bg-indigo-100 p-2 mr-3">
                    <FaRegCalendarAlt className="text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Festival Season Preparations</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Upcoming festival season in September will increase demand for spices and oils, likely increasing prices by 10-15%.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="rounded-md bg-indigo-100 p-2 mr-3">
                    <FaRegCalendarAlt className="text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Government Policy Change</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      New import policies for edible oils coming into effect next month may reduce prices by 5-8%.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card title="Procurement Recommendations">
              <div className="space-y-4">
                <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                  <h3 className="font-medium text-green-800">Stock Up</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Red chili powder prices are expected to rise. Consider purchasing in bulk now before the price increase.
                  </p>
                  <div className="flex justify-end mt-2">
                    <Link to="/dashboard/products?category=spices">
                      <Button size="sm" variant="success">View Spices</Button>
                    </Link>
                  </div>
                </div>
                
                <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                  <h3 className="font-medium text-yellow-800">Regular Purchase</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Mustard oil prices are stable. Maintain your regular purchasing schedule.
                  </p>
                  <div className="flex justify-end mt-2">
                    <Link to="/dashboard/products?category=oils">
                      <Button size="sm" variant="warning">View Oils</Button>
                    </Link>
                  </div>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <h3 className="font-medium text-blue-800">Wait to Purchase</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Tomato prices are expected to drop significantly. Delay bulk purchases if possible.
                  </p>
                  <div className="flex justify-end mt-2">
                    <Link to="/dashboard/products?category=vegetables">
                      <Button size="sm" variant="outline">View Vegetables</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyticsPage;