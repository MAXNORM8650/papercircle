import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables without logging them
if (!supabaseUrl || !supabaseAnonKey) {
  // Only log that they're missing, never log the actual values
  if (import.meta.env.DEV) {
    console.error('⚠️ Missing Supabase environment variables. Check your .env file.');
  }
  throw new Error('Missing Supabase environment variables');
}

// Optional: Log only that connection is initialized (not the credentials)
if (import.meta.env.DEV) {
  console.log('✅ Supabase client initialized');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
