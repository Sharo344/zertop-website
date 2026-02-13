import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { usePropertyContext } from "../../context/PropertyContext";
import PropertyCard from "../properties/PropertyCard";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";
import LoadingSpinner from "../ui/LoadingSpinner";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const FeaturedProperties = () => {
  const { featuredProperties, fetchFeaturedProperties, loading } = usePropertyContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, featuredProperties.length - itemsPerView);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      if (newDirection === 1) {
        return prev < maxIndex ? prev + 1 : prev;
      } else {
        return prev > 0 ? prev - 1 : 0;
      }
    });
  };

  const visibleProperties = featuredProperties.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Discover our most premium listings handpicked just for you
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-24">
            <LoadingSpinner size="lg" text="Loading featured properties..." />
          </div>
        ) : featuredProperties.length > 0 ? (
          <>
            {/* Carousel Container */}
            <div className="relative mb-12">
              {/* Properties Grid with Animation */}
              <div className="relative overflow-hidden">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                  >
                    {visibleProperties.map((property, index) => (
                      <motion.div
                        key={property._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <PropertyCard property={property} />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              {featuredProperties.length > itemsPerView && (
                <div className="flex items-center justify-center gap-4 mt-10">
                  <button
                    onClick={() => paginate(-1)}
                    disabled={currentIndex === 0}
                    className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 group"
                    aria-label="Previous properties"
                  >
                    <ChevronLeftIcon className="w-6 h-6 text-slate-700 group-hover:text-orange-600 transition-colors" />
                  </button>

                  {/* Indicator Dots */}
                  <div className="flex gap-2">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => {
                          setDirection(index > currentIndex ? 1 : -1);
                          setCurrentIndex(index);
                        }}
                        className={`rounded-full transition-all ${
                          index === currentIndex
                            ? 'bg-orange-600 w-3 h-3'
                            : 'bg-slate-300 w-2 h-2 hover:bg-slate-400'
                        }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={`Go to property group ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => paginate(1)}
                    disabled={currentIndex === maxIndex}
                    className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 group"
                    aria-label="Next properties"
                  >
                    <ChevronRightIcon className="w-6 h-6 text-slate-700 group-hover:text-orange-600 transition-colors" />
                  </button>
                </div>
              )}

              {/* Property Counter */}
              <div className="text-center mt-6 text-sm text-slate-600">
                Showing {currentIndex + 1}–{Math.min(currentIndex + itemsPerView, featuredProperties.length)} of {featuredProperties.length} properties
              </div>
            </div>

            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link to="/properties">
                <Button variant="primary" size="lg" icon className="bg-orange-600">
                  Explore All Properties
                </Button>
              </Link>
            </motion.div>
          </>
        ) : (
          <div className="text-center py-24">
            <p className="text-slate-600 text-lg mb-8">
              No featured properties available at the moment.
            </p>
            <Link to="/properties" className="inline-block">
              <Button variant="primary" size="lg" className="bg-orange-600 hover:bg-orange-700" icon>
                Browse All Properties
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;