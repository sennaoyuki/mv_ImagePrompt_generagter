import axios from 'axios';
import { ApiResponse, GenerateRequest, GenerateResponse, Genre, Region } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

// API functions
export const itemsApi = {
  generateItems: async (request: GenerateRequest): Promise<GenerateResponse> => {
    const response = await api.post<ApiResponse<GenerateResponse>>('/items/generate', request);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to generate items');
    }
    return response.data.data;
  },

  getCommonItems: async (filters: { priority?: string } = {}) => {
    const response = await api.get<ApiResponse<any>>('/items/common', { params: filters });
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch common items');
    }
    return response.data.data;
  },

  getItemById: async (id: string) => {
    const response = await api.get<ApiResponse<any>>(`/items/${id}`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch item');
    }
    return response.data.data;
  },
};

export const genresApi = {
  getGenres: async (filters: { category?: string } = {}): Promise<Genre[]> => {
    const response = await api.get<ApiResponse<Genre[]>>('/genres', { params: filters });
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch genres');
    }
    return response.data.data;
  },

  getGenreById: async (id: string): Promise<Genre> => {
    const response = await api.get<ApiResponse<Genre>>(`/genres/${id}`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch genre');
    }
    return response.data.data;
  },

  getGenreItems: async (genreId: string) => {
    const response = await api.get<ApiResponse<any>>(`/genres/${genreId}/items`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch genre items');
    }
    return response.data.data;
  },
};

export const regionsApi = {
  getRegions: async (filters: { prefecture?: string } = {}): Promise<Region[]> => {
    const response = await api.get<ApiResponse<Region[]>>('/regions', { params: filters });
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch regions');
    }
    return response.data.data;
  },

  getRegionById: async (id: string): Promise<Region> => {
    const response = await api.get<ApiResponse<Region>>(`/regions/${id}`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch region');
    }
    return response.data.data;
  },

  getRegionItems: async (regionId: string) => {
    const response = await api.get<ApiResponse<any>>(`/regions/${regionId}/items`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch region items');
    }
    return response.data.data;
  },
};

export const templatesApi = {
  getTemplatesByItemId: async (itemId: string) => {
    const response = await api.get<ApiResponse<any>>(`/templates/${itemId}`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch templates');
    }
    return response.data.data;
  },

  getTemplates: async (filters: { itemType?: string; templateType?: string } = {}) => {
    const response = await api.get<ApiResponse<any>>('/templates', { params: filters });
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch templates');
    }
    return response.data.data;
  },

  getContentExamples: async (itemId: string) => {
    const response = await api.get<ApiResponse<any>>(`/templates/${itemId}/examples`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch content examples');
    }
    return response.data.data;
  },
};

export const customizationsApi = {
  saveCustomization: async (data: any) => {
    const response = await api.post<ApiResponse<any>>('/customizations/save', data);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to save customization');
    }
    return response.data.data;
  },

  getCustomizations: async (userId: string, params: { page?: number; limit?: number } = {}) => {
    const response = await api.get<ApiResponse<any>>('/customizations', {
      params: { userId, ...params }
    });
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch customizations');
    }
    return response.data.data;
  },

  getCustomizationById: async (id: string) => {
    const response = await api.get<ApiResponse<any>>(`/customizations/${id}`);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to fetch customization');
    }
    return response.data.data;
  },

  updateCustomization: async (id: string, data: any) => {
    const response = await api.put<ApiResponse<any>>(`/customizations/${id}`, data);
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.error || 'Failed to update customization');
    }
    return response.data.data;
  },

  deleteCustomization: async (id: string) => {
    const response = await api.delete<ApiResponse<any>>(`/customizations/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to delete customization');
    }
    return true;
  },
};

export default api;