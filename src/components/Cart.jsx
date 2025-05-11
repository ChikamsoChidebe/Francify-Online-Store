import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';
import '../styles/cart.css'; // Import your CSS file for cart styles

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleIncrement = (id, quantity) => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrement = (id, quantity) => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-center">Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-6">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex flex-col md:flex-row justify-between items-center border rounded-lg shadow-lg p-4 bg-white"
              >
                <div className="flex items-center space-x-6 w-full md:w-2/3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                  />
                  <div>
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-red-600 font-bold mt-1">${item.price.toFixed(2)}</p>
                    <p className="text-gray-500 mt-1">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-4 md:mt-0 w-full md:w-1/3 justify-between">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() => handleDecrement(item.id, item.quantity)}
                      className="px-3 py-1 bg-red-100 text-red-600 hover:bg-red-200 transition"
                      aria-label="Decrease quantity"
                    >
                      <FaMinus />
                    </button>
                    <span className="px-4 py-1 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item.id, item.quantity)}
                      className="px-3 py-1 bg-red-100 text-red-600 hover:bg-red-200 transition"
                      aria-label="Increase quantity"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800 transition"
                    aria-label="Remove item"
                  >
                    <FaTrashAlt size={24} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between items-center bg-red-50 rounded-lg p-4 shadow-md">
            <button
              onClick={clearCart}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition mb-4 md:mb-0"
            >
              Clear Cart
            </button>
            <div className="text-xl font-bold">
              Total: <span className="text-red-600">${calculateTotal()}</span>
            </div>
            <button
              className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 transition"
              onClick={() => alert('Proceeding to checkout...')}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
