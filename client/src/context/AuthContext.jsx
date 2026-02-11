import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { getErrorMessage } from '../utils/helpers';

const AuthContext = createContext(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = authService.getStoredUser();
        const storedToken = authService.getStoredToken();

        if (storedUser && storedToken) {
          setUser(storedUser);
          setToken(storedToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear invalid data
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      setToken(response.token);
      setIsAuthenticated(true);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: getErrorMessage(error) };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      setUser(response.user);
      setToken(response.token);
      setIsAuthenticated(true);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: getErrorMessage(error) };
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  // Update user details
  const updateUserDetails = async (userData) => {
    try {
      const response = await authService.updateDetails(userData);
      setUser(response.user);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: getErrorMessage(error) };
    }
  };

  // Update password
  const updatePassword = async (passwords) => {
    try {
      const response = await authService.updatePassword(passwords);
      setToken(response.token);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: getErrorMessage(error) };
    }
  };

  // Refresh user data
  const refreshUser = async () => {
    try {
      const response = await authService.getCurrentUser();
      setUser(response.user);
      return { success: true, data: response };
    } catch (error) {
      // If refresh fails, logout user
      logout();
      return { success: false, error: getErrorMessage(error) };
    }
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user is agent
  const isAgent = () => {
    return user?.role === 'agent';
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Check if user is client
  const isClient = () => {
    return user?.role === 'client';
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUserDetails,
    updatePassword,
    refreshUser,
    hasRole,
    isAgent,
    isAdmin,
    isClient
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;