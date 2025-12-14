/**
 * API Service Module
 * Central hub for all backend API interactions
 * Handles authentication, requests, and error handling
 */

import axios, { AxiosInstance, AxiosError } from "axios";

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const TIMEOUT = 30000; // 30 seconds

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    role: string;
  };
}

export interface JournalEntry {
  _id?: string;
  id?: string;
  userId?: string;
  content: string;
  mood?: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CBTModule {
  id: string;
  title: string;
  description: string;
  duration: string;
}

export interface CBTProgress {
  _id?: string;
  userId?: string;
  moduleId: string;
  completed: boolean;
  completedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Message {
  userId: string;
  username: string;
  message: string;
  timestamp: string;
}

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or unauthorized - clear storage and redirect
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_info");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// ============================================================================
// AUTHENTICATION ENDPOINTS
// ============================================================================

export const authAPI = {
  /**
   * Register a new user
   * @param email User email
   * @param password User password
   * @returns Auth token and user info
   */
  register: async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        "/auth/register",
        { email, password }
      );
      if (response.data.data) {
        localStorage.setItem("auth_token", response.data.data.token);
        localStorage.setItem(
          "user_info",
          JSON.stringify(response.data.data.user)
        );
      }
      return response.data.data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Login user
   * @param email User email
   * @param password User password
   * @returns Auth token and user info
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        "/auth/login",
        { email, password }
      );
      if (response.data.data) {
        localStorage.setItem("auth_token", response.data.data.token);
        localStorage.setItem(
          "user_info",
          JSON.stringify(response.data.data.user)
        );
      }
      return response.data.data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Logout user (client-side only)
   */
  logout: () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_info");
  },

  /**
   * Get current user token
   */
  getToken: (): string | null => {
    return localStorage.getItem("auth_token");
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("auth_token");
  },
};

// ============================================================================
// JOURNAL ENDPOINTS
// ============================================================================

export const journalAPI = {
  /**
   * Get all journal entries for current user
   * @returns Array of journal entries
   */
  getEntries: async (): Promise<JournalEntry[]> => {
    try {
      const response = await apiClient.get<ApiResponse<JournalEntry[]>>(
        "/journal"
      );
      return response.data.data || [];
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Create a new journal entry
   * @param content Entry content
   * @param mood Optional mood label
   * @returns Created entry
   */
  createEntry: async (
    content: string,
    mood?: string
  ): Promise<JournalEntry> => {
    try {
      const response = await apiClient.post<ApiResponse<JournalEntry>>(
        "/journal",
        { content, mood, date: new Date().toISOString() }
      );
      return response.data.data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Update an existing journal entry
   * @param id Entry ID
   * @param content Updated content
   * @param mood Optional updated mood
   * @returns Updated entry
   */
  updateEntry: async (
    id: string,
    content: string,
    mood?: string
  ): Promise<JournalEntry> => {
    try {
      const response = await apiClient.put<ApiResponse<JournalEntry>>(
        `/journal/${id}`,
        { content, mood }
      );
      return response.data.data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Delete a journal entry
   * @param id Entry ID
   */
  deleteEntry: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/journal/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

// ============================================================================
// CBT MODULE ENDPOINTS
// ============================================================================

export const cbtAPI = {
  /**
   * Get all CBT modules
   * @returns Array of CBT modules
   */
  getModules: async (): Promise<CBTModule[]> => {
    try {
      const response = await apiClient.get<ApiResponse<CBTModule[]>>(
        "/cbt/modules"
      );
      return response.data.data || [];
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get user's progress across all modules
   * @returns Array of progress records
   */
  getProgress: async (): Promise<CBTProgress[]> => {
    try {
      const response = await apiClient.get<ApiResponse<CBTProgress[]>>(
        "/cbt/progress"
      );
      return response.data.data || [];
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Update progress for a module
   * @param moduleId Module ID
   * @param completed Completion status
   * @returns Updated progress
   */
  updateProgress: async (
    moduleId: string,
    completed: boolean
  ): Promise<CBTProgress> => {
    try {
      const response = await apiClient.post<ApiResponse<CBTProgress>>(
        "/cbt/progress",
        { moduleId, completed }
      );
      return response.data.data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

// ============================================================================
// MESSAGES ENDPOINTS
// ============================================================================

export const messagesAPI = {
  /**
   * Get all messages for current user (support chat history)
   * @returns Array of messages
   */
  getMessages: async (): Promise<Message[]> => {
    try {
      const response = await apiClient.get<ApiResponse<Message[]>>(
        "/messages"
      );
      return response.data.data || [];
    } catch (error) {
      throw handleApiError(error);
    }
  },
};

// ============================================================================
// HEALTH CHECK
// ============================================================================

export const healthAPI = {
  /**
   * Check if backend is running
   */
  check: async (): Promise<boolean> => {
    try {
      const response = await apiClient.get("/health");
      return response.status === 200;
    } catch {
      return false;
    }
  },
};

// ============================================================================
// ERROR HANDLING
// ============================================================================

interface ApiErrorDetail {
  message: string;
  status: number;
  code?: string;
}

/**
 * Handle API errors and return user-friendly messages
 */
export function handleApiError(error: unknown): ApiErrorDetail {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "An error occurred";

    // Log detailed error info for debugging
    console.error('API Error Details:', {
      status,
      message,
      url: error.config?.url,
      method: error.config?.method,
      data: error.response?.data,
      statusText: error.response?.statusText,
    });

    return {
      message,
      status,
      code: error.code,
    };
  }

  console.error('Unexpected error:', error);
  return {
    message: "An unexpected error occurred",
    status: 500,
  };
}

/**
 * Get human-readable error message
 */
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      return "Unauthorized. Please log in again.";
    }
    if (error.response?.status === 403) {
      return "You don't have permission to perform this action.";
    }
    if (error.response?.status === 404) {
      return "Resource not found.";
    }
    if (error.response?.status === 429) {
      return "Too many requests. Please try again later.";
    }
    if (error.response?.status === 500) {
      return "Server error. Please try again later.";
    }
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "An error occurred"
    );
  }
  return "An unexpected error occurred";
}

// ============================================================================
// EXPORT API CLIENT
// ============================================================================

export default apiClient;
