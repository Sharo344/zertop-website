import express from 'express';
import upload from '../middleware/upload.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/uploadToCloudinary.js';

const router = express.Router();

// @desc    Upload property images
// @route   POST /api/upload/property
// @access  Private (Agent/Admin)
router.post(
  '/property',
  protect,
  authorize('agent', 'admin'),
  upload.array('images', 10), // Max 10 images
  async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Please upload at least one image'
        });
      }

      const uploadPromises = req.files.map(file =>
        uploadToCloudinary(file.buffer, 'properties')
      );

      const results = await Promise.all(uploadPromises);

      res.status(200).json({
        success: true,
        message: 'Images uploaded successfully',
        images: results
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error uploading images',
        error: error.message
      });
    }
  }
);

// @desc    Upload user avatar
// @route   POST /api/upload/avatar
// @access  Private
router.post(
  '/avatar',
  protect,
  upload.single('avatar'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Please upload an image'
        });
      }

      const result = await uploadToCloudinary(req.file.buffer, 'avatars');

      res.status(200).json({
        success: true,
        message: 'Avatar uploaded successfully',
        avatar: result
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error uploading avatar',
        error: error.message
      });
    }
  }
);

// @desc    Delete image from Cloudinary
// @route   DELETE /api/upload/:public_id
// @access  Private (Agent/Admin)
router.delete(
  '/:public_id',
  protect,
  authorize('agent', 'admin'),
  async (req, res) => {
    try {
      // Replace encoded slashes back to actual slashes
      const public_id = req.params.public_id.replace(/~/g, '/');
      
      await deleteFromCloudinary(public_id);

      res.status(200).json({
        success: true,
        message: 'Image deleted successfully'
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting image',
        error: error.message
      });
    }
  }
);

export default router;