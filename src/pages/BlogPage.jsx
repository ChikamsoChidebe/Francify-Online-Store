import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaTag, FaSearch } from 'react-icons/fa';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock blog posts data
  const blogPosts = [
    {
      id: 1,
      title: 'Top 10 Fashion Trends for 2023',
      excerpt: 'Discover the hottest fashion trends that are dominating the industry this year.',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      date: 'May 15, 2023',
      author: 'Jane Smith',
      category: 'Fashion',
      tags: ['fashion', 'trends', '2023']
    },
    {
      id: 2,
      title: 'The Ultimate Guide to Choosing the Right Smartphone',
      excerpt: 'With so many options available, finding the perfect smartphone can be overwhelming. Here\'s how to make the right choice.',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      date: 'April 28, 2023',
      author: 'David Johnson',
      category: 'Electronics',
      tags: ['smartphones', 'technology', 'buying guide']
    },
    {
      id: 3,
      title: 'Home Decor Ideas for Small Spaces',
      excerpt: 'Transform your small living space with these creative and practical decor ideas.',
      image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      date: 'April 10, 2023',
      author: 'Sarah Williams',
      category: 'Home & Living',
      tags: ['home decor', 'small spaces', 'interior design']
    },
    {
      id: 4,
      title: 'Essential Skincare Routine for All Skin Types',
      excerpt: 'Achieve healthy, glowing skin with this simple yet effective skincare routine suitable for everyone.',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      date: 'March 22, 2023',
      author: 'Emily Chen',
      category: 'Beauty',
      tags: ['skincare', 'beauty', 'self-care']
    },
    {
      id: 5,
      title: 'How to Build a Sustainable Wardrobe',
      excerpt: 'Learn how to make environmentally conscious fashion choices without sacrificing style.',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      date: 'March 5, 2023',
      author: 'Michael Brown',
      category: 'Fashion',
      tags: ['sustainable fashion', 'eco-friendly', 'ethical shopping']
    },
    {
      id: 6,
      title: 'The Rise of Smart Home Technology',
      excerpt: 'Explore how smart home devices are revolutionizing the way we live and interact with our living spaces.',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      date: 'February 18, 2023',
      author: 'Robert Taylor',
      category: 'Electronics',
      tags: ['smart home', 'technology', 'IoT']
    }
  ];
  
  // Categories with post counts
  const categories = [
    { name: 'Fashion', count: 2 },
    { name: 'Electronics', count: 2 },
    { name: 'Home & Living', count: 1 },
    { name: 'Beauty', count: 1 }
  ];
  
  // Popular tags
  const popularTags = ['fashion', 'technology', 'home decor', 'beauty', 'smartphones', 'trends'];
  
  // Filter posts based on search query
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-2">Blog</h1>
      <p className="text-gray-600 mb-12">Stay updated with the latest trends, tips, and insights.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Search Results Info (when searching) */}
          {searchQuery && (
            <div className="mb-6">
              <p className="text-gray-600">
                {filteredPosts.length} results for "{searchQuery}"
              </p>
            </div>
          )}
          
          {/* Blog Posts */}
          <div className="space-y-8">
            {filteredPosts.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold mb-2">No posts found</h3>
                <p className="text-gray-600 mb-4">
                  Try searching with different keywords or browse all posts.
                </p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                  View All Posts
                </button>
              </div>
            ) : (
              filteredPosts.map(post => (
                <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                          {post.category}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold mb-2 hover:text-red-600 transition-colors">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </h2>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <div className="flex items-center mr-4">
                          <FaCalendarAlt className="mr-1" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center">
                          <FaUser className="mr-1" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                      <Link 
                        to={`/blog/${post.id}`}
                        className="text-red-600 font-medium hover:text-red-800 transition-colors"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Pagination */}
          {filteredPosts.length > 0 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-1 border rounded hover:bg-gray-100">
                  Previous
                </button>
                <button className="px-3 py-1 bg-red-600 text-white rounded">
                  1
                </button>
                <button className="px-3 py-1 border rounded hover:bg-gray-100">
                  2
                </button>
                <button className="px-3 py-1 border rounded hover:bg-gray-100">
                  3
                </button>
                <button className="px-3 py-1 border rounded hover:bg-gray-100">
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Search */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-lg font-bold mb-4">Search</h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          {/* Categories */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link 
                    to={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex justify-between items-center text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <span>{category.name}</span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Recent Posts */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-lg font-bold mb-4">Recent Posts</h3>
            <div className="space-y-4">
              {blogPosts.slice(0, 3).map(post => (
                <div key={post.id} className="flex items-center">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div>
                    <h4 className="font-medium hover:text-red-600 transition-colors">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h4>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tags */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag, index) => (
                <Link 
                  key={index}
                  to={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-red-600 hover:text-white transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;