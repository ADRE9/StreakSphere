import { Stack } from 'expo-router';
import React from 'react';

import { useSession } from '@/lib/hooks';

const AuthLayout = () => {
  const { session } = useSession();
  console.log('Session---->', session);
  return <Stack />;
};

export default AuthLayout;
