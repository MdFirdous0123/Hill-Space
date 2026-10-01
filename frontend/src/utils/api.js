import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://hill-space-787j.vercel.app';

const API = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  headers: { 'Content-Type': 'application/json' }
});

// Attach JWT token if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('hillspace_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => Promise.reject(error));

// Handle global errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('hillspace_token');
      localStorage.removeItem('hillspace_user');
    }
    return Promise.reject(error);
  }
);

// ─── API Helper Functions ──────────────────────────────────────
export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login:    (data) => API.post('/auth/login', data),
  me:       ()     => API.get('/auth/me')
};

export const leadsAPI = {
  submit: (data) => API.post('/leads', data)
};

export const contactAPI = {
  submit: (data) => API.post('/contact', data)
};

export const estimateAPI = {
  calculate: (data) => API.post('/estimate', data)
};

export const portfolioAPI = {
  getAll:      (params) => API.get('/portfolio', { params }),
  getById:     (id)     => API.get(`/portfolio/${id}`)
};

export default API;
