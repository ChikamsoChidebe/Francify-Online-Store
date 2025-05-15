import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('francifyUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // This would normally connect to a backend API
    // For demo purposes, we'll simulate a successful login
    // Add role property to user object for role-based access
    const user = {
      id: 1,
      name: 'Demo User',
      email: email,
      avatar: 'https://i.pravatar.cc/150?img=3',
      role: email === 'chikamsochidebe@gmail.com' ? 'admin' : 'user' // simple role assignment
    };
    
    setCurrentUser(user);
    localStorage.setItem('francifyUser', JSON.stringify(user));
    return Promise.resolve(user);
  };

  const register = async (name, email, password) => {
    console.log('AuthContext register called with:', { name, email, password });
    // Validate inputs before sending request
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }

    const requestBody = { name, email, password };
    console.log('Register request body:', requestBody);

    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Register response status:', response.status);
      const responseText = await response.text();
      console.log('Register response text:', responseText);

      if (!response.ok) {
        let errorMessage = 'Failed to register';
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          // ignore JSON parse error
        }
        throw new Error(errorMessage);
      }

      const data = JSON.parse(responseText);
      console.log(data);

      // Set user after registration if API returns user data
      if (data.user) {
        setCurrentUser(data.user);
        localStorage.setItem('francifyUser', JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('francifyUser');
  };

  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    isAdmin,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
