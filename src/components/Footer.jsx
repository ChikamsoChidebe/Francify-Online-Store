import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCreditCard, FaPaypal, FaApplePay, FaGooglePay, FaCcVisa, FaCcMastercard } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="bg-gray-900 rounded-lg p-8 mb-12 border-l-4 border-red-600">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Get Our Daily Updates</h3>
              <p className="text-gray-300">Get the latest updates on new products and special sales</p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow bg-gray-800 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-red-600">About Francify</h3>
            <p className="text-gray-300 mb-4">
              Francify is your premier destination for the latest fashion trends, electronics, home goods, and more. 
              We offer quality products at competitive prices with exceptional customer service.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-600 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-600 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-600 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-600 transition-colors">
                <FaPinterest size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-600 transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-red-600">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-red-600 transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-red-600 transition-colors">Shop</Link></li>
              <li><Link to="/categories" className="text-gray-300 hover:text-red-600 transition-colors">Categories</Link></li>
              <li><Link to="/sale" className="text-gray-300 hover:text-red-600 transition-colors">Flash Sales</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-red-600 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-red-600 transition-colors">Contact Us</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-red-600 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-red-600">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-300 hover:text-red-600 transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="text-gray-300 hover:text-red-600 transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-red-600 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-red-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/track-order" className="text-gray-300 hover:text-red-600 transition-colors">Track Order</Link></li>
              <li><Link to="/warranty" className="text-gray-300 hover:text-red-600 transition-colors">Warranty & Support</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-red-600">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-red-600 mt-1 mr-3" />
                <span className="text-gray-300">
                  123 Commerce Street<br />
                  Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-red-600 mr-3" />
                <a href="tel:+2349039220171" className="text-gray-300 hover:text-red-600 transition-colors">
                  +234 903 922 0171
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-red-600 mr-3" />
                <a href="mailto:support@francify.com" className="text-gray-300 hover:text-red-600 transition-colors">
                  support@francify.com
                </a>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-white font-medium mb-2">Download Our App</h4>
              <div className="flex space-x-2">
                <a href="#" className="bg-gray-800 hover:bg-red-600 text-white px-3 py-2 rounded flex items-center transition-colors duration-300">
                  <FaApplePay className="mr-2" /> App Store
                </a>
                <a href="#" className="bg-gray-800 hover:bg-red-600 text-white px-3 py-2 rounded flex items-center transition-colors duration-300">
                  <FaGooglePay className="mr-2" /> Play Store
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <FaCreditCard className="text-gray-300 hover:text-red-600 text-2xl transition-colors" />
            <FaPaypal className="text-gray-300 hover:text-red-600 text-2xl transition-colors" />
            <FaCcVisa className="text-gray-300 hover:text-red-600 text-2xl transition-colors" />
            <FaCcMastercard className="text-gray-300 hover:text-red-600 text-2xl transition-colors" />
            <FaApplePay className="text-gray-300 hover:text-red-600 text-2xl transition-colors" />
            <FaGooglePay className="text-gray-300 hover:text-red-600 text-2xl transition-colors" />
          </div>
          
          <p className="text-center text-gray-400">
            &copy; {currentYear} <span className="text-red-600">Francify</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;