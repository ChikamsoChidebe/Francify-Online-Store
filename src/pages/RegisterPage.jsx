import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import API from '../MyAPI';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    // confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, registerAdmin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password ) {
      setError('All fields are required');
      return false;
    }

    // if (formData.password !== formData.confirmPassword) {
    //   setError('Passwords do not match');
    //   return false;
    // }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      let data;
      if (formData.email === 'chikamsofavoured@gmail.com') {
        data = await registerAdmin(formData.name, formData.email, formData.password);
      } else {
        data = await register(formData.name, formData.email, formData.password);
      }

      setError('');
      console.log(data);

      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create an account');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-lg backdrop-blur-md border border-gray-300">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2 animate-slideDown">Create your account</h2>
          <p className="mt-2 text-sm text-gray-700">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-secondary-600 hover:text-secondary-500 transition-colors duration-300">
              Sign in
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-secondary-800 border-l-4 border-secondary-500 p-4 mb-4 animate-shake">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-secondary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-secondary-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="rounded-md shadow-sm -space-y-px">
            {['name', 'email', 'password', 'confirmPassword'].map((field) => {
              const isPassword = field === 'password' || field === 'confirmPassword';
              const placeholderMap = {
                name: 'Full name',
                email: 'Email address',
                password: 'Password',
                confirmPassword: 'Confirm password'
              };
              return (
                <div key={field} className="relative z-0 w-full mb-6 group">
                  <input
                    type={isPassword ? 'password' : field === 'email' ? 'email' : 'text'}
                    name={field}
                    id={field}
                    autoComplete={field === 'email' ? 'email' : isPassword ? 'new-password' : 'name'}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="block py-2.5 px-0 w-full text-primary-300 bg-transparent border-0 border-b-2 border-primary-600 appearance-none focus:outline-none focus:ring-0 focus:border-primary-400 peer transition duration-300"
                    placeholder=" "
                  />
                  <label
                    htmlFor={field}
                    className="absolute text-primary-500 text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75"
                  >
                    {placeholderMap[field]}
                  </label>
                </div>
              );
            })}
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary-500 focus:ring-primary-400 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-primary-300 select-none">
              I agree to the{' '}
              <Link to="/terms" className="font-medium text-primary-500 hover:text-primary-400 transition-colors duration-300">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="font-medium text-primary-500 hover:text-primary-400 transition-colors duration-300">
                Privacy Policy
              </Link>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-sm font-semibold rounded-md text-black bg-gradient-to-r from-primary-400 via-primary-600 to-accent-900 hover:from-primary-500 hover:via-primary-700 hover:to-accent-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-all duration-300 shadow-lg"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-primary-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button
              className="w-full inline-flex justify-center py-2 px-4 border border-primary-600 rounded-md shadow-sm bg-white text-primary-600 hover:bg-primary-50 transition-colors duration-300"
              aria-label="Continue with Google"
            >
              <FaGoogle className="text-primary-400" />
            </button>
            <button
              className="w-full inline-flex justify-center py-2 px-4 border border-primary-600 rounded-md shadow-sm bg-white text-primary-600 hover:bg-primary-50 transition-colors duration-300"
              aria-label="Continue with Facebook"
            >
              <FaFacebook className="text-primary-600" />
            </button>
            <button
              className="w-full inline-flex justify-center py-2 px-4 border border-primary-600 rounded-md shadow-sm bg-white text-primary-600 hover:bg-primary-50 transition-colors duration-300"
              aria-label="Continue with Apple"
            >
              <FaApple className="text-primary-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
