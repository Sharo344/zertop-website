import api from './api';

const userService = {
  // Get all agents
  getAgents: async () => {
    const response = await api.get('/users/agents');
    return response.data;
  },

  // Get single agent
  getAgent: async (id) => {
    const response = await api.get(`/users/agents/${id}`);
    return response.data;
  },

  // Get saved properties
  getSavedProperties: async () => {
    const response = await api.get('/users/saved');
    return response.data;
  },

  // Save property
  saveProperty: async (propertyId) => {
    const response = await api.post(`/users/save/${propertyId}`);
    return response.data;
  },

  // Unsave property
  unsaveProperty: async (propertyId) => {
    const response = await api.delete(`/users/save/${propertyId}`);
    return response.data;
  },

  // Check if property is saved
  isPropertySaved: async (propertyId) => {
    try {
      const response = await api.get('/users/saved');
      const savedProperties = response.data.properties || [];
      return savedProperties.some(prop => prop._id === propertyId);
    } catch (error) {
      return false;
    }
  }
};

export default userService;