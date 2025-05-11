import React from 'react';
import { FaCheckCircle, FaUsers, FaShippingFast, FaHeadset, FaAward } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-24">
      {/* Hero Section */}
      <div className="bg-black text-white p-12 rounded-lg mb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">About Francify</h1>
          <p className="text-xl mb-6">
            Your premier destination for quality products and exceptional shopping experience.
          </p>
          <p className="text-gray-300">
            Founded in 2020, Francify has quickly grown to become one of the leading e-commerce 
            platforms in Nigeria, offering a wide range of products from electronics to fashion, 
            home goods to beauty products.
          </p>
        </div>
      </div>
      
      {/* Our Story */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gray-700 mb-4">
              Francify was born out of a simple idea: to create an online shopping platform that 
              puts customers first. Our founder, recognizing the challenges faced by Nigerian 
              consumers when shopping online, set out to build a solution that would address 
              these pain points.
            </p>
            <p className="text-gray-700 mb-4">
              What started as a small operation with just a handful of products has now grown 
              into a comprehensive marketplace offering thousands of items across multiple categories.
            </p>
            <p className="text-gray-700">
              Throughout our journey, our commitment to quality, authenticity, and customer 
              satisfaction has remained unwavering. We believe in building lasting relationships 
              with our customers based on trust and reliability.
            </p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-700 mb-6">
              To provide Nigerians with access to quality products at competitive prices, 
              delivered with exceptional customer service.
            </p>
            <h3 className="text-xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-700">
              To be the most trusted and preferred online shopping destination in Africa, 
              known for our commitment to quality, authenticity, and customer satisfaction.
            </p>
          </div>
        </div>
      </div>
      
      {/* Why Choose Us */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Why Choose Francify</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheckCircle className="text-red-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">Quality Assurance</h3>
            <p className="text-gray-700">
              All products on our platform undergo rigorous quality checks to ensure they meet our standards.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaShippingFast className="text-red-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
            <p className="text-gray-700">
              We partner with reliable logistics providers to ensure your orders reach you quickly.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHeadset className="text-red-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
            <p className="text-gray-700">
              Our customer service team is available round the clock to assist you with any queries.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaAward className="text-red-600 text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
            <p className="text-gray-700">
              Multiple secure payment options to ensure your financial information is protected.
            </p>
          </div>
        </div>
      </div>
      
      {/* Our Team */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src="me4.JPG" 
              alt="CEO" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">Chidebe Chikamso</h3>
              <p className="text-red-600 mb-3">Founder & CEO</p>
              <p className="text-gray-700">
                With over 15 years of experience in e-commerce and retail, Chikamso leads our company with vision and passion.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="COO" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">Jane Smith</h3>
              <p className="text-red-600 mb-3">Chief Operations Officer</p>
              <p className="text-gray-700">
                Jane oversees our day-to-day operations, ensuring that we deliver on our promises to customers.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="CTO" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">David Johnson</h3>
              <p className="text-red-600 mb-3">Chief Technology Officer</p>
              <p className="text-gray-700">
                David leads our tech team, constantly innovating to improve your shopping experience.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats */}
      <div className="bg-black text-white p-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-4xl font-bold text-red-600 mb-2">500K+</div>
            <p className="text-xl">Happy Customers</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-red-600 mb-2">10K+</div>
            <p className="text-xl">Products</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-red-600 mb-2">50+</div>
            <p className="text-xl">Cities Covered</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
            <p className="text-xl">Customer Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;