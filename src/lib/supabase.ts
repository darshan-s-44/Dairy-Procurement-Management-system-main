import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<User | null> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.user) {
        return {
          id: data.user.id,
          email: data.user.email!,
          created_at: data.user.created_at,
        };
      }

      return null;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async register(credentials: LoginCredentials): Promise<User | null> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          emailRedirectTo: undefined
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      // Check if user has a session (email confirmation disabled)
      if (data.user && data.session) {
        return {
          id: data.user.id,
          email: data.user.email!,
          created_at: data.user.created_at,
        };
      }

      // User created but no session (email confirmation required)
      if (data.user && !data.session) {
        throw new Error('CONFIRMATION_REQUIRED');
      }

      return null;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        return {
          id: session.user.id,
          email: session.user.email!,
          created_at: session.user.created_at,
        };
      }

      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  async isAuthenticated(): Promise<boolean> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return !!session;
    } catch (error) {
      console.error('Authentication check error:', error);
      return false;
    }
  }
};