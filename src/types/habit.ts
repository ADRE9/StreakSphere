export type THabit = {
  id: string;
  title: string;
  icon: string;
  description: string | null;
  streak_count: number;
  reminder_time: string;
  reminder_days: string[];
  last_checked_in: string;
  color: string;
  created_at: string;
  updated_at: string;
};

export type HabitWithoutId = Omit<THabit, 'id'>;
