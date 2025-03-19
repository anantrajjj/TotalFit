import { create } from 'zustand';
import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  loading: true,
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));

// Initialize auth state
supabase.auth.getSession().then(({ data: { session } }) => {
  useAuth.setState({ user: session?.user ?? null, loading: false });
});

// Listen for auth changes
supabase.auth.onAuthStateChange((_event, session) => {
  useAuth.setState({ user: session?.user ?? null });
});