import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaSort, FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { fetchProducts } from '../services/api';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    rating: '',
    availability: ''
  });
  const [sortBy, setSortBy] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Categories for filter
  const categories = [
    'All Categories',
    'Electronics',
    'Fashion',
    'Home & Living',
    'Beauty & Health',
    'Sports & Outdoors'
  ];
  
  // Price ranges for filter
  const priceRanges = [
    { label: 'All Prices', value: '' },
    { label: 'Under $50', value: 'under-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $200', value: '100-200' },
    { label: '$200 - $500', value: '200-500' },
    { label: 'Over $500', value: 'over-500' }
  ];
  
  // Rating options for filter
  const ratings = [
    { label: 'All Ratings', value: '' },
    { label: '4 Stars & Up', value: '4' },
    { label: '3 Stars & Up', value: '3' },
    { label: '2 Stars & Up', value: '2' },
    { label: '1 Star & Up', value: '1' }
  ];
  
  // Availability options for filter
  const availabilityOptions = [
    { label: 'All Items', value: '' },
    { label: 'In Stock', value: 'in-stock' },
    { label: 'Out of Stock', value: 'out-of-stock' }
  ];
  
  // Sort options
  const sortOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Newest', value: 'newest' },
    { label: 'Best Selling', value: 'best-selling' },
    { label: 'Rating', value: 'rating' }
  ];
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);
  
  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    // Filter by category
    if (filters.category && filters.category !== 'All Categories' && product.category !== filters.category) {
      return false;
    }
    
    // Filter by price range
    if (filters.priceRange) {
      const price = product.price;
      switch (filters.priceRange) {
        case 'under-50':
          if (price >= 50) return false;
          break;
        case '50-100':
          if (price < 50 || price > 100) return false;
          break;
        case '100-200':
          if (price < 100 || price > 200) return false;
          break;
        case '200-500':
          if (price < 200 || price > 500) return false;
          break;
        case 'over-500':
          if (price <= 500) return false;
          break;
        default:
          break;
      }
    }
    
    // Filter by rating
    if (filters.rating && product.rating < parseInt(filters.rating)) {
      return false;
    }
    
    // Filter by availability
    if (filters.availability) {
      if (filters.availability === 'in-stock' && !product.inStock) {
        return false;
      }
      if (filters.availability === 'out-of-stock' && product.inStock) {
        return false;
      }
    }
    
    return true;
  });
  
  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        return a.id < b.id ? 1 : -1; // Assuming newer products have higher IDs
      case 'rating':
        return b.rating - a.rating;
      case 'best-selling':
        return (b.reviews || 0) - (a.reviews || 0); // Using review count as a proxy for popularity
      default: // featured
        return 0; // Keep original order
    }
  });
  
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      rating: '',
      availability: ''
    });
    setSortBy('featured');
  };
  
  // Render star ratings
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i} 
            className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"} 
            size={14} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-gray-600">
            {sortedProducts.length} products found
          </p>
        </div>
        
        <div className="flex items-center mt-4 md:mt-0">
          <button 
            className="flex items-center mr-4 md:hidden bg-white px-4 py-2 rounded-md shadow-sm border border-gray-200"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <FaFilter className="mr-2 text-gray-600" />
            <span>Filters</span>
          </button>
          
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white pl-4 pr-10 py-2 rounded-md shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FaSort className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 mr-8">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button 
                onClick={clearFilters}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                Clear All
              </button>
            </div>
            
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="radio"
                      id={`category-${index}`}
                      name="category"
                      checked={filters.category === category || (!filters.category && category === 'All Categories')}
                      onChange={() => handleFilterChange('category', category === 'All Categories' ? '' : category)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={`category-${index}`} className="ml-2 text-sm text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="radio"
                      id={`price-${index}`}
                      name="price"
                      checked={filters.priceRange === range.value}
                      onChange={() => handleFilterChange('priceRange', range.value)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={`price-${index}`} className="ml-2 text-sm text-gray-700">
                      {range.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Rating Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Rating</h3>
              <div className="space-y-2">
                {ratings.map((rating, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="radio"
                      id={`rating-${index}`}
                      name="rating"
                      checked={filters.rating === rating.value}
                      onChange={() => handleFilterChange('rating', rating.value)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={`rating-${index}`} className="ml-2 text-sm text-gray-700 flex items-center">
                      {rating.value ? (
                        <>
                          {renderStars(parseInt(rating.value))}
                          <span className="ml-1">& Up</span>
                        </>
                      ) : (
                        rating.label
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Availability Filter */}
            <div>
              <h3 className="font-medium mb-3">Availability</h3>
              <div className="space-y-2">
                {availabilityOptions.map((option, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="radio"
                      id={`availability-${index}`}
                      name="availability"
                      checked={filters.availability === option.value}
                      onChange={() => handleFilterChange('availability', option.value)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={`availability-${index}`} className="ml-2 text-sm text-gray-700">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-md mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria.</p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map(product => (
                <motion.div 
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link to={`/product/${product.id}`} className="block relative">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      {product.isNew && (
                        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">New</span>
                      )}
                      {product.discount && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">{product.discount}</span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                      <h3 className="font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
                      <div className="flex items-center mb-2">
                        {renderStars(product.rating)}
                        <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          {product.originalPrice ? (
                            <div className="flex items-center">
                              <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
                              <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
                            </div>
                          ) : (
                            <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                            <FaHeart className="text-gray-400 hover:text-red-500 transition-colors" size={16} />
                          </button>
                          <button className="p-1.5 bg-indigo-100 rounded-full hover:bg-indigo-200 transition-colors">
                            <FaShoppingCart className="text-indigo-600" size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;