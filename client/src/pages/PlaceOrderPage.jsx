import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSupplierWithProducts } from '../api/supplierService';
import { createOrder } from '../api/orderService';
import { getCurrentUser } from '../api/authService';
import { Alert } from '../components/DataDisplay';
import Button from '../components/Button';
import { FormGroup, Label, Input } from '../components/FormElements';
import { FaArrowLeft, FaSpinner, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';

const PlaceOrderPage = () => {
  const { supplierId } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [supplier, setSupplier] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState(user?.location?.address || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchSupplierAndProducts();
  }, [supplierId]);

  const fetchSupplierAndProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getSupplierWithProducts(supplierId);
      setSupplier(data);
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message || 'Failed to load supplier data');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      // Check if product already in cart
      const existingItem = prevCart.find(item => item.productId === product._id);
      
      if (existingItem) {
        // Increment quantity if already in cart
        return prevCart.map(item => 
          item.productId === product._id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new item to cart
        return [...prevCart, { 
          productId: product._id,
          name: product.name,
          price: product.price,
          unit: product.unit,
          quantity: 1 
        }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productId === productId);
      
      if (existingItem && existingItem.quantity > 1) {
        // Decrement quantity
        return prevCart.map(item => 
          item.productId === productId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      } else {
        // Remove item from cart
        return prevCart.filter(item => item.productId !== productId);
      }
    });
  };

  const getItemQuantity = (productId) => {
    const item = cart.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleSubmitOrder = async () => {
    if (cart.length === 0) {
      setError('Your cart is empty. Please add items to place an order.');
      return;
    }

    if (!address.trim()) {
      setError('Please provide a delivery address.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const orderData = {
        supplierUserId: supplier.user._id || supplier.user,
        items: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        deliveryAddress: {
          street: address,
          city: 'Your City', // In a real app, these would be separate form fields
          state: 'Your State',
          country: 'India',
          pincode: '123456'
        },
        paymentMethod: 'COD', // Default payment method
        notes: 'Order placed from vendor portal'
      };

      const result = await createOrder(orderData);
      navigate('/dashboard/orders', { 
        state: { 
          success: true, 
          message: `Order #${result.order.orderNumber} placed successfully!` 
        } 
      });
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="error">{error}</Alert>;
  }

  if (!supplier) {
    return <Alert variant="error">Supplier not found</Alert>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-indigo-600 hover:text-indigo-900"
        >
          <FaArrowLeft className="mr-2" /> Back to Suppliers
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main products list */}
        <div className="lg:w-2/3">
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">{supplier.businessName}</h2>
            <p className="text-gray-600 mb-2">{supplier.address}</p>
            <p className="text-gray-600 mb-4">Categories: {supplier.categories?.join(', ')}</p>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="text-lg font-semibold mb-4">Available Products</h3>
              
              {products.length === 0 ? (
                <p className="text-gray-500">No products available from this supplier.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map(product => (
                    <div key={product._id} className="border rounded-lg p-4 relative">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-40 object-cover mb-3 rounded"
                        />
                      )}
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">
                          ₹{product.price} / {product.unit}
                        </span>
                        
                        <div className="flex items-center">
                          {getItemQuantity(product._id) > 0 ? (
                            <>
                              <button 
                                onClick={() => removeFromCart(product._id)} 
                                className="bg-gray-200 text-gray-800 w-8 h-8 rounded flex items-center justify-center"
                              >
                                <FaMinus size={12} />
                              </button>
                              <span className="px-3">{getItemQuantity(product._id)}</span>
                              <button 
                                onClick={() => addToCart(product)} 
                                className="bg-indigo-600 text-white w-8 h-8 rounded flex items-center justify-center"
                              >
                                <FaPlus size={12} />
                              </button>
                            </>
                          ) : (
                            <button 
                              onClick={() => addToCart(product)} 
                              className="bg-indigo-600 text-white px-3 py-1 rounded flex items-center"
                            >
                              <FaPlus size={12} className="mr-1" /> Add
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Shopping cart sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-white shadow rounded-lg p-6 sticky top-4">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaShoppingCart className="mr-2" /> Your Order
            </h3>
            
            {cart.length === 0 ? (
              <p className="text-gray-500 mb-4">Your cart is empty. Add items to place an order.</p>
            ) : (
              <>
                <div className="mb-4">
                  {cart.map(item => (
                    <div key={item.productId} className="flex justify-between items-center py-2 border-b">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.quantity} × ₹{item.price} / {item.unit}
                        </p>
                      </div>
                      <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
              </>
            )}
            
            <FormGroup className="mb-6">
              <Label htmlFor="address" required>Delivery Address</Label>
              <Input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter delivery address"
              />
            </FormGroup>
            
            <Button
              variant="primary"
              fullWidth
              size="lg"
              isLoading={isSubmitting}
              disabled={cart.length === 0 || !address.trim()}
              onClick={handleSubmitOrder}
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
