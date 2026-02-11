import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Input from '../ui/Input';
import { PROPERTY_TYPES, PROPERTY_STATUS, CITIES } from '../../utils/constants';
import { bedroomOptions, bathroomOptions, sortOptions } from '../../../data/filterOptions';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

const PropertyFilters = ({ filters, onFilterChange, onSearch }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters || {});
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (name, value) => {
    const newFilters = {
      ...localFilters,
      [name]: value
    };
    setLocalFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = {};
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const activeFilterCount = Object.values(localFilters).filter(v => v).length;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Search properties by title, location, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<SearchIcon />}
            iconPosition="left"
            className="flex-1"
          />
          <Button type="submit" variant="primary" size="md">
            Search
          </Button>
        </div>
      </form>

      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="md"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FilterListIcon className="w-5 h-5 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 px-2 py-1 bg-primary-500 text-white text-xs rounded-full">
              {activeFilterCount}
            </span>
          )}
        </Button>

        {activeFilterCount > 0 && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-neutral-600 hover:text-primary-500 font-semibold"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Expandable Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-neutral-200">
              {/* Property Type */}
              <Select
                label="Property Type"
                options={[
                  { value: '', label: 'All Types' },
                  ...PROPERTY_TYPES.map(type => ({ value: type, label: type }))
                ]}
                value={localFilters.type || ''}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              />

              {/* Status */}
              <Select
                label="Status"
                options={[
                  { value: '', label: 'All Status' },
                  ...PROPERTY_STATUS.map(status => ({ value: status, label: status }))
                ]}
                value={localFilters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              />

              {/* City */}
              <Select
                label="City"
                options={[
                  { value: '', label: 'All Cities' },
                  ...CITIES.map(city => ({ value: city.value, label: city.label }))
                ]}
                value={localFilters.city || ''}
                onChange={(e) => handleFilterChange('city', e.target.value)}
              />

              {/* Bedrooms */}
              <Select
                label="Bedrooms"
                options={[
                  { value: '', label: 'Any' },
                  ...bedroomOptions
                ]}
                value={localFilters.bedrooms || ''}
                onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
              />

              {/* Bathrooms */}
              <Select
                label="Bathrooms"
                options={[
                  { value: '', label: 'Any' },
                  ...bathroomOptions
                ]}
                value={localFilters.bathrooms || ''}
                onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
              />

              {/* Min Price */}
              <Input
                type="number"
                label="Min Price (₦)"
                placeholder="0"
                value={localFilters.minPrice || ''}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              />

              {/* Max Price */}
              <Input
                type="number"
                label="Max Price (₦)"
                placeholder="Any"
                value={localFilters.maxPrice || ''}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              />

              {/* Sort By */}
              <Select
                label="Sort By"
                options={sortOptions}
                value={localFilters.sort || 'newest'}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
              />
            </div>

            {/* Apply Button */}
            <div className="flex gap-3 mt-6">
              <Button
                variant="primary"
                size="md"
                onClick={handleApplyFilters}
                fullWidth
              >
                Apply Filters
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => setShowFilters(false)}
              >
                <CloseIcon className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertyFilters;