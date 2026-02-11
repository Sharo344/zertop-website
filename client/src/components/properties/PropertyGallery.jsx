import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { modalBackdrop, modalContent } from '../../utils/animationVariants';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const PropertyGallery = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
        <span className="text-8xl">🏠</span>
      </div>
    );
  }

  const openLightbox = (index) => {
    setSelectedIndex(index);
    setIsLightboxOpen(true);
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-4 gap-2 h-96 md:h-[500px]">
        {/* Main Image */}
        <motion.div
          className="col-span-4 md:col-span-2 row-span-2 relative rounded-xl overflow-hidden cursor-pointer group"
          whileHover={{ scale: 1.02 }}
          onClick={() => openLightbox(0)}
        >
          <img
            src={images[0].url}
            alt="Property"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
            <p className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              View Gallery
            </p>
          </div>
        </motion.div>

        {/* Thumbnail Images */}
        {images.slice(1, 5).map((image, index) => (
          <motion.div
            key={index}
            className="relative rounded-lg overflow-hidden cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            onClick={() => openLightbox(index + 1)}
          >
            <img
              src={image.url}
              alt={`Property ${index + 2}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                <p className="text-white font-bold text-xl">+{images.length - 5}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-90"
              variants={modalBackdrop}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={() => setIsLightboxOpen(false)}
            />

            {/* Content */}
            <motion.div
              className="relative z-10 max-w-6xl w-full"
              variants={modalContent}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-neutral-100 transition-colors z-20"
              >
                <CloseIcon className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="relative">
                <img
                  src={images[selectedIndex].url}
                  alt={`Property ${selectedIndex + 1}`}
                  className="w-full max-h-[80vh] object-contain rounded-lg"
                />

                {/* Navigation Buttons */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-neutral-100 transition-colors"
                    >
                      <ChevronLeftIcon className="w-8 h-8" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-neutral-100 transition-colors"
                    >
                      <ChevronRightIcon className="w-8 h-8" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full">
                  {selectedIndex + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === selectedIndex
                        ? 'border-primary-500 scale-110'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PropertyGallery;