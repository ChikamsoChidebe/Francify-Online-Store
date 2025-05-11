import React, { useState } from 'react';
import AdminUserManagement from '../components/AdminUserManagement';
import AdminProductManagement from '../components/AdminProductManagement';
import AdminSettings from '../components/AdminSettings';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-black to-red-900 text-red-300 p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div className="flex flex-col md:flex-row justify-center md:space-x-6 space-y-4 md:space-y-0 mb-8">
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === 'users' ? 'bg-red-700 text-white' : 'bg-red-900 hover:bg-red-700'
          }`}
          onClick={() => setActiveTab('users')}
        >
          User Management
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === 'products' ? 'bg-red-700 text-white' : 'bg-red-900 hover:bg-red-700'
          }`}
          onClick={() => setActiveTab('products')}
        >
          Product Management
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === 'settings' ? 'bg-red-700 text-white' : 'bg-red-900 hover:bg-red-700'
          }`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      <div>
        {activeTab === 'users' && <AdminUserManagement />}
        {activeTab === 'products' && <AdminProductManagement />}
        {activeTab === 'settings' && <AdminSettings />}
      </div>
    </div>
  );
};

export default AdminPage;
