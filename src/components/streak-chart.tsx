import { computed } from '@legendapp/state';
import { observer, use$ } from '@legendapp/state/react';
import {
  endOfMonth,
  getDate,
  getDaysInMonth,
  isSameDay,
  startOfMonth,
} from 'date-fns';
import React from 'react';

import { Pressable, View } from '@/components/ui';
import { generateColorShades } from '@/lib/utils/color-utils';
import { createSafeDateFromDay } from '@/lib/utils/create-safe-date-from-day';
import { checkIns$, habits$ } from '@/utils/supa-legend';

const DAYS_IN_MONTH = getDaysInMonth(new Date());

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
    if (!allCheckIns) return [];
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
  const max_streak = use$(habits$[habitId].streak_count);
  const colorShades = generateColorShades(color, max_streak);

  const generatedStreakData$ = computed(() => {
    const streakData = [];
    for (let i = 1; i <= DAYS_IN_MONTH; i++) {
      const date = createSafeDateFromDay(i);
      const checkedIns = monthlyCheckIns.find((checkIn) =>
        isSameDay(new Date(checkIn.checked_at), date)
      );
      streakData.push({
        key: i + habitId,
        day: i,
        color: checkedIns ? colorShades[checkedIns.frequency ?? 0] : 'gray',
        isEnabled: i <= getDate(new Date()),
      });
    }
    return streakData;
  });

  const handleDateStreakClick = (date: number) => {
    console.log(date);
  };
  return (
    <Pressable pointerEvents="box-none">
      <View className="mt-2  flex-1 flex-row flex-wrap items-center justify-center gap-2 rounded-xl bg-white p-5 dark:bg-neutral-900">
        {generatedStreakData$
          .get()
          .map((item) =>
            item.isEnabled ? (
              <Pressable
                onPress={() => handleDateStreakClick(item.day)}
                key={item.key}
                className="size-6 rounded-md"
                style={{ backgroundColor: item.color }}
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
