import axios from 'axios';

const baseURL = '/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('GharKaBite_clone_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('GharKaBite_clone_token');
      localStorage.removeItem('GharKaBite_clone_user');
    }
    return Promise.reject(error);
  }
);

export default api;
