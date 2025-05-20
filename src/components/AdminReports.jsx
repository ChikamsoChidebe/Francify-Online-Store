import React, { useEffect, useState } from 'react';

const mockData = {
  users: {
    signUps: 1200,
    logins: 950,
    engagement: 78,
    retention: 65,
    churn: 12,
  },
  sales: {
    totalRevenue: 45200,
    daily: [1200, 1500, 1100, 1800, 2000, 1700, 1600],
    bestsellers: [
      { name: 'Wireless Earbuds', sold: 320 },
      { name: 'Smart Watch', sold: 210 },
    ],
    slow: [
      { name: 'VR Headset', sold: 12 },
      { name: 'Bluetooth Speaker', sold: 18 },
    ],
    payment: { Card: 60, PayPal: 25, Cash: 15 },
  },
  inventory: {
    products: [
      { name: 'Wireless Earbuds', stock: 12 },
      { name: 'Smart Watch', stock: 3 },
      { name: 'VR Headset', stock: 0 },
    ],
    suppliers: [
      { name: 'TechSupply', performance: 92 },
      { name: 'GadgetWorld', performance: 85 },
    ],
  },
  orders: {
    completed: 320,
    pending: 18,
    canceled: 7,
    shipping: [
      { order: 101, status: 'Shipped', eta: '2 days' },
      { order: 102, status: 'Processing', eta: '5 days' },
    ],
    refunds: 4,
    returns: 2,
  },
  traffic: {
    visitors: 5400,
    bounce: 38,
    session: 4.2,
    sources: { Organic: 60, Ads: 25, Referrals: 15 },
    conversion: 3.8,
  },
  feedback: {
    reviews: 320,
    avgRating: 4.5,
    topIssues: ['Late delivery', 'Product quality'],
    sentiment: 82,
  },
  admin: {
    actions: 42,
    levels: [
      { name: 'Super Admin', count: 2 },
      { name: 'Manager', count: 4 },
      { name: 'Support', count: 6 },
    ],
    logs: 120,
  },
  marketing: {
    promo: [
      { code: 'SUMMER24', used: 120 },
      { code: 'WELCOME', used: 80 },
    ],
    roi: 4.2,
    email: { open: 38, click: 12 },
  },
};

const fadeIn = (delay = 0) => ({
  animation: `fadeInUp 0.8s cubic-bezier(.39,.575,.565,1) both`,
  animationDelay: `${delay}ms`,
});

const cardGradients = [
  "bg-gradient-to-br from-red-100 via-white to-pink-100",
  "bg-gradient-to-br from-pink-100 via-white to-red-100",
  "bg-gradient-to-br from-yellow-100 via-white to-pink-100",
  "bg-gradient-to-br from-blue-100 via-white to-pink-100",
  "bg-gradient-to-br from-green-100 via-white to-pink-100",
  "bg-gradient-to-br from-gray-100 via-white to-pink-100",
  "bg-gradient-to-br from-fuchsia-100 via-white to-pink-100",
  "bg-gradient-to-br from-pink-100 via-white to-fuchsia-100",
];

const AdminReports = () => {
  const [data, setData] = useState(mockData);

  // In real app, fetch data here

  return (
    <div className="p-2 sm:p-4 md:p-8 bg-gradient-to-br from-pink-50 via-white to-red-50 min-h-screen text-gray-900 max-w-7xl mx-auto animate-fadeIn">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 md:mb-10 text-gray-900 tracking-tight animate-fadeInDown flex items-center gap-3">
        <span className="bg-gradient-to-br from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl shadow-lg animate-pulse">Francify</span>
        Admin Reports & Analytics
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* User Activity */}
        <section className={`rounded-2xl shadow-2xl p-6 border border-gray-200 ${cardGradients[0]} hover:scale-[1.02] transition-transform duration-300`} style={fadeIn(0)}>
          <h2 className="text-xl font-bold mb-3 text-red-600 flex items-center gap-2">
            <span className="text-2xl">👤</span>User Activity
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li><span className="font-semibold">Sign-ups:</span> <span className="font-bold">{data.users.signUps}</span></li>
            <li><span className="font-semibold">Logins:</span> <span className="font-bold">{data.users.logins}</span></li>
            <li><span className="font-semibold">Engagement:</span> <span className="font-bold">{data.users.engagement}%</span></li>
            <li><span className="font-semibold">Retention Rate:</span> <span className="font-bold text-green-600">{data.users.retention}%</span></li>
            <li><span className="font-semibold">Churn Rate:</span> <span className="font-bold text-red-600">{data.users.churn}%</span></li>
          </ul>
        </section>
        {/* Sales & Revenue */}
        <section className={`rounded-2xl shadow-2xl p-6 border border-gray-200 ${cardGradients[1]} hover:scale-[1.02] transition-transform duration-300`} style={fadeIn(100)}>
          <h2 className="text-xl font-bold mb-3 text-red-600 flex items-center gap-2">
            <span className="text-2xl">💸</span>Sales & Revenue
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li><span className="font-semibold">Total Revenue:</span> <span className="font-bold text-green-700">${data.sales.totalRevenue.toLocaleString()}</span></li>
            <li><span className="font-semibold">Daily Sales:</span> <span className="font-mono">{data.sales.daily.join(', ')}</span></li>
            <li><span className="font-semibold">Bestsellers:</span> {data.sales.bestsellers.map(p => (
              <span key={p.name} className="inline-block bg-red-100 text-red-700 rounded px-2 mx-1">{p.name} ({p.sold})</span>
            ))}</li>
            <li><span className="font-semibold">Slow-moving:</span> {data.sales.slow.map(p => (
              <span key={p.name} className="inline-block bg-gray-100 text-gray-700 rounded px-2 mx-1">{p.name} ({p.sold})</span>
            ))}</li>
            <li><span className="font-semibold">Payment Methods:</span> {Object.entries(data.sales.payment).map(([k, v]) => (
              <span key={k} className="inline-block bg-pink-100 text-pink-700 rounded px-2 mx-1">{k}: {v}%</span>
            ))}</li>
          </ul>
        </section>
        {/* Inventory & Stock */}
        <section className={`rounded-2xl shadow-2xl p-6 border border-gray-200 ${cardGradients[2]} hover:scale-[1.02] transition-transform duration-300`} style={fadeIn(200)}>
          <h2 className="text-xl font-bold mb-3 text-red-600 flex items-center gap-2">
            <span className="text-2xl">📦</span>Inventory & Stock
          </h2>
          <ul className="space-y-2 text-gray-700">
            {data.inventory.products.map(p => (
              <li key={p.name}>
                <span className="font-semibold">{p.name}:</span> <span className={`font-bold ${p.stock === 0 ? 'text-red-600' : p.stock < 5 ? 'text-yellow-600' : 'text-green-700'}`}>{p.stock}</span>
                {p.stock === 0 && <span className="ml-2 animate-pulse text-red-600 font-bold">Low!</span>}
              </li>
            ))}
            <li><span className="font-semibold">Suppliers:</span> {data.inventory.suppliers.map(s => (
              <span key={s.name} className="inline-block bg-gray-100 text-gray-700 rounded px-2 mx-1">{s.name} ({s.performance}%)</span>
            ))}</li>
          </ul>
        </section>
        {/* Orders */}
        <section className={`rounded-2xl shadow-2xl p-6 border border-gray-200 ${cardGradients[3]} hover:scale-[1.02] transition-transform duration-300`} style={fadeIn(300)}>
          <h2 className="text-xl font-bold mb-3 text-red-600 flex items-center gap-2">
            <span className="text-2xl">📑</span>Order Management
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li><span className="font-semibold">Completed:</span> <span className="font-bold text-green-700">{data.orders.completed}</span></li>
            <li><span className="font-semibold">Pending:</span> <span className="font-bold text-yellow-600">{data.orders.pending}</span></li>
            <li><span className="font-semibold">Canceled:</span> <span className="font-bold text-red-600">{data.orders.canceled}</span></li>
            <li><span className="font-semibold">Shipping:</span> {data.orders.shipping.map(o => (
              <span key={o.order} className="inline-block bg-blue-100 text-blue-700 rounded px-2 mx-1">{o.order} ({o.status}, ETA: {o.eta})</span>
            ))}</li>
            <li><span className="font-semibold">Refunds:</span> <span className="font-bold">{data.orders.refunds}</span>, <span className="font-semibold">Returns:</span> <span className="font-bold">{data.orders.returns}</span></li>
          </ul>
        </section>
        {/* Website Traffic */}
        <section className={`rounded-2xl shadow-2xl p-6 border border-gray-200 ${cardGradients[4]} hover:scale-[1.02] transition-transform duration-300`} style={fadeIn(400)}>
          <h2 className="text-xl font-bold mb-3 text-red-600 flex items-center gap-2">
            <span className="text-2xl">🌐</span>Website Traffic
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li><span className="font-semibold">Visitors:</span> <span className="font-bold">{data.traffic.visitors}</span></li>
            <li><span className="font-semibold">Bounce Rate:</span> <span className="font-bold text-red-600">{data.traffic.bounce}%</span></li>
            <li><span className="font-semibold">Session Duration:</span> <span className="font-bold">{data.traffic.session} min</span></li>
            <li><span className="font-semibold">Sources:</span> {Object.entries(data.traffic.sources).map(([k, v]) => (
              <span key={k} className="inline-block bg-pink-100 text-pink-700 rounded px-2 mx-1">{k}: {v}%</span>
            ))}</li>
            <li><span className="font-semibold">Conversion Rate:</span> <span className="font-bold text-green-700">{data.traffic.conversion}%</span></li>
          </ul>
        </section>
        {/* Customer Feedback */}
        <section className={`rounded-2xl shadow-2xl p-6 border border-gray-200 ${cardGradients[5]} hover:scale-[1.02] transition-transform duration-300`} style={fadeIn(500)}>
          <h2 className="text-xl font-bold mb-3 text-red-600 flex items-center gap-2">
            <span className="text-2xl">💬</span>Customer Feedback
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li><span className="font-semibold">Reviews:</span> <span className="font-bold">{data.feedback.reviews}</span></li>
            <li><span className="font-semibold">Avg. Rating:</span> <span className="font-bold text-yellow-600">{data.feedback.avgRating}★</span></li>
            <li><span className="font-semibold">Top Issues:</span> {data.feedback.topIssues.map(issue => (
              <span key={issue} className="inline-block bg-yellow-100 text-yellow-700 rounded px-2 mx-1">{issue}</span>
            ))}</li>
            <li><span className="font-semibold">Sentiment Score:</span> <span className="font-bold text-green-700">{data.feedback.sentiment}%</span></li>
          </ul>
        </section>
        {/* Admin Logs */}
        <section className={`rounded-2xl shadow-2xl p-6 border border-gray-200 ${cardGradients[6]} hover:scale-[1.02] transition-transform duration-300`} style={fadeIn(600)}>
          <h2 className="text-xl font-bold mb-3 text-red-600 flex items-center gap-2">
            <span className="text-2xl">🛡️</span>Admin Logs & Permissions
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li><span className="font-semibold">Admin Actions:</span> <span className="font-bold">{data.admin.actions}</span></li>
            <li><span className="font-semibold">Access Levels:</span> {data.admin.levels.map(l => (
              <span key={l.name} className="inline-block bg-gray-100 text-gray-700 rounded px-2 mx-1">{l.name} ({l.count})</span>
            ))}</li>
            <li><span className="font-semibold">Audit Logs:</span> <span className="font-bold">{data.admin.logs}</span></li>
          </ul>
        </section>
        {/* Marketing */}
        <section className={`rounded-2xl shadow-2xl p-6 border border-gray-200 ${cardGradients[7]} hover:scale-[1.02] transition-transform duration-300`} style={fadeIn(700)}>
          <h2 className="text-xl font-bold mb-3 text-red-600 flex items-center gap-2">
            <span className="text-2xl">📈</span>Marketing & Campaigns
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li><span className="font-semibold">Promo Codes:</span> {data.marketing.promo.map(p => (
              <span key={p.code} className="inline-block bg-pink-100 text-pink-700 rounded px-2 mx-1">{p.code} ({p.used})</span>
            ))}</li>
            <li><span className="font-semibold">Ad ROI:</span> <span className="font-bold text-green-700">{data.marketing.roi}x</span></li>
            <li><span className="font-semibold">Email Open Rate:</span> <span className="font-bold">{data.marketing.email.open}%</span>, <span className="font-semibold">Click Rate:</span> <span className="font-bold">{data.marketing.email.click}%</span></li>
          </ul>
        </section>
      </div>
      {/* Animations */}
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
      `}</style>
    </div>
  );
};

export default AdminReports;