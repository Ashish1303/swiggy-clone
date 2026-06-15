import api from '../../api/api';

export const fetchRestaurantsAPI = async () => {
  const response = await api.get('/restaurants');
  return response.data;
};

export const fetchRestaurantByIdAPI = async (id) => {
  const response = await api.get(`/restaurants/${id}`);
  return response.data;
};
