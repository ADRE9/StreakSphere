/* eslint-disable react/no-unstable-nested-components */
import { Redirect, Tabs } from 'expo-router';
import React from 'react';

import { Feed as FeedIcon } from '@/components/ui/icons';
import { useAuth } from '@/lib/auth/use-auth';
import { useIsFirstTime } from '@/lib/hooks/use-is-first-time';

export default function TabLayout() {
  const { isAuthenticated } = useAuth();
  const [isFirstTime] = useIsFirstTime();

  if (isFirstTime) {
    return <Redirect href="/(auth)/onboarding" />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <FeedIcon color={color} />,
          tabBarButtonTestID: 'feed-tab',
        }}
      />
    </Tabs>
  );
}
