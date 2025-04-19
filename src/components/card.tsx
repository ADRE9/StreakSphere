import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import React from 'react';
import { useColorScheme, View } from 'react-native';

import Icon, { type IconName } from '@/components/icons';
import StreakButton from '@/components/streak-button';
import StreakChart from '@/components/streak-chart';
import { Text } from '@/components/ui';
import { deleteHabit } from '@/lib/state/habits-actions';
import { type THabit } from '@/types/habit';

import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuItemTitle,
  ContextMenuRoot,
  ContextMenuTrigger,
} from './ui/context-menu';

type TCardProps = Omit<
  THabit,
  'created_at' | 'updated_at' | 'user_id' | 'reminder_days' | 'reminder_time'
>;

export const Card = ({ title, id, color, icon, description }: TCardProps) => {
  const colorScheme = useColorScheme();
  return (
    <ContextMenuRoot>
      <ContextMenuTrigger>
        <View className="mx-4 my-2 overflow-hidden rounded-xl dark:border dark:border-neutral-500">
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
              <StreakButton habitId={id} color={color} />
            </View>
            <StreakChart habitId={id} color={color} />
          </BlurView>
        </View>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onSelect={() =>
            router.push({
              pathname: '/(app)/(habit)/[id]',
              params: { id },
            })
          }
          key="edit"
        >
          <ContextMenuItemTitle>Edit</ContextMenuItemTitle>
        </ContextMenuItem>
        <ContextMenuItem
          onSelect={() => deleteHabit(id)}
          key="delete"
          destructive
        >
          <ContextMenuItemTitle>Delete</ContextMenuItemTitle>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenuRoot>
  );
};
