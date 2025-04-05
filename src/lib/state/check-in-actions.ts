import 'react-native-get-random-values';

import { v4 as uuidv4 } from 'uuid';

import { checkIns$ } from '@/utils/supa-legend';

export const createCheckIn = (habitId: string, frequency: number) => {
  const id = uuidv4();
  checkIns$[id].assign({ id, habit_id: habitId, frequency });
};

export const updateCheckIn = (
  id: string,
  checkIn: { habit_id: string; frequency: number }
) => {
  checkIns$[id].assign({ id, ...checkIn });
};

export const deleteCheckIn = (id: string) => {
  checkIns$[id].assign({ id, deleted: true });
};
