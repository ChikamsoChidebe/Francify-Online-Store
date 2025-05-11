import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaFilter, FaTimes, FaSortAmountDown } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { searchProducts } from '../services/api';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const results = await searchProducts(query);
        setProducts(results);
      } catch (error) {
        console.error('Error searching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchResults();
  }, [query]);
  
  // Get all available categories from products
  const availableCategories = [...new Set(products.map(p => p.category))];
  
  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      // Price filter
      const price = product.price;
      if (price < priceRange[0] || price > priceRange[1]) return false;
      
      // Category filter
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(product.category)) return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        default:
          // Relevance - could be more sophisticated in a real app
          return 0;
      }
    });
  
  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  const resetFilters = () => {
    setPriceRange([0, 500]);
    setSelectedCategories([]);
    setSortBy('relevance');
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-2">Search Results</h1>
      <p className="text-gray-600 mb-8">
        {products.length} results for "{query}"
      </p>
      
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center bg-red-600 text-white px-4 py-2 rounded-md"
        >
          <FaFilter className="mr-2" /> Filter & Sort
        </button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Filters</h2>
              <button 
                onClick={resetFilters}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Reset All
              </button>
            </div>
            
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">${priceRange[0]}</span>
                <span className="text-sm text-gray-600">${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
            
            {/* Categories */}
            {availableCategories.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
                <div className="space-y-2">
                  {availableCategories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            {/* Sort By */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          <div className="hidden lg:flex justify-between items-center mb-6">
            <p className="text-gray-600">{filteredProducts.length} products</p>
            <div className="flex items-center">
              <FaSortAmountDown className="text-gray-400 mr-2" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-none focus:ring-0 text-sm"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
          
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
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or search with different keywords.
              </p>
              <button 
                onClick={resetFilters}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Filters */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsFilterOpen(false)}></div>
          
          <div className="fixed inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                <div className="flex items-center justify-between px-4 py-6 border-b">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    <span className="sr-only">Close panel</span>
                    <FaTimes className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                
                <div className="p-6">
                  {/* Sort By */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Sort By</h3>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Customer Rating</option>
                      <option value="newest">Newest Arrivals</option>
                    </select>
                  </div>
                  
                  {/* Price Range */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">${priceRange[0]}</span>
                      <span className="text-sm text-gray-600">${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                  
                  {/* Categories */}
                  {availableCategories.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
                      <div className="space-y-2">
                        {availableCategories.map(category => (
                          <label key={category} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category)}
                              onChange={() => toggleCategory(category)}
                              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-4">
                    <button
                      onClick={resetFilters}
                      className="flex-1 border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition"
                    >
                      Reset All
                    </button>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;