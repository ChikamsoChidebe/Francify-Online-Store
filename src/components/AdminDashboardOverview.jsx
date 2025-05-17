import React from 'react';

const AdminDashboardOverview = () => {
  // Placeholder data for key metrics
  const metrics = [
    { id: 1, title: 'Total Sales', value: '$125,000', icon: '💰' },
    { id: 2, title: 'Total Products', value: '350', icon: '📦' },
    { id: 3, title: 'Total Orders', value: '1,200', icon: '🛒' },
    { id: 4, title: 'Total Users', value: '850', icon: '👥' },
    { id: 5, title: 'Pending Orders', value: '45', icon: '⏳' },
    { id: 6, title: 'Low Stock Products', value: '12', icon: '⚠️' },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 via-white to-gray-100 min-h-screen text-gray-900 rounded-lg shadow-lg max-w-7xl mx-auto animate-fadeIn">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {metrics.map(metric => (
          <div
            key={metric.id}
            className="bg-white rounded-lg shadow p-6 flex items-center space-x-4 hover:shadow-lg transition cursor-default"
          >
            <div className="text-4xl">{metric.icon}</div>
            <div>
              <p className="text-lg font-semibold">{metric.title}</p>
              <p className="text-2xl font-bold text-red-600">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardOverview;
