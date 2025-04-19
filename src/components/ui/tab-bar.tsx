import { type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Image } from 'expo-image';
import React from 'react';
import { type ImageSourcePropType, Pressable, View } from 'react-native';

import TabBaseSvg from './tab-base-svg';

export type TabBarItem = {
  key: string;
  label: string;
  icon: ImageSourcePropType;
  route: `${string}`;
};

const TabBarData: TabBarItem[] = [
  {
    key: 'index',
    label: 'Home',
    icon: require('/assets/images/pngs/home.png'),
    route: 'index',
  },
  {
    key: 'todo',
    label: 'Todos',
    icon: require('/assets/images/pngs/todo.png'),
    route: 'todo',
  },
  // TODO: Add pomodoro
  // {
  //   key: 'pomodoro',
  //   label: 'Timer',
  //   icon: require('/assets/images/pngs/community.png'),
  //   route: 'pomodoro',
  // },
  {
    key: 'settings',
    label: 'Settings',
    icon: require('/assets/images/pngs/settings.png'),
    route: 'settings',
  },
];

const TabBar = ({ state, navigation }: BottomTabBarProps) => {
  return (
    <View className="absolute inset-x-0 bottom-0 h-[80] w-full flex-row items-center justify-between px-4 py-2">
      <TabBaseSvg className="absolute inset-0 w-full" />
      {TabBarData.map((item) => {
        const isActive = state.routes[state.index].name === item.key;
        return (
          <Pressable
            className="flex-1 items-center justify-center pt-6"
            key={item.key}
            onPress={() => navigation.navigate(item.route)}
          >
            <Image
              style={{
                opacity: isActive ? 1 : 0.9,
              }}
              source={item.icon}
              className="size-8"
              contentFit="contain"
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default TabBar;
