// API utility functions for backend communication

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Helper function to get auth token
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem('ep_user') || '{}');
  return user.token || '';
};

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Student API
export const studentAPI = {
  getAll: () => apiCall('/students'),
  getById: (id) => apiCall(`/students/${id}`),
  getByUserId: (userId) => apiCall(`/students/user/${userId}`),
  search: (keyword) => apiCall(`/students/search?keyword=${encodeURIComponent(keyword)}`),
  getByStatus: (status) => apiCall(`/students/status/${status}`),
  getByBatch: (batch) => apiCall(`/students/batch/${batch}`),
  getStatistics: () => apiCall('/students/statistics'),
  create: (student) => apiCall('/students', { method: 'POST', body: JSON.stringify(student) }),
  update: (id, student) => apiCall(`/students/${id}`, { method: 'PUT', body: JSON.stringify(student) }),
  delete: (id) => apiCall(`/students/${id}`, { method: 'DELETE' }),
};

// Drive API
export const driveAPI = {
  getAll: () => apiCall('/drives'),
  getById: (id) => apiCall(`/drives/${id}`),
  getByStatus: (status) => apiCall(`/drives/status/${status}`),
  getActive: () => apiCall('/drives/active'),
  search: (keyword) => apiCall(`/drives/search?keyword=${encodeURIComponent(keyword)}`),
  getStatistics: () => apiCall('/drives/statistics'),
  create: (drive) => apiCall('/drives', { method: 'POST', body: JSON.stringify(drive) }),
  update: (id, drive) => apiCall(`/drives/${id}`, { method: 'PUT', body: JSON.stringify(drive) }),
  delete: (id) => apiCall(`/drives/${id}`, { method: 'DELETE' }),
};

// Application API
export const applicationAPI = {
  getAll: () => apiCall('/applications'),
  getById: (id) => apiCall(`/applications/${id}`),
  getByStudent: (studentId) => apiCall(`/applications/student/${studentId}`),
  getByDrive: (driveId) => apiCall(`/applications/drive/${driveId}`),
  getByStatus: (status) => apiCall(`/applications/status/${status}`),
  getStatistics: () => apiCall('/applications/statistics'),
  create: (application) => apiCall('/applications', { method: 'POST', body: JSON.stringify(application) }),
  update: (id, application) => apiCall(`/applications/${id}`, { method: 'PUT', body: JSON.stringify(application) }),
  delete: (id) => apiCall(`/applications/${id}`, { method: 'DELETE' }),
};

// Company API
export const companyAPI = {
  getAll: () => apiCall('/companies'),
  getById: (id) => apiCall(`/companies/${id}`),
  getActive: () => apiCall('/companies/active'),
  search: (keyword) => apiCall(`/companies/search?keyword=${encodeURIComponent(keyword)}`),
  getStatistics: () => apiCall('/companies/statistics'),
  create: (company) => apiCall('/companies', { method: 'POST', body: JSON.stringify(company) }),
  update: (id, company) => apiCall(`/companies/${id}`, { method: 'PUT', body: JSON.stringify(company) }),
  delete: (id) => apiCall(`/companies/${id}`, { method: 'DELETE' }),
};

// Training API
export const trainingAPI = {
  getAll: () => apiCall('/trainings'),
  getById: (id) => apiCall(`/trainings/${id}`),
  getUpcoming: () => apiCall('/trainings/upcoming'),
  getStatistics: () => apiCall('/trainings/statistics'),
  create: (training) => apiCall('/trainings', { method: 'POST', body: JSON.stringify(training) }),
  enroll: (id, studentId) => apiCall(`/trainings/${id}/enroll?studentId=${studentId}`, { method: 'POST' }),
  unenroll: (id, studentId) => apiCall(`/trainings/${id}/unenroll?studentId=${studentId}`, { method: 'DELETE' }),
  update: (id, training) => apiCall(`/trainings/${id}`, { method: 'PUT', body: JSON.stringify(training) }),
  delete: (id) => apiCall(`/trainings/${id}`, { method: 'DELETE' }),
};

// Project API
export const projectAPI = {
  getAll: () => apiCall('/projects'),
  getById: (id) => apiCall(`/projects/${id}`),
  getByStudent: (studentId) => apiCall(`/projects/student/${studentId}`),
  getByStatus: (status) => apiCall(`/projects/status/${status}`),
  getStatistics: () => apiCall('/projects/statistics'),
  create: (project) => apiCall('/projects', { method: 'POST', body: JSON.stringify(project) }),
  update: (id, project) => apiCall(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(project) }),
  delete: (id) => apiCall(`/projects/${id}`, { method: 'DELETE' }),
};

// Interview API
export const interviewAPI = {
  getAll: () => apiCall('/interviews'),
  getById: (id) => apiCall(`/interviews/${id}`),
  getByStudent: (studentId) => apiCall(`/interviews/student/${studentId}`),
  getUpcoming: () => apiCall('/interviews/upcoming'),
  getStatistics: () => apiCall('/interviews/statistics'),
  create: (interview) => apiCall('/interviews', { method: 'POST', body: JSON.stringify(interview) }),
  update: (id, interview) => apiCall(`/interviews/${id}`, { method: 'PUT', body: JSON.stringify(interview) }),
  delete: (id) => apiCall(`/interviews/${id}`, { method: 'DELETE' }),
};

// Dashboard API
export const dashboardAPI = {
  getAdminStats: () => apiCall('/dashboard/admin'),
  getStudentStats: (studentId) => apiCall(`/dashboard/student/${studentId}`),
};

// Auth API
export const authAPI = {
  login: (credentials) => apiCall('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  googleLogin: (token) => apiCall('/auth/google', { method: 'POST', body: JSON.stringify({ token }) }),
};
