import React, { useState, useEffect } from 'react';
import { FaFire, FaClock, FaArrowRight } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import CategoryIcon from '../components/CategoryIcon';
import CategorySection from '../components/CategorySection';
import { fetchProducts } from '../services/api';
import { Link } from 'react-router-dom';

const SalePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 8,
    minutes: 45,
    seconds: 30
  });
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        // Filter products with discount (in a real app, you'd have a dedicated API endpoint)
        const saleProducts = data.map(product => ({
          ...product,
          originalPrice: product.price * 1.2, // Simulate original price
          discountPercentage: 20 // 20% off
        }));
        setProducts(saleProducts);
      } catch (error) {
        console.error('Error loading sale products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-24">
      {/* Flash Sale Banner */}
      <div className="flash-sale-banner mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-2">
              <FaFire className="text-yellow-400 mr-2" size={24} />
              <h1 className="text-3xl font-bold">Flash Sale</h1>
            </div>
            <p className="text-white text-opacity-90">
              Hurry up! These amazing deals won't last long.
            </p>
          </div>
          
          <div>
            <div className="flex items-center mb-2 justify-center">
              <FaClock className="text-white mr-2" />
              <p className="text-white">Sale Ends In:</p>
            </div>
            <div className="deal-countdown">
              <div className="deal-countdown-item">
                <span className="deal-countdown-number">{timeLeft.days}</span>
                <span className="deal-countdown-label">Days</span>
              </div>
              <div className="deal-countdown-item">
                <span className="deal-countdown-number">{timeLeft.hours}</span>
                <span className="deal-countdown-label">Hours</span>
              </div>
              <div className="deal-countdown-item">
                <span className="deal-countdown-number">{timeLeft.minutes}</span>
                <span className="deal-countdown-label">Mins</span>
              </div>
              <div className="deal-countdown-item">
                <span className="deal-countdown-number">{timeLeft.seconds}</span>
                <span className="deal-countdown-label">Secs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sale Categories */}
      <CategorySection 
        title="Shop by Category"
        categories={[
          { name: 'Electronics', icon: 'laptop', discount: '20%', isNew: false },
          { name: 'Fashion', icon: 'tshirt', discount: '30%', isNew: true },
          { name: 'Home & Living', icon: 'home', discount: '15%', isNew: false },
          { name: 'Beauty', icon: 'spa', discount: '25%', isNew: false }
        ]}
        size="medium"
        columns={4}
      />
      
      {/* Sale Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Sale Products</h2>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 h-64 rounded-md mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product.id} className="product-card group">
                <div className="relative">
                  <div className="product-image-container">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="product-image"
                    />
                  </div>
                  <div className="discount-badge">-20%</div>
                  <div className="product-actions">
                    <button className="product-action-btn">
                      <FaFire />
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <div className="product-category">{product.category}</div>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">
                    <span className="current-price">${product.price.toFixed(2)}</span>
                    <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Limited Time Offers */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Limited Time Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-black to-gray-800 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Buy One Get One Free</h3>
            <p className="mb-4">On selected fashion items</p>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
              Shop Now
            </button>
          </div>
          <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Extra 10% Off</h3>
            <p className="mb-4">Use code: EXTRA10</p>
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalePage;