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

  // Placeholder data for recent orders
  const recentOrders = [
    { id: 101, customer: 'John Doe', total: '$250', status: 'Shipped' },
    { id: 102, customer: 'Jane Smith', total: '$120', status: 'Processing' },
    { id: 103, customer: 'Alice Johnson', total: '$320', status: 'Delivered' },
  ];

  // Placeholder data for quick actions
  const quickActions = [
    { id: 1, label: 'Add Product', icon: '➕' },
    { id: 2, label: 'Manage Users', icon: '👥' },
    { id: 3, label: 'View Reports', icon: '📊' },
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 via-white to-gray-100 min-h-screen text-gray-900 rounded-lg shadow-lg max-w-7xl mx-auto animate-fadeIn">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {metrics.map(metric => (
          <div
            key={metric.id}
            className="bg-white rounded-lg shadow p-6 flex items-center space-x-4 hover:shadow-xl transition cursor-default transform hover:-translate-y-1"
          >
            <div className="text-4xl">{metric.icon}</div>
            <div>
              <p className="text-lg font-semibold">{metric.title}</p>
              <p className="text-2xl font-bold text-red-600">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">Recent Orders</h3>
        <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-2 px-4">Order ID</th>
                <th className="py-2 px-4">Customer</th>
                <th className="py-2 px-4">Total</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="py-2 px-4 font-mono">{order.id}</td>
                  <td className="py-2 px-4">{order.customer}</td>
                  <td className="py-2 px-4 font-semibold text-red-600">{order.total}</td>
                  <td className={`py-2 px-4 font-semibold ${
                    order.status === 'Delivered' ? 'text-green-600' :
                    order.status === 'Shipped' ? 'text-blue-600' :
                    'text-yellow-600'
                  }`}>
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4">Quick Actions</h3>
        <div className="flex space-x-6 justify-center md:justify-start">
          {quickActions.map(action => (
            <button
              key={action.id}
              className="bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 transition transform hover:scale-105 flex items-center space-x-3"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="font-semibold">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOverview;

