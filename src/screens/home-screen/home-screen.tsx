import Entypo from '@expo/vector-icons/Entypo';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Pressable, useColorScheme, View } from 'react-native';

import BgDoodleImage from '@/components/bg-doodle-image';
import { Card } from '@/components/card';
import Banner from '@/components/home/banner';
import Header from '@/components/home/header';

const HomeScreen = () => {
  const colorScheme = useColorScheme();
  return (
    <View className="flex-1 bg-blue-100 dark:bg-charcoal-800">
      <BgDoodleImage colorScheme={colorScheme ?? 'light'} />
      <Header title="HOME" />
      <Banner />
      <View className="flex-[7]">
        <FlashList
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
      <Pressable
        style={{
          boxShadow: '0px 0px 0px 5px rgba(178, 76, 0, 0.1)',
          transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
        }}
        className="absolute bottom-[50] left-1/2 rounded-full bg-primary-400 p-3"
      >
        <Entypo name="plus" size={24} color="#B24C00" />
      </Pressable>
    </View>
  );
};

export default HomeScreen;
