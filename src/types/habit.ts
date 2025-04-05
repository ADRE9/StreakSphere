export type Habit = {
  id: string;
  title: string;
  icon: string;
  description: string;
  streak_count: number;
  reminder_time: string;
  reminder_days: string[];
  last_checked_in: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
};

export type HabitWithoutId = Omit<Habit, 'id'>;
