import React, { useState, useEffect } from 'react';
import { FaQuestionCircle, FaHeadset, FaBook, FaComments, FaEnvelope } from 'react-icons/fa';
import '../styles/livechat.css'; // Import your CSS styles for the HelpPage

const HelpPage = () => {
    const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { from: 'user', text: input }]);
    setInput('');
    // Simulate bot response
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { from: 'bot', text: 'Thank you for your message. We will get back to you shortly.' },
      ]);
    }, 1000);
  };


  // FAQ data
  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by clicking on 'Track Order' in the top navigation bar and entering your order number and email address. Alternatively, you can find tracking information in your order confirmation email or in your account under 'Order History'."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be in their original condition with tags attached and original packaging. Some items like intimate apparel, personalized products, and sale items may have different return policies."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the continental US. Express shipping (1-2 business days) and Next Day delivery options are also available at checkout for an additional fee. International shipping times vary by destination."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping costs and delivery times vary depending on the destination. Import duties and taxes may apply and are the responsibility of the customer."
    },
    {
      question: "How can I change or cancel my order?",
      answer: "You can request changes or cancellation within 1 hour of placing your order by contacting our customer service team. Once an order has begun processing, we cannot guarantee that changes or cancellations can be accommodated."
    },
    {
      question: "Are my payment details secure?",
      answer: "Yes, we use industry-standard encryption and security protocols to protect your payment information. We are PCI compliant and never store your full credit card details on our servers."
    }
  ];

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { from: 'user', text: input }]);
    setInput('');
    // For now, just echo the user message as bot response after a delay
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: "Thank you for your message. We'll get back to you shortly." }]);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Help & FAQs</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to frequently asked questions and get the support you need.
          </p>
        </div>

        {/* Help Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHeadset className="text-red-600 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Customer Support</h3>
            <p className="text-gray-600 mb-4">Available 24/7 to assist you with any questions or concerns.</p>
            <a href="tel:+12345678900" className="text-red-600 font-medium hover:text-red-700">
              Call Us
            </a>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaComments className="text-red-600 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Chat with our support team for immediate assistance.</p>
            <button 
              onClick={toggleChat} 
              className="text-red-600 font-medium hover:text-red-700">
              Start Chat
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEnvelope className="text-red-600 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Email Support</h3>
            <p className="text-gray-600 mb-4">Send us an email and we'll get back to you within 24 hours.</p>
            <a href="mailto:support@francify.com" className="text-red-600 font-medium hover:text-red-700">
              Email Us
            </a>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer">
                    <h3 className="text-lg font-medium">{faq.question}</h3>
                    <span className="text-red-600 group-open:rotate-180 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 pt-0 border-t border-gray-200">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>

        {/* Help Topics */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Help Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Shipping & Delivery", icon: <FaBook /> },
              { title: "Returns & Refunds", icon: <FaBook /> },
              { title: "Payment Methods", icon: <FaBook /> },
              { title: "Account Management", icon: <FaBook /> },
              { title: "Product Information", icon: <FaBook /> },
              { title: "Gift Cards", icon: <FaBook /> }
            ].map((topic, index) => (
              <a 
                key={index} 
                href="#" 
                className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-red-600 mr-3">{topic.icon}</span>
                <span className="font-medium">{topic.title}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Still Have Questions?</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Your email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Subject of your inquiry"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
              >
                Submit Inquiry
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Live Chat Widget */}
      
      {/* Chat widget */}
      <div className="chat-widget">
        {!chatOpen && (
          <button className="start-chat-btn" onClick={toggleChat}>
            Start Chat
          </button>
        )}
        {chatOpen && (
          <div className="chat-window">
            <div className="chat-header">
              <span>Live Chat</span>
              <button onClick={toggleChat} className="close-chat-btn">X</button>
            </div>
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message ${msg.from === 'user' ? 'user-message' : 'bot-message'}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="chat-input-area">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpPage;
