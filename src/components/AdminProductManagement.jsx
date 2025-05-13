import React, { useState } from 'react';
import { useProductContext } from '../context/ProductContext';

// Example categories and variants
const categories = ['Skincare', 'Makeup', 'Fragrance', 'Haircare', 'Body'];
const sizes = ['Small', 'Medium', 'Large'];
const colors = ['Red', 'Black', 'White', 'Blue'];

const AdminProductManagement = () => {
  const { addProduct } = useProductContext();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: categories[0],
    stock: '',
    variants: { size: sizes[0], color: colors[0] },
    imageUrl: ''
  });

  const [isImageValid, setIsImageValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'size' || name === 'color') {
      setProduct(prev => ({
        ...prev,
        variants: { ...prev.variants, [name]: value }
      }));
    } else {
      setProduct(prev => ({ ...prev, [name]: value }));
      if (name === 'imageUrl') {
        validateImageUrl(value);
      }
    }
  };

  const validateImageUrl = (url) => {
    if (!url) {
      setIsImageValid(false);
      return;
    }
    const img = new Image();
    img.onload = () => setIsImageValid(true);
    img.onerror = () => setIsImageValid(false);
    img.src = url;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate inputs
    if (!product.name || !product.description || !product.price || !product.stock) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!isImageValid) {
      alert('Please provide a valid image URL.');
      return;
    }
    // Add product via context
    addProduct(product);
    // Reset form
    setProduct({
      name: '',
      description: '',
      price: '',
      category: categories[0],
      stock: '',
      variants: { size: sizes[0], color: colors[0] },
      imageUrl: ''
    });
    setIsImageValid(false);
  };

  return (
<div className="p-6 bg-gradient-to-br from-gray-100 via-white to-gray-100 min-h-screen text-gray-900 rounded-lg shadow-lg max-w-lg mx-auto animate-fadeIn">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Product Management</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="w-full p-2 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
        />
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={product.stock}
          onChange={handleChange}
          required
          min="0"
          className="w-full p-2 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
        />
        <div className="flex space-x-4">
          <select
            name="size"
            value={product.variants.size}
            onChange={handleChange}
            className="flex-1 p-2 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
          >
            {sizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <select
            name="color"
            value={product.variants.color}
            onChange={handleChange}
            className="flex-1 p-2 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
          >
            {colors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>
        <div className="relative">
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={product.imageUrl}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 transition pr-10"
          />
          {isImageValid && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 text-xl font-bold">&#10003;</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-primary-400 via-primary-600 to-accent-900 text-black font-semibold rounded shadow hover:from-primary-500 hover:via-primary-700 hover:to-accent-900 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminProductManagement;
