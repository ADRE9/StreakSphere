/* eslint-disable react/no-unstable-nested-components */
import { Tabs } from 'expo-router';
import React from 'react';

import { Feed as FeedIcon } from '@/components/ui/icons';

export default function TabLayout() {
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
