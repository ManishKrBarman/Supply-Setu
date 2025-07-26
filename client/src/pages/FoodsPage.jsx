import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Table, Badge } from '../components/DataDisplay';
import Button from '../components/Button';

const FoodsPage = () => {
  // Mock data - to be replaced with actual API calls
  const foods = [
    { 
      id: 1, 
      name: 'Pasta Carbonara', 
      category: 'Main Course', 
      ingredients: 'Pasta, Eggs, Cheese, Bacon',
      preparation: '25 mins',
      calories: 550,
      status: 'Active' 
    },
    { 
      id: 2, 
      name: 'Caesar Salad', 
      category: 'Starter', 
      ingredients: 'Lettuce, Croutons, Parmesan, Caesar Dressing',
      preparation: '15 mins',
      calories: 320,
      status: 'Active' 
    },
    { 
      id: 3, 
      name: 'Chocolate Mousse', 
      category: 'Dessert', 
      ingredients: 'Chocolate, Cream, Sugar, Eggs',
      preparation: '40 mins',
      calories: 420,
      status: 'Inactive' 
    },
    { 
      id: 4, 
      name: 'Vegetable Soup', 
      category: 'Soup', 
      ingredients: 'Mixed Vegetables, Vegetable Broth, Herbs',
      preparation: '30 mins',
      calories: 180,
      status: 'Active' 
    },
  ];

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { header: 'Ingredients', accessor: 'ingredients' },
    { header: 'Prep Time', accessor: 'preparation' },
    { header: 'Calories', accessor: 'calories' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (row) => {
        return row.status === 'Active' 
          ? <Badge variant="success">{row.status}</Badge>
          : <Badge variant="danger">{row.status}</Badge>;
      }
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex space-x-2">
          <Link to={`/dashboard/foods/edit/${row.id}`}>
            <Button size="sm" variant="ghost">Edit</Button>
          </Link>
          <Button size="sm" variant="ghost" className="text-red-600">Delete</Button>
        </div>
      )
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Food Items</h1>
        <Link to="/dashboard/foods/new">
          <Button>Add Food Item</Button>
        </Link>
      </div>
      
      <Card>
        <Table 
          columns={columns}
          data={foods}
          emptyMessage="No food items found"
        />
      </Card>
    </div>
  );
};

export default FoodsPage;