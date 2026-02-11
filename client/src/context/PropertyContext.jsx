import React, { createContext, useContext, useState, useCallback } from 'react';
import propertyService from '../services/propertyService';
import userService from '../services/userService';
import { getErrorMessage } from '../utils/helpers';

const PropertyContext = createContext(null);

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('usePropertyContext must be used within PropertyProvider');
  }
  return context;
};

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    currentPage: 1,
    count: 0
  });

  // Fetch properties with filters
  const fetchProperties = useCallback(async (customFilters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const appliedFilters = { ...filters, ...customFilters };
      const response = await propertyService.getProperties(appliedFilters);

      setProperties(response.properties || []);
      setPagination({
        total: response.total || 0,
        pages: response.pages || 0,
        currentPage: response.currentPage || 1,
        count: response.count || 0
      });

      return { success: true, data: response };
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch featured properties
  const fetchFeaturedProperties = useCallback(async () => {
    try {
      const response = await propertyService.getFeaturedProperties();
      setFeaturedProperties(response.properties || []);
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      return { success: false, error: errorMessage };
    }
  }, []);

  // Fetch saved properties
  const fetchSavedProperties = useCallback(async () => {
    try {
      const response = await userService.getSavedProperties();
      setSavedProperties(response.properties || []);
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      return { success: false, error: errorMessage };
    }
  }, []);

  // Save property
  const saveProperty = async (propertyId) => {
    try {
      await userService.saveProperty(propertyId);
      
      // Update saved properties list
      await fetchSavedProperties();
      
      return { success: true };
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      return { success: false, error: errorMessage };
    }
  };

  // Unsave property
  const unsaveProperty = async (propertyId) => {
    try {
      await userService.unsaveProperty(propertyId);
      
      // Update saved properties list
      setSavedProperties(prev => prev.filter(prop => prop._id !== propertyId));
      
      return { success: true };
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      return { success: false, error: errorMessage };
    }
  };

  // Check if property is saved
  const isPropertySaved = (propertyId) => {
    return savedProperties.some(prop => prop._id === propertyId);
  };

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({});
  };

  // Reset pagination
  const resetPagination = () => {
    setPagination({
      total: 0,
      pages: 0,
      currentPage: 1,
      count: 0
    });
  };

  // Search properties
  const searchProperties = async (searchTerm) => {
    return fetchProperties({ search: searchTerm, page: 1 });
  };

  // Get property by ID
  const getPropertyById = async (propertyId) => {
    try {
      const response = await propertyService.getProperty(propertyId);
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      return { success: false, error: errorMessage };
    }
  };

  // Create property
  const createProperty = async (propertyData) => {
    try {
      const response = await propertyService.createProperty(propertyData);
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      return { success: false, error: errorMessage };
    }
  };

  // Update property
  const updateProperty = async (propertyId, propertyData) => {
    try {
      const response = await propertyService.updateProperty(propertyId, propertyData);
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      return { success: false, error: errorMessage };
    }
  };

  // Delete property
  const deleteProperty = async (propertyId) => {
    try {
      await propertyService.deleteProperty(propertyId);
      
      // Remove from properties list
      setProperties(prev => prev.filter(prop => prop._id !== propertyId));
      
      return { success: true };
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      return { success: false, error: errorMessage };
    }
  };

  const value = {
    // State
    properties,
    featuredProperties,
    savedProperties,
    filters,
    loading,
    error,
    pagination,
    
    // Property operations
    fetchProperties,
    fetchFeaturedProperties,
    fetchSavedProperties,
    saveProperty,
    unsaveProperty,
    isPropertySaved,
    searchProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
    
    // Filter operations
    updateFilters,
    clearFilters,
    resetPagination
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};

export default PropertyContext;