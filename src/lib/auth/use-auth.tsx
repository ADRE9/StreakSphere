/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import {
  type AuthResponse,
  type AuthTokenResponsePassword,
} from '@supabase/supabase-js';
import React, {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { type Session, supabase } from '../supabase';

type AuthState = {
  isAuthenticated: boolean;
  token?: Session['access_token'];
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
  token: undefined,
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
  const [token, setToken] = useState<AuthState['token']>(undefined);

  const signIn = useCallback(
    async ({ email, password }: SignInProps) => {
      const result = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (result.data?.session?.access_token) {
        setToken(result.data.session.access_token);
      }

      return result;
    },
    [supabase]
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setToken(undefined);
  }, [supabase]);

  const signUp = useCallback(
    async ({ email, password }: SignUpProps) => {
      const result = await supabase.auth.signUp({
        email,
        password,
      });

      if (result.data?.session?.access_token) {
        setToken(result.data.session.access_token);
      }

      return result;
    },
    [supabase]
  );

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case 'SIGNED_OUT':
          setToken(undefined);
          break;
        case 'INITIAL_SESSION':
        case 'SIGNED_IN':
        case 'TOKEN_REFRESHED':
          setToken(session?.access_token);
          break;
        default:
        // no-op
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        token,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
