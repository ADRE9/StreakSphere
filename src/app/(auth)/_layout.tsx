import { Redirect, Stack } from 'expo-router';
import React from 'react';

import { FocusAwareStatusBar } from '@/components/ui';
import { useAuth } from '@/lib/auth/use-auth';
const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/" />;
  }

  return (
    <>
      <FocusAwareStatusBar hidden />
      <Stack
        initialRouteName="onboarding"
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      />
    </>
  );
};

export default AuthLayout;
