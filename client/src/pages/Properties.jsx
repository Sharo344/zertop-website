import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePropertyContext } from '../context/PropertyContext';
import PropertyFilters from '../components/properties/PropertyFilters';
import PropertyGrid from '../components/properties/PropertyGrid';
import Pagination from '../components/ui/Pagination';

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { properties, loading, pagination, fetchProperties } = usePropertyContext();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    // Parse URL params into filters
    const urlFilters = {};
    for (let [key, value] of searchParams.entries()) {
      urlFilters[key] = value;
    }
    setFilters(urlFilters);
    fetchProperties(urlFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleFilterChange = (newFilters) => {
    const params = new URLSearchParams(newFilters);
    setSearchParams(params);
  };

  const handleSearch = (searchTerm) => {
    const newFilters = { ...filters, search: searchTerm, page: 1 };
    const params = new URLSearchParams(newFilters);
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    const newFilters = { ...filters, page };
    const params = new URLSearchParams(newFilters);
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Browse Properties
          </h1>
          <p className="text-xl text-neutral-600">
            Find your perfect home from our extensive collection
          </p>
        </div>

        {/* Filters */}
        <PropertyFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />

        {/* Results */}
        <div className="mb-8">
          <p className="text-neutral-600">
            {loading ? (
              'Loading...'
            ) : (
              <>
                Showing <span className="font-semibold">{properties.length}</span> of{' '}
                <span className="font-semibold">{pagination.total}</span> properties
              </>
            )}
          </p>
        </div>

        {/* Property Grid */}
        <PropertyGrid properties={properties} loading={loading} />

        {/* Pagination */}
        {!loading && pagination.pages > 1 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.pages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Properties;