import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaApple, FaGooglePlay, FaTimes, FaMobileAlt, FaQrcode } from 'react-icons/fa';

const MobileAppBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showQRCode, setShowQRCode] = useState(false);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="bg-gradient-to-r from-red-600 to-red-800 text-white py-2 px-4"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <FaMobileAlt className="mr-2 text-white" size={18} />
              <span className="text-sm mr-2">Get the best experience with our mobile app</span>
              <div className="hidden sm:flex space-x-2">
                <motion.a 
                  href="#" 
                  className="bg-white text-black text-xs px-3 py-1 rounded-full flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaApple className="mr-1" /> App Store
                </motion.a>
                <motion.a 
                  href="#" 
                  className="bg-white text-black text-xs px-3 py-1 rounded-full flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGooglePlay className="mr-1" /> Play Store
                </motion.a>
                <motion.button
                  className="bg-white/20 text-white text-xs px-3 py-1 rounded-full flex items-center"
                  onClick={() => setShowQRCode(!showQRCode)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaQrcode className="mr-1" /> Scan QR
                </motion.button>
              </div>
            </div>
            <motion.button 
              onClick={() => setIsVisible(false)}
              className="text-white hover:text-gray-300"
              aria-label="Close banner"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes />
            </motion.button>
          </div>
          
          <AnimatePresence>
            {showQRCode && (
              <motion.div 
                className="absolute right-10 top-10 bg-white p-4 rounded-lg shadow-lg z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-200 mx-auto mb-2 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">QR Code</span>
                  </div>
                  <p className="text-gray-800 text-sm font-medium">Scan to download</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileAppBanner;