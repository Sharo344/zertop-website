import React from 'react';
import { motion } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Pagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange,
  maxVisible = 5
}) => {
  
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous Button */}
      <motion.button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg transition-colors ${
          currentPage === 1
            ? 'text-neutral-400 cursor-not-allowed'
            : 'text-neutral-700 hover:bg-neutral-100'
        }`}
        whileHover={{ scale: currentPage === 1 ? 1 : 1.1 }}
        whileTap={{ scale: currentPage === 1 ? 1 : 0.9 }}
      >
        <ChevronLeftIcon />
      </motion.button>

      {/* First Page */}
      {pages[0] > 1 && (
        <>
          <PageButton page={1} currentPage={currentPage} onPageChange={onPageChange} />
          {pages[0] > 2 && <span className="text-neutral-400">...</span>}
        </>
      )}

      {/* Page Numbers */}
      {pages.map((page) => (
        <PageButton
          key={page}
          page={page}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      ))}

      {/* Last Page */}
      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && (
            <span className="text-neutral-400">...</span>
          )}
          <PageButton
            page={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </>
      )}

      {/* Next Button */}
      <motion.button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg transition-colors ${
          currentPage === totalPages
            ? 'text-neutral-400 cursor-not-allowed'
            : 'text-neutral-700 hover:bg-neutral-100'
        }`}
        whileHover={{ scale: currentPage === totalPages ? 1 : 1.1 }}
        whileTap={{ scale: currentPage === totalPages ? 1 : 0.9 }}
      >
        <ChevronRightIcon />
      </motion.button>
    </div>
  );
};

const PageButton = ({ page, currentPage, onPageChange }) => {
  const isActive = page === currentPage;

  return (
    <motion.button
      onClick={() => onPageChange(page)}
      className={`w-10 h-10 rounded-lg font-semibold transition-all ${
        isActive
          ? 'bg-primary-500 text-white shadow-lg'
          : 'text-neutral-700 hover:bg-neutral-100'
      }`}
      whileHover={{ scale: isActive ? 1 : 1.1 }}
      whileTap={{ scale: isActive ? 1 : 0.9 }}
    >
      {page}
    </motion.button>
  );
};

export default Pagination;