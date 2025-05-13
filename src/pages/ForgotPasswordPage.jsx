import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the forgot password logic, e.g., API call
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-100 p-6 animate-fadeIn">
      <div className="max-w-md w-full bg-white backdrop-blur-lg rounded-3xl p-10 shadow-xl border border-gray-300 animate-slideUp">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center tracking-wide animate-pulse">
          Forgot Your Password?
        </h2>
        {!submitted ? (
          <>
            <p className="text-gray-700 mb-8 text-center">
              Enter your email address below and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative z-0 w-full group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block py-3 px-0 w-full text-primary-300 bg-transparent border-0 border-b-2 border-primary-600 appearance-none focus:outline-none focus:ring-0 focus:border-primary-400 peer transition duration-300"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute text-primary-500 text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
                >
                  Email address
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-primary-400 via-primary-600 to-accent-900 rounded-xl text-shadow-black font-semibold shadow-lg hover:from-primary-500 hover:via-primary-700 hover:to-accent-900 transition-all duration-300 transform hover:scale-105"
              >
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <div className="text-center text-gray-700 animate-fadeIn">
            <p className="mb-4">If an account with that email exists, a reset link has been sent.</p>
            <Link
              to="/login"
              className="inline-block mt-4 px-6 py-2 bg-primary-600 rounded-lg text-black font-semibold hover:bg-primary-700 transition-colors duration-300"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease forwards;
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default ForgotPasswordPage;
