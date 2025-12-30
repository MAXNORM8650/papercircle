// src/contexts/AuthContext.tsx - Updated version
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  needsProfile: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  completeProfile: (displayName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsProfile, setNeedsProfile] = useState(false);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      setNeedsProfile(true);
      return null;
    }

    if (!data) {
      setNeedsProfile(true);
      return null;
    }

    setProfile(data);
    setNeedsProfile(false);
    return data;
  };

  const completeProfile = async (displayName: string) => {
    if (!user) throw new Error('No user logged in');

    console.log('Completing profile for user:', user.id);

    // Try RPC function first (bypasses RLS)
    try {
      const { data: rpcData, error: rpcError } = await supabase.rpc(
        'create_profile_for_user',
        {
          user_id: user.id,
          user_display_name: displayName
        }
      );

      if (rpcData && !rpcError) {
        console.log('Profile completed via RPC');
        setProfile(rpcData);
        setNeedsProfile(false);
        return;
      }

      if (rpcError) {
        console.warn('RPC method failed, trying direct insert:', rpcError);
      }
    } catch (rpcErr) {
      console.warn('RPC call exception, trying direct insert:', rpcErr);
    }

    // Fallback to direct insert
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        display_name: displayName,
        role: 'member',
      })
      .select()
      .single();

    if (error) {
      console.error('Profile creation error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw new Error(`Failed to create profile: ${error.message}`);
    }

    console.log('Profile completed successfully');
    setProfile(data);
    setNeedsProfile(false);
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      (async () => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        }
        setLoading(false);
      })();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
          setNeedsProfile(false);
        }
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      console.log('Starting signup process for:', email);

      // Sign up the user with metadata
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
            full_name: displayName
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        throw new Error(`Signup failed: ${error.message}`);
      }

      if (!data.user) {
        throw new Error('Signup succeeded but no user returned');
      }

      console.log('User created successfully:', data.user.id);

      // Strategy 1: Wait for trigger to create profile (500ms should be enough)
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check if profile was created by trigger
      let { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .maybeSingle();

      if (profile) {
        console.log('Profile created successfully by trigger');
        setProfile(profile);
        setNeedsProfile(false);
        return;
      }

      // Strategy 2: Try calling the SQL function directly
      console.log('Profile not found, calling create_profile_for_user function...');
      try {
        const { data: rpcData, error: rpcError } = await supabase.rpc(
          'create_profile_for_user',
          {
            user_id: data.user.id,
            user_display_name: displayName
          }
        );

        if (rpcError) {
          console.error('RPC error:', rpcError);
        } else if (rpcData) {
          console.log('Profile created via RPC function');
          setProfile(rpcData);
          setNeedsProfile(false);
          return;
        }
      } catch (rpcErr) {
        console.error('RPC function call failed:', rpcErr);
      }

      // Strategy 3: Try direct insert as fallback
      console.log('Attempting direct profile insert...');
      const { data: insertedProfile, error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          display_name: displayName,
          role: 'member',
        })
        .select()
        .maybeSingle();

      if (insertError) {
        console.error('Direct insert error:', insertError);
        // Set needsProfile flag so modal will show
        setNeedsProfile(true);
        throw new Error(`Failed to create user profile: ${insertError.message}. Please complete your profile manually.`);
      }

      if (insertedProfile) {
        console.log('Profile created successfully via direct insert');
        setProfile(insertedProfile);
        setNeedsProfile(false);
        return;
      }

      // If we get here, something went wrong
      console.error('All profile creation strategies failed');
      setNeedsProfile(true);
      throw new Error('Unable to create user profile. Please try again or contact support.');

    } catch (error) {
      console.error('Complete signup error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        needsProfile,
        signIn,
        signUp,
        signOut,
        refreshProfile,
        completeProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}