import React, { useState } from 'react';
import { FaSearch, FaBox, FaCheckCircle, FaTruck, FaMapMarkerAlt, FaBoxOpen } from 'react-icons/fa';

const TrackOrderPage = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [orderTracked, setOrderTracked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock order data for demonstration
  const mockOrderData = {
    orderNumber: 'ORD-12345',
    orderDate: '2023-06-15',
    estimatedDelivery: '2023-06-20',
    status: 'In Transit',
    statusCode: 3, // 1: Processing, 2: Shipped, 3: In Transit, 4: Out for Delivery, 5: Delivered
    customer: {
      name: 'John Doe',
      email: 'john@example.com'
    },
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    trackingNumber: 'TRK-9876543210',
    carrier: 'FedEx',
    items: [
      { name: 'Premium Wireless Headphones', quantity: 1, price: 199.99 },
      { name: 'Wireless Bluetooth Speaker', quantity: 1, price: 79.99 }
    ],
    timeline: [
      { status: 'Order Placed', date: '2023-06-15 09:30 AM', description: 'Your order has been received and is being processed.' },
      { status: 'Order Processed', date: '2023-06-16 10:15 AM', description: 'Payment confirmed and order has been processed.' },
      { status: 'Shipped', date: '2023-06-17 02:45 PM', description: 'Your order has been shipped with FedEx.' },
      { status: 'In Transit', date: '2023-06-18 08:20 AM', description: 'Your package is in transit to the destination.' }
    ]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!orderNumber.trim()) {
      setError('Please enter an order number');
      return;
    }
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      if (orderNumber.toUpperCase() === 'ORD-12345' && email.toLowerCase() === 'john@example.com') {
        setOrderTracked(true);
      } else {
        setError('No order found with the provided information. Please check and try again.');
      }
      setLoading(false);
    }, 1500);
  };

  const getStatusIcon = (statusCode) => {
    switch (statusCode) {
      case 1: return <FaBox className="text-indigo-600" size={24} />;
      case 2: return <FaBoxOpen className="text-indigo-600" size={24} />;
      case 3: return <FaTruck className="text-indigo-600" size={24} />;
      case 4: return <FaMapMarkerAlt className="text-indigo-600" size={24} />;
      case 5: return <FaCheckCircle className="text-green-600" size={24} />;
      default: return <FaBox className="text-indigo-600" size={24} />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Track Your Order</h1>
          <p className="text-gray-600">
            Enter your order number and email address to track your order status.
          </p>
        </div>

        {!orderTracked ? (
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Order Number
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g. ORD-12345"
                />
                <p className="text-xs text-gray-500 mt-1">
                  You can find your order number in your order confirmation email.
                </p>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Email used for your order"
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Tracking Order...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <FaSearch className="mr-2" />
                      Track Order
                    </span>
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                If you're having trouble tracking your order or have any questions, please contact our customer support team.
              </p>
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <a href="tel:+12345678900" className="text-indigo-600 font-medium hover:text-indigo-800 mb-2 sm:mb-0">
                  Call Us: +1 (234) 567-8900
                </a>
                <a href="mailto:support@francify.com" className="text-indigo-600 font-medium hover:text-indigo-800">
                  Email: support@francify.com
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Order Status Header */}
            <div className="bg-indigo-600 text-white p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h2 className="text-xl font-bold mb-2">Order #{mockOrderData.orderNumber}</h2>
                  <p className="text-indigo-100">Placed on {mockOrderData.orderDate}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-white text-indigo-700 font-medium text-sm">
                    {mockOrderData.status}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Order Details */}
            <div className="p-6">
              {/* Tracking Progress */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Tracking Progress</h3>
                <div className="relative">
                  <div className="absolute left-0 top-0 ml-4 h-full border-l-2 border-gray-200"></div>
                  <div className="space-y-8">
                    {mockOrderData.timeline.map((event, index) => (
                      <div key={index} className="relative flex items-start">
                        <div className="absolute left-0 mt-1 -ml-1">
                          <div className={`w-6 h-6 rounded-full ${index === mockOrderData.timeline.length - 1 ? 'bg-indigo-600' : 'bg-green-500'} flex items-center justify-center`}>
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-10">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <h4 className="font-medium">{event.status}</h4>
                            <span className="text-sm text-gray-500">{event.date}</span>
                          </div>
                          <p className="text-gray-600 mt-1">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Shipping Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Shipping Information</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="font-medium">{mockOrderData.customer.name}</p>
                    <p>{mockOrderData.shippingAddress.street}</p>
                    <p>{mockOrderData.shippingAddress.city}, {mockOrderData.shippingAddress.state} {mockOrderData.shippingAddress.zipCode}</p>
                    <p>{mockOrderData.shippingAddress.country}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Delivery Details</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Carrier:</span>
                      <span className="font-medium">{mockOrderData.carrier}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Tracking Number:</span>
                      <span className="font-medium">{mockOrderData.trackingNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Delivery:</span>
                      <span className="font-medium">{mockOrderData.estimatedDelivery}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Items */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Order Items</h3>
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockOrderData.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{item.quantity}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <button
                  onClick={() => setOrderTracked(false)}
                  className="px-6 py-2 border border-indigo-600 text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition-colors"
                >
                  Track Another Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrderPage;