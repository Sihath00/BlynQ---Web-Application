import axios from 'axios';
import { auth } from '../../../firebase/firebaseConfig';

const BASE_URL = 'http://localhost:5001/api/service-center';

// Get Firebase Token
const getToken = async () => {
  const user = auth.currentUser;
  if (user) return await user.getIdToken(); // Get current user's Firebase token
  throw new Error('No user logged in');
};

export const fetchServiceCenterProfile = async () => {
  const token = await getToken();
  const response = await axios.get(`${BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },  // Include Firebase token in headers
  });
  return response.data;
};

export const saveServiceCenterProfile = async (formData: FormData) => {
  const token = await getToken();
  const response = await axios.post(`${BASE_URL}/profile`, formData, {
    headers: { 
      Authorization: `Bearer ${token}`,  // Include Firebase token in headers
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
