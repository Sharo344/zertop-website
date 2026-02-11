import { useState, useEffect } from 'react';
import propertyService from '../services/propertyService';
import { getErrorMessage } from '../utils/helpers';

const useProperties = (filters = {}, autoFetch = true) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    currentPage: 1,
    count: 0
  });

  const fetchProperties = async (customFilters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await propertyService.getProperties({
        ...filters,
        ...customFilters
      });

      setProperties(response.properties || []);
      setPagination({
        total: response.total || 0,
        pages: response.pages || 0,
        currentPage: response.currentPage || 1,
        count: response.count || 0
      });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchProperties();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetch]);

  const refetch = (customFilters = {}) => {
    fetchProperties(customFilters);
  };

  return {
    properties,
    loading,
    error,
    pagination,
    refetch
  };
};

export default useProperties;