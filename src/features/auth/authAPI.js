import api from '../../api/api';

export const signupUser = async (signupData) => {
  const response = await api.post('/auth/signup', signupData);
  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await api.post('/auth/login', loginData);
  return response.data;
};
