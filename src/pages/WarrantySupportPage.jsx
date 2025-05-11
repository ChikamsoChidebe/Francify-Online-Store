import React from 'react';

const WarrantySupportPage = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold text-center mb-8 animate-fadeInDown">
        Warranty & Support
      </h1>
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 animate-fadeIn">
        At Francify, we are committed to providing you with the best warranty and support services to ensure your satisfaction and peace of mind.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Warranty Section */}
        <section className="bg-white p-8 rounded-lg shadow-lg animate-slideInLeft">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Warranty Coverage</h2>
          <p className="text-gray-700 mb-4">
            We offer a comprehensive warranty on all our products covering manufacturing defects and performance issues for up to 12 months from the date of purchase.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Free repairs or replacements for covered defects</li>
            <li>Easy warranty claim process</li>
            <li>Dedicated warranty support team</li>
          </ul>
        </section>

        {/* Support Section */}
        <section className="bg-white p-8 rounded-lg shadow-lg animate-slideInRight">
          <h2 className="text-2xl font-bold mb-4 text-red-600">Customer Support</h2>
          <p className="text-gray-700 mb-4">
            Our support team is available to assist you with any questions or issues you may have. We provide multiple channels to reach us quickly and efficiently.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>24/7 online chat support</li>
            <li>Phone and email support</li>
            <li>Comprehensive FAQ and help center</li>
          </ul>
        </section>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center animate-fadeInUp">
        <h3 className="text-xl font-semibold mb-4">Need Assistance?</h3>
        <p className="text-gray-700 mb-6">
          Contact our support team anytime for help with your warranty or product questions.
        </p>
        <a
          href="/contact"
          className="inline-block bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default WarrantySupportPage;
