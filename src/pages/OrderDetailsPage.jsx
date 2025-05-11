import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaTruck, FaBox, FaCheckCircle } from 'react-icons/fa';
import { fetchOrderById } from '../services/api';

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await fetchOrderById(orderId);
        setOrder(data);
      } catch (error) {
        console.error('Error loading order details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadOrder();
  }, [orderId]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-8"></div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="h-24 bg-gray-300 rounded mb-4"></div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex">
                    <div className="h-16 w-16 bg-gray-300 rounded"></div>
                    <div className="ml-4 flex-1">
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6">Order Not Found</h1>
          <p className="text-gray-600 mb-8">
            We couldn't find the order you're looking for.
          </p>
          <Link 
            to="/orders" 
            className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
          >
            <FaArrowLeft className="mr-2" /> Back to Orders
          </Link>
        </div>
      </div>
    );
  }
  
  // Define order status steps
  const orderSteps = [
    { id: 'processing', label: 'Processing', icon: FaBox },
    { id: 'shipped', label: 'Shipped', icon: FaTruck },
    { id: 'delivered', label: 'Delivered', icon: FaCheckCircle }
  ];
  
  // Determine current step based on order status
  let currentStepIndex = 0;
  if (order.status === 'Shipped') currentStepIndex = 1;
  if (order.status === 'Delivered') currentStepIndex = 2;
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/orders" className="text-indigo-600 hover:text-indigo-800 mr-4">
            <FaArrowLeft />
          </Link>
          <h1 className="text-3xl font-bold">Order #{order.id}</h1>
        </div>
        
        {/* Order Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Status</h2>
          
          <div className="relative">
            {/* Progress bar */}
            <div className="overflow-hidden h-2 mb-6 text-xs flex rounded bg-gray-200">
              <div 
                style={{ width: `${(currentStepIndex / (orderSteps.length - 1)) * 100}%` }} 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-500"
              ></div>
            </div>
            
            {/* Steps */}
            <div className="flex justify-between">
              {orderSteps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = index <= currentStepIndex;
                const isCompleted = index < currentStepIndex;
                
                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isActive ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      <StepIcon />
                    </div>
                    <div className="text-sm mt-2 font-medium text-gray-900">{step.label}</div>
                    {isCompleted && (
                      <div className="text-xs text-gray-500">Completed</div>
                    )}
                    {index === currentStepIndex && !isCompleted && (
                      <div className="text-xs text-indigo-600">In Progress</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="mt-6 text-center text-gray-600">
            <p>Order placed on {order.date}</p>
            {order.status === 'Processing' && (
              <p className="mt-2">Your order is being processed and will be shipped soon.</p>
            )}
            {order.status === 'Shipped' && (
              <p className="mt-2">Your order has been shipped and is on its way to you.</p>
            )}
            {order.status === 'Delivered' && (
              <p className="mt-2">Your order has been delivered. Thank you for shopping with us!</p>
            )}
          </div>
        </div>
        
        {/* Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Shipping Information */}
          <div className="md:col-span-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-indigo-600" /> Shipping Address
            </h2>
            <p className="text-gray-800">
              {order.shippingAddress.name}<br />
              {order.shippingAddress.street}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
              {order.shippingAddress.country}
            </p>
          </div>
          
          {/* Payment Information */}
          <div className="md:col-span-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <p className="text-gray-800">{order.paymentMethod}</p>
          </div>
          
          {/* Order Summary */}
          <div className="md:col-span-1 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-900">Free</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Tax</span>
              <span className="text-gray-900">${(order.total * 0.1).toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>${(order.total + order.total * 0.1).toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Order Items</h2>
          <div className="space-y-6">
            {order.items.map((item) => (
              <div key={item.id} className="flex border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                <div className="h-24 w-24 flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-full w-full object-cover rounded"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <p className="text-gray-600 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-lg font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="mt-4 flex">
                    <Link 
                      to={`/products/${item.id}`}
                      className="text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
            Need Help?
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
            Track Package
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;