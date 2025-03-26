import { type Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { supabase } from '../supabase';

// This hook can be used to access the user info.
export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return { session };
}
