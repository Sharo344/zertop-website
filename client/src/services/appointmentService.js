import api from './api';

const appointmentService = {
  // Create appointment
  createAppointment: async (appointmentData) => {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  },

  // Get all appointments (for agents/admin)
  getAppointments: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        queryParams.append(key, filters[key]);
      }
    });

    const response = await api.get(`/appointments?${queryParams.toString()}`);
    return response.data;
  },

  // Get user's appointments
  getMyAppointments: async () => {
    const response = await api.get('/appointments/my');
    return response.data;
  },

  // Get single appointment
  getAppointment: async (id) => {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  },

  // Update appointment status
  updateAppointmentStatus: async (id, status) => {
    const response = await api.put(`/appointments/${id}/status`, { status });
    return response.data;
  },

  // Delete appointment
  deleteAppointment: async (id) => {
    const response = await api.delete(`/appointments/${id}`);
    return response.data;
  },

  // Get appointments by status
  getAppointmentsByStatus: async (status) => {
    const response = await api.get(`/appointments?status=${status}`);
    return response.data;
  },

  // Get upcoming appointments
  getUpcomingAppointments: async () => {
    const response = await api.get('/appointments?status=confirmed');
    return response.data;
  }
};

export default appointmentService;