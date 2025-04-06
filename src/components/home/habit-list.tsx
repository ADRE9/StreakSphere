import { observer } from '@legendapp/state/react';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { View } from 'react-native';

import { Card } from '@/components/card';
import { habits$ } from '@/utils/supa-legend';

const HabitList = observer(() => {
  const habits = habits$.get();
  if (!habits) return null;

  const habitKeyArray = Object.keys(habits).map((key) => habits[key]);

  return (
    <View className="flex-[7]">
      <FlashList
        estimatedItemSize={200}
        bounces
        keyExtractor={(item) => item.id}
        data={habitKeyArray}
        renderItem={({ item }) => (
          <Card
            id={item.id}
            title={item.title}
            description={item.description}
            streak_count={item.streak_count}
            color={item.color}
            icon={item.icon}
            reminder_time={item.reminder_time}
            reminder_days={item.reminder_days}
            last_checked_in={item.last_checked_in ?? ''}
            created_at={item.created_at ?? ''}
            updated_at={item.updated_at ?? ''}
            deleted={null}
            user_id={''}
          />
        )}
      />
      <View className="h-[80] w-full" />
    </View>
  );
});

export default HabitList;
