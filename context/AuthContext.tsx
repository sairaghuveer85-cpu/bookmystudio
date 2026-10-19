'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/config';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isConfigured: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const configured = isSupabaseConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(configured);

  const refreshUser = useCallback(async () => {
    if (!configured) {
      setUser(null);
      setSession(null);
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
    } catch {
      setUser(null);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  }, [configured]);

  useEffect(() => {
    if (!configured) {
      return;
    }

    const supabase = createClient();
    let mounted = true;

    supabase.auth.getSession().then(({ data }: { data: { session: Session | null } }) => {
      if (!mounted) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setIsLoading(false);
    }).catch(() => {
      if (!mounted) return;
      setUser(null);
      setSession(null);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, currentSession: Session | null) => {
      if (!mounted) return;
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [configured]);

  const signOut = useCallback(async () => {
    if (!configured) {
      setUser(null);
      setSession(null);
      return;
    }

    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } catch {
      setUser(null);
      setSession(null);
    }
  }, [configured]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isConfigured: configured,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
