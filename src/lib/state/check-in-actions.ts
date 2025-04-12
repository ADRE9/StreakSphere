import 'react-native-get-random-values';

import { v4 as uuidv4 } from 'uuid';

import { checkIns$ } from '@/utils/supa-legend';

const now = new Date().toISOString();

export const createCheckIn = (habitId: string, frequency: number) => {
  const id = uuidv4();
  checkIns$[id].set({
    id,
    habit_id: habitId,
    frequency,
    checked_at: now,
    created_at: null,
    updated_at: null,
    deleted: false,
  });
};

export const updateCheckIn = (
  id: string,
  habitId: string,
  frequency: number
) => {
  checkIns$[id].set({
    id,
    habit_id: habitId,
    frequency: frequency,
    checked_at: now,
    updated_at: null,
    created_at: null,
    deleted: false,
  });
};

export const deleteCheckIn = (id: string) => {
  const now = new Date().toISOString();
  checkIns$[id].set({
    id,
    deleted: true,
    updated_at: null,
    checked_at: now,
    created_at: null,
    frequency: checkIns$[id].get()?.frequency || null,
    habit_id: checkIns$[id].get()?.habit_id || null,
  });
};

type TCheckIn = Record<
  string,
  {
    id: string;
    checked_at: string | null;
    created_at: string | null;
    deleted: boolean | null;
    frequency: number | null;
    habit_id: string | null;
    updated_at: string | null;
  }
>;

export const getTodaysCheckInId = (habitId: string, checkIns: TCheckIn) => {
  const today = new Date();
  if (!checkIns) return null;
  const todaysCheckInId = Object.keys(checkIns).find((checkIn) => {
    const checkInDate = checkIns[checkIn].checked_at;
    if (!checkInDate) return false;
    const date = new Date(checkInDate);
    return (
      date.toDateString() === today.toDateString() &&
      checkIns[checkIn].habit_id === habitId
    );
  });

  return todaysCheckInId;
};
