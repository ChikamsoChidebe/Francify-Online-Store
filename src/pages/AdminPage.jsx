import React, { useState } from 'react';
import AdminUserManagement from '../components/AdminUserManagement';
import AdminProductManagement from '../components/AdminProductManagement';
import AdminSettings from '../components/AdminSettings';
import AdminAllProducts from '../components/AdminAllProducts';
import AdminDashboardOverview from '../components/AdminDashboardOverview';

import { useAuth } from '../context/AuthContext';

const AdminPage = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!currentUser || currentUser.role !== 'Admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 p-4 md:p-8">
        <h2 className="text-2xl font-semibold">Access Denied</h2>
        <p className="mt-2">You do not have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-100 text-gray-900 p-4 md:p-8">
      <div className="w-full max-w-7xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Admin Dashboard</h1>
        <div className="flex flex-col md:flex-row justify-center md:space-x-6 space-y-4 md:space-y-0 mb-8">
          <button
            className={`px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${
              activeTab === 'overview' ? 'bg-red-600 text-white' : 'bg-red-400 hover:bg-primary-600 text-gray-900'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${
              activeTab === 'users' ? 'bg-red-600 text-white' : 'bg-red-400 hover:bg-primary-600 text-gray-900'
            }`}
            onClick={() => setActiveTab('users')}
          >
            User Management
          </button>
          <button
            className={`px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${
              activeTab === 'allproducts' ? 'bg-red-600 text-white' : 'bg-red-400 hover:bg-primary-600 text-gray-900'
            }`}
            onClick={() => setActiveTab('allproducts')}
          >
            All Products
          </button>
          <button
            className={`px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${
              activeTab === 'products' ? 'bg-red-600 text-white' : 'bg-red-400 hover:bg-primary-600 text-gray-900'
            }`}
            onClick={() => setActiveTab('products')}
          >
            Add Product
          </button>
          <button
            className={`px-4 py-2 rounded-md font-semibold transition-colors duration-300 ${
              activeTab === 'settings' ? 'bg-red-600 text-white' : 'bg-red-400 hover:bg-primary-600 text-gray-900'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        <div>
          {activeTab === 'overview' && <AdminDashboardOverview />}
          {activeTab === 'users' && <AdminUserManagement />}
          {activeTab === 'allproducts' && <AdminAllProducts />}
          {activeTab === 'products' && <AdminProductManagement />}
          {activeTab === 'settings' && <AdminSettings />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
