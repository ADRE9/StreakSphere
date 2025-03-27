import { create } from 'zustand';

import { supabase } from '../supabase';
import { showErrorToast, showSuccessToast } from '../toast';
import { createSelectors } from '../utils';

export interface AuthState {
  session: any | null;
  status: 'idle' | 'signOut' | 'signIn';
  isEmailVerified: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setStatus: (status: 'idle' | 'signOut' | 'signIn') => void;
  checkEmailVerification: () => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
}

const handleAuthError = (error: unknown, defaultMessage: string) => {
  console.error('Auth error:', error);
  showErrorToast(error instanceof Error ? error.message : defaultMessage);
  throw error;
};

const handleSignIn = async (email: string, password: string, set: any) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    set({ session: data.session, status: 'signIn' });
    showSuccessToast('Successfully signed in');
  } catch (error) {
    handleAuthError(error, 'Failed to sign in');
  }
};

const handleSignUp = async (email: string, password: string, set: any) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    set({ session: data.session, status: 'signIn' });
    showSuccessToast(
      'Account created successfully',
      'Please check your email for verification'
    );
  } catch (error) {
    handleAuthError(error, 'Failed to sign up');
  }
};

const handleSignOut = async (set: any) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ session: null, status: 'signOut', isEmailVerified: false });
    showSuccessToast('Successfully signed out');
  } catch (error) {
    handleAuthError(error, 'Failed to sign out');
  }
};

const handleCheckEmailVerification = async (set: any) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    set({ isEmailVerified: user?.email_confirmed_at !== null });
  } catch (error) {
    handleAuthError(error, 'Failed to check email verification status');
  }
};

const handleResendVerificationEmail = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user?.email) {
      throw new Error('No email found for the current user');
    }
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: user.email,
    });
    if (error) throw error;
    showSuccessToast('Verification email sent', 'Please check your inbox');
  } catch (error) {
    handleAuthError(error, 'Failed to resend verification email');
  }
};

const createAuthStore = (set: any) => ({
  session: null,
  status: 'idle' as const,
  isEmailVerified: false,
  signIn: (email: string, password: string) =>
    handleSignIn(email, password, set),
  signUp: (email: string, password: string) =>
    handleSignUp(email, password, set),
  signOut: () => handleSignOut(set),
  setStatus: (status: 'idle' | 'signOut' | 'signIn') => set({ status }),
  checkEmailVerification: () => handleCheckEmailVerification(set),
  resendVerificationEmail: () => handleResendVerificationEmail(),
});

export const useAuthStoreBase = create<AuthState>(createAuthStore);
export const useAuthStore = createSelectors(useAuthStoreBase);
