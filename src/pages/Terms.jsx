import React from 'react';

const Terms = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Terms & Conditions</h1>
        
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              Welcome to Francify. These Terms and Conditions govern your use of our website and services. 
              By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of these terms, 
              you may not access the website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Definitions</h2>
            <p className="text-gray-700 mb-4">
              "User", "You" and "Your" refers to you, the person accessing this website and accepting the Company's terms and conditions.
              "The Company", "Ourselves", "We", "Our" and "Us", refers to Francify.
              "Party", "Parties", or "Us", refers to both the User and ourselves, or either the User or ourselves.
              "Website" refers to Francify's website.
              "Service" refers to the services provided by Francify as described in this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Account Registration</h2>
            <p className="text-gray-700 mb-4">
              To use certain features of the website, you may be required to register for an account. You agree to provide accurate, 
              current, and complete information during the registration process and to update such information to keep it accurate, 
              current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Products and Services</h2>
            <p className="text-gray-700 mb-4">
              All products and services are subject to availability. We reserve the right to discontinue any products or services at any time.
              Prices for our products are subject to change without notice. We reserve the right to modify or discontinue the Service 
              without notice at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Purchases</h2>
            <p className="text-gray-700 mb-4">
              All purchases through our site are subject to our acceptance of your order. We reserve the right to refuse or cancel any orders.
              If we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone 
              number provided at the time the order was made.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              The Service and its original content, features, and functionality are and will remain the exclusive property of Francify and 
              its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be 
              used in connection with any product or service without the prior written consent of Francify.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              In no event shall Francify, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any 
              indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, 
              goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. Governing Law</h2>
            <p className="text-gray-700 mb-4">
              These Terms shall be governed and construed in accordance with the laws of Nigeria, without regard to its conflict of law provisions.
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">9. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will 
              provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined 
              at our sole discretion.
            </p>
            <p className="text-gray-700">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;