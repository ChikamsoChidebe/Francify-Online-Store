import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaLock, FaTimes, FaCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, calculateTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);
  const [removingItemId, setRemovingItemId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  
  const handleRemoveItem = (itemId) => {
    setRemovingItemId(itemId);
    // Add a small delay to allow animation to complete
    setTimeout(() => {
      removeFromCart(itemId);
      setRemovingItemId(null);
    }, 300);
  };
  
  const confirmDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };
  
  const handleConfirmDelete = () => {
    if (itemToDelete) {
      handleRemoveItem(itemToDelete.id);
      setShowDeleteModal(false);
      setItemToDelete(null);
    }
  };
  
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };
  
  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'discount10') {
      setCouponMessage({ type: 'success', text: 'Coupon applied successfully! 10% discount.' });
    } else {
      setCouponMessage({ type: 'error', text: 'Invalid coupon code.' });
    }
    
    setTimeout(() => {
      setCouponMessage(null);
    }, 3000);
  };
  
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link 
            to="/products" 
            className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition"
          >
            <FaArrowLeft className="mr-2" /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Remove Item</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove "{itemToDelete?.name}" from your cart?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.tr 
                      key={item.id}
                      initial={{ opacity: 1 }}
                      animate={{ 
                        opacity: removingItemId === item.id ? 0 : 1,
                        height: removingItemId === item.id ? 0 : 'auto',
                        scale: removingItemId === item.id ? 0.95 : 1
                      }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-24 w-24 bg-gray-100 rounded-lg overflow-hidden relative">
                            <img 
                              className="h-24 w-24 object-cover" 
                              src={item.image} 
                              alt={item.name} 
                            />
                            {item.discountPercentage && (
                              <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br">
                                -{item.discountPercentage}%
                              </div>
                            )}
                            {/* Enhanced delete button always visible on top-right corner of image */}
                            <button
                              onClick={() => confirmDelete(item)}
                              className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-bl shadow-lg hover:bg-red-600 transition-colors transform hover:scale-110"
                              aria-label="Delete item"
                            >
                              <FaTrash size={16} />
                            </button>
                            {/* Removed hover overlay with View button to make delete button more effective */}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              <Link to={`/products/${item.id}`} className="hover:text-red-600 text-base">
                                {item.name}
                              </Link>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {item.category && <span className="bg-gray-100 px-2 py-1 rounded-full mr-2">{item.category}</span>}
                              {item.brand && <span>{item.brand}</span>}
                            </div>
                            <div className="mt-2">
                              <button 
                                className="text-xs text-gray-500 hover:text-red-600 flex items-center"
                                onClick={() => {
                                  const detailsEl = document.getElementById(`product-details-${item.id}`);
                                  if (detailsEl) {
                                    detailsEl.open = !detailsEl.open;
                                  }
                                }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Details
                              </button>
                              <details id={`product-details-${item.id}`} className="mt-2 text-xs text-gray-600">
                                <summary className="cursor-pointer font-medium text-gray-700 hover:text-red-600">Product Information</summary>
                                <div className="mt-2 pl-2 border-l-2 border-gray-200">
                                  {item.description && <p className="mb-1">{item.description}</p>}
                                  {item.features && Array.isArray(item.features) && (
                                    <ul className="list-disc list-inside">
                                      {item.features.map((feature, idx) => (
                                        <li key={idx}>{feature}</li>
                                      ))}
                                    </ul>
                                  )}
                                  <div className="mt-2 flex justify-end">
                                    <button
                                      onClick={() => confirmDelete(item)}
                                      className="flex items-center bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                                    >
                                      <FaTrash className="mr-1" size={14} />
                                      Remove Item
                                    </button>
                                  </div>
                                </div>
                              </details>
                            </div>
                            <div className="flex flex-wrap items-center mt-2 gap-2">
                              {item.selectedColor && (
                                <div className="text-xs text-gray-500 flex items-center">
                                  <span>Color:</span>
                                  <span 
                                    className="ml-1 w-4 h-4 rounded-full inline-block border border-gray-300" 
                                    style={{ backgroundColor: item.selectedColor }}
                                  ></span>
                                </div>
                              )}
                              {item.selectedSize && (
                                <div className="text-xs text-gray-500">
                                  <span className="bg-gray-100 px-2 py-1 rounded">Size: {item.selectedSize}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                        {item.originalPrice && (
                          <div className="text-xs text-gray-500 line-through">${item.originalPrice.toFixed(2)}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center border border-gray-300 rounded-md w-32">
                          <button 
                            className="px-3 py-1 text-gray-600 hover:text-red-600 disabled:opacity-50"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-full text-center border-0 focus:ring-0"
                          />
                          <button 
                            className="px-3 py-1 text-gray-600 hover:text-red-600"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => confirmDelete(item)}
                          className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white p-2 rounded-md transition-colors shadow-lg transform hover:scale-105"
                          aria-label="Remove item"
                        >
                          <FaTrash className="mr-1" size={16} /> 
                          <span>Delete</span>
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Link 
              to="/products" 
              className="inline-flex items-center text-red-600 hover:text-red-800 font-medium"
            >
              <FaArrowLeft className="mr-2" /> Continue Shopping
            </Link>
            
            <button
              onClick={() => cart.forEach(item => handleRemoveItem(item.id))}
              className="text-gray-600 hover:text-red-600 text-sm font-medium"
            >
              Clear Cart
            </button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <motion.div 
            className="bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            
            <div className="border-t border-gray-200 py-4">
              <div className="flex justify-between mb-2">
                <p className="text-gray-600">Subtotal ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</p>
                <p className="text-gray-900 font-medium">${calculateTotal()}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-gray-600">Shipping</p>
                <p className="text-gray-900 font-medium">Calculated at checkout</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-gray-600">Tax</p>
                <p className="text-gray-900 font-medium">Calculated at checkout</p>
              </div>
              
              {couponMessage && couponMessage.type === 'success' && (
                <div className="flex justify-between mb-2 text-green-600">
                  <p className="flex items-center">
                    <FaCheck className="mr-1" /> Discount (10%)
                  </p>
                  <p>-${(calculateTotal() * 0.1).toFixed(2)}</p>
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-6">
                <p className="text-lg font-bold text-gray-900">Total</p>
                <p className="text-lg font-bold text-gray-900">
                  ${couponMessage && couponMessage.type === 'success' 
                    ? (calculateTotal() * 0.9).toFixed(2) 
                    : calculateTotal()}
                </p>
              </div>
              
              <Link 
                to="/checkout" 
                className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition flex items-center justify-center"
              >
                <FaLock className="mr-2" /> Proceed to Checkout
              </Link>
              
              <div className="mt-4 flex justify-center space-x-2">
                <img src="https://cdn.pixabay.com/photo/2021/12/06/13/48/visa-6850402_1280.png" alt="Visa" className="h-6" />
                <img src="https://cdn.pixabay.com/photo/2021/12/06/13/52/mastercard-6850405_1280.png" alt="Mastercard" className="h-6" />
                <img src="https://cdn.pixabay.com/photo/2021/12/06/13/45/paypal-6850399_1280.png" alt="PayPal" className="h-6" />
              </div>
            </div>
            
            {/* Coupon Code */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Have a coupon?</h3>
              <div className="flex">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-red-500 focus:border-red-500"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r hover:bg-gray-300 transition"
                >
                  Apply
                </button>
              </div>
              
              <AnimatePresence>
                {couponMessage && (
                  <motion.div 
                    className={`mt-2 text-sm ${couponMessage.type === 'success' ? 'text-green-600' : 'text-red-600'} flex items-center`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {couponMessage.type === 'success' ? <FaCheck className="mr-1" /> : <FaTimes className="mr-1" />}
                    {couponMessage.text}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Secure Checkout */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center text-sm text-gray-500">
                <FaLock className="mr-2 text-gray-400" />
                <span>Secure Checkout</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;