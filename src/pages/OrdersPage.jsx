import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { fetchOrders } from '../services/api';
import { useAuth } from '../context/AuthContext';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { currentUser } = useAuth();
  
  useEffect(() => {
    const loadOrders = async () => {
      try {
        // In a real app, we would pass the user ID to fetch only their orders
        const data = await fetchOrders(currentUser?.id);
        setOrders(data);
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadOrders();
  }, [currentUser]);
  
  // Filter orders based on search term
  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      
      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search orders by ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <FaSearch className="text-gray-400" />
            </div>
          </div>
          <select
            className="border border-gray-300 rounded-r-md px-4 py-2 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Orders</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="animate-pulse">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-4">
              <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-4 gap-4">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          {searchTerm ? (
            <p className="text-gray-600 mb-4">
              No orders match your search criteria. Try a different search term.
            </p>
          ) : (
            <p className="text-gray-600 mb-4">
              You haven't placed any orders yet.
            </p>
          )}
          <Link 
            to="/products" 
            className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600">Placed on {order.date}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' 
                        ? 'bg-green-100 text-green-800' 
                        : order.status === 'Processing' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flow-root">
                    <ul className="-my-5">
                      {order.items.map(item => (
                        <li key={item.id} className="py-5">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-16 h-16">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full rounded object-cover"
                              />
                            </div>
                            <div className="ml-4 flex-1">
                              <div className="flex justify-between">
                                <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                                <p className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Total: ${order.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">
                      {order.items.reduce((total, item) => total + item.quantity, 0)} items
                    </p>
                  </div>
                  <Link 
                    to={`/orders/${order.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;