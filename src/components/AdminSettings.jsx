import React, { useState } from 'react';

const paymentOptionsList = ['PayPal', 'Stripe', 'Credit Card', 'Bank Transfer'];
const shippingMethodsList = ['Standard Shipping', 'Express Shipping', 'Overnight Shipping'];
const taxRegionsList = ['US', 'EU', 'Asia', 'Other'];

const AdminSettings = () => {
  const [paymentOptions, setPaymentOptions] = useState({
    PayPal: true,
    Stripe: true,
    'Credit Card': false,
    'Bank Transfer': false,
  });

  const [shippingMethods, setShippingMethods] = useState({
    'Standard Shipping': true,
    'Express Shipping': false,
    'Overnight Shipping': false,
  });

  const [taxSettings, setTaxSettings] = useState({
    US: 7,
    EU: 20,
    Asia: 15,
    Other: 10,
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
  });

  const handlePaymentChange = (option) => {
    setPaymentOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const handleShippingChange = (method) => {
    setShippingMethods(prev => ({ ...prev, [method]: !prev[method] }));
  };

  const handleTaxChange = (region, value) => {
    setTaxSettings(prev => ({ ...prev, [region]: Number(value) }));
  };

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit settings logic here
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-6 bg-gradient-to-r from-red-900 via-black to-red-900 min-h-screen text-red-300 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-white">Admin Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Options */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white">Payment Options</h3>
          <div className="flex flex-wrap space-x-4 space-y-2">
            {paymentOptionsList.map(option => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={paymentOptions[option]}
                  onChange={() => handlePaymentChange(option)}
                  className="form-checkbox h-5 w-5 text-red-600"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Shipping Methods */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white">Shipping Methods</h3>
          <div className="flex flex-wrap space-x-4 space-y-2">
            {shippingMethodsList.map(method => (
              <label key={method} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={shippingMethods[method]}
                  onChange={() => handleShippingChange(method)}
                  className="form-checkbox h-5 w-5 text-red-600"
                />
                <span>{method}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tax Settings */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white">Tax Settings (%)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
            {taxRegionsList.map(region => (
              <div key={region} className="flex items-center space-x-2">
                <label className="w-24">{region}</label>
                <input
                  type="number"
                  value={taxSettings[region]}
                  onChange={(e) => handleTaxChange(region, e.target.value)}
                  className="w-20 p-1 rounded text-black"
                  min="0"
                  max="100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Notification Preferences */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white">Notification Preferences</h3>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={notifications.emailAlerts}
              onChange={() => handleNotificationChange('emailAlerts')}
              className="form-checkbox h-5 w-5 text-red-600"
            />
            <span>Email Alerts</span>
          </label>
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="checkbox"
              checked={notifications.smsAlerts}
              onChange={() => handleNotificationChange('smsAlerts')}
              className="form-checkbox h-5 w-5 text-red-600"
            />
            <span>SMS Alerts</span>
          </label>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-red-600 via-red-800 to-black text-white font-semibold rounded shadow hover:from-red-700 hover:via-red-900 hover:to-black transition"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
