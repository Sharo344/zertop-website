import React, { useEffect } from 'react';
import { usePropertyContext } from '../../context/PropertyContext';
import PropertyGrid from '../properties/PropertyGrid';
import LoadingSpinner from '../ui/LoadingSpinner';

const SavedProperties = () => {
  const { savedProperties, fetchSavedProperties, loading } = usePropertyContext();

  useEffect(() => {
    fetchSavedProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Saved Properties</h1>
        <p className="text-neutral-600">Properties you've saved for later</p>
      </div>

      {loading ? (
        <LoadingSpinner size="lg" text="Loading saved properties..." />
      ) : (
        <PropertyGrid properties={savedProperties} loading={loading} />
      )}
    </div>
  );
};

export default SavedProperties;