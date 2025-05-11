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

  const register = (name, email, password) => {
    // This would normally connect to a backend API
    // For demo purposes, we'll simulate a successful registration
    const user = {
      id: Date.now(),
      name: name,
      email: email,
      avatar: 'https://i.pravatar.cc/150?img=8',
      role: 'user' // default role
    };
    
    setCurrentUser(user);
    localStorage.setItem('francifyUser', JSON.stringify(user));
    return Promise.resolve(user);
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
