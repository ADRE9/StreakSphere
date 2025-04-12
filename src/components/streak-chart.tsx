import { getDate, getDaysInMonth } from 'date-fns';
import React from 'react';

import { Pressable, View } from '@/components/ui';

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

const StreakChart = () => {
  const handleDateStreakClick = (date: number) => {
    console.log(date);
  };
  return (
    <View className="mt-2  flex-1 flex-row flex-wrap items-center justify-center gap-2 rounded-xl bg-white p-5 dark:bg-neutral-900">
      {streakData.map((item) =>
        item.isEnabled ? (
          <Pressable
            onPress={() => handleDateStreakClick(item.day)}
            key={item.key}
            className="size-6 rounded-md  bg-gray-300 dark:bg-neutral-400"
          />
        ) : (
          <Pressable
            disabled
            key={item.key}
            className="size-6 rounded-md bg-gray-600 dark:bg-neutral-600 "
          />
        )
      )}
    </View>
  );
};

export default StreakChart;
