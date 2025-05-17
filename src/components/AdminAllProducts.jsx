import React, { useState, useEffect } from 'react';
import { useProductContext } from '../context/ProductContext';

const AdminAllProducts = () => {
  const { products, updateProduct, deleteProduct } = useProductContext();
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  useEffect(() => {
    if (editingProductId !== null) {
      const productToEdit = products.find(p => p.id === editingProductId);
      if (productToEdit) {
        setEditedProduct({ ...productToEdit });
      }
    } else {
      setEditedProduct({});
    }
  }, [editingProductId, products]);

  const handleEditClick = (id) => {
    setEditingProductId(id);
  };

  const handleCancelClick = () => {
    setEditingProductId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = () => {
    // Basic validation
    if (!editedProduct.name || !editedProduct.price || !editedProduct.stock) {
      alert('Please fill in required fields: name, price, stock.');
      return;
    }
    updateProduct(editedProduct);
    setEditingProductId(null);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 via-white to-gray-100 min-h-screen text-gray-900 rounded-lg shadow-lg max-w-7xl mx-auto animate-fadeIn">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">All Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Stock</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  {editingProductId === product.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editedProduct.name || ''}
                      onChange={handleChange}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editingProductId === product.id ? (
                    <input
                      type="number"
                      name="price"
                      value={editedProduct.price || ''}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    `$${product.price}`
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editingProductId === product.id ? (
                    <input
                      type="number"
                      name="stock"
                      value={editedProduct.stock || ''}
                      onChange={handleChange}
                      min="0"
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    product.stock
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editingProductId === product.id ? (
                    <input
                      type="text"
                      name="category"
                      value={editedProduct.category || ''}
                      onChange={handleChange}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    product.category
                  )}
                </td>
                <td className="py-2 px-4 border-b space-x-2">
                  {editingProductId === product.id ? (
                    <>
                      <button
                        onClick={handleSaveClick}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelClick}
                        className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(product.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllProducts;
