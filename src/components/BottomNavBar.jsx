import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaHeart, FaUser } from 'react-icons/fa';

const BottomNavBar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: <FaHome size={24} /> },
    { name: 'Cart', path: '/cart', icon: <FaShoppingCart size={24} /> },
    { name: 'Wishlist', path: '/wishlist', icon: <FaHeart size={24} /> },
    { name: 'Profile', path: '/profile', icon: <FaUser size={24} /> },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 block md:hidden bg-gradient-to-r from-black via-red-900 to-red-700 backdrop-blur-md border-t border-gray-700 animate-slideIn"
      aria-label="Bottom navigation"
    >
      <ul className="flex justify-around max-w-md mx-auto">
        {navItems.map(({ name, path, icon }) => {
          const isActive = location.pathname === path;
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
                {icon}
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
