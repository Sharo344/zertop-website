import React from 'react';
import { formatPrice, formatDate, calculatePropertyAge } from '../../utils/helpers';
import Badge from '../ui/Badge';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PropertyDetail = ({ property }) => {
  const getStatusVariant = (status) => {
    switch (status) {
      case 'For Sale':
        return 'success';
      case 'For Rent':
        return 'info';
      case 'Sold':
        return 'danger';
      case 'Rented':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Badge variant={getStatusVariant(property.status)} size="lg">
            {property.status}
          </Badge>
          {property.featured && (
            <Badge variant="warning" size="lg">
              ⭐ Featured
            </Badge>
          )}
          <Badge variant="neutral" size="lg">
            {property.type}
          </Badge>
        </div>

        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          {property.title}
        </h1>

        <p className="text-5xl font-bold text-primary-500 mb-4">
          {formatPrice(property.price)}
          {property.status === 'For Rent' && (
            <span className="text-lg text-neutral-500 ml-2">/ year</span>
          )}
        </p>

        <p className="text-neutral-600 flex items-center gap-2">
          <HomeIcon className="w-5 h-5" />
          {property.location.address}, {property.location.area}, {property.location.city}, {property.location.state}
        </p>
      </div>

      {/* Key Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-neutral-50 rounded-xl">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-2">
            <BedIcon className="w-6 h-6 text-primary-500" />
          </div>
          <p className="text-2xl font-bold text-neutral-900">{property.details.bedrooms}</p>
          <p className="text-sm text-neutral-600">Bedrooms</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-2">
            <BathtubIcon className="w-6 h-6 text-primary-500" />
          </div>
          <p className="text-2xl font-bold text-neutral-900">{property.details.bathrooms}</p>
          <p className="text-sm text-neutral-600">Bathrooms</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-2">
            <SquareFootIcon className="w-6 h-6 text-primary-500" />
          </div>
          <p className="text-2xl font-bold text-neutral-900">{property.details.size}</p>
          <p className="text-sm text-neutral-600">Sq Meters</p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-2">
            <DirectionsCarIcon className="w-6 h-6 text-primary-500" />
          </div>
          <p className="text-2xl font-bold text-neutral-900">{property.details.parkingSpaces}</p>
          <p className="text-sm text-neutral-600">Parking</p>
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Description</h2>
        <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
          {property.description}
        </p>
      </div>

      {/* Features & Amenities */}
      {property.features && property.features.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Features & Amenities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {property.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-neutral-700">
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Property Information */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Property Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-between py-3 border-b border-neutral-200">
            <span className="text-neutral-600">Property Type</span>
            <span className="font-semibold text-neutral-900">{property.type}</span>
          </div>

          <div className="flex justify-between py-3 border-b border-neutral-200">
            <span className="text-neutral-600">Status</span>
            <span className="font-semibold text-neutral-900">{property.status}</span>
          </div>

          {property.details.yearBuilt && (
            <div className="flex justify-between py-3 border-b border-neutral-200">
              <span className="text-neutral-600">Year Built</span>
              <span className="font-semibold text-neutral-900">
                {property.details.yearBuilt} ({calculatePropertyAge(property.details.yearBuilt)})
              </span>
            </div>
          )}

          {property.details.toilets && (
            <div className="flex justify-between py-3 border-b border-neutral-200">
              <span className="text-neutral-600">Toilets</span>
              <span className="font-semibold text-neutral-900">{property.details.toilets}</span>
            </div>
          )}

          <div className="flex justify-between py-3 border-b border-neutral-200">
            <span className="text-neutral-600">Listed On</span>
            <span className="font-semibold text-neutral-900">{formatDate(property.createdAt)}</span>
          </div>

          <div className="flex justify-between py-3 border-b border-neutral-200">
            <span className="text-neutral-600">Views</span>
            <span className="font-semibold text-neutral-900">{property.views || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;