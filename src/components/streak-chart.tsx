import { computed } from '@legendapp/state';
import { observer, use$ } from '@legendapp/state/react';
import { endOfMonth, getDate, getDaysInMonth, startOfMonth } from 'date-fns';
import React from 'react';

import { Pressable, View } from '@/components/ui';
import { checkIns$ } from '@/utils/supa-legend';
const DAYS_IN_MONTH = getDaysInMonth(new Date());

const generateStreakData = () => {
  const streakData = [];
  for (let i = 1; i <= DAYS_IN_MONTH; i++) {
    streakData.push({
      key: i,
      day: i,
      isEnabled: i <= getDate(new Date()),
    });
  }
  return streakData;
};

const streakData = generateStreakData();

type TStreakChart = {
  habitId: string;
  color: string;
};

const StreakChart = observer(({ habitId, color }: TStreakChart) => {
  // Get current month's start and end dates
  const currentMonthStart = startOfMonth(new Date());
  const currentMonthEnd = endOfMonth(new Date());

  // Create a computed observable that filters check-ins
  const monthlyCheckIns$ = computed(() => {
    const allCheckIns = checkIns$.get();
    return Object.values(allCheckIns).filter((checkIn) => {
      if (!checkIn.checked_at) return false;
      const checkedAt = new Date(checkIn.checked_at);
      return (
        checkIn.habit_id === habitId &&
        checkedAt >= currentMonthStart &&
        checkedAt <= currentMonthEnd
      );
    });
  });

  // Use the computed observable in your component
  const monthlyCheckIns = use$(monthlyCheckIns$);
  console.log('monthlyCheckIns', monthlyCheckIns, color);

  const handleDateStreakClick = (date: number) => {
    console.log(date);
  };
  return (
    <Pressable pointerEvents="box-none">
      <View className="mt-2  flex-1 flex-row flex-wrap items-center justify-center gap-2 rounded-xl bg-white p-5 dark:bg-neutral-900">
        {streakData.map((item) =>
          item.isEnabled ? (
            <Pressable
              onPress={() => handleDateStreakClick(item.day)}
              key={item.key}
              className="size-6 rounded-md  bg-gray-300 dark:bg-neutral-400"
            />
          ) : (
            <View
              key={item.key}
              className="size-6 rounded-md bg-gray-600 dark:bg-neutral-600"
            />
          )
        )}
      </View>
    </Pressable>
  );
});

export default StreakChart;
