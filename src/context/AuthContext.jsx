import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../MyAPI';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage and validate token
    const storedUser = localStorage.getItem('francifyUser');
    const token = localStorage.getItem('francifyToken');

    const isTokenValid = (token) => {
      if (!token) return false;
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        );
        const { exp } = JSON.parse(jsonPayload);
        if (!exp) return false;
        const now = Date.now() / 1000;
        return exp > now;
      } catch (e) {
        return false;
      }
    };

    if (storedUser && token && isTokenValid(token)) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      setCurrentUser(null);
      localStorage.removeItem('francifyUser');
      localStorage.removeItem('francifyToken');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (
      currentUser &&
      currentUser.email &&
      currentUser.email.trim().toLowerCase() === 'chikamsofavoured@gmail.com'
    ) {
      // Force role to Admin for this email
      if (currentUser.role !== 'Admin') {
        const adminUser = { ...currentUser, role: 'Admin' };
        setCurrentUser(adminUser);
        localStorage.setItem('francifyUser', JSON.stringify(adminUser));
      }
    }
  }, [currentUser]);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to login');
      }

      const data = await response.json();

      if (data.user) {
        console.log('Login user object:', data.user); // Debug log
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
      if (error instanceof TypeError) {
        // Network error or server unreachable
        throw new Error('Network error: Unable to reach the server. Please check if the backend server is running.');
      }
      throw error;
    }
  };


  const register = async (name, email, password) => {
    if (!name || !email || !password) {
      throw new Error('All fields are required');
    }

    // Automatically assign 'Admin' role if email matches
    const requestBody = { 
      name, 
      email, 
      password, 
      role: email === "chikamsofavoured@gmail.com" ? "Admin" : undefined 
    };

    try {
      const response = await fetch(`${API}/signup`, {
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

    // New registerAdmin function to create admin user with role
    const registerAdmin = async (name, email, password) => {
      if (!name || !email || !password) {
        throw new Error('All fields are required');
      }

      const requestBody = { name, email, password, role: 'Admin' };

      try {
        const response = await fetch(`${API}/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to register admin');
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
      console.log('updateProfile called with data:', updatedData);
      const token = localStorage.getItem('francifyToken');
      if (!token) throw new Error('Not authenticated');

      // Merge currentUser data with updatedData to avoid overwriting with empty fields
      const mergedData = { ...currentUser, ...updatedData };

      const response = await fetch(`${API}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(mergedData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          window.location.href = '/login';
          throw new Error('Session expired. Please log in again.');
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      // After update, fetch the updated user profile
      const profileResponse = await fetch(`${API}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!profileResponse.ok) {
        throw new Error('Failed to fetch updated profile');
      }

      const profileData = await profileResponse.json();
      console.log('Fetched updated profile data:', profileData);

      if (profileData.user) {
        setCurrentUser(profileData.user);
        localStorage.setItem('francifyUser', JSON.stringify(profileData.user));
      }

      return profileData;
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

  const isAdmin =
    currentUser &&
    (
      currentUser.role === 'Admin' ||
      (currentUser.email && currentUser.email.trim().toLowerCase() === 'chikamsofavoured@gmail.com')
    );

  const fetchAllUsers = async () => {
    const token = localStorage.getItem('francifyToken');
    if (!token) throw new Error('Not authenticated');
    const response = await fetch(`${API}/users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch users');
    }
    const data = await response.json();
    return data.users || [];
  };

  const value = {
    currentUser,
    login,
    register,
    registerAdmin,
    updateProfile,
    uploadProfilePhoto,
    logout,
    isAdmin,
    loading,
    fetchAllUsers 
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
