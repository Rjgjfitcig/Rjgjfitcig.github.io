import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getProjects = async (filters) => {
  try {
    const params = new URLSearchParams();
    if (filters.jobRole) params.append('jobRole', filters.jobRole);
    if (filters.skillLevel) params.append('skillLevel', filters.skillLevel);
    if (filters.skills.length) params.append('skills', filters.skills.join(','));

    const response = await axios.get(`${API_URL}/projects`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
};