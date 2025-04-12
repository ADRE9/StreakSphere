import 'react-native-get-random-values';

import { v4 as uuidv4 } from 'uuid';

import { type HabitWithoutId } from '@/types/habit';
import { habits$ } from '@/utils/supa-legend';

import { createCheckIn } from './check-in-actions';

// Helper function to format time for Supabase
function formatTimeForSupabase(date: Date | string | null): string {
  if (!date) return '00:00:00';
  const d = new Date(date);
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
}

export const createHabit = (habit: HabitWithoutId) => {
  const id = uuidv4();
  habits$[id].set({
    id,
    ...habit,
    reminder_time: formatTimeForSupabase(habit.reminder_time),
    created_at: null,
    updated_at: null,
    deleted: false,
  });
  createCheckIn(id, 0);
};

export const updateHabit = (id: string, habit: HabitWithoutId) => {
  console.log('Updating--->');
  habits$[id].set({
    id,
    ...habit,
    reminder_time: formatTimeForSupabase(habit.reminder_time),
    created_at: null,
    updated_at: null,
    deleted: false,
  });
};

export const deleteHabit = (id: string) => {
  const existingHabit = habits$[id].get();
  if (!existingHabit) return;

  habits$[id].set({
    id,
    deleted: true,
    title: existingHabit.title,
    description: existingHabit.description,
    streak_count: existingHabit.streak_count,
    last_checked_in: existingHabit.last_checked_in,
    user_id: existingHabit.user_id || '',
    color: existingHabit.color,
    icon: existingHabit.icon,
    reminder_days: existingHabit.reminder_days,
    reminder_time: formatTimeForSupabase(existingHabit.reminder_time),
    created_at: null,
    updated_at: null,
  });
};
