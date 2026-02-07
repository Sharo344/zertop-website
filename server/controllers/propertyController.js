import Property from '../models/Property.js';
import User from '../models/User.js';

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
export const getProperties = async (req, res) => {
  try {
    // Build query
    let query = { isActive: true };

    // Filter by type
    if (req.query.type) {
      query.type = req.query.type;
    }

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by city
    if (req.query.city) {
      query['location.city'] = req.query.city;
    }

    // Filter by area
    if (req.query.area) {
      query['location.area'] = req.query.area;
    }

    // Filter by price range
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) {
        query.price.$gte = parseInt(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        query.price.$lte = parseInt(req.query.maxPrice);
      }
    }

    // Filter by bedrooms
    if (req.query.bedrooms) {
      query['details.bedrooms'] = { $gte: parseInt(req.query.bedrooms) };
    }

    // Filter by bathrooms
    if (req.query.bathrooms) {
      query['details.bathrooms'] = { $gte: parseInt(req.query.bathrooms) };
    }

    // Search by title or description
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Sort
    let sortBy = {};
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'price-asc':
          sortBy.price = 1;
          break;
        case 'price-desc':
          sortBy.price = -1;
          break;
        case 'newest':
          sortBy.createdAt = -1;
          break;
        case 'oldest':
          sortBy.createdAt = 1;
          break;
        default:
          sortBy.createdAt = -1;
      }
    } else {
      sortBy.createdAt = -1;
    }

    // Execute query
    const properties = await Property.find(query)
      .populate('agent', 'name email phone avatar agentDetails.rating')
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

    // Get total count
    const total = await Property.countDocuments(query);

    res.status(200).json({
      success: true,
      count: properties.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      properties
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
export const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('agent', 'name email phone avatar bio agentDetails');

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Increment views
    property.views += 1;
    await property.save();

    res.status(200).json({
      success: true,
      property
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create new property
// @route   POST /api/properties
// @access  Private (Agent/Admin)
export const createProperty = async (req, res) => {
  try {
    // Add agent to req.body
    req.body.agent = req.user.id;

    const property = await Property.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      property
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private (Agent/Admin - Owner only)
export const updateProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check ownership (unless admin)
    if (property.agent.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this property'
      });
    }

    property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Property updated successfully',
      property
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private (Agent/Admin - Owner only)
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check ownership (unless admin)
    if (property.agent.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this property'
      });
    }

    await property.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Property deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get featured properties
// @route   GET /api/properties/featured
// @access  Public
export const getFeaturedProperties = async (req, res) => {
  try {
    const properties = await Property.find({ featured: true, isActive: true })
      .populate('agent', 'name email phone avatar agentDetails.rating')
      .sort('-createdAt')
      .limit(6);

    res.status(200).json({
      success: true,
      count: properties.length,
      properties
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get agent's properties
// @route   GET /api/properties/agent/:agentId
// @access  Public
export const getAgentProperties = async (req, res) => {
  try {
    const properties = await Property.find({ 
      agent: req.params.agentId,
      isActive: true 
    })
      .populate('agent', 'name email phone avatar agentDetails.rating')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: properties.length,
      properties
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};