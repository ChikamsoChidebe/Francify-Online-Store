import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// ...existing code...

const AdminDashboardOverview = () => {
  // Placeholder data for key metrics
  const metrics = [
    { id: 1, title: 'Total Sales', value: '$125,000', icon: '💰', color: 'from-pink-500 to-red-500' },
    { id: 2, title: 'Total Products', value: '350', icon: '📦', color: 'from-blue-500 to-cyan-500' },
    { id: 3, title: 'Total Orders', value: '1,200', icon: '🛒', color: 'from-green-500 to-teal-500' },
    { id: 4, title: 'Total Users', value: '850', icon: '👥', color: 'from-yellow-500 to-orange-500' },
    { id: 5, title: 'Pending Orders', value: '45', icon: '⏳', color: 'from-purple-500 to-fuchsia-500' },
    { id: 6, title: 'Low Stock Products', value: '12', icon: '⚠️', color: 'from-gray-700 to-gray-400' },
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

   const navigate = useNavigate();

     const handleQuickAction = (action) => {
    switch (action) {
      case 'Add Product':
        navigate('/admin/products/new');
        break;
      case 'Manage Users':
        navigate('/admin/users');
        break;
      case 'View Reports':
        navigate('/admin/reports');
        break;
      default:
        break;
    }
  };

  // Animation state for table rows
  const [showRows, setShowRows] = useState(false);
  useEffect(() => {
    setTimeout(() => setShowRows(true), 300);
  }, []);

  return (
    <div className="p-2 sm:p-4 md:p-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen text-gray-900 rounded-3xl shadow-2xl max-w-7xl mx-auto animate-fadeIn">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 md:mb-10 text-gray-900 tracking-tight animate-fadeInDown">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 md:mb-14">
        {metrics.map((metric, idx) => (
          <div
            key={metric.id}
            className={`
              bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-4 sm:p-7 flex items-center space-x-3 sm:space-x-5
              border border-gray-200
              transition-all duration-300 ease-in-out
              hover:scale-105 hover:shadow-2xl
              animate-fadeInUp
            `}
            style={{
              animationDelay: `${idx * 100}ms`,
              animationFillMode: 'both'
            }}
          >
            <div className={`text-3xl sm:text-5xl bg-gradient-to-br ${metric.color} text-white rounded-full p-3 sm:p-4 shadow-lg`}>
              {metric.icon}
            </div>
            <div>
              <p className="text-sm sm:text-lg font-semibold text-gray-700">{metric.title}</p>
              <p className="text-xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-500">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8 md:mb-14">
        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-5 text-gray-800 animate-fadeInLeft">Recent Orders</h3>
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-3 sm:p-8 max-w-full md:max-w-4xl mx-auto border border-gray-200 overflow-x-auto">
          <table className="w-full text-left table-auto text-xs sm:text-base">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700 font-semibold">Order ID</th>
                <th className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700 font-semibold">Customer</th>
                <th className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700 font-semibold">Total</th>
                <th className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, idx) => (
                <tr
                  key={order.id}
                  className={`
                    border-b border-gray-200
                    hover:bg-gray-50 transition
                    ${showRows ? 'animate-fadeInUp' : 'opacity-0'}
                  `}
                  style={{
                    animationDelay: `${idx * 120 + 200}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  <td className="py-2 sm:py-3 px-2 sm:px-4 font-mono">{order.id}</td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4">{order.customer}</td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-red-600">{order.total}</td>
                  <td className={`py-2 sm:py-3 px-2 sm:px-4 font-semibold ${
                    order.status === 'Delivered' ? 'text-green-600' :
                    order.status === 'Shipped' ? 'text-blue-600' :
                    'text-yellow-600'
                  }`}>
                    <span className="inline-block animate-pulse">{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-5 text-gray-800 animate-fadeInLeft">Quick Actions</h3>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-8 justify-center md:justify-start">
          {quickActions.map((action, idx) => (
            <button
              key={action.id}
              className={`
                bg-gradient-to-br from-red-500 to-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-xl
                hover:from-pink-600 hover:to-red-700
                transition-all duration-200 ease-in-out
                hover:scale-110 hover:shadow-2xl
                flex items-center space-x-2 sm:space-x-4 font-semibold text-base sm:text-lg
                animate-fadeInUp
              `}
              style={{
                animationDelay: `${idx * 120 + 400}ms`,
                animationFillMode: 'both'
              }}
              onClick={() => handleQuickAction(action.label)}
            >
              <span className="text-2xl sm:text-3xl">{action.icon}</span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Animations (Tailwind custom keyframes) */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s cubic-bezier(.39,.575,.565,1) both;
        }
        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-30px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.7s cubic-bezier(.39,.575,.565,1) both;
        }
        @keyframes fadeInLeft {
          0% { opacity: 0; transform: translateX(-30px);}
          100% { opacity: 1; transform: translateX(0);}
        }
        .animate-fadeInLeft {
          animation: fadeInLeft 0.7s cubic-bezier(.39,.575,.565,1) both;
        }
        @keyframes fadeIn {
          0% { opacity: 0;}
          100% { opacity: 1;}
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease both;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboardOverview;