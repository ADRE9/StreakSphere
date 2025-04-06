import 'react-native-get-random-values';

import { observable } from '@legendapp/state';
import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv';
import {
  configureSyncedSupabase,
  syncedSupabase,
} from '@legendapp/state/sync-plugins/supabase';
import { v4 as uuidv4 } from 'uuid';

import { supabase } from '@/lib/supabase';

const generateId = () => uuidv4();

// Create a configured sync function
configureSyncedSupabase({
  generateId,
  changesSince: 'last-sync',
  fieldCreatedAt: 'created_at',
  fieldUpdatedAt: 'updated_at',
  fieldDeleted: 'deleted',
});

export const habits$ = observable(
  syncedSupabase({
    supabase,
    collection: 'habits',
    select: (from) =>
      from.select(
        'id,title,description,streak_count,last_checked_in,created_at,updated_at,deleted,user_id,color,icon,reminder_days,reminder_time'
      ),
    actions: ['read', 'create', 'update', 'delete'],
    realtime: true,
    persist: {
      plugin: ObservablePersistMMKV,
      name: 'habits',
      retrySync: true,
    },
    retry: {
      infinite: true,
    },
    onError: (error) => console.error('Synced Supabase error:', error),
  })
);

export const checkIns$ = observable(
  syncedSupabase({
    supabase,
    collection: 'check_ins',
    select: (from) =>
      from.select(
        'id,checked_at,created_at,deleted,frequency,habit_id,updated_at'
      ),
    actions: ['read', 'create', 'update', 'delete'],
    realtime: true,
    persist: {
      plugin: ObservablePersistMMKV,
      name: 'check_ins',
      retrySync: true,
    },
    retry: {
      infinite: true,
    },
    onError: (error) => console.error('Synced Supabase error:', error),
  })
);
