import User from '../models/User.js';
import Property from '../models/Property.js';

// @desc    Get all agents
// @route   GET /api/users/agents
// @access  Public
export const getAgents = async (req, res) => {
  try {
    const agents = await User.find({ 
      role: 'agent',
      isActive: true 
    }).select('-password');

    res.status(200).json({
      success: true,
      count: agents.length,
      agents
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single agent
// @route   GET /api/users/agents/:id
// @access  Public
export const getAgent = async (req, res) => {
  try {
    const agent = await User.findById(req.params.id).select('-password');

    if (!agent || agent.role !== 'agent') {
      return res.status(404).json({
        success: false,
        message: 'Agent not found'
      });
    }

    // Get agent's properties count
    const propertiesCount = await Property.countDocuments({ 
      agent: agent._id,
      isActive: true 
    });

    res.status(200).json({
      success: true,
      agent: {
        ...agent.toObject(),
        propertiesCount
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Save property
// @route   POST /api/users/save/:propertyId
// @access  Private
export const saveProperty = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const property = await Property.findById(req.params.propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if already saved
    if (user.savedProperties.includes(req.params.propertyId)) {
      return res.status(400).json({
        success: false,
        message: 'Property already saved'
      });
    }

    user.savedProperties.push(req.params.propertyId);
    property.saves += 1;

    await user.save();
    await property.save();

    res.status(200).json({
      success: true,
      message: 'Property saved successfully'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Unsave property
// @route   DELETE /api/users/save/:propertyId
// @access  Private
export const unsaveProperty = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const property = await Property.findById(req.params.propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if property is saved
    if (!user.savedProperties.includes(req.params.propertyId)) {
      return res.status(400).json({
        success: false,
        message: 'Property not in saved list'
      });
    }

    user.savedProperties = user.savedProperties.filter(
      id => id.toString() !== req.params.propertyId
    );
    property.saves -= 1;

    await user.save();
    await property.save();

    res.status(200).json({
      success: true,
      message: 'Property removed from saved list'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get saved properties
// @route   GET /api/users/saved
// @access  Private
export const getSavedProperties = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'savedProperties',
        populate: {
          path: 'agent',
          select: 'name email phone avatar'
        }
      });

    res.status(200).json({
      success: true,
      count: user.savedProperties.length,
      properties: user.savedProperties
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};