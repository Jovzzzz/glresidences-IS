import axios from "axios";

const API_URL = "http://localhost:8000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  register: async (username, password) => {
    const res = await axios.post(`${API_URL}/auth/register`, { username, password });
    return res.data;
  },

  login: async (username, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, { username, password });
    return res.data;
  },

  getTenants: async () => {
    const res = await axios.get(`${API_URL}/tenants`, { headers: getAuthHeaders() });
    return res.data;
  },
  createTenant: async (tenant) => {
    const res = await axios.post(`${API_URL}/tenants`, tenant, { headers: getAuthHeaders() });
    return res.data;
  },
  updateTenant: async (id, tenant) => {
    const res = await axios.put(`${API_URL}/tenants/${id}`, tenant, { headers: getAuthHeaders() });
    return res.data;
  },
  deleteTenant: async (id) => {
    const res = await axios.delete(`${API_URL}/tenants/${id}`, { headers: getAuthHeaders() });
    return res.data;
  },

  getRooms: async () => {
    const res = await axios.get(`${API_URL}/rooms`, { headers: getAuthHeaders() });
    return res.data;
  },
  createRoom: async (room) => {
    const res = await axios.post(`${API_URL}/rooms`, room, { headers: getAuthHeaders() });
    return res.data;
  },
  updateRoom: async (id, room) => {
    const res = await axios.put(`${API_URL}/rooms/${id}`, room, { headers: getAuthHeaders() });
    return res.data;
  },
  deleteRoom: async (id) => {
    const res = await axios.delete(`${API_URL}/rooms/${id}`, { headers: getAuthHeaders() });
    return res.data;
  },

  getAnnouncements: async () => {
    const res = await axios.get(`${API_URL}/announcements`, { headers: getAuthHeaders() });
    return res.data;
  },

  createAnnouncement: async (announcement) => {
    const res = await axios.post(`${API_URL}/announcements`, {
      title: announcement.title,
      description: announcement.description  // <-- FIXED
    }, { headers: getAuthHeaders() });

    return res.data;
  },

  updateAnnouncement: async (id, announcement) => {
    const res = await axios.put(`${API_URL}/announcements/${id}`, {
      title: announcement.title,
      description: announcement.description  // <-- FIXED
    }, { headers: getAuthHeaders() });

    return res.data;
  },

  deleteAnnouncement: async (id) => {
    const res = await axios.delete(`${API_URL}/announcements/${id}`, { headers: getAuthHeaders() });
    return res.data;
  },
};
