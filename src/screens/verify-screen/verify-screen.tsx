import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Button, Text } from '@/components/ui';
import { useAuthStore } from '@/lib/auth/store';

export default function VerifyScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { isEmailVerified, checkEmailVerification, resendVerificationEmail } =
    useAuthStore();

  useEffect(() => {
    const checkVerification = async () => {
      await checkEmailVerification();
      if (isEmailVerified) {
        router.replace('/(app)' as any);
      }
    };
    checkVerification();
  }, [checkEmailVerification, isEmailVerified]);

  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      await resendVerificationEmail();
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
        onPress={() => router.replace('/sign-in' as any)}
      >
        <Text>Back to Sign In</Text>
      </Button>
    </View>
  );
}
