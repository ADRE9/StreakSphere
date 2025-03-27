/* eslint-disable react/no-unstable-nested-components */
import { Redirect, Tabs } from 'expo-router';
import React from 'react';

import { Feed as FeedIcon } from '@/components/ui/icons';
import { useAuthStore } from '@/lib/auth/store';
import { useIsFirstTime } from '@/lib/hooks/use-is-first-time';

export default function TabLayout() {
  const [isFirstTime] = useIsFirstTime();
  const { status, session } = useAuthStore();

  if (isFirstTime) {
    console.log('redirecting to onboarding');
    return <Redirect href="/(auth)/onboarding" />;
  }

  if (status === 'signOut' || !session) {
    console.log('redirecting to sign-in', session);
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
