import { Redirect, Stack } from 'expo-router';
import React from 'react';

import { useAuth } from '@/lib/auth/use-auth';
const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/" />;
  }

  return <Stack />;
};

export default AuthLayout;
