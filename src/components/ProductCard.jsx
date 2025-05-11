import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShoppingCart, FaEye, FaRegStar, FaStar, FaShippingFast, FaPercentage, FaTag } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { getRandomFallbackImage } from '../data/productImages';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    // Implement quick view functionality
    console.log('Quick view', product);
  };

  // Calculate discount percentage
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" size={14} />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" size={14} />);
      }
    }
    return stars;
  };

  return (
    <motion.div 
      className="product-card group bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Product badges */}
        <div className="product-badge absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.isNew && (
            <motion.span 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="badge badge-new bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md"
            >
              NEW
            </motion.span>
          )}
          {discountPercentage > 0 && (
            <motion.span 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="badge badge-sale bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md"
            >
              -{discountPercentage}%
            </motion.span>
          )}
          {product.isHot && (
            <motion.span 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="badge badge-hot bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md"
            >
              HOT
            </motion.span>
          )}
        </div>

        {/* Wishlist button */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
        >
          {inWishlist ? (
            <FaHeart className="text-red-500" size={18} />
          ) : (
            <FaRegHeart className="text-gray-400 group-hover:text-gray-600" size={18} />
          )}
        </motion.button>

        {/* Product image */}
        <Link to={`/products/${product.id}`} className="block relative">
          <div className="product-image-container h-64 overflow-hidden relative">
            {/* Premium frame with gradient border */}
            <div className="absolute inset-0 rounded-t-lg bg-gradient-to-br from-white via-gray-100 to-gray-200 p-[1px]"></div>
            
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10" 
              style={{ 
                backgroundImage: 'radial-gradient(circle, #000000 1px, transparent 1px)', 
                backgroundSize: '20px 20px' 
              }}>
            </div>
            
            {/* Spotlight effect */}
            <div className="image-spotlight"></div>
            
            {/* Main image container with 3D effect */}
            <div className="product-image-frame">
              <div className="image-container">
                <motion.img 
                  src={product.images ? product.images[selectedImage] : product.image} 
                  alt={product.name} 
                  className="product-image"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = getRandomFallbackImage();
                  }}
                />
                
                {/* Reflection effect */}
                <div className="image-reflection"></div>
                
                {/* Shine effect on hover */}
                <div className="image-shine"></div>
              </div>
            </div>
            
            {/* Bottom shadow for depth */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-gray-200/50 to-transparent"></div>
          </div>

          {/* Multiple images selector */}
          {product.images && product.images.length > 1 && (
            <div className="image-dots">
              {product.images.map((_, idx) => (
                <motion.button 
                  key={idx}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`image-dot ${selectedImage === idx ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedImage(idx);
                  }}
                />
              ))}
            </div>
          )}

          {/* Product actions */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 p-3">
            <motion.button 
              className="bg-white text-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors" 
              onClick={handleQuickView}
              title="Quick View"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaEye />
            </motion.button>
            <motion.button 
              className="bg-gradient-to-r from-red-500 to-purple-600 text-white p-3 rounded-full shadow-lg hover:from-red-600 hover:to-purple-700 transition-colors" 
              onClick={handleAddToCart}
              title="Add to Cart"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaShoppingCart />
            </motion.button>
          </div>
        </Link>
      </div>

      {/* Product info */}
      <div className="product-info p-4">
        {/* Category */}
        <div className="product-category text-xs text-gray-500 uppercase tracking-wider mb-1">{product.category}</div>
        
        {/* Product name */}
        <Link to={`/products/${product.id}`}>
          <h3 className="product-name text-lg font-semibold text-gray-800 hover:text-red-600 transition-colors line-clamp-2 h-14">{product.name}</h3>
        </Link>
        
        {/* Price */}
        <div className="product-price flex items-center mt-2">
          <span className="current-price text-lg font-bold text-red-600">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="original-price text-sm text-gray-400 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        
        {/* Rating */}
        <div className="product-rating flex items-center mt-2">
          <div className="rating-stars flex">
            {renderStars(product.rating)}
          </div>
          <span className="rating-count text-xs text-gray-500 ml-2">({product.reviews || 0})</span>
        </div>
        
        {/* Features */}
        <div className="mt-3 flex flex-wrap gap-2">
          {product.freeShipping && (
            <span className="inline-flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <FaShippingFast className="mr-1" /> Free Shipping
            </span>
          )}
          {product.discount && (
            <span className="inline-flex items-center text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
              <FaPercentage className="mr-1" /> {product.discount}
            </span>
          )}
          {product.tag && (
            <span className="inline-flex items-center text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              <FaTag className="mr-1" /> {product.tag}
            </span>
          )}
        </div>
        
        {/* Stock status */}
        <div className="product-stock mt-3">
          {product.inStock ? (
            product.stockCount && product.stockCount < 10 ? (
              <span className="low-stock text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">Only {product.stockCount} left</span>
            ) : (
              <span className="in-stock text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">In Stock</span>
            )
          ) : (
            <span className="out-of-stock text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Out of Stock</span>
          )}
        </div>
      </div>

      {/* Quick buy button */}
      <div className="mt-2">
        <motion.button 
          onClick={handleAddToCart}
          className={`w-full py-3 font-medium text-white ${product.inStock ? 'bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700' : 'bg-gray-400'} transition-colors flex items-center justify-center`}
          disabled={!product.inStock}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          {product.inStock ? (
            <>
              <FaShoppingCart className="mr-2" /> Add to Cart
            </>
          ) : (
            'Out of Stock'
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;