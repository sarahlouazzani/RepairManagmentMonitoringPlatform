import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  login: (username, password) => 
    apiClient.post('/auth/login', { username, password }),
  
  signup: (username, email, password) => 
    apiClient.post('/auth/signup', { username, email, password }),
  
  getProfile: () => 
    apiClient.get('/auth/profile'),
};

// Device API
export const deviceAPI = {
  getAllDevices: () => 
    apiClient.get('/devices'),
  
  getDeviceById: (id) => 
    apiClient.get(`/devices/${id}`),
  
  createDevice: (deviceData) => 
    apiClient.post('/devices', deviceData),
  
  updateDevice: (id, deviceData) => 
    apiClient.put(`/devices/${id}`, deviceData),
  
  deleteDevice: (id) => 
    apiClient.delete(`/devices/${id}`),
};

// Ticket API
export const ticketAPI = {
  getAllTickets: () => 
    apiClient.get('/tickets'),
  
  getTicketById: (id) => 
    apiClient.get(`/tickets/${id}`),
  
  createTicket: (ticketData) => 
    apiClient.post('/tickets', ticketData),
  
  updateTicket: (id, ticketData) => 
    apiClient.put(`/tickets/${id}`, ticketData),
  
  deleteTicket: (id) => 
    apiClient.delete(`/tickets/${id}`),
};

// Workflow API
export const workflowAPI = {
  getWorkflowByTicketId: (ticketId) => 
    apiClient.get(`/workflows/ticket/${ticketId}`),
  
  createWorkflow: (workflowData) => 
    apiClient.post('/workflows', workflowData),
};

export default apiClient;
