/**
 * Journal API Service
 * Handles all journal-related API calls with proper authentication
 */

import axios from 'axios';

export interface JournalEntry {
  _id: string;
  date: string;
  content: string;
  mood: 'happy' | 'sad' | 'angry' | 'anxious' | 'neutral' | 'hopeful';
  createdAt: string;
  updatedAt: string;
  userId: string;
}

// Use the same base URL as the main API service
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance for journal API
const journalApiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
journalApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
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
journalApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or unauthorized - clear storage and redirect
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_info');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

/**
 * Fetch all journal entries for the current user
 */
export const fetchJournalEntries = async (): Promise<JournalEntry[]> => {
  try {
    const response = await journalApiClient.get<JournalEntry[]>('/journal');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch entries');
  }
};

/**
 * Create a new journal entry
 */
export const createJournalEntry = async (
  content: string,
  mood: JournalEntry['mood'] = 'neutral'
): Promise<JournalEntry> => {
  try {
    const response = await journalApiClient.post<JournalEntry>('/journal', {
      content,
      mood,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create entry');
  }
};

/**
 * Update an existing journal entry
 */
export const updateJournalEntry = async (
  id: string,
  content: string,
  mood?: JournalEntry['mood']
): Promise<JournalEntry> => {
  try {
    const response = await journalApiClient.put<JournalEntry>(`/journal/${id}`, {
      content,
      ...(mood && { mood }),
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update entry');
  }
};

/**
 * Delete a journal entry
 */
export const deleteJournalEntry = async (id: string): Promise<void> => {
  try {
    await journalApiClient.delete(`/journal/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete entry');
  }
};
