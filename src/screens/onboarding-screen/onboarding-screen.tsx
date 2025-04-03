/* eslint-disable max-lines-per-function */
import { type FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import OnboardingCarousel from '@/components/onboarding/onboarding-carousel';
import Pagination from '@/components/onboarding/pagination';
import { Text } from '@/components/ui';
import { OnboardingData, type OnboardingItem } from '@/data/onboarding-data';
import { useIsFirstTime } from '@/lib/hooks/use-is-first-time';

export default function OnboardingScreen() {
  const flashListRef = useRef<FlashList<OnboardingItem>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const [_, setIsFirstTime] = useIsFirstTime();

  const handleFinish = useCallback(() => {
    setIsFirstTime(false);
    router.replace('/(auth)/sign-in');
  }, [setIsFirstTime]);

  const handleNext = () => {
    if (currentIndex < OnboardingData.length - 1) {
      flashListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else if (currentIndex === OnboardingData.length - 1) {
      handleFinish();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      flashListRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      });
    }
    if (currentIndex === 0) {
      handleFinish();
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <View className="flex-[8]">
        <OnboardingCarousel
          ref={flashListRef}
          setCurrentIndex={setCurrentIndex}
          scrollX={scrollX}
        />
      </View>
      <View className="flex-[2]">
        <View className="h-12 flex-row">
          <View className="flex-1 items-center justify-center ">
            <Pressable onPress={handlePrevious}>
              <Text
                className={`${currentIndex === 0 ? 'text-primary-500' : ''}`}
              >
                {currentIndex === 0 ? 'Skip' : 'Previous'}
              </Text>
            </Pressable>
          </View>
          <View className="flex-1 items-center justify-center">
            <Pagination currentIndex={currentIndex} />
          </View>
          <View className="flex-1 items-center justify-center ">
            <Pressable onPress={handleNext} className="">
              <Text
                className={`${currentIndex === OnboardingData.length - 1 ? 'text-primary-500' : ''}`}
              >
                {currentIndex === OnboardingData.length - 1
                  ? 'Get Started'
                  : 'Next'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
