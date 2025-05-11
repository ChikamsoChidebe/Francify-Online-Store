import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();
  
  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };
  
  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6">Your Wishlist is Empty</h1>
          <p className="text-gray-600 mb-8">
            You haven't added any products to your wishlist yet.
          </p>
          <Link 
            to="/products" 
            className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
          >
            <FaArrowLeft className="mr-2" /> Browse Products
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      
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
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {wishlist.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16">
                      <img 
                        className="h-16 w-16 rounded object-cover" 
                        src={item.image} 
                        alt={item.name} 
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        <Link to={`/products/${item.id}`} className="hover:text-indigo-600">
                          {item.name}
                        </Link>
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.category}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    In Stock
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className="text-indigo-600 hover:text-indigo-900 flex items-center"
                    >
                      <FaShoppingCart className="mr-1" /> Add to Cart
                    </button>
                    <button 
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-red-600 hover:text-red-900 flex items-center"
                    >
                      <FaTrash className="mr-1" /> Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Link 
          to="/products" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <FaArrowLeft className="mr-2" /> Continue Shopping
        </Link>
        
        {wishlist.length > 0 && (
          <button 
            onClick={() => {
              wishlist.forEach(item => {
                addToCart(item);
                removeFromWishlist(item.id);
              });
            }}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Add All to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;