import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import CategoryIcon from './CategoryIcon';

const CategorySection = ({ title, categories, size = 'medium', columns = 4 }) => {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link to="/categories" className="text-red-600 hover:text-red-800 flex items-center">
          View All <FaArrowRight className="ml-1" size={14} />
        </Link>
      </div>
      
      <div className={`grid grid-cols-2 md:grid-cols-${columns} gap-6`}>
        {categories.map((category, index) => (
          <Link 
            to={`/category/${category.name.toLowerCase().replace(/\\s+/g, '-')}`}
            key={index} 
            className="category-item bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-all"
          >
            <div className={`category-image-container ${size} mx-auto ${category.isNew ? 'new' : ''}`}>
              <div className="category-image-inner">
                <CategoryIcon name={category.icon} size={size === 'large' ? 40 : size === 'medium' ? 32 : 24} />
                {category.discount && (
                  <span className="category-discount-badge">-{category.discount}</span>
                )}
              </div>
              {category.isNew && <span className="category-new-badge">New</span>}
            </div>
            <h3 className="category-name mt-3 font-medium">{category.name}</h3>
            {category.itemCount && (
              <span className="text-xs text-gray-500 mt-1 block">{category.itemCount} items</span>
            )}
            <span className="text-xs text-red-600 mt-1 inline-block">Shop Now <FaArrowRight className="inline ml-1" size={10} /></span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;