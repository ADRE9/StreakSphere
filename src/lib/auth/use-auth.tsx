import {
  type AuthResponse,
  type AuthTokenResponsePassword,
} from '@supabase/supabase-js';
import React, {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
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
} & AuthState;

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: undefined,
  signIn: () => new Promise(() => ({})),
  signUp: () => new Promise(() => ({})),
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

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        token,
        signIn,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
