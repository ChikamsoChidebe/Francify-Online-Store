import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLock, FaCreditCard, FaPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';

const CheckoutPage = () => {
  const { cart, calculateTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    paymentMethod: 'credit-card',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    saveInfo: false
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const validateForm = () => {
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 
      'address', 'city', 'state', 'zipCode', 'country'
    ];
    
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill in all required fields`);
        return false;
      }
    }
    
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardName || !formData.cardNumber || !formData.cardExpiry || !formData.cardCvv) {
        setError('Please fill in all payment details');
        return false;
      }
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      setError('');
      
      // Create order data
      const orderData = {
        items: cart,
        total: parseFloat(calculateTotal()),
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        paymentMethod: formData.paymentMethod,
        customerEmail: formData.email,
        customerPhone: formData.phone
      };
      
      // Submit order
      const order = await createOrder(orderData);
      
      // Clear cart
      clearCart();
      
      // Redirect to success page
      navigate('/order-success', { state: { order } });
      
    } catch (err) {
      setError('There was a problem processing your order. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            You need to add items to your cart before proceeding to checkout.
          </p>
          <Link 
            to="/products" 
            className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State/Province *
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP/Postal Code *
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="USA">United States</option>
                      <option value="CAN">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AUS">Australia</option>
                      <option value="GER">Germany</option>
                      <option value="FRA">France</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="credit-card"
                    name="paymentMethod"
                    type="radio"
                    value="credit-card"
                    checked={formData.paymentMethod === 'credit-card'}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label htmlFor="credit-card" className="ml-3 flex items-center">
                    <FaCreditCard className="text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Credit Card</span>
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label htmlFor="paypal" className="ml-3 flex items-center">
                    <FaPaypal className="text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">PayPal</span>
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="apple-pay"
                    name="paymentMethod"
                    type="radio"
                    value="apple-pay"
                    checked={formData.paymentMethod === 'apple-pay'}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label htmlFor="apple-pay" className="ml-3 flex items-center">
                    <FaApplePay className="text-gray-800 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Apple Pay</span>
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="google-pay"
                    name="paymentMethod"
                    type="radio"
                    value="google-pay"
                    checked={formData.paymentMethod === 'google-pay'}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label htmlFor="google-pay" className="ml-3 flex items-center">
                    <FaGooglePay className="text-gray-800 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Google Pay</span>
                  </label>
                </div>
              </div>
              
              {/* Credit Card Details */}
              {formData.paymentMethod === 'credit-card' && (
                <div className="mt-6 grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required={formData.paymentMethod === 'credit-card'}
                    />
                  </div>
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="XXXX XXXX XXXX XXXX"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required={formData.paymentMethod === 'credit-card'}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiration Date *
                      </label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required={formData.paymentMethod === 'credit-card'}
                      />
                    </div>
                    <div>
                      <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV *
                      </label>
                      <input
                        type="text"
                        id="cardCvv"
                        name="cardCvv"
                        value={formData.cardCvv}
                        onChange={handleChange}
                        placeholder="XXX"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required={formData.paymentMethod === 'credit-card'}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Save Information */}
            <div className="flex items-center mb-6">
              <input
                id="saveInfo"
                name="saveInfo"
                type="checkbox"
                checked={formData.saveInfo}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="saveInfo" className="ml-2 block text-sm text-gray-900">
                Save this information for next time
              </label>
            </div>
            
            <div className="flex justify-between items-center">
              <Link to="/cart" className="text-indigo-600 hover:text-indigo-800">
                Return to cart
              </Link>
              
              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (
                  'Processing...'
                ) : (
                  <>
                    <FaLock className="mr-2" /> Place Order
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            
            <div className="max-h-80 overflow-y-auto mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center py-4 border-b">
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
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 py-4">
              <div className="flex justify-between mb-2">
                <p className="text-gray-600">Subtotal</p>
                <p className="text-gray-900 font-medium">${calculateTotal()}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-gray-600">Shipping</p>
                <p className="text-gray-900 font-medium">Free</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-gray-600">Tax</p>
                <p className="text-gray-900 font-medium">${(parseFloat(calculateTotal()) * 0.1).toFixed(2)}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <p className="text-lg font-bold text-gray-900">Total</p>
                <p className="text-lg font-bold text-gray-900">
                  ${(parseFloat(calculateTotal()) + parseFloat(calculateTotal()) * 0.1).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;