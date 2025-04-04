import { type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { type ImageSourcePropType, Pressable, View } from 'react-native';

import TabBaseSvg from './tab-base-svg';

export type TabBarItem = {
  key: string;
  label: string;
  icon: ImageSourcePropType;
  route: `/(app)${string}`;
};

const TabBarData: TabBarItem[] = [
  {
    key: 'index',
    label: 'Home',
    icon: require('/assets/images/pngs/home.png'),
    route: '/(app)',
  },
  {
    key: 'todo',
    label: 'Todos',
    icon: require('/assets/images/pngs/todo.png'),
    route: '/(app)/todo',
  },
  {
    key: 'pomodoro',
    label: 'Timer',
    icon: require('/assets/images/pngs/community.png'),
    route: '/(app)/pomodoro',
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: require('/assets/images/pngs/settings.png'),
    route: '/(app)/settings',
  },
];

const TabBar = ({ state }: BottomTabBarProps) => {
  const router = useRouter();

  return (
    <View className="absolute inset-x-0 bottom-0 h-[80] flex-row items-center justify-between px-4  py-2">
      <TabBaseSvg className="absolute inset-0" />
      {TabBarData.map((item) => {
        const isActive = state.routes[state.index].name === item.key;
        return (
          <Pressable
            className="flex-1 items-center justify-center"
            key={item.key}
            onPress={() => router.push(item.route)}
          >
            <Image
              style={{
                opacity: isActive ? 1 : 0.5,
              }}
              source={item.icon}
              className="size-10"
              contentFit="contain"
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default TabBar;
