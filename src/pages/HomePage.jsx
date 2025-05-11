import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaTruck, FaLock, FaUndo, FaHeadset, FaStar, FaRegStar, FaHeart, FaShoppingCart, FaEye, FaAngleRight, FaGift, FaPercentage, FaShippingFast, FaTag } from 'react-icons/fa';
import { fetchFeaturedProducts, fetchCategories } from '../services/api';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('featured');
  const [countdown, setCountdown] = useState({
    days: 2,
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchFeaturedProducts(),
          fetchCategories()
        ]);
        
        // Add additional product properties for enhanced display
        const enhancedProducts = productsData.map(product => ({
          ...product,
          images: [product.image, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'],
          isNew: Math.random() > 0.7,
          isHot: Math.random() > 0.8,
          freeShipping: Math.random() > 0.5,
          discount: Math.random() > 0.7 ? 'Limited Offer' : null,
          tag: Math.random() > 0.8 ? 'Best Seller' : null,
          stockCount: Math.floor(Math.random() * 20),
          originalPrice: product.price * 1.2
        }));
        
        setFeaturedProducts(enhancedProducts);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading homepage data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              } else {
                // Reset countdown when it reaches zero
                days = 2;
                hours = 12;
                minutes = 45;
                seconds = 30;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Hero section images
  const heroImages = [
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  ];

  // Format countdown number with leading zero
  const formatNumber = (num) => {
    return num.toString().padStart(2, '0');
  };

  // Trending products data
  const trendingCategories = [
    { name: 'Fashion', icon: '👕', count: 120 },
    { name: 'Electronics', icon: '📱', count: 85 },
    { name: 'Home', icon: '🏠', count: 97 },
    { name: 'Beauty', icon: '💄', count: 65 },
    { name: 'Sports', icon: '⚽', count: 42 },
    { name: 'Toys', icon: '🧸', count: 38 },
  ];

  // Benefits data
  const benefits = [
    {
      icon: <FaTruck className="text-4xl text-red-600" />,
      title: 'Free Shipping',
      description: 'On all orders over $50'
    },
    {
      icon: <FaLock className="text-4xl text-red-600" />,
      title: 'Secure Payment',
      description: '100% secure transactions'
    },
    {
      icon: <FaUndo className="text-4xl text-red-600" />,
      title: 'Easy Returns',
      description: '30-day return policy'
    },
    {
      icon: <FaHeadset className="text-4xl text-red-600" />,
      title: '24/7 Support',
      description: 'Dedicated customer service'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-100 min-h-[80vh] flex items-center w-full">  
        <div className="container mx-auto px-4 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <motion.span 
                className="inline-block bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-medium mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Summer 2023 Collection
              </motion.span>
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Discover Your Style with <span className="text-red-600">Francify</span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-gray-600 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Explore our curated collection of premium fashion and accessories. 
                Elevate your style with the latest trends and timeless classics.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link 
                  to="/products" 
                  className="bg-red-600 text-white px-8 py-3 rounded-md hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center"
                >
                  Shop Now <FaArrowRight className="ml-2" />
                </Link>
                <Link 
                  to="/categories" 
                  className="bg-white text-gray-800 border border-gray-300 px-8 py-3 rounded-md hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Browse Categories
                </Link>
              </motion.div>
              
              <motion.div 
                className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center">
                  <span className="bg-white rounded-full p-1 shadow-sm">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Customer" className="w-8 h-8 rounded-full" />
                  </span>
                  <span className="bg-white rounded-full p-1 shadow-sm -ml-2">
                    <img src="https://randomuser.me/api/portraits/men/86.jpg" alt="Customer" className="w-8 h-8 rounded-full" />
                  </span>
                  <span className="bg-white rounded-full p-1 shadow-sm -ml-2">
                    <img src="https://randomuser.me/api/portraits/women/22.jpg" alt="Customer" className="w-8 h-8 rounded-full" />
                  </span>
                  <span className="bg-white rounded-full p-1 shadow-sm -ml-2">
                    <img src="https://randomuser.me/api/portraits/men/36.jpg" alt="Customer" className="w-8 h-8 rounded-full" />
                  </span>
                  <span className="ml-2 text-sm text-gray-600">
                    <span className="font-bold">2,500+</span> happy customers
                  </span>
                </div>
                
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar key={star} className="text-yellow-400" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    <span className="font-bold">4.8/5</span> ratings
                  </span>
                </div>
              </motion.div>
            </div>
            <motion.div 
              className="hidden md:block relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src={heroImages[0]} 
                alt="Fashion model" 
                className="rounded-lg shadow-xl object-cover h-[500px] w-full"
              />
              <motion.img 
                src={heroImages[1]} 
                alt="Fashion accessories" 
                className="absolute -bottom-10 -left-10 rounded-lg shadow-xl w-2/3 border-4 border-white"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
              
              <motion.div 
                className="absolute top-4 -right-8 bg-white p-4 rounded-lg shadow-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="flex items-center">
                  <div className="bg-red-100 p-3 rounded-full">
                    <FaPercentage className="text-red-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs text-gray-500">Limited Time</p>
                    <p className="font-bold text-gray-800">30% OFF</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 right-10 bg-white p-4 rounded-lg shadow-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FaShippingFast className="text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-xs text-gray-500">All Orders</p>
                    <p className="font-bold text-gray-800">Free Shipping</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent"></div>
      </section>

      {/* Trending Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trending Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore our most popular categories and discover products that customers love</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {trendingCategories.map((category, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:bg-white border border-gray-100"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} Products</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flash-sale-banner">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div className="mb-6 md:mb-0 md:pr-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                    Limited Time Offer
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Flash Sale! Up to 50% Off</h2>
                  <p className="text-white text-opacity-90 mb-6">
                    Don't miss out on these amazing deals. Hurry up before they're gone!
                  </p>
                  <Link 
                    to="/sale" 
                    className="inline-block bg-white text-red-600 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors font-medium"
                  >
                    Shop Now <FaArrowRight className="inline ml-2" />
                  </Link>
                </motion.div>
              </div>
              
              <div>
                <div className="deal-countdown">
                  <div className="deal-countdown-item">
                    <span className="deal-countdown-number">{formatNumber(countdown.days)}</span>
                    <span className="deal-countdown-label">Days</span>
                  </div>
                  <div className="deal-countdown-item">
                    <span className="deal-countdown-number">{formatNumber(countdown.hours)}</span>
                    <span className="deal-countdown-label">Hours</span>
                  </div>
                  <div className="deal-countdown-item">
                    <span className="deal-countdown-number">{formatNumber(countdown.minutes)}</span>
                    <span className="deal-countdown-label">Mins</span>
                  </div>
                  <div className="deal-countdown-item">
                    <span className="deal-countdown-number">{formatNumber(countdown.seconds)}</span>
                    <span className="deal-countdown-label">Secs</span>
                  </div>
                </div>
                
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white mb-1">250+</div>
                    <div className="text-white/80 text-sm">Items on Sale</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white mb-1">50%</div>
                    <div className="text-white/80 text-sm">Max Discount</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="flex items-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {benefit.icon}
                <div className="ml-4">
                  <h3 className="font-bold text-lg">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Shop by Category</h2>
            <Link to="/categories" className="text-red-600 hover:text-red-700 flex items-center font-medium">
              View All Categories <FaAngleRight className="ml-1" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-gray-100 rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.map(category => (
                <Link 
                  key={category.id} 
                  to={`/category/${category.id}`}
                  className="category-card group"
                >
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="category-image"
                  />
                  <div className="category-overlay">
                    <h3 className="category-name">{category.name}</h3>
                    <span className="text-white text-opacity-80 text-sm">Shop Now</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Our Products</h2>
            <div className="flex space-x-4">
              <button 
                className={`px-4 py-2 ${activeTab === 'featured' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'} hidden md:block`}
                onClick={() => setActiveTab('featured')}
              >
                Featured
              </button>
              <button 
                className={`px-4 py-2 ${activeTab === 'bestsellers' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'} hidden md:block`}
                onClick={() => setActiveTab('bestsellers')}
              >
                Best Sellers
              </button>
              <button 
                className={`px-4 py-2 ${activeTab === 'new' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-600'} hidden md:block`}
                onClick={() => setActiveTab('new')}
              >
                New Arrivals
              </button>
            </div>
            <Link to="/products" className="flex items-center text-red-600 hover:text-red-800 transition-colors">
              View All <FaArrowRight className="ml-2" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-md mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="relative rounded-lg overflow-hidden h-80"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Women's Collection" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex flex-col justify-center p-8">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs inline-block w-max mb-4">New Season</span>
                <h3 className="text-white text-3xl font-bold mb-2">Women's Collection</h3>
                <p className="text-white text-opacity-90 mb-6">New arrivals for the season</p>
                <Link 
                  to="/category/women" 
                  className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-100 transition-colors inline-block w-max"
                >
                  Shop Now <FaArrowRight className="inline ml-2" />
                </Link>
              </div>
            </motion.div>
            <motion.div 
              className="relative rounded-lg overflow-hidden h-80"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Men's Collection" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex flex-col justify-center p-8">
                <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs inline-block w-max mb-4">New Season</span>
                <h3 className="text-white text-3xl font-bold mb-2">Men's Collection</h3>
                <p className="text-white text-opacity-90 mb-6">New arrivals for the season</p>
                <Link 
                  to="/category/men" 
                  className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-100 transition-colors inline-block w-max"
                >
                  Shop Now <FaArrowRight className="inline ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Brands</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Shop from your favorite brands and discover new ones</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {['Nike', 'Adidas', 'Puma', 'Apple', 'Samsung', 'Sony'].map((brand, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 rounded-lg p-6 flex items-center justify-center hover:shadow-md transition-all duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold text-gray-800">{brand}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                Stay Updated
              </span>
              <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-lg mb-8 text-gray-300">
                Stay updated with the latest trends, new arrivals, and exclusive offers.
              </p>
              <form className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-l focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                />
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-r transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="flex items-center">
                  <FaGift className="text-red-500 mr-2" />
                  <span className="text-sm">Get a 10% discount on your first order</span>
                </div>
                <div className="flex items-center">
                  <FaTag className="text-red-500 mr-2" />
                  <span className="text-sm">Exclusive offers and promotions</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;