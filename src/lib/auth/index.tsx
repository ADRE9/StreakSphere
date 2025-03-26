import { createContext, type PropsWithChildren, useState } from 'react';
import { Alert } from 'react-native';

import { supabase } from '../supabase';

const AuthContext = createContext<{
  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
}>({
  signIn: () => null,
  signUp: () => null,
  setLoading: () => null,
  loading: false,
});

export function SessionProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(false);

  async function signInWithEmail(email: string, password: string) {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail(email: string, password: string) {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }
  return (
    <AuthContext.Provider
      value={{
        signIn: (email: string, password: string) =>
          signInWithEmail(email, password),
        signUp: (email: string, password: string) =>
          signUpWithEmail(email, password),
        setLoading,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
