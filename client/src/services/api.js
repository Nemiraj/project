const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getToken = () => localStorage.getItem('token');

// API request helper with auth
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
};

// Authentication API
export const authApi = {
  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  register: async (username, email, password) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password })
    });
  },

  verifyToken: async () => {
    const response = await apiRequest('/auth/verify');
    return response.user;
  }
};

// Properties API
// export const api = {
//   // Properties
//   getAllProperties: async (filters = {}) => {
//     const params = new URLSearchParams();
//     Object.keys(filters).forEach(key => {
//       if (filters[key]) params.append(key, filters[key]);
//     });
//     return apiRequest(`/properties?${params}`);
//   },

//   getPropertyById: async (id) => {
//     return apiRequest(`/properties/${id}`);
//   },

//   getPropertiesByCity: async (city) => {
//     return apiRequest(`/properties/city/${city}`);
//   },

//   createProperty: async (propertyData) => {
//     return apiRequest('/properties', {
//       method: 'POST',
//       body: JSON.stringify(propertyData)
//     });
//   },

//   updateProperty: async (id, propertyData) => {
//     return apiRequest(`/properties/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify(propertyData)
//     });
//   },

//   deleteProperty: async (id) => {
//     return apiRequest(`/properties/${id}`, {
//       method: 'DELETE'
//     });
//   },

// getNewLaunches: async () => {
//   return apiRequest("/new-launches");
// },

// getNewLaunchById: async (id) => {
//   return apiRequest(`/new-launches/${id}`);
// },
// getPropertyById: async (id) => {
//     try {
//       const response = await axios.get(`${API_URL}/properties/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("API Error:", error);
//       throw error;
//     }
//   },

//   // Enquiries
//   createEnquiry: async (enquiryData) => {
//     return apiRequest('/enquiries', {
//       method: 'POST',
//       body: JSON.stringify(enquiryData)
//     });
//   }
// };

// Properties API
export const api = {
  // Properties
  getAllProperties: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
    return apiRequest(`/properties?${params}`);
  },

  // 👇 THIS WAS THE PROBLEM. KEEP ONLY THIS ONE.
  getPropertyById: async (id) => {
    return apiRequest(`/properties/${id}`);
  },

  getPropertiesByCity: async (city) => {
    return apiRequest(`/properties/city/${city}`);
  },

  createProperty: async (propertyData) => {
    return apiRequest('/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData)
    });
  },

  updateProperty: async (id, propertyData) => {
    return apiRequest(`/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(propertyData)
    });
  },

  deleteProperty: async (id) => {
    return apiRequest(`/properties/${id}`, {
      method: 'DELETE'
    });
  },

  // New Launches
  getNewLaunches: async () => {
    return apiRequest("/new-launches");
  },

  getNewLaunchById: async (id) => {
    return apiRequest(`/new-launches/${id}`);
  },

  // Enquiries
  createEnquiry: async (enquiryData) => {
    return apiRequest('/enquiries', {
      method: 'POST',
      body: JSON.stringify(enquiryData)
    });
  }
};