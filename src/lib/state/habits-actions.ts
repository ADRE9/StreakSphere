import 'react-native-get-random-values';

import { v4 as uuidv4 } from 'uuid';

import { dateToTimeString } from '@/lib/utils/date-utils';
import { type HabitWithoutId } from '@/types/habit';
import { habits$ } from '@/utils/supa-legend';

export const createHabit = (habit: HabitWithoutId) => {
  const id = uuidv4();

  // Create the habit
  habits$[id].set({
    id,
    ...habit,
    reminder_time: dateToTimeString(habit.reminder_time),
    created_at: null,
    updated_at: null,
    deleted: false,
  });
};

export const updateHabit = (id: string, habit: HabitWithoutId) => {
  habits$[id].set({
    id,
    ...habit,
    reminder_time: dateToTimeString(habit.reminder_time),
    created_at: null,
    updated_at: null,
    deleted: false,
  });
};

export const deleteHabit = (id: string) => {
  const existingHabit = habits$[id].get();
  if (!existingHabit) return;

  // Perform a hard delete
  habits$[id].delete();
};
