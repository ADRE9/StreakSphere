import 'react-native-get-random-values';

import { v4 as uuidv4 } from 'uuid';

import { checkIns$ } from '@/utils/supa-legend';

export const createCheckIn = (habitId: string, frequency: number) => {
  const id = uuidv4();
  const now = new Date().toISOString();
  checkIns$[id].set({
    id,
    habit_id: habitId,
    frequency,
    checked_at: now,
    created_at: now,
    updated_at: now,
    deleted: false,
  });
};

export const updateCheckIn = (
  id: string,
  checkIn: { habit_id: string; frequency: number }
) => {
  const now = new Date().toISOString();
  checkIns$[id].set({
    id,
    ...checkIn,
    checked_at: now,
    updated_at: now,
    created_at: checkIns$[id].get()?.created_at || now,
    deleted: false,
  });
};

export const deleteCheckIn = (id: string) => {
  const now = new Date().toISOString();
  checkIns$[id].set({
    id,
    deleted: true,
    updated_at: now,
    checked_at: checkIns$[id].get()?.checked_at || null,
    created_at: checkIns$[id].get()?.created_at || now,
    frequency: checkIns$[id].get()?.frequency || null,
    habit_id: checkIns$[id].get()?.habit_id || null,
  });
};
