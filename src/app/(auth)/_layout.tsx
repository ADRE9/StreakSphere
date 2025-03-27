import { Redirect, Stack } from 'expo-router';
import React from 'react';

import { useAuthStore } from '@/lib/auth/store';

const AuthLayout = () => {
  const { status } = useAuthStore();

  if (status === 'signIn') {
    return <Redirect href="/(app)" />;
  }

  return <Stack />;
};

export default AuthLayout;
