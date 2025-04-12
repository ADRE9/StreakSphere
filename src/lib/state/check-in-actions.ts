import 'react-native-get-random-values';

import { v4 as uuidv4 } from 'uuid';

import { checkIns$ } from '@/utils/supa-legend';

export const createCheckIn = (
  habitId: string,
  frequency: number,
  date: Date
) => {
  const id = uuidv4();
  checkIns$[id].set({
    id,
    habit_id: habitId,
    frequency,
    checked_at: date.toISOString(),
    created_at: null,
    updated_at: null,
    deleted: false,
  });
};

export const updateCheckIn = (
  id: string,
  habitId: string,
  frequency: number,
  date: Date
  // eslint-disable-next-line max-params
) => {
  checkIns$[id].set({
    id,
    habit_id: habitId,
    frequency,
    checked_at: date.toISOString(),
    updated_at: null,
    created_at: null,
    deleted: false,
  });
};

export const deleteCheckIn = (id: string) => {
  checkIns$[id].set({
    id,
    deleted: true,
    checked_at: '',
    created_at: null,
    frequency: null,
    habit_id: null,
    updated_at: null,
  });
};
