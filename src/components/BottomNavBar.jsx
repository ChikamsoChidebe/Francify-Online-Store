import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaHeart, FaUser, FaFire } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const BottomNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, wishlist } = useCart();
  const { currentUser } = useAuth();

  // Calculate total quantity of items in cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  // Calculate total items in wishlist
  const totalWishlistItems = wishlist.length;

  const navItems = [
    { name: 'Home', path: '/', icon: <FaHome size={20} /> },
    { name: 'Cart', path: '/cart', icon: <FaShoppingCart size={20} /> },
    { name: 'Sales', path: '/sale', icon: <FaFire size={20} /> },
    { name: 'Wishlist', path: '/wishlist', icon: <FaHeart size={20} /> },
    { name: 'Profile', path: '/profile', icon: <FaUser size={20} /> },
  ];

  const handleProfileClick = (e) => {
    e.preventDefault();
    if (currentUser) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 block md:hidden bg-gradient-to-r from-black via-red-900 to-red-700 backdrop-blur-md border-t border-gray-700 animate-slideIn"
      aria-label="Bottom navigation"
    >
      <ul className="flex justify-around w-full">
        {navItems.map(({ name, path, icon }) => {
          const isActive = location.pathname === path;
          if (name === 'Profile') {
            return (
              <li key={name} className="flex-1">
                <a
                  href="/profile"
                  aria-label={name}
                  onClick={handleProfileClick}
                  className={
                    "flex flex-col items-center justify-center py-2 text-sm transition-transform duration-300 " +
                    (isActive
                      ? "text-red-500 scale-110"
                      : "text-white hover:text-red-500 hover:scale-110")
                  }
                >
                  <div className="relative">
                    {icon}
                  </div>
                  <span className="mt-1">{name}</span>
                </a>
              </li>
            );
          }
          return (
            <li key={name} className="flex-1">
              <Link
                to={path}
                aria-label={name}
                className={
                  "flex flex-col items-center justify-center py-2 text-sm transition-transform duration-300 " +
                  (isActive
                    ? "text-red-500 scale-110"
                    : "text-white hover:text-red-500 hover:scale-110")
                }
              >
                <div className="relative">
                  {icon}
                  {name === 'Sales' && (
                    <span className="absolute -top-1 -right-2 bg-gradient-to-r from-yellow-400 via-red-500 to-red-700 text-white text-[10px] font-bold px-1 rounded-full shadow-lg animate-pulse">
                      Hot
                    </span>
                  )}
                  {name === 'Cart' && totalItems > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold px-1 rounded-full shadow-lg">
                      {totalItems}
                    </span>
                  )}
                  {name === 'Wishlist' && totalWishlistItems > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold px-1 rounded-full shadow-lg">
                      {totalWishlistItems}
                    </span>
                  )}
                </div>
                <span className="mt-1">{name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNavBar;
