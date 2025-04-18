import { use$ } from '@legendapp/state/react';
import { format } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { type ColorValue } from 'react-native';

import Backdrop from '@/components/backdrop';
import { FabButton } from '@/components/fab-button';
import StreakChart from '@/components/streak-chart';
import { colors, Text, View } from '@/components/ui';
import { fabState$, toggleFab } from '@/lib/state/fab-actions';
import { habits$ } from '@/utils/supa-legend';

const EditHabitScreen = () => {
  const { id, color } = useLocalSearchParams();
  const isOpen = use$(fabState$.isOpen);

  const habit = habits$.get()[id as string];
  return (
    <View className="flex-1 pt-10">
      <View className="flex-1 px-6">
        <Text className="font-klasik text-3xl ">
          {habit?.title}{' '}
          <Text className=" text-sm text-neutral-500">
            ({format(new Date(), 'MMMM')})
          </Text>
        </Text>
        <Text className="text-sm text-neutral-500">{habit?.description}</Text>
        <StreakChart
          habitId={id as string}
          color={color as string}
          className="justify-start px-0 py-6"
        />
        <View
          style={{
            borderColor: color ? (color as ColorValue) : colors.primary[500],
            borderWidth: 1,
          }}
          className="rounded-lg bg-primary-300 p-4 dark:bg-transparent"
        >
          <Text className="font-klasik text-lg text-neutral-500">
            Reminder Days
          </Text>
          <View className="flex-row flex-wrap gap-2 pt-2">
            {habit?.reminder_days?.map((day) => (
              <View
                key={day}
                style={{
                  backgroundColor: color
                    ? (color as ColorValue)
                    : colors.primary[500],
                }}
                className="w-14 items-center justify-center rounded-md p-1"
              >
                <Text className="text-sm text-neutral-500">
                  {day.toUpperCase()}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {isOpen && <Backdrop onPress={() => toggleFab()} duration={500} />}
      <FabButton
        header="Edit Habit"
        panelStyle={{
          backgroundColor: colors.primary[500],
          left: '50%',
          transform: [{ translateX: '-50%' }, { translateY: '40%' }],
        }}
      >
        <Text>Edit Habit</Text>
      </FabButton>
    </View>
  );
};

export default EditHabitScreen;
