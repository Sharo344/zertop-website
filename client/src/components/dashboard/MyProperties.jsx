import React from 'react';
import Card from '../ui/Card';

const MyProperties = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">My Properties</h1>
        <p className="text-neutral-600">Manage your property listings</p>
      </div>

      <Card>
        <p className="text-center text-neutral-600 py-12">
          Agent properties management coming soon...
        </p>
      </Card>
    </div>
  );
};

export default MyProperties;