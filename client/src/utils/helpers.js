// Helper functions

export const formatPrice = (price) => {
  if (!price) return '₦0';
  
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatNumber = (num) => {
  if (!num) return '0';
  return new Intl.NumberFormat('en-NG').format(num);
};

export const formatDate = (date) => {
  if (!date) return '';
  
  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

export const formatDateShort = (date) => {
  if (!date) return '';
  
  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

export const formatDateTime = (date) => {
  if (!date) return '';
  
  return new Intl.DateTimeFormat('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const calculatePropertyAge = (yearBuilt) => {
  if (!yearBuilt) return 'Not specified';
  
  const currentYear = new Date().getFullYear();
  const age = currentYear - yearBuilt;
  
  if (age === 0) return 'Brand New';
  if (age === 1) return '1 year old';
  return `${age} years old`;
};

export const generateSlug = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const getPropertyStatusColor = (status) => {
  const colors = {
    'For Sale': 'bg-green-100 text-green-800 border-green-200',
    'For Rent': 'bg-blue-100 text-blue-800 border-blue-200',
    'Sold': 'bg-red-100 text-red-800 border-red-200',
    'Rented': 'bg-purple-100 text-purple-800 border-purple-200',
  };
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const getAppointmentStatusColor = (status) => {
  const colors = {
    'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'confirmed': 'bg-green-100 text-green-800 border-green-200',
    'cancelled': 'bg-red-100 text-red-800 border-red-200',
    'completed': 'bg-blue-100 text-blue-800 border-blue-200',
  };
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return re.test(phone);
};

export const getInitials = (name) => {
  if (!name) return '??';
  
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

export const generateWhatsAppLink = (phone, message = '') => {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  if (error.message) {
    return error.message;
  }
  return 'An error occurred. Please try again.';
};

export const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatPropertyType = (type) => {
  if (!type) return '';
  return type.replace(/([A-Z])/g, ' $1').trim();
};

export const calculateReadTime = (text) => {
  if (!text) return 0;
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

export const getRandomColor = () => {
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export const isImageFile = (file) => {
  const imageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  return imageTypes.includes(file.type);
};

export const getPriceRange = (price) => {
  if (price < 10000000) return 'Under ₦10M';
  if (price < 25000000) return '₦10M - ₦25M';
  if (price < 50000000) return '₦25M - ₦50M';
  if (price < 100000000) return '₦50M - ₦100M';
  if (price < 250000000) return '₦100M - ₦250M';
  return 'Above ₦250M';
};