import React from 'react';
import PropertyCard from './PropertyCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import StaggerContainer, { StaggerItem } from '../animations/StaggerContainer';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

const PropertyGrid = ({ properties, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" text="Loading properties..." />
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <HomeWorkIcon className="w-12 h-12 text-neutral-400" />
        </div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-2">No Properties Found</h3>
        <p className="text-neutral-600 mb-6">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  return (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property) => (
        <StaggerItem key={property._id}>
          <PropertyCard property={property} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
};

export default PropertyGrid;