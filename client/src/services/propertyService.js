import api from "./api";

const propertyService = {
  // Get all properties with filters
  getProperties: async (filters = {}) => {
    const queryParams = new URLSearchParams();

    Object.keys(filters).forEach((key) => {
      if (
        filters[key] !== undefined &&
        filters[key] !== null &&
        filters[key] !== ""
      ) {
        queryParams.append(key, filters[key]);
      }
    });

    const response = await api.get(`/properties?${queryParams.toString()}`);
    return response.data;
  },

  // Get single property
  getProperty: async (id) => {
    try {
      const response = await api.get(`/properties/${id}`);
      console.log("API Response:", response.data); // Debug log
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Property Service Error:", error); // Debug log
      return {
        success: false,
        error: error.response?.data?.message || "Failed to fetch property",
      };
    }
  },

  // Get featured properties
  getFeaturedProperties: async () => {
    const response = await api.get("/properties/featured");
    return response.data;
  },

  // Get agent's properties
  getAgentProperties: async (agentId) => {
    const response = await api.get(`/properties/agent/${agentId}`);
    return response.data;
  },

  // Create property
  createProperty: async (propertyData) => {
    const response = await api.post("/properties", propertyData);
    return response.data;
  },

  // Update property
  updateProperty: async (id, propertyData) => {
    const response = await api.put(`/properties/${id}`, propertyData);
    return response.data;
  },

  // Delete property
  deleteProperty: async (id) => {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  },

  // Search properties
  searchProperties: async (searchTerm) => {
    const response = await api.get(`/properties?search=${searchTerm}`);
    return response.data;
  },
};

export default propertyService;
