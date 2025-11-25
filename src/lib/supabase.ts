import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
console.log('🔍 SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('🔍 SUPABASE_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY);
console.log('🔍 All env vars:', import.meta.env);
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
