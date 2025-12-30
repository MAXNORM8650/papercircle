/**
 * Secure Error Handling Utility
 * Prevents exposure of sensitive information in logs and error messages
 */

// Safe error logging that filters sensitive data
export function logError(context: string, error: unknown): void {
  // Only log in development
  if (import.meta.env.DEV) {
    const sanitizedError = sanitizeError(error);
    console.error(`[${context}]`, sanitizedError);
  } else {
    // In production, only log minimal info
    console.error(`[${context}] An error occurred`);
  }
}

// Sanitize error objects to remove sensitive data
function sanitizeError(error: unknown): unknown {
  if (error instanceof Error) {
    return {
      message: error.message,
      name: error.name,
      // Don't include stack traces in production
    };
  }

  if (typeof error === 'object' && error !== null) {
    const obj = error as Record<string, unknown>;
    const sanitized: Record<string, unknown> = {};

    // Remove potentially sensitive fields
    const sensitiveKeys = ['password', 'token', 'key', 'secret', 'auth', 'session', 'cookie'];

    for (const [key, value] of Object.entries(obj)) {
      const lowerKey = key.toLowerCase();
      const isSensitive = sensitiveKeys.some(sensitive => lowerKey.includes(sensitive));

      if (!isSensitive) {
        sanitized[key] = value;
      } else {
        sanitized[key] = '[REDACTED]';
      }
    }

    return sanitized;
  }

  return error;
}

// Get user-friendly error message without exposing internals
export function getUserFriendlyErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // Map common database errors to friendly messages
    if (error.message.includes('duplicate key')) {
      return 'This item already exists.';
    }
    if (error.message.includes('foreign key')) {
      return 'Unable to complete operation due to related data.';
    }
    if (error.message.includes('permission denied')) {
      return 'You do not have permission to perform this action.';
    }
    if (error.message.includes('not found')) {
      return 'The requested item was not found.';
    }

    // For Supabase errors, use the message if it's user-safe
    if (!error.message.includes('function') &&
        !error.message.includes('column') &&
        !error.message.includes('table')) {
      return error.message;
    }
  }

  return 'An unexpected error occurred. Please try again.';
}

// Safe console.log that only works in development
export function devLog(message: string, data?: unknown): void {
  if (import.meta.env.DEV) {
    if (data) {
      console.log(message, sanitizeError(data));
    } else {
      console.log(message);
    }
  }
}

// Type guard for Supabase errors
export function isSupabaseError(error: unknown): error is { message: string; code?: string; details?: string } {
  return typeof error === 'object' &&
         error !== null &&
         'message' in error;
}
