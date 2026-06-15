import api from '../../api/api';

export const fetchDishesAPI = async () => {
  const response = await api.get('/dishes');
  return response.data;
};

export const fetchDishByIdAPI = async (id) => {
  const response = await api.get(`/dishes/${id}`);
  return response.data;
};

export const searchDishesAPI = async (query) => {
  const response = await api.get(`/search?q=${encodeURIComponent(query)}`);
  return response.data;
};
