/* eslint-disable react/no-unstable-nested-components */
import { Redirect, Tabs } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { SystemBars } from 'react-native-edge-to-edge';

import TabBar from '@/components/ui/tab-bar';
import { useAuth } from '@/lib/auth/use-auth';
import { useIsFirstTime } from '@/lib/hooks/use-is-first-time';
export default function TabLayout() {
  const { isAuthenticated } = useAuth();
  const [isFirstTime] = useIsFirstTime();
  const { colorScheme } = useColorScheme();
  if (isFirstTime) {
    return <Redirect href="/(auth)/onboarding" />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <>
      <SystemBars
        style={colorScheme === 'dark' ? 'light' : 'dark'}
        hidden={false}
      />
      <Tabs
        screenOptions={{ headerShown: false, animation: 'shift' }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Feed',
            tabBarButtonTestID: 'feed-tab',
          }}
        />
        <Tabs.Screen
          name="todo"
          options={{
            title: 'Todo',
            tabBarButtonTestID: 'feed-tab',
          }}
        />
        {/* TODO: Add pomodoro */}
        {/* <Tabs.Screen
        name="pomodoro"
        options={{
          title: 'Pomodoro',
          tabBarButtonTestID: 'feed-tab',
        }}
      /> */}
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarButtonTestID: 'feed-tab',
          }}
        />
      </Tabs>
    </>
  );
}
