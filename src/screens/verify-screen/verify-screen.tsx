import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { Button, Text } from '@/components/ui';

export default function VerifyScreen() {
  const [isLoading, setIsLoading] = useState(false);

  // Monitor verification status and redirect when verified

  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="mb-4 text-center text-2xl font-bold">
        Verify Your Email
      </Text>
      <Text className="mb-8 text-center text-neutral-500">
        We've sent a verification link to your email address. Please check your
        inbox and click the link to verify your account.
      </Text>
      <Button
        className="w-full"
        onPress={handleResendEmail}
        disabled={isLoading}
      >
        <Text className="text-white">
          {isLoading ? 'Sending...' : 'Resend Verification Email'}
        </Text>
      </Button>
      <Button
        className="mt-4 w-full"
        variant="outline"
        onPress={() => router.replace('/(auth)/sign-in')}
      >
        <Text>Back to Sign In</Text>
      </Button>
    </View>
  );
}
