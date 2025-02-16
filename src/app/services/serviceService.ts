import axios from "axios";

const BASE_URL = "http://localhost:5001/api/services";  // ✅ Change if using `/api/services`

// ✅ Fetch services by station UID
export const getServicesByUID = async (station_uid: string) => {
  try {
    const response = await axios.get(`${BASE_URL}?uid=${station_uid}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

// ✅ Add a new service
export const addService = async (serviceData: {
  name: string;
  description: string;
  price: number;
  duration: number;
  active: boolean;
  station_uid: string;
}) => {
  try {
    const response = await axios.post(BASE_URL, serviceData);
    return response.data;
  } catch (error) {
    console.error("Error adding service:", error);
    throw error;
  }
};

// ✅ Update an existing service
export const updateService = async (id: number, updatedData: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

// ✅ Delete a service
export const deleteService = async (id: number) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};