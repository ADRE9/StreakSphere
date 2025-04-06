import 'react-native-get-random-values';

import { v4 as uuidv4 } from 'uuid';

import { type HabitWithoutId } from '@/types/habit';
import { habits$ } from '@/utils/supa-legend';

export const createHabit = (habit: HabitWithoutId) => {
  const id = uuidv4();
  console.log('I am running!');
  habits$[id].set({ id, ...habit });
};

export const updateHabit = (id: string, habit: HabitWithoutId) => {
  habits$[id].set({ id, ...habit });
};

// export const deleteHabit = (id: string) => {
//   habits$[id].assign({ id, deleted: true });
// };
