import { router } from 'expo-router';
import { useCallback } from 'react';
import { View } from 'react-native';

import { Button, Text } from '@/components/ui';
import { useIsFirstTime } from '@/lib/hooks/use-is-first-time';

export default function OnboardingScreen() {
  const [_, setIsFirstTime] = useIsFirstTime();

  const handleFinish = useCallback(() => {
    setIsFirstTime(false);
    router.replace('/(auth)/sign-in');
  }, [setIsFirstTime]);

  return (
    <View className="flex-1 items-center justify-center bg-white p-6 dark:bg-neutral-900">
      <View className="mb-8 items-center">
        <Text className="mb-4 text-6xl">🔥</Text>
        <Text className="mb-2 text-center text-2xl font-bold">
          Welcome to StreakSphere
        </Text>
        <Text className="text-center text-neutral-500">
          Build and maintain daily habits with our intuitive streak tracking
          system. Get motivated, stay consistent, and achieve your goals.
        </Text>
      </View>

      <View className="w-full space-y-4">
        <View className="space-y-2">
          <Text className="text-lg">🚀 Track Your Progress</Text>
          <Text className="text-lg">🎯 Set and Achieve Goals</Text>
          <Text className="text-lg">👥 Join the Community</Text>
        </View>

        <Button
          className="mt-8 w-full"
          onPress={handleFinish}
          testID="finish-onboarding-button"
        >
          <Text className="text-white">Get Started</Text>
        </Button>
      </View>
    </View>
  );
}
