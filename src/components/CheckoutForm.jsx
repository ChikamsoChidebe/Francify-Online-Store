import React, { useState } from 'react';

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order placed:', formData);
    alert('Order placed successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Expiry Date</label>
        <input
          type="text"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">CVV</label>
        <input
          type="text"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
          className="w-full border px-2 py-1 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Place Order
      </button>
    </form>
  );
};

export default CheckoutForm;