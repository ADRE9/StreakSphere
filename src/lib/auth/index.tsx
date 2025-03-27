import { type PropsWithChildren, useEffect } from 'react';

import { supabase } from '../supabase';
import { useAuthStore } from './store';

export { useAuthStore } from './store';

export function SessionProvider({ children }: PropsWithChildren) {
  const { setStatus } = useAuthStore();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setStatus(session ? 'signIn' : 'signOut');
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setStatus(session ? 'signIn' : 'signOut');
    });

    return () => subscription.unsubscribe();
  }, [setStatus]);

  return children;
}
