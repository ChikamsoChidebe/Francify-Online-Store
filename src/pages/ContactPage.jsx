import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your message! We will get back to you shortly.'
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset form status after 5 seconds
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: false,
        message: ''
      });
    }, 5000);
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
      <p className="text-gray-600 mb-12">We'd love to hear from you. Get in touch with us.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <div className="bg-black text-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-red-600 rounded-full p-2 mr-4">
                  <FaMapMarkerAlt className="text-white" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Our Location</h3>
                  <p className="text-gray-300">
                    123 Commerce Street<br />
                    Lagos, Nigeria
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-red-600 rounded-full p-2 mr-4">
                  <FaPhone className="text-white" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Phone Number</h3>
                  <p className="text-gray-300">
                    <a href="tel:+2349039220171" className="hover:text-red-400 transition-colors">
                      +234 903 922 0171
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-red-600 rounded-full p-2 mr-4">
                  <FaEnvelope className="text-white" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email Address</h3>
                  <p className="text-gray-300">
                    <a href="mailto:support@francify.com" className="hover:text-red-400 transition-colors">
                      support@francify.com
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-red-600 rounded-full p-2 mr-4">
                  <FaClock className="text-white" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Working Hours</h3>
                  <p className="text-gray-300">
                    Monday - Friday: 9am - 5pm<br />
                    Saturday: 10am - 2pm<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-medium mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-white text-black p-2 rounded-full hover:bg-red-600 hover:text-white transition-colors">
                  <FaFacebook />
                </a>
                <a href="#" className="bg-white text-black p-2 rounded-full hover:bg-red-600 hover:text-white transition-colors">
                  <FaTwitter />
                </a>
                <a href="#" className="bg-white text-black p-2 rounded-full hover:bg-red-600 hover:text-white transition-colors">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            
            {formStatus.submitted && (
              <div className={`p-4 mb-6 rounded ${formStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {formStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Map */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Our Location</h2>
        <div className="h-96 bg-gray-200 rounded-lg">
          {/* Replace with actual map component or iframe */}
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500">Map goes here</p>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">How can I track my order?</h3>
            <p className="text-gray-700">
              You can track your order by logging into your account and navigating to the "Orders" section. 
              Alternatively, you can use the tracking number provided in your order confirmation email.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">What is your return policy?</h3>
            <p className="text-gray-700">
              We offer a 30-day return policy for most items. Products must be in their original condition 
              with all tags and packaging intact. Some restrictions apply to certain categories.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">How long does shipping take?</h3>
            <p className="text-gray-700">
              Standard shipping typically takes 3-5 business days within Nigeria. Express shipping options 
              are available at checkout for faster delivery.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">Do you ship internationally?</h3>
            <p className="text-gray-700">
              Yes, we ship to select countries in Africa. International shipping times vary by destination, 
              typically ranging from 7-14 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;