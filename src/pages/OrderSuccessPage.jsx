import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaBoxOpen, FaHome, FaFileAlt } from 'react-icons/fa';

const OrderSuccessPage = () => {
  const location = useLocation();
  const order = location.state?.order;
  
  if (!order) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6">Order Information Not Found</h1>
          <p className="text-gray-600 mb-8">
            We couldn't find your order information. Please check your email for order confirmation.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
          >
            <FaHome className="mr-2" /> Return to Home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Order Placed Successfully!</h1>
          <p className="text-lg text-gray-600 mt-2">
            Thank you for your purchase. Your order has been received.
          </p>
        </div>
        
        <div className="border-t border-b border-gray-200 py-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Order Number</h3>
              <p className="text-lg font-bold text-gray-900 mt-1">{order.id}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Date</h3>
              <p className="text-lg font-bold text-gray-900 mt-1">{order.date}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
              <p className="text-lg font-bold text-gray-900 mt-1">${order.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Details</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center">
                  <div className="h-16 w-16 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="h-full w-full object-cover rounded"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 mt-6 pt-6">
              <div className="flex justify-between mb-2">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-sm text-gray-600">Shipping</p>
                <p className="text-sm font-medium text-gray-900">Free</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-sm text-gray-600">Tax</p>
                <p className="text-sm font-medium text-gray-900">${(order.total * 0.1).toFixed(2)}</p>
              </div>
              <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                <p className="text-base font-bold text-gray-900">Total</p>
                <p className="text-base font-bold text-gray-900">
                  ${(order.total + order.total * 0.1).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Information</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-800">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
              {order.shippingAddress.address}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
              {order.shippingAddress.country}
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            A confirmation email has been sent to {order.customerEmail}. 
            You will receive updates about your order status.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <FaHome className="mr-2" /> Continue Shopping
            </Link>
            <Link
              to={`/orders/${order.id}`}
              className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
            >
              <FaFileAlt className="mr-2" /> View Order Details
            </Link>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center text-gray-600 mb-2">
            <FaBoxOpen className="mr-2" /> 
            <span>Expected delivery: 3-5 business days</span>
          </div>
          <p className="text-sm text-gray-500">
            Need help? Contact our support team at support@francify.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;