export type Day = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export type DaysArray = Day[];

export type THabit = {
  id: string;
  title: string;
  icon: string;
  description: string | null;
  streak_count: number;
  reminder_time: string | null;
  deleted: boolean | null;
  user_id: string;
  reminder_days: DaysArray | null;
  last_checked_in: string;
  color: string;
  created_at: null;
  updated_at: null;
};

export type HabitWithoutId = Omit<THabit, 'id'>;
