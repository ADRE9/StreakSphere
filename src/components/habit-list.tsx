import { observer } from '@legendapp/state/react';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { View } from 'react-native';

import { habits$ as _habits$ } from '@/utils/supa-legend';

import { Card } from './card';

const HabitList = observer(() => {
  const habits = _habits$.get();

  console.log('habits', habits);
  return (
    <View className="flex-[7]">
      <FlashList
        estimatedItemSize={200}
        bounces
        data={[
          { title: 'Gym', body: 'Exercise everyday', id: 1, userId: 1 },
          {
            title: 'Drink Water',
            body: 'Minimum 5 litres',
            id: 1,
            userId: 1,
          },
          { title: 'Gym2', body: 'Exercise everyday', id: 3, userId: 1 },
          {
            title: 'Drink Water2',
            body: 'Minimum 5 litres',
            id: 4,
            userId: 1,
          },
        ]}
        renderItem={({ item }) => <Card {...item} />}
      />
      <View className="h-[80] w-full" />
    </View>
  );
});

export default HabitList;
