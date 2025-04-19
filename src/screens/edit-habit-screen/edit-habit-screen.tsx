import { useLocalSearchParams } from 'expo-router';
import React from 'react';

import HabitForm, { type TInitialData } from '@/components/habit-form';
import { type IconName } from '@/components/icons';
import { Text, View } from '@/components/ui';
import { type DaysArray } from '@/types/habit';
import { habits$ } from '@/utils/supa-legend';

const EditHabitScreen = () => {
  const { id } = useLocalSearchParams();

  const habit = habits$.get()[id as string];
  const getInitialData = (): TInitialData => {
    return {
      id: habit?.id,
      title: habit?.title,
      description: habit?.description ?? '',
      icon: habit?.icon as IconName,
      reminder_time: habit?.reminder_time ?? '',
      reminder_days: (habit?.reminder_days ?? []) as DaysArray,
      color: habit?.color,
      streak_count: habit?.streak_count,
    };
  };
  return (
    <View className="flex-1 pt-10">
      <View className="flex-1 px-6">
        <Text className="font-klasik text-3xl ">Edit Habit</Text>
        <View className="rounded-lg bg-charcoal-900 p-4">
          <HabitForm mode="edit" initialData={getInitialData()} />
        </View>
      </View>
    </View>
  );
};

export default EditHabitScreen;
