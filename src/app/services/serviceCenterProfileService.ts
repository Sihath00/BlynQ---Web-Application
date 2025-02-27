import axios from 'axios';
import { auth } from '../../../firebase/firebaseConfig';

const BASE_URL = 'http://localhost:5001/api/service-center';

// Get Firebase Token
const getToken = async () => {
  return new Promise<string>((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        resolve(token);
      } else {
        reject(new Error('No user logged in'));
      }
      unsubscribe();
    });
  });
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
  
  // Fetch existing profile data
  const existingProfile = await fetchServiceCenterProfile();

  // Check if formData is different from existingProfile
  const isDataChanged = Array.from(formData.entries()).some(([key, value]) => {
    return existingProfile[key] !== value;
  });

  if (!isDataChanged) {
    throw new Error('No changes detected in the profile data');
  }

  const response = await axios.post(`${BASE_URL}/profile`, formData, {
    headers: { 
      Authorization: `Bearer ${token}`,  // Include Firebase token in headers
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
