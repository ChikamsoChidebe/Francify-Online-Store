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

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to login');
      }

      const data = await response.json();

      if (data.user) {
        setCurrentUser(data.user);
        localStorage.setItem('francifyUser', JSON.stringify(data.user));
        localStorage.setItem('francifyToken', data.token);
      } else {
        setCurrentUser(null);
        localStorage.removeItem('francifyUser');
        localStorage.removeItem('francifyToken');
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (name, email, password) => {
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }

    const requestBody = { name, email, password };

    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register');
      }

      const data = await response.json();

      if (data.user) {
        setCurrentUser(data.user);
        localStorage.setItem('francifyUser', JSON.stringify(data.user));
        localStorage.setItem('francifyToken', data.token);
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (updatedData) => {
    try {
      const token = localStorage.getItem('francifyToken');
      if (!token) throw new Error('Not authenticated');

      const response = await fetch('http://localhost:4000/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const data = await response.json();

      if (data.user) {
        setCurrentUser(data.user);
        localStorage.setItem('francifyUser', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  const uploadProfilePhoto = async (file) => {
    try {
      const token = localStorage.getItem('francifyToken');
      if (!token) throw new Error('Not authenticated');

      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch('http://localhost:4000/profile/avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to upload profile photo');
      }

      const data = await response.json();

      if (data.user) {
        setCurrentUser(data.user);
        localStorage.setItem('francifyUser', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('francifyUser');
    localStorage.removeItem('francifyToken');
  };

  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };

  const value = {
    currentUser,
    login,
    register,
    updateProfile,
    uploadProfilePhoto,
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
