import React from 'react';

const Shipping = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Shipping & Returns</h1>
        
        <div className="max-w-4xl mx-auto">
          {/* Shipping Information */}
          <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-2">Shipping Information</h2>
            
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-medium mb-3 text-red-600">Processing Time</h3>
                <p className="text-gray-700">
                  All orders are processed within 1-2 business days after payment confirmation. Orders placed on weekends or holidays 
                  will be processed on the next business day.
                </p>
              </section>
              
              <section>
                <h3 className="text-xl font-medium mb-3 text-red-600">Shipping Methods & Delivery Times</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-3 px-4 bg-gray-50 text-left text-gray-700 font-medium">Shipping Method</th>
                        <th className="py-3 px-4 bg-gray-50 text-left text-gray-700 font-medium">Delivery Time</th>
                        <th className="py-3 px-4 bg-gray-50 text-left text-gray-700 font-medium">Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-3 px-4">Standard Shipping</td>
                        <td className="py-3 px-4">3-5 business days</td>
                        <td className="py-3 px-4">₦1,500 (Free for orders over ₦15,000)</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Express Shipping</td>
                        <td className="py-3 px-4">1-2 business days</td>
                        <td className="py-3 px-4">₦3,000</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">International Shipping</td>
                        <td className="py-3 px-4">7-14 business days</td>
                        <td className="py-3 px-4">Calculated at checkout</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              
              <section>
                <h3 className="text-xl font-medium mb-3 text-red-600">Tracking Your Order</h3>
                <p className="text-gray-700">
                  Once your order ships, you will receive a shipping confirmation email with a tracking number. 
                  You can track your package by:
                </p>
                <ul className="list-disc pl-5 mt-2 text-gray-700">
                  <li>Clicking the tracking link in your shipping confirmation email</li>
                  <li>Visiting our website and entering your tracking number in the "Track Order" section</li>
                  <li>Contacting our customer service team</li>
                </ul>
              </section>
              
              <section>
                <h3 className="text-xl font-medium mb-3 text-red-600">International Orders</h3>
                <p className="text-gray-700">
                  We ship to most countries worldwide. Please note that international orders may be subject to import duties and taxes, 
                  which are the responsibility of the customer. Delivery times for international orders may vary depending on customs 
                  processing in your country.
                </p>
              </section>
            </div>
          </div>
          
          {/* Returns Policy */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-2">Returns Policy</h2>
            
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-medium mb-3 text-red-600">Return Eligibility</h3>
                <p className="text-gray-700">
                  We offer a 30-day return policy for most items. To be eligible for a return, your item must be:
                </p>
                <ul className="list-disc pl-5 mt-2 text-gray-700">
                  <li>In the same condition that you received it</li>
                  <li>Unworn, unwashed, and undamaged</li>
                  <li>In the original packaging with tags attached</li>
                  <li>Accompanied by the original receipt or proof of purchase</li>
                </ul>
              </section>
              
              <section>
                <h3 className="text-xl font-medium mb-3 text-red-600">Non-Returnable Items</h3>
                <p className="text-gray-700">
                  The following items cannot be returned:
                </p>
                <ul className="list-disc pl-5 mt-2 text-gray-700">
                  <li>Gift cards</li>
                  <li>Downloadable software products</li>
                  <li>Personal care items (for hygiene reasons)</li>
                  <li>Intimate apparel</li>
                  <li>Sale items marked as "Final Sale"</li>
                </ul>
              </section>
              
              <section>
                <h3 className="text-xl font-medium mb-3 text-red-600">Return Process</h3>
                <p className="text-gray-700">
                  To initiate a return:
                </p>
                <ol className="list-decimal pl-5 mt-2 text-gray-700">
                  <li>Log in to your account and go to the "Order History" section</li>
                  <li>Select the order containing the item(s) you wish to return</li>
                  <li>Click on "Return Items" and follow the instructions</li>
                  <li>Print the return shipping label (if applicable)</li>
                  <li>Package the item(s) securely with all original packaging and tags</li>
                  <li>Attach the return shipping label to the package</li>
                  <li>Drop off the package at the designated shipping carrier</li>
                </ol>
              </section>
              
              <section>
                <h3 className="text-xl font-medium mb-3 text-red-600">Refunds</h3>
                <p className="text-gray-700">
                  Once we receive and inspect your return, we will notify you of the approval or rejection of your refund.
                  If approved, your refund will be processed, and a credit will automatically be applied to your original method 
                  of payment within 5-7 business days.
                </p>
              </section>
              
              <section>
                <h3 className="text-xl font-medium mb-3 text-red-600">Exchanges</h3>
                <p className="text-gray-700">
                  If you need to exchange an item for a different size or color, please return the original item and place a new order.
                  For assistance with exchanges, please contact our customer service team at support@francify.com.
                </p>
              </section>
              
              <section>
                <h3 className="text-xl font-medium mb-3 text-red-600">Return Shipping Costs</h3>
                <p className="text-gray-700">
                  For returns due to our error (wrong item shipped, defective product, etc.), we will provide a prepaid return shipping label.
                  For all other returns, customers are responsible for return shipping costs. The original shipping charges are non-refundable.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;