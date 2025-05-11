import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaFilter, FaTimes, FaSortAmountDown } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { fetchProductsByCategory, fetchCategories } from '../services/api';

const CategoryProductsPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Load products for this category
        const productsData = await fetchProductsByCategory(categoryId);
        setProducts(productsData);
        
        // Get category details
        const categories = await fetchCategories();
        const categoryData = categories.find(cat => cat.id === categoryId);
        setCategory(categoryData);
      } catch (error) {
        console.error('Error loading category products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [categoryId]);
  
  // Get all available colors and sizes from products
  const availableColors = [...new Set(products.flatMap(p => p.colors || []))];
  const availableSizes = [...new Set(products.flatMap(p => p.sizes || []))];
  
  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      // Price filter
      const price = product.price;
      if (price < priceRange[0] || price > priceRange[1]) return false;
      
      // Color filter
      if (selectedColors.length > 0 && product.colors) {
        if (!product.colors.some(color => selectedColors.includes(color))) return false;
      }
      
      // Size filter
      if (selectedSizes.length > 0 && product.sizes) {
        if (!product.sizes.some(size => selectedSizes.includes(size))) return false;
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
          return a.id - b.id; // featured/default
      }
    });
  
  const toggleColor = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color]
    );
  };
  
  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };
  
  const resetFilters = () => {
    setPriceRange([0, 500]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSortBy('featured');
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <div className="bg-gray-300 h-64 rounded-md mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-24">
      {/* Category Header */}
      {category && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>
      )}
      
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md"
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
                className="text-sm text-indigo-600 hover:text-indigo-800"
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
            
            {/* Colors */}
            {availableColors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColors.includes(color) 
                          ? 'ring-2 ring-offset-2 ring-indigo-600' 
                          : 'ring-1 ring-gray-200'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      onClick={() => toggleColor(color)}
                      aria-label={`Color: ${color}`}
                    ></button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Sizes */}
            {availableSizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map(size => (
                    <button
                      key={size}
                      className={`px-3 py-1 border rounded-md ${
                        selectedSizes.includes(size) 
                          ? 'bg-indigo-600 text-white border-indigo-600' 
                          : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => toggleSize(size)}
                    >
                      {size}
                    </button>
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="featured">Featured</option>
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
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or browse our other categories.
              </p>
              <button 
                onClick={resetFilters}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
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
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="featured">Featured</option>
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
                  
                  {/* Colors */}
                  {availableColors.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Colors</h3>
                      <div className="flex flex-wrap gap-2">
                        {availableColors.map(color => (
                          <button
                            key={color}
                            className={`w-8 h-8 rounded-full border ${
                              selectedColors.includes(color) 
                                ? 'ring-2 ring-offset-2 ring-indigo-600' 
                                : 'ring-1 ring-gray-200'
                            }`}
                            style={{ backgroundColor: color.toLowerCase() }}
                            onClick={() => toggleColor(color)}
                            aria-label={`Color: ${color}`}
                          ></button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Sizes */}
                  {availableSizes.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Sizes</h3>
                      <div className="flex flex-wrap gap-2">
                        {availableSizes.map(size => (
                          <button
                            key={size}
                            className={`px-3 py-1 border rounded-md ${
                              selectedSizes.includes(size) 
                                ? 'bg-indigo-600 text-white border-indigo-600' 
                                : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                            }`}
                            onClick={() => toggleSize(size)}
                          >
                            {size}
                          </button>
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
                      className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
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

export default CategoryProductsPage;