/**
 * Centralized API Configuration
 *
 * This file provides a single source of truth for API URLs.
 * In development, it defaults to localhost:8000.
 * In production, set the VITE_API_URL environment variable.
 */

// The unified API base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

// Helper function to build API endpoints
export function apiUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

// Export for components that need to check if we're in production
export const isProduction = import.meta.env.PROD;
