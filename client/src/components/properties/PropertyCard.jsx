import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../context/AuthContext';
import { usePropertyContext } from '../../context/PropertyContext';
import { formatPrice } from '../../utils/helpers';
import { cardHover } from '../../utils/animationVariants';
import Badge from '../ui/Badge';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const PropertyCard = ({ property }) => {
  const { isAuthenticated } = useAuthContext();
  const { saveProperty, unsaveProperty, isPropertySaved } = usePropertyContext();
  const [isSaving, setIsSaving] = useState(false);

  const isSaved = isPropertySaved(property._id);
  const primaryImage = property.images?.find(img => img.isPrimary) || property.images?.[0];

  const handleSaveToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.info('Please login to save properties');
      return;
    }

    setIsSaving(true);

    const result = isSaved
      ? await unsaveProperty(property._id)
      : await saveProperty(property._id);

    if (result.success) {
      toast.success(isSaved ? 'Property removed from saved' : 'Property saved successfully!');
    } else {
      toast.error(result.error || 'Failed to update saved properties');
    }

    setIsSaving(false);
  };

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
    <motion.div
      whileHover="hover"
      initial="initial"
      className="group"
    >
      <Link to={`/properties/${property._id}`}>
        <motion.div
          variants={{ hover: cardHover }}
          className="bg-white rounded-xl overflow-hidden shadow-md transition-shadow duration-300"
        >
          {/* Image */}
          <div className="relative h-64 overflow-hidden">
            {primaryImage ? (
              <img
                src={primaryImage.url}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                <span className="text-6xl">🏠</span>
              </div>
            )}

            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <Badge variant={getStatusVariant(property.status)} size="md">
                {property.status}
              </Badge>
            </div>

            {/* Save Button */}
            <motion.button
              onClick={handleSaveToggle}
              disabled={isSaving}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-neutral-50 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isSaved ? (
                <FavoriteIcon className="w-6 h-6 text-red-500" />
              ) : (
                <FavoriteBorderIcon className="w-6 h-6 text-neutral-600" />
              )}
            </motion.button>

            {/* Featured Badge */}
            {property.featured && (
              <div className="absolute bottom-4 left-4">
                <Badge variant="warning" size="sm">
                  ⭐ Featured
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Price */}
            <div className="mb-3">
              <p className="text-3xl font-bold text-primary-500">
                {formatPrice(property.price)}
              </p>
              {property.status === 'For Rent' && (
                <p className="text-sm text-neutral-500">per annum</p>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
              {property.title}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-2 text-neutral-600 mb-4">
              <LocationOnIcon className="w-5 h-5" />
              <p className="text-sm">
                {property.location.area}, {property.location.city}
              </p>
            </div>

            {/* Property Details */}
            <div className="flex items-center gap-4 pt-4 border-t border-neutral-200">
              <div className="flex items-center gap-1 text-neutral-600">
                <BedIcon className="w-5 h-5" />
                <span className="text-sm font-semibold">{property.details.bedrooms}</span>
              </div>
              <div className="flex items-center gap-1 text-neutral-600">
                <BathtubIcon className="w-5 h-5" />
                <span className="text-sm font-semibold">{property.details.bathrooms}</span>
              </div>
              <div className="flex items-center gap-1 text-neutral-600">
                <SquareFootIcon className="w-5 h-5" />
                <span className="text-sm font-semibold">{property.details.size} sqm</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;