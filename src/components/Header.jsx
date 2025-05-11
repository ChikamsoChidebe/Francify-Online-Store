import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaUser, FaSearch, FaBars, FaTimes, FaAngleDown, FaGift, FaBell, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaTag, FaHome, FaAngleRight, FaShoppingBag } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(null);
  const { cart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Categories for mega menu
  const categories = [
    {
      name: 'Electronics',
      subcategories: ['Smartphones', 'Laptops', 'Tablets', 'Cameras', 'Audio', 'Smart Home', 'Gaming', 'Wearables', 'TV & Home Theater', 'Computer Accessories', 'Printers & Scanners', 'Network Devices'],
      featured: [
        { name: 'New Arrivals', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
        { name: 'Best Sellers', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }
      ],
      brands: ['Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP', 'Lenovo', 'Asus']
    },
    {
      name: 'Fashion',
      subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Kids\' Clothing', 'Shoes', 'Accessories', 'Jewelry', 'Watches', 'Bags', 'Sportswear', 'Lingerie', 'Traditional Wear', 'Designer Collections', 'Seasonal Wear'],
      featured: [
        { name: 'Summer Collection', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
        { name: 'Winter Collection', image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }
      ],
      brands: ['Nike', 'Adidas', 'Zara', 'H&M', 'Gucci', 'Prada', 'Levi\'s', 'Tommy Hilfiger']
    },
    {
      name: 'Home & Living',
      subcategories: ['Furniture', 'Decor', 'Kitchen', 'Bedding', 'Bath', 'Lighting', 'Rugs & Carpets', 'Garden', 'Home Appliances', 'Storage', 'Home Office', 'Smart Home', 'Wall Art', 'Curtains & Blinds'],
      featured: [
        { name: 'Modern Living', image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
        { name: 'Home Office', image: 'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }
      ],
      brands: ['IKEA', 'Ashley', 'Wayfair', 'West Elm', 'Crate & Barrel', 'La-Z-Boy', 'Pottery Barn']
    },
    {
      name: 'Beauty & Health',
      subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Fragrances', 'Personal Care', 'Health Supplements', 'Men\'s Grooming', 'Luxury Beauty', 'Organic Products', 'Bath & Body', 'Wellness', 'Feminine Care', 'Dental Care'],
      featured: [
        { name: 'Trending Now', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
        { name: 'Organic Collection', image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }
      ],
      brands: ['L\'Oreal', 'Maybelline', 'MAC', 'Estée Lauder', 'Clinique', 'Neutrogena', 'Nivea', 'Dove']
    },
    {
      name: 'Sports & Outdoors',
      subcategories: ['Fitness Equipment', 'Outdoor Gear', 'Sports Apparel', 'Camping', 'Cycling', 'Swimming', 'Team Sports', 'Water Sports', 'Winter Sports', 'Hiking & Trekking', 'Yoga & Pilates', 'Fishing', 'Hunting'],
      featured: [
        { name: 'Fitness Essentials', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
        { name: 'Outdoor Adventure', image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }
      ],
      brands: ['Nike', 'Adidas', 'Under Armour', 'The North Face', 'Columbia', 'Patagonia', 'Puma', 'New Balance']
    },
    {
      name: 'Phones & Tablets',
      subcategories: ['Smartphones', 'Feature Phones', 'Tablets', 'Phone Cases', 'Screen Protectors', 'Chargers', 'Power Banks', 'Memory Cards', 'Bluetooth Headsets', 'Selfie Sticks', 'Phone Holders'],
      featured: [
        { name: 'Latest Models', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
        { name: 'Accessories', image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }
      ],
      brands: ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Google', 'OnePlus', 'Oppo', 'Vivo']
    },
    {
      name: 'Groceries',
      subcategories: ['Fresh Food', 'Dairy & Eggs', 'Bakery', 'Meat & Seafood', 'Fruits & Vegetables', 'Beverages', 'Snacks', 'Canned Goods', 'Frozen Foods', 'Organic Foods', 'Condiments', 'Breakfast Foods'],
      featured: [
        { name: 'Organic Selection', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
        { name: 'Healthy Snacks', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }
      ],
      brands: ['Nestlé', 'Kellogg\'s', 'Kraft', 'Unilever', 'P&G', 'Coca-Cola', 'PepsiCo', 'General Mills']
    }
  ];

  return (
    <>
      <div className="header-wrapper h-24"></div>
      {/* Top Bar */}
      <div className="bg-black text-white text-xs py-1 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FaPhoneAlt className="mr-1 text-red-500" size={12} />
                <span>+234 903 922 0171</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-1 text-red-500" size={12} />
                <span>support@francify.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/track-order" className="hover:text-indigo-500 transition-colors">Track Order</Link>
              <Link to="/help" className="hover:text-indigo-500 transition-colors">Help & FAQs</Link>
              <div className="relative group">
                <button className="flex items-center hover:text-indigo-500 transition-colors">
                  USD <FaAngleDown className="ml-1" size={12} />
                </button>
                <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                  <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">USD</button>
                  <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">EUR</button>
                  <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">GBP</button>
                </div>
              </div>
              <div className="relative group">
                <button className="flex items-center hover:text-red-400 transition-colors">
                  English <FaAngleDown className="ml-1" size={12} />
                </button>
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                  <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">English</button>
                  <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">French</button>
                  <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">Spanish</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <motion.header 
        className={`fixed-header w-full z-50 ${scrolled ? 'header-scrolled shadow-xl bg-gradient-to-r from-black via-red-900 to-red-700 text-white' : 'bg-gradient-to-r from-black/90 via-red-800/90 to-red-600/90 text-white'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center py-2">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/" className="flex items-center">
                <div className="flex items-center flex-col ">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-black rounded-lg flex items-center justify-center mr-2 shadow-md transform rotate-3 border-2 border-red-500/50">
                    <span className="text-white font-bold text-2xl">F</span>
                  </div>
                  <div>
                    {/* <h1 className="text-white font-bold text-xl tracking-tight">Francify</h1> */}
                    {/* <div>
                      <span className="text-xs text-red-400 tracking-wider font-medium italic">Fashion & Style</span>
                    </div> */}
                  </div>
                </div>
              </Link>
            </motion.div>



            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
                <Link to="/" className="nav-link text-lg font-medium text-white relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-red-400 after:transition-all hover:after:w-full">Home</Link>
              </motion.div>
              
              <motion.div 
                className="relative group" 
                whileHover={{ scale: 1.05 }} 
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Link to="/sale" className="nav-link text-lg font-medium text-white relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-red-400 after:transition-all hover:after:w-full">
                  <span className="relative">
                    Sale
                    <span className="absolute -top-2 -right-6 bg-gradient-to-r from-yellow-500 to-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow-glow animate-pulse">Hot</span>
                  </span>
                </Link>
              </motion.div>
              
              {/* Show only first 3 categories for a cleaner header */}
              {categories.slice(0, 3).map((category, index) => (
                <motion.div 
                  key={index} 
                  className="relative"
                  onMouseEnter={() => setMegaMenuOpen(index)}
                  onMouseLeave={() => setMegaMenuOpen(null)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <button className="nav-link flex items-center text-lg font-medium text-white relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-red-400 after:transition-all hover:after:w-full">
                    {category.name} <FaAngleDown className="ml-1" />
                  </button>
                  
                  {megaMenuOpen === index && (
                    <motion.div 
                      className="modern-mega-menu"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ maxHeight: '80vh', overflowY: 'auto' }}
                    >
                      <div className="container mx-auto p-6">
                        <div className="grid grid-cols-12 gap-6">
                          <div className="col-span-5">
                            <h3 className="text-lg font-bold mb-4 text-gray-800 border-b-2 border-indigo-600 pb-2 inline-block">Popular Categories</h3>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                              {category.subcategories.map((subcat, idx) => (
                                <motion.div 
                                  key={idx}
                                  whileHover={{ x: 5 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  <Link 
                                    to={`/category/${subcat.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="text-gray-600 hover:text-red-600 transition-colors flex items-center py-1"
                                  >
                                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
                                    {subcat}
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                            
                            {category.brands && (
                              <div className="mt-6">
                                <h3 className="text-lg font-bold mb-3 text-gray-800 border-b-2 border-indigo-600 pb-2 inline-block">Popular Brands</h3>
                                <div className="flex flex-wrap gap-2">
                                  {category.brands.map((brand, idx) => (
                                    <Link 
                                      key={idx}
                                      to={`/brand/${brand.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                                    >
                                      {brand}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {category.featured.map((item, idx) => (
                            <div key={idx} className="col-span-3">
                              <motion.div 
                                className="relative h-48 rounded-lg overflow-hidden mb-3 group"
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex items-end p-4">
                                  <div>
                                    <h4 className="text-white font-bold text-lg mb-1">{item.name}</h4>
                                    <Link 
                                      to={`/category/${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="text-white text-sm font-medium bg-indigo-600 px-3 py-1 rounded-full inline-flex items-center"
                                    >
                                      Shop Now <span className="ml-1">→</span>
                                    </Link>
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                          ))}
                          
                          <div className="col-span-2">
                            <motion.div 
                              className="bg-gradient-to-br from-indigo-600 to-purple-800 text-white p-4 rounded-lg h-full flex flex-col justify-center"
                              whileHover={{ scale: 1.03 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <div className="bg-white/10 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                                <span className="text-xl font-bold">%</span>
                              </div>
                              <h3 className="text-xl font-bold mb-2">Special Offer</h3>
                              <p className="mb-4 text-white/90">Get up to 50% off on selected items</p>
                              <Link 
                                to="/sale" 
                                className="bg-white text-indigo-600 px-4 py-2 rounded-md inline-block text-center font-medium hover:bg-gray-100 transition-colors"
                              >
                                View Deals
                              </Link>
                            </motion.div>
                          </div>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <span className="text-indigo-600 font-semibold mr-2">Trending:</span>
                              {['New Arrivals', 'Best Sellers', 'Summer Sale', 'Clearance'].map((item, idx) => (
                                <Link 
                                  key={idx}
                                  to={`/search?q=${item.toLowerCase().replace(/\s+/g, '+')}`}
                                  className="text-gray-600 hover:text-indigo-600 text-sm mx-2"
                                >
                                  {item}
                                </Link>
                              ))}
                            </div>
                            <Link 
                              to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                              className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                            >
                              View All {category.name} <span className="ml-1">→</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
              
              <motion.div 
                className="relative group" 
                whileHover={{ scale: 1.05 }} 
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Link to="/products" className="nav-link text-lg font-medium text-white relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-red-400 after:transition-all hover:after:w-full">All Products</Link>
              </motion.div>

            </nav>

            {/* Desktop Icons */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.div 
                className="search-bar w-64"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <form onSubmit={handleSearch} className="relative">
                  <div className="bg-black/30 border border-red-500/30 shadow-lg rounded-full overflow-hidden">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full py-2 pl-9 pr-12 bg-transparent focus:outline-none text-white placeholder-gray-300"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400" />
                    <button 
                      type="submit" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-red-600 to-red-800 p-2 rounded-full shadow-md"
                    >
                      <FaSearch className="text-white" />
                    </button>
                  </div>
                </form>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.2 }} 
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link to="/wishlist" className="relative">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors duration-300 group">
                    <FaHeart className="text-gray-600 group-hover:text-red-600 transition-colors duration-300" size={18} />
                  </div>
                </Link>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.2 }} 
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link to="/cart" className="relative">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors duration-300 group">
                    <FaShoppingCart className="text-gray-600 group-hover:text-red-600 transition-colors duration-300" size={18} />
                  </div>
                  {cartItemsCount > 0 && (
                    <motion.span 
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-medium shadow-md"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 10 }}
                    >
                      {cartItemsCount}
                    </motion.span>
                  )}
                </Link>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.2 }} 
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {currentUser ? (
                  <Link to="/profile" className="relative">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-colors duration-300 group">
                      <FaUser className="text-gray-600 group-hover:text-indigo-600 transition-colors duration-300" size={18} />
                    </div>
                  </Link>
                ) : (
                  <Link to="/login" className="relative">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-colors duration-300 group">
                      <FaUser className="text-gray-600 group-hover:text-indigo-600 transition-colors duration-300" size={18} />
                    </div>
                  </Link>
                )}
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.2 }} 
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link to="/notifications" className="relative">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-colors duration-300 group">
                    <FaBell className="text-gray-600 group-hover:text-indigo-600 transition-colors duration-300" size={18} />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">3</span>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button 
                className="p-2 text-white bg-red-800/50 rounded-full hover:bg-red-700/70 transition-colors" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <FaBars size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div 
          className="fixed inset-0 z-50 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: isMenuOpen ? 'auto' : 'none' }}
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: isMenuOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <motion.div 
            className="absolute top-0 right-0 w-4/5 h-full bg-gradient-to-b from-black via-red-900 to-black overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: isMenuOpen ? 0 : '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="p-4 border-b border-red-800 flex justify-between items-center">
              <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-black rounded-lg flex items-center justify-center shadow-md transform rotate-3 border-2 border-red-500/50">
                  <span className="text-white font-bold text-xl">F</span>
                </div>
                <span className="ml-2 text-white font-bold text-xl">Francify</span>
              </Link>
              <button 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-800/50 text-white hover:bg-red-700 transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                <FaTimes size={18} />
              </button>
            </div>
            
            <div className="p-4">
              {/* Search */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full bg-black/30 text-white px-4 py-3 rounded-lg border border-red-800/50 focus:outline-none focus:border-red-500 placeholder-gray-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button 
                    type="submit" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-red-700 p-1.5 rounded-full"
                  >
                    <FaSearch className="text-white" size={14} />
                  </button>
                </div>
              </form>
              
              {/* Quick Links */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <Link 
                  to="/sale" 
                  className="bg-gradient-to-r from-red-700 to-red-900 text-white p-3 rounded-lg flex flex-col items-center justify-center shadow-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaTag className="mb-1" size={18} />
                  <span className="text-sm font-medium">Sale</span>
                  <span className="text-xs bg-yellow-500 px-1.5 rounded-full mt-1">Hot</span>
                </Link>
                <Link 
                  to="/products" 
                  className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-3 rounded-lg flex flex-col items-center justify-center shadow-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaShoppingBag className="mb-1" size={18} />
                  <span className="text-sm font-medium">All Products</span>
                </Link>
              </div>
              
              {/* Navigation */}
              <div className="mb-6">
                <h3 className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-3">Navigation</h3>
                <nav className="space-y-1">
                  <Link 
                    to="/" 
                    className="flex items-center p-3 rounded-lg text-white hover:bg-red-900/50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaHome className="mr-3" size={16} />
                    <span>Home</span>
                  </Link>
                  
                  {categories.slice(0, 4).map((category, index) => (
                    <details key={index} className="group">
                      <summary className="flex items-center p-3 rounded-lg text-white hover:bg-red-900/50 transition-colors cursor-pointer">
                        <span className="mr-3 w-4 h-4 flex items-center justify-center">
                          <FaAngleRight className="transform group-open:rotate-90 transition-transform" size={16} />
                        </span>
                        <span>{category.name}</span>
                      </summary>
                      <div className="ml-7 mt-1 space-y-1">
                        {category.subcategories.slice(0, 6).map((subcat, idx) => (
                          <Link 
                            key={idx}
                            to={`/category/${subcat.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block p-2 text-sm text-gray-300 hover:text-white hover:bg-red-900/30 rounded-md transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subcat}
                          </Link>
                        ))}
                        <Link 
                          to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block p-2 text-sm text-red-400 hover:text-red-300 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          View all {category.name} →
                        </Link>
                      </div>
                    </details>
                  ))}
                  
                  <Link 
                    to="/contact" 
                    className="flex items-center p-3 rounded-lg text-white hover:bg-red-900/50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaEnvelope className="mr-3" size={16} />
                    <span>Contact</span>
                  </Link>
                </nav>
              </div>
              
              {/* User Actions */}
              <div className="border-t border-red-800/50 pt-4">
                <h3 className="text-red-400 text-xs font-semibold uppercase tracking-wider mb-3">Your Account</h3>
                <div className="space-y-1">
                  <Link 
                    to="/cart" 
                    className="flex items-center justify-between p-3 rounded-lg text-white hover:bg-red-900/50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <FaShoppingCart className="mr-3" size={16} />
                      <span>My Cart</span>
                    </div>
                    {cartItemsCount > 0 && (
                      <span className="bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </Link>
                  
                  <Link 
                    to="/wishlist" 
                    className="flex items-center p-3 rounded-lg text-white hover:bg-red-900/50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaHeart className="mr-3" size={16} />
                    <span>My Wishlist</span>
                  </Link>
                  
                  {currentUser ? (
                    <Link 
                      to="/profile" 
                      className="flex items-center p-3 rounded-lg text-white hover:bg-red-900/50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaUser className="mr-3" size={16} />
                      <span>My Account</span>
                    </Link>
                  ) : (
                    <Link 
                      to="/login" 
                      className="flex items-center p-3 rounded-lg text-white hover:bg-red-900/50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaUser className="mr-3" size={16} />
                      <span>Sign In</span>
                    </Link>
                  )}
                  
                  <Link 
                    to="/notifications" 
                    className="flex items-center justify-between p-3 rounded-lg text-white hover:bg-red-900/50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <FaBell className="mr-3" size={16} />
                      <span>Notifications</span>
                    </div>
                    <span className="bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      3
                    </span>
                  </Link>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="mt-8 pt-4 border-t border-red-800/50">
                <div className="flex items-center text-gray-400 mb-2">
                  <FaPhoneAlt className="mr-2" size={12} />
                  <span className="text-sm">+2349039220171</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <FaEnvelope className="mr-2" size={12} />
                  <span className="text-sm">support@francify.com</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.header>
    </>
  );
};

export default Header;