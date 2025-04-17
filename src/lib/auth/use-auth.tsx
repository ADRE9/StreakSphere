/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import {
  type AuthResponse,
  type AuthTokenResponsePassword,
  type User,
} from '@supabase/supabase-js';
import React, {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { supabase } from '../supabase';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  email: string;
  password: string;
};

type AuthContextType = {
  signIn: (props: SignInProps) => Promise<AuthTokenResponsePassword>;
  signUp: (props: SignUpProps) => Promise<AuthResponse>;
  signOut: () => void;
} & AuthState;

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: true,
  signIn: () => new Promise(() => ({})),
  signUp: () => new Promise(() => ({})),
  signOut: () => undefined,
});

export function useAuth() {
  const value = useContext(AuthContext);

  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
  }

  return value;
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    token: null,
    isLoading: true,
  });

  const signIn = useCallback(async ({ email, password }: SignInProps) => {
    const result = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const session = result.data?.session;
    const user = result.data?.user;

    if (session?.access_token && user) {
      setState((prev) => ({
        ...prev,
        token: session.access_token,
        user,
        isAuthenticated: true,
      }));
    }

    return result;
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setState({
      user: null,
      isAuthenticated: false,
      token: null,
      isLoading: false,
    });
  }, []);

  const signUp = useCallback(async ({ email, password }: SignUpProps) => {
    const result = await supabase.auth.signUp({
      email,
      password,
    });

    const session = result.data?.session;
    const user = result.data?.user;

    if (session?.access_token && user) {
      setState((prev) => ({
        ...prev,
        token: session.access_token,
        user,
        isAuthenticated: true,
      }));
    }

    return result;
  }, []);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setState({
          user: session.user,
          isAuthenticated: true,
          token: session.access_token,
          isLoading: false,
        });
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case 'SIGNED_IN':
        case 'TOKEN_REFRESHED':
          setState({
            user: session?.user ?? null,
            isAuthenticated: true,
            token: session?.access_token ?? null,
            isLoading: false,
          });
          break;
        case 'SIGNED_OUT':
          setState({
            user: null,
            isAuthenticated: false,
            token: null,
            isLoading: false,
          });
          break;
        default:
          setState((prev) => ({ ...prev, isLoading: false }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
