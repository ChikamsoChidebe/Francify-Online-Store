import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaArrowRight } from 'react-icons/fa';
import CategoryIcon from '../components/CategoryIcon';

const CategoriesPage = () => {
  // Sample categories data - in a real app, this would come from an API
  const [categories, setCategories] = useState([
    { 
      name: 'Electronics', 
      icon: 'laptop', 
      itemCount: 245, 
      featured: true,
      description: 'Latest gadgets and electronic devices for your tech needs',
      subcategories: ['Smartphones', 'Laptops', 'Audio', 'Cameras', 'Accessories']
    },
    { 
      name: 'Fashion', 
      icon: 'tshirt', 
      itemCount: 352, 
      isNew: true,
      description: 'Trendy clothing, shoes, and accessories for all styles',
      subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Shoes', 'Accessories', 'Jewelry']
    },
    { 
      name: 'Home & Living', 
      icon: 'home', 
      itemCount: 189, 
      featured: true,
      description: 'Everything you need to make your house a home',
      subcategories: ['Furniture', 'Decor', 'Kitchen', 'Bedding', 'Bath']
    },
    { 
      name: 'Beauty', 
      icon: 'spa', 
      itemCount: 176,
      description: 'Skincare, makeup, and personal care products',
      subcategories: ['Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Personal Care']
    },
    { 
      name: 'Sports & Outdoors', 
      icon: 'dumbbell', 
      itemCount: 143,
      description: 'Equipment and gear for all your athletic and outdoor activities',
      subcategories: ['Exercise Equipment', 'Outdoor Recreation', 'Team Sports', 'Apparel', 'Accessories']
    },
    { 
      name: 'Books', 
      icon: 'books', 
      itemCount: 278,
      description: 'Fiction, non-fiction, textbooks, and more',
      subcategories: ['Fiction', 'Non-Fiction', 'Children\'s Books', 'Textbooks', 'E-books']
    },
    { 
      name: 'Toys & Games', 
      icon: 'gaming', 
      itemCount: 165, 
      isNew: true,
      description: 'Fun for all ages with toys, games, and collectibles',
      subcategories: ['Action Figures', 'Board Games', 'Puzzles', 'Outdoor Toys', 'Educational Toys']
    },
    { 
      name: 'Food & Groceries', 
      icon: 'food', 
      itemCount: 211,
      description: 'Fresh food, pantry staples, and specialty items',
      subcategories: ['Fresh Food', 'Pantry', 'Snacks', 'Beverages', 'Specialty Items']
    },
    { 
      name: 'Health & Wellness', 
      icon: 'fitness', 
      itemCount: 132,
      description: 'Products to support your health and wellness journey',
      subcategories: ['Vitamins & Supplements', 'Fitness', 'Personal Care', 'Medical Supplies', 'Wellness']
    },
    { 
      name: 'Pet Supplies', 
      icon: 'pets', 
      itemCount: 98,
      description: 'Everything your furry, feathered, or scaly friends need',
      subcategories: ['Dog Supplies', 'Cat Supplies', 'Fish Supplies', 'Small Pet Supplies', 'Pet Food']
    },
    { 
      name: 'Baby & Kids', 
      icon: 'kids', 
      itemCount: 154,
      description: 'Products for babies, toddlers, and children of all ages',
      subcategories: ['Baby Gear', 'Clothing', 'Toys', 'Nursery', 'Feeding']
    },
    { 
      name: 'Automotive', 
      icon: 'home', 
      itemCount: 87,
      description: 'Parts, accessories, and tools for your vehicle',
      subcategories: ['Parts & Accessories', 'Tools & Equipment', 'Car Care', 'Electronics', 'Motorcycle']
    }
  ]);

  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter categories based on search query and active filter
  useEffect(() => {
    let result = [...categories];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(category => 
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (activeFilter === 'featured') {
      result = result.filter(category => category.featured);
    } else if (activeFilter === 'new') {
      result = result.filter(category => category.isNew);
    }
    
    setFilteredCategories(result);
  }, [categories, searchQuery, activeFilter]);

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">All Categories</h1>
          <p className="text-gray-600 max-w-3xl">
            Browse our wide selection of categories to find exactly what you're looking for. From electronics to fashion, we've got everything you need.
          </p>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="flex space-x-2 w-full md:w-auto">
            <button 
              className={`px-4 py-2 rounded-lg ${activeFilter === 'all' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 rounded-lg ${activeFilter === 'featured' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveFilter('featured')}
            >
              Featured
            </button>
            <button 
              className={`px-4 py-2 rounded-lg ${activeFilter === 'new' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              onClick={() => setActiveFilter('new')}
            >
              New
            </button>
          </div>
        </div>
        
        {/* Categories Grid */}
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-medium mb-2">No categories found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((category, index) => (
              <Link 
                to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                key={index} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`category-image-container small ${category.isNew ? 'new' : ''}`}>
                      <div className="category-image-inner">
                        <CategoryIcon name={category.icon} size={24} />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-lg">{category.name}</h3>
                      <p className="text-sm text-gray-500">{category.itemCount} items</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{category.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.subcategories.slice(0, 3).map((subcat, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                        {subcat}
                      </span>
                    ))}
                    {category.subcategories.length > 3 && (
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                        +{category.subcategories.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-red-600 font-medium group-hover:underline flex items-center">
                      Browse Category <FaArrowRight className="ml-1" size={10} />
                    </span>
                    
                    {category.featured && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        Featured
                      </span>
                    )}
                    
                    {category.isNew && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {/* Popular Subcategories Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Popular Subcategories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              'Smartphones', 'Laptops', 'Women\'s Clothing', 'Men\'s Clothing', 
              'Skincare', 'Home Decor', 'Fitness Equipment', 'Books', 
              'Kitchen Appliances', 'Toys', 'Pet Supplies', 'Jewelry'
            ].map((subcat, index) => (
              <Link 
                key={index}
                to={`/category/${subcat.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <span className="text-sm font-medium text-gray-800 hover:text-red-600 transition-colors">
                  {subcat}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;