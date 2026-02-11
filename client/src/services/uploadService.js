import api from './api';

const uploadService = {
  // Upload property images
  uploadPropertyImages: async (files) => {
    const formData = new FormData();
    
    // Append multiple files
    Array.from(files).forEach(file => {
      formData.append('images', file);
    });

    const response = await api.post('/upload/property', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  // Upload single property image
  uploadPropertyImage: async (file) => {
    const formData = new FormData();
    formData.append('images', file);

    const response = await api.post('/upload/property', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  // Upload user avatar
  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await api.post('/upload/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  // Delete image from Cloudinary
  deleteImage: async (publicId) => {
    // Replace slashes with tildes for URL encoding
    const encodedPublicId = publicId.replace(/\//g, '~');
    
    const response = await api.delete(`/upload/${encodedPublicId}`);
    return response.data;
  },

  // Validate image file
  validateImageFile: (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.');
    }

    if (file.size > maxSize) {
      throw new Error('File size too large. Maximum size is 5MB.');
    }

    return true;
  },

  // Validate multiple images
  validateMultipleImages: (files) => {
    const maxFiles = 10;

    if (files.length > maxFiles) {
      throw new Error(`Too many files. Maximum is ${maxFiles} images.`);
    }

    Array.from(files).forEach(file => {
      uploadService.validateImageFile(file);
    });

    return true;
  }
};

export default uploadService;