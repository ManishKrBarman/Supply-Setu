import React from 'react';
import { Link } from 'react-router-dom';
import { FaBox, FaUsers, FaUtensils, FaChartLine, FaExclamationTriangle, FaBoxOpen, FaRupeeSign, FaShoppingCart, FaRegClock, FaPercent, FaRegCalendarAlt, FaTruck, FaFire } from 'react-icons/fa';
import { Card, Table, Badge } from '../components/DataDisplay';
import Button from '../components/Button';

const DashboardPage = () => {
  // Mock data for a street food vendor's dashboard
  const summaryData = [
    { title: 'Raw Materials', value: '24', icon: <FaBox />, color: 'bg-indigo-500' },
    { title: 'Trusted Suppliers', value: '8', icon: <FaUsers />, color: 'bg-green-500' },
    { title: 'Food Items', value: '12', icon: <FaUtensils />, color: 'bg-amber-500' },
    { title: 'Low Stock Alerts', value: '3', icon: <FaExclamationTriangle />, color: 'bg-red-500' },
  ];

  // Essential raw materials for a street food vendor
  const lowStockItems = [
    { id: 1, name: 'Onions (Premium Quality)', category: 'Vegetables', stock: 2, unit: 'kg', minRequired: 5, supplier: 'Singh Vegetable Supply', status: 'Critical' },
    { id: 2, name: 'Red Chili Powder', category: 'Spices', stock: 120, unit: 'g', minRequired: 500, supplier: 'Sharma Masala Mart', status: 'Low Stock' },
    { id: 3, name: 'Mustard Oil', category: 'Oils', stock: 1.5, unit: 'L', minRequired: 5, supplier: 'Gupta Oil Traders', status: 'Critical' },
  ];

  // Upcoming deliveries for the street food vendor
  const upcomingDeliveries = [
    { id: 1, supplier: 'Singh Vegetable Supply', items: ['Onions (10kg)', 'Tomatoes (5kg)', 'Potatoes (15kg)'], scheduledDate: '2023-08-04', status: 'Confirmed' },
    { id: 2, supplier: 'Sharma Masala Mart', items: ['Red Chili Powder (1kg)', 'Turmeric (500g)'], scheduledDate: '2023-08-05', status: 'Processing' },
  ];

  // Best-selling items for the street food vendor
  const bestSellingItems = [
    { id: 1, name: 'Chole Bhature', dailyAvg: 42, costPrice: 45, sellingPrice: 80, profit: 35, profitMargin: '43.75%' },
    { id: 2, name: 'Pav Bhaji', dailyAvg: 38, costPrice: 40, sellingPrice: 70, profit: 30, profitMargin: '42.86%' },
    { id: 3, name: 'Aloo Tikki', dailyAvg: 35, costPrice: 25, sellingPrice: 50, profit: 25, profitMargin: '50.00%' },
  ];

  // Columns for low stock items
  const lowStockColumns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { 
      header: 'Current Stock', 
      accessor: 'stock',
      render: (row) => `${row.stock} ${row.unit}`
    },
    { 
      header: 'Min Required', 
      accessor: 'minRequired',
      render: (row) => `${row.minRequired} ${row.unit}`
    },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => {
        const status = row.status;
        if (status === 'In Stock') return <Badge variant="success">{status}</Badge>;
        if (status === 'Low Stock') return <Badge variant="warning">{status}</Badge>;
        if (status === 'Critical') return <Badge variant="danger">{status}</Badge>;
        return <Badge>{status}</Badge>;
      }
    },
    {
      header: 'Action',
      render: (row) => (
        <Link to={`/dashboard/products?supplier=${row.supplier}`}>
          <Button size="sm" variant="outline">Order Now</Button>
        </Link>
      )
    }
  ];

  // Columns for upcoming deliveries
  const deliveryColumns = [
    { header: 'Supplier', accessor: 'supplier' },
    { 
      header: 'Items', 
      accessor: 'items',
      render: (row) => (
        <div>
          {row.items.map((item, idx) => (
            <Badge key={idx} className="mr-1 mb-1">{item}</Badge>
          ))}
        </div>
      )
    },
    { 
      header: 'Delivery Date', 
      accessor: 'scheduledDate',
      render: (row) => (
        <div className="flex items-center">
          <FaRegCalendarAlt className="mr-1 text-indigo-500" />
          <span>{row.scheduledDate}</span>
        </div>
      )
    },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => {
        const status = row.status;
        if (status === 'Confirmed') return <Badge variant="success">{status}</Badge>;
        if (status === 'Processing') return <Badge variant="info">{status}</Badge>;
        return <Badge>{status}</Badge>;
      }
    },
  ];

  // Columns for best-selling items
  const bestSellingColumns = [
    { header: 'Food Item', accessor: 'name' },
    { 
      header: 'Daily Avg.', 
      accessor: 'dailyAvg',
      render: (row) => (
        <div className="flex items-center">
          <FaRegClock className="mr-1 text-gray-400" />
          <span>{row.dailyAvg} orders</span>
        </div>
      )
    },
    { 
      header: 'Cost', 
      accessor: 'costPrice',
      render: (row) => (
        <div className="flex items-center">
          <FaRupeeSign className="text-xs" />
          <span>{row.costPrice}</span>
        </div>
      )
    },
    { 
      header: 'Selling', 
      accessor: 'sellingPrice',
      render: (row) => (
        <div className="flex items-center">
          <FaRupeeSign className="text-xs" />
          <span>{row.sellingPrice}</span>
        </div>
      )
    },
    { 
      header: 'Profit/Item', 
      accessor: 'profit',
      render: (row) => (
        <div className="flex items-center text-green-600 font-medium">
          <FaRupeeSign className="text-xs" />
          <span>{row.profit}</span>
          <span className="ml-1 text-xs text-gray-500">({row.profitMargin})</span>
        </div>
      )
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Street Food Dashboard</h1>
          <p className="text-sm text-gray-600 mt-1">Welcome back! Here's your business at a glance</p>
        </div>
        <div className="flex space-x-3">
          <Link to="/dashboard/products">
            <Button variant="outline" size="sm">
              <FaShoppingCart className="mr-2" /> Order Materials
            </Button>
          </Link>
          <Link to="/dashboard/foods/new">
            <Button size="sm">
              <FaUtensils className="mr-2" /> Add New Dish
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryData.map((item, index) => (
          <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${item.color}`}>
                  <div className="text-white text-xl">
                    {item.icon}
                  </div>
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500 truncate">
                    {item.title}
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Daily Sales Report */}
        <Card title="Daily Sales Report">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Today's Revenue</span>
              <div className="text-2xl font-bold flex items-center">
                <FaRupeeSign className="text-lg" /> 4,280
              </div>
              <span className="text-xs text-green-600 mt-1">
                <span className="font-medium">↑ 8%</span> vs yesterday
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Orders Completed</span>
              <div className="text-2xl font-bold">124</div>
              <span className="text-xs text-green-600 mt-1">
                <span className="font-medium">↑ 12</span> more than yesterday
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Average Order Value</span>
              <div className="text-2xl font-bold flex items-center">
                <FaRupeeSign className="text-lg" /> 85
              </div>
            </div>
          </div>
          
          <div className="h-48 flex items-center justify-center bg-gray-50 rounded mb-4">
            <div className="text-center">
              <FaChartLine className="mx-auto h-8 w-8 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Daily Sales Chart</h3>
              <p className="mt-1 text-xs text-gray-500">
                Chart displaying revenue trends will appear here
              </p>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
            <div className="flex items-center text-sm text-indigo-600">
              <FaFire className="mr-2" />
              <span>Peak Hours: 6:00 PM - 8:00 PM</span>
            </div>
            <Link to="/dashboard/analytics">
              <Button size="sm" variant="ghost">View Analytics</Button>
            </Link>
          </div>
        </Card>

        {/* Inventory Status */}
        <Card title="Inventory Status">
          <div className="flex justify-between items-center mb-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Current Stock Value</span>
              <div className="text-2xl font-bold flex items-center">
                <FaRupeeSign className="text-lg" /> 18,450
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Stock Health</span>
              <div className="flex items-center">
                <Badge variant="warning" className="mt-1">Needs attention</Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">Well Stocked</span>
                <span className="text-sm font-medium text-green-600">18 items</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">Low Stock</span>
                <span className="text-sm font-medium text-yellow-600">3 items</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '12.5%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">Critical</span>
                <span className="text-sm font-medium text-red-600">3 items</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '12.5%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center">
              <FaBoxOpen className="h-5 w-5 text-red-500 mr-2" />
              <span className="font-medium">Critical Stock Alert</span>
            </div>
            <Link to="/dashboard/products">
              <Button size="sm">View All Stock</Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Low Stock Alert */}
      <Card title="Low Stock Alert - Order Soon" className="mb-8">
        <Table 
          columns={lowStockColumns}
          data={lowStockItems}
          emptyMessage="No low stock items found"
        />
        <div className="mt-4 pt-3 border-t border-gray-200 text-right">
          <Link to="/dashboard/products">
            <Button variant="outline" size="sm">View All Materials</Button>
          </Link>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Upcoming Deliveries */}
        <Card title="Upcoming Deliveries">
          <Table 
            columns={deliveryColumns}
            data={upcomingDeliveries}
            emptyMessage="No upcoming deliveries"
          />
          <div className="mt-4 pt-3 border-t border-gray-200 text-right">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                <FaTruck className="inline mr-2 text-indigo-500" /> Next delivery expected: August 4th
              </span>
              <Button size="sm" variant="outline">Schedule Delivery</Button>
            </div>
          </div>
        </Card>

        {/* Best Selling Items */}
        <Card title="Best Selling Items">
          <Table 
            columns={bestSellingColumns}
            data={bestSellingItems}
            emptyMessage="No sales data available"
          />
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Total Daily Profit: </span>
                <span className="font-bold text-green-600 flex items-center">
                  <FaRupeeSign className="text-xs" /> 3,895
                </span>
              </div>
              <Link to="/dashboard/foods">
                <Button size="sm" variant="outline">Manage Menu</Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Seasonal Ingredient Alert */}
      <Card className="mb-8 bg-amber-50 border-amber-200">
        <div className="flex items-start">
          <div className="bg-amber-100 rounded-full p-3 mr-4">
            <FaPercent className="text-amber-600 text-xl" />
          </div>
          <div>
            <h3 className="font-medium text-lg text-amber-800 mb-2">Seasonal Ingredient Alert</h3>
            <p className="text-amber-700 mb-3">
              Tomato prices are expected to drop by 15% next week due to seasonal availability. Consider stocking up for your Chole Bhature and Pav Bhaji preparations.
            </p>
            <div className="flex space-x-4">
              <Link to="/dashboard/products?category=vegetables">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-amber-500 text-amber-700 hover:bg-amber-100"
                >
                  View Vegetables
                </Button>
              </Link>
              <Button 
                variant="ghost"
                size="sm"
                className="text-amber-700"
              >
                Set Price Alert
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;