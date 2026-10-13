// API Service for EduPlacement Pro Backend Integration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Helper function to get auth token
const getAuthToken = () => {
  const user = JSON.parse(localStorage.getItem('ep_user') || '{}');
  return user.token || '';
};

// Helper function to handle API errors
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `Request failed with status ${response.status}`);
  }
  return response.json();
};

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(response);
  },
  
  googleAuth: async (idToken, role) => {
    const response = await fetch(`${API_BASE_URL}/auth/google-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken, role })
    });
    return handleResponse(response);
  },
  
  health: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/health`);
    return handleResponse(response);
  }
};

// Students API
export const studentsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/students`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },
  
  getMe: async () => {
    const response = await fetch(`${API_BASE_URL}/students/me`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },
  
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/students/${id}`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },
  
  create: async (studentData) => {
    const response = await fetch(`${API_BASE_URL}/students/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(studentData)
    });
    return handleResponse(response);
  },
  
  update: async (id, studentData) => {
    const response = await fetch(`${API_BASE_URL}/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(studentData)
    });
    return handleResponse(response);
  },
  
  search: async (keyword) => {
    const response = await fetch(`${API_BASE_URL}/students/search?keyword=${encodeURIComponent(keyword)}`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },
  
  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/students/statistics`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  }
};

// Projects API
export const projectsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },
  
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },
  
  create: async (projectData) => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(projectData)
    });
    return handleResponse(response);
  },
  
  update: async (id, projectData) => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(projectData)
    });
    return handleResponse(response);
  },
  
  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/projects/stats`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },

  getMyProjects: async () => {
    const response = await fetch(`${API_BASE_URL}/projects/my-projects`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },

  getDetails: async (id) => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}/details`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  }
};

// Project Updates API
export const projectUpdatesAPI = {
  getByProject: async (projectId) => {
    const response = await fetch(`${API_BASE_URL}/project-updates/project/${projectId}`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },

  create: async (data) => {
    const response = await fetch(`${API_BASE_URL}/project-updates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/project-updates/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    if (!response.ok) throw new Error('Failed to delete update');
  }
};

// Project Comments API
export const projectCommentsAPI = {
  getByProject: async (projectId) => {
    const response = await fetch(`${API_BASE_URL}/project-comments/project/${projectId}`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },

  create: async (data) => {
    const response = await fetch(`${API_BASE_URL}/project-comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/project-comments/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    if (!response.ok) throw new Error('Failed to delete comment');
  }
};

// Companies API
export const companiesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/companies`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },
  
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },
  
  create: async (companyData) => {
    const response = await fetch(`${API_BASE_URL}/companies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(companyData)
    });
    return handleResponse(response);
  },

  update: async (id, companyData) => {
    const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(companyData)
    });
    return handleResponse(response);
  }
};

// Drives API
export const drivesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/drives`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },
  
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/drives/${id}`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },
  
  getActive: async () => {
    const response = await fetch(`${API_BASE_URL}/drives/active`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },
  
  create: async (driveData) => {
    const response = await fetch(`${API_BASE_URL}/drives`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(driveData)
    });
    return handleResponse(response);
  },

  update: async (id, driveData) => {
    const response = await fetch(`${API_BASE_URL}/drives/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(driveData)
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/drives/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    if (!response.ok) throw new Error('Failed to delete drive');
  },
  
  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/drives/stats`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  }
};

// Applications API
export const applicationsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/applications`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },
  
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },

  getByStudent: async (studentId) => {
    const response = await fetch(`${API_BASE_URL}/applications/student/${studentId}`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },

  getByDrive: async (driveId) => {
    const response = await fetch(`${API_BASE_URL}/applications/drive/${driveId}`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },
  
  create: async (applicationData) => {
    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(applicationData)
    });
    return handleResponse(response);
  },
  
  updateStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/applications/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({ status })
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    if (!response.ok) throw new Error('Failed to delete application');
  }
};

// Interviews API
export const interviewsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/interviews`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },
  
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/interviews/${id}`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },
  
  create: async (interviewData) => {
    const response = await fetch(`${API_BASE_URL}/interviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(interviewData)
    });
    return handleResponse(response);
  },
  
  getUpcoming: async () => {
    const response = await fetch(`${API_BASE_URL}/interviews/upcoming`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },
  
  getByStudent: async (studentId) => {
    const response = await fetch(`${API_BASE_URL}/interviews/student/${studentId}`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  }
};

// Training API
export const trainingAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/training`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },
  
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/training/${id}`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },
  
  create: async (trainingData) => {
    const response = await fetch(`${API_BASE_URL}/training`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(trainingData)
    });
    return handleResponse(response);
  },
  
  enroll: async (trainingId, studentId) => {
    const response = await fetch(`${API_BASE_URL}/training/${trainingId}/enroll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({ studentId })
    });
    return handleResponse(response);
  },
  
  updateProgress: async (trainingId, studentId, progress) => {
    const response = await fetch(`${API_BASE_URL}/training/${trainingId}/progress`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({ studentId, progress })
    });
    return handleResponse(response);
  }
};

// Dashboard API
export const dashboardAPI = {
  getAdminStats: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/admin`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },
  
  getStudentDashboard: async (studentId) => {
    const response = await fetch(`${API_BASE_URL}/dashboard/student/${studentId}`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  },
  
  getPlacementTrends: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/trends`, {
      headers: { 'Authorization': `Bearer ${getAuthToken()}` }
    });
    return handleResponse(response);
  }
};
