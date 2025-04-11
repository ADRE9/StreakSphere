import { BlurView } from 'expo-blur';
import { Link } from 'expo-router';
import React from 'react';
import { useColorScheme, View } from 'react-native';

import { Pressable, Text } from '@/components/ui';
import { type THabit } from '@/types/habit';

import Icon, { type IconName } from './icons';
import StreakButton from './streak-button';

type Props = Omit<THabit, 'created_at' | 'updated_at' | 'user_id'>;

export const Card = ({ title, id, color, icon, description }: Props) => {
  const colorScheme = useColorScheme();
  return (
    <Link href={`/(app)/(habit)/${id}`} asChild>
      <Pressable className="mx-4 my-2 overflow-hidden rounded-xl dark:border dark:border-neutral-500">
        <BlurView
          experimentalBlurMethod={'dimezisBlurView'}
          intensity={30}
          tint={
            colorScheme === 'light'
              ? 'systemThinMaterialDark'
              : 'systemThinMaterialLight'
          }
          className="flex-1 p-4"
        >
          <View className="flex-1 flex-row">
            <View
              style={{ backgroundColor: `${color}40` }}
              className="size-12 items-center justify-center rounded-lg"
            >
              <Icon name={icon as IconName} size={24} color={color} />
            </View>
            <View className="flex-1 px-2">
              <Text className="font-klasik text-2xl">{title}</Text>
              <Text className="font-regular font-manrope text-sm">
                {description}
              </Text>
            </View>
            <StreakButton maxStreak={6} currentStreak={2} color={color} />
          </View>
          <View className="mt-2 h-[80] w-full flex-1 rounded-lg bg-black"></View>
        </BlurView>
      </Pressable>
    </Link>
  );
};
