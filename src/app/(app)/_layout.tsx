/* eslint-disable react/no-unstable-nested-components */
import { Redirect, Tabs } from 'expo-router';
import React from 'react';

import TabBar from '@/components/ui/tab-bar';
import { useAuth } from '@/lib/auth/use-auth';
import { useIsFirstTime } from '@/lib/hooks/use-is-first-time';
export default function TabLayout() {
  const { isAuthenticated } = useAuth();
  const [isFirstTime] = useIsFirstTime();

  if (isFirstTime) {
    console.log('redirecting to onboarding');
    return <Redirect href="/(auth)/onboarding" />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
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
        name="pomodoro"
        options={{
          title: 'Pomodoro',
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
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarButtonTestID: 'feed-tab',
        }}
      />
    </Tabs>
  );
}
