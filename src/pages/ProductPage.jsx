import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaTruck, FaUndo, FaShieldAlt } from 'react-icons/fa';
import { fetchProductById, fetchProductsByCategory } from '../services/api';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const productData = await fetchProductById(parseInt(id));
        setProduct(productData);
        
        if (productData) {
          // Set default selected options
          if (productData.colors && productData.colors.length > 0) {
            setSelectedColor(productData.colors[0]);
          }
          
          if (productData.sizes && productData.sizes.length > 0) {
            setSelectedSize(productData.sizes[0]);
          }
          
          // Load related products from same category
          const related = await fetchProductsByCategory(productData.category);
          setRelatedProducts(related.filter(p => p.id !== productData.id).slice(0, 4));
        }
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      const productWithOptions = {
        ...product,
        selectedColor,
        selectedSize
      };
      addToCart(productWithOptions, quantity);
    }
  };
  
  const handleWishlistToggle = () => {
    if (!product) return;
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }
    
    return stars;
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-300 h-96 rounded-lg"></div>
            <div>
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-6 w-3/4"></div>
              <div className="h-10 bg-gray-300 rounded w-1/3 mb-6"></div>
              <div className="h-12 bg-gray-300 rounded mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">
          Back to Products
        </Link>
      </div>
    );
  }
  
  // Mock images for product gallery
  const productImages = [
    product.image,
    'https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  ];
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="mb-4 overflow-hidden rounded-lg">
            <img 
              src={productImages[selectedImage]} 
              alt={product.name} 
              className="w-full h-[500px] object-cover object-center"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {productImages.map((image, index) => (
              <div 
                key={index}
                className={`cursor-pointer border-2 rounded-md overflow-hidden ${
                  selectedImage === index ? 'border-indigo-600' : 'border-transparent'
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} view ${index + 1}`} 
                  className="w-full h-24 object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {renderStars(product.rating)}
            </div>
            <span className="text-gray-600">({product.reviews} reviews)</span>
          </div>
          
          <p className="text-3xl font-bold text-indigo-600 mb-6">${product.price.toFixed(2)}</p>
          
          <p className="text-gray-600 mb-6">{product.description}</p>
          
          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
              <div className="flex space-x-2">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColor === color 
                        ? 'ring-2 ring-offset-2 ring-indigo-600' 
                        : 'ring-1 ring-gray-200'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Color: ${color}`}
                  ></button>
                ))}
              </div>
            </div>
          )}
          
          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`px-3 py-1 border rounded-md ${
                      selectedSize === size 
                        ? 'bg-indigo-600 text-white border-indigo-600' 
                        : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity Selector */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
            <div className="flex items-center border border-gray-300 rounded-md w-32">
              <button 
                className="px-3 py-1 text-gray-600 hover:text-indigo-600"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full text-center border-0 focus:ring-0"
              />
              <button 
                className="px-3 py-1 text-gray-600 hover:text-indigo-600"
                onClick={() => setQuantity(prev => prev + 1)}
              >
                +
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition flex items-center justify-center gap-2"
            >
              <FaShoppingCart />
              Add to Cart
            </button>
            <button
              onClick={handleWishlistToggle}
              className="flex-1 border border-gray-300 py-3 px-6 rounded-md hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              {isInWishlist(product.id) ? (
                <>
                  <FaHeart className="text-red-500" />
                  Remove from Wishlist
                </>
              ) : (
                <>
                  <FaRegHeart />
                  Add to Wishlist
                </>
              )}
            </button>
          </div>
          
          {/* Product Features */}
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center">
                <FaTruck className="text-indigo-600 mr-2" />
                <span className="text-sm text-gray-600">Free shipping over $50</span>
              </div>
              <div className="flex items-center">
                <FaUndo className="text-indigo-600 mr-2" />
                <span className="text-sm text-gray-600">30-day returns</span>
              </div>
              <div className="flex items-center">
                <FaShieldAlt className="text-indigo-600 mr-2" />
                <span className="text-sm text-gray-600">2-year warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'description'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'specifications'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({product.reviews})
            </button>
          </nav>
        </div>
        
        <div className="py-6">
          {activeTab === 'description' && (
            <div>
              <p className="text-gray-600">
                {product.description}
                <br /><br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, 
                nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod, nisl vel ultricies lacinia, 
                nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.
                <br /><br />
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. 
                Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.
              </p>
            </div>
          )}
          
          {activeTab === 'specifications' && (
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">Material</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Premium Quality</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">Dimensions</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10 x 5 x 3 inches</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">Weight</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">0.5 kg</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">Country of Origin</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Italy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-gray-600">Based on {product.reviews} reviews</span>
                </div>
                
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition">
                  Write a Review
                </button>
              </div>
              
              {/* Sample Reviews */}
              <div className="space-y-6">
                <div className="border-b pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {renderStars(5)}
                    </div>
                    <span className="font-medium">Excellent Product</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    By John D. on October 15, 2023
                  </p>
                  <p className="text-gray-600">
                    This product exceeded my expectations. The quality is outstanding and it looks even better in person.
                    I would definitely recommend it to anyone looking for a premium item.
                  </p>
                </div>
                
                <div className="border-b pb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {renderStars(4)}
                    </div>
                    <span className="font-medium">Great Value</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    By Sarah M. on September 28, 2023
                  </p>
                  <p className="text-gray-600">
                    Very happy with my purchase. The product is well-made and arrived quickly.
                    The only reason I'm giving 4 stars instead of 5 is because the color is slightly different than shown in the photos.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;