// Filter options for property search

export const priceRanges = [
  { label: 'Under ₦10M', min: 0, max: 10000000, value: 'under-10m' },
  { label: '₦10M - ₦25M', min: 10000000, max: 25000000, value: '10m-25m' },
  { label: '₦25M - ₦50M', min: 25000000, max: 50000000, value: '25m-50m' },
  { label: '₦50M - ₦100M', min: 50000000, max: 100000000, value: '50m-100m' },
  { label: '₦100M - ₦250M', min: 100000000, max: 250000000, value: '100m-250m' },
  { label: 'Above ₦250M', min: 250000000, max: Infinity, value: 'above-250m' }
];

export const bedroomOptions = [
  { value: 1, label: '1 Bedroom' },
  { value: 2, label: '2 Bedrooms' },
  { value: 3, label: '3 Bedrooms' },
  { value: 4, label: '4 Bedrooms' },
  { value: 5, label: '5+ Bedrooms' }
];

export const bathroomOptions = [
  { value: 1, label: '1 Bathroom' },
  { value: 2, label: '2 Bathrooms' },
  { value: 3, label: '3 Bathrooms' },
  { value: 4, label: '4 Bathrooms' },
  { value: 5, label: '5+ Bathrooms' }
];

export const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' }
];

export const propertySizeRanges = [
  { label: 'Under 100 sqm', min: 0, max: 100, value: 'under-100' },
  { label: '100 - 200 sqm', min: 100, max: 200, value: '100-200' },
  { label: '200 - 350 sqm', min: 200, max: 350, value: '200-350' },
  { label: '350 - 500 sqm', min: 350, max: 500, value: '350-500' },
  { label: 'Above 500 sqm', min: 500, max: Infinity, value: 'above-500' }
];

export const amenitiesOptions = [
  { value: 'Swimming Pool', label: 'Swimming Pool', icon: '🏊' },
  { value: 'Gym', label: 'Gym', icon: '💪' },
  { value: 'Parking', label: 'Parking', icon: '🚗' },
  { value: 'Security', label: 'Security', icon: '🔒' },
  { value: '24/7 Power', label: '24/7 Power', icon: '⚡' },
  { value: 'Garden', label: 'Garden', icon: '🌳' },
  { value: 'Balcony', label: 'Balcony', icon: '🏞️' },
  { value: 'Elevator', label: 'Elevator', icon: '🛗' },
  { value: 'Air Conditioning', label: 'Air Conditioning', icon: '❄️' },
  { value: 'Furnished', label: 'Furnished', icon: '🛋️' },
  { value: 'Pet Friendly', label: 'Pet Friendly', icon: '🐕' },
  { value: 'Playground', label: 'Playground', icon: '🎪' },
  { value: 'WiFi', label: 'WiFi', icon: '📶' },
  { value: 'CCTV', label: 'CCTV', icon: '📹' }
];

export const yearBuiltRanges = [
  { label: 'Brand New (2024-2025)', min: 2024, max: 2025, value: 'brand-new' },
  { label: 'Very Recent (2020-2023)', min: 2020, max: 2023, value: 'very-recent' },
  { label: 'Recent (2015-2019)', min: 2015, max: 2019, value: 'recent' },
  { label: 'Older (Before 2015)', min: 1900, max: 2014, value: 'older' }
];