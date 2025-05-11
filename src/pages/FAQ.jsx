import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How do I place an order?",
      answer: "To place an order, browse our products, select the items you want, add them to your cart, and proceed to checkout. Follow the instructions to provide shipping information and payment details to complete your purchase."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards (Visa, MasterCard), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely through our encrypted payment system."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you will receive a confirmation email with a tracking number. You can use this number on our 'Track Order' page or directly on the courier's website to monitor your package's delivery status."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be in their original condition with tags attached and original packaging. Please visit our Shipping & Returns page for detailed information on the return process."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping times and costs vary depending on the destination. You can see the shipping options available to your location during checkout."
    },
    {
      question: "How long will it take to receive my order?",
      answer: "Domestic orders typically arrive within 3-5 business days. International orders may take 7-14 business days depending on the destination and customs processing. Express shipping options are available at checkout for faster delivery."
    },
    {
      question: "Can I change or cancel my order?",
      answer: "You can modify or cancel your order within 1 hour of placing it by contacting our customer service team. Once an order has been processed or shipped, it cannot be changed or cancelled."
    },
    {
      question: "Do you offer size exchanges?",
      answer: "Yes, we offer size exchanges for clothing and footwear items. Please initiate a return request through your account and select 'Size Exchange' as the reason. The new size will be shipped once we receive the original item."
    },
    {
      question: "How do I contact customer service?",
      answer: "You can reach our customer service team through email at support@francify.com, by phone at +234 123 456 7890, or through the contact form on our Contact Us page. Our team is available Monday through Friday, 9 AM to 6 PM."
    },
    {
      question: "Do you offer discounts or promotional codes?",
      answer: "Yes, we regularly offer promotional discounts and special offers. Subscribe to our newsletter to receive updates on sales and exclusive discount codes. You can also check our social media pages for the latest promotions."
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Frequently Asked Questions</h1>
        
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <span className="font-medium text-lg text-gray-800">{item.question}</span>
                {openIndex === index ? 
                  <FaChevronUp className="text-red-600" /> : 
                  <FaChevronDown className="text-gray-500" />
                }
              </button>
              
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;