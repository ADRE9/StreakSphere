import { View } from 'react-native';

import { OnboardingData } from '@/data/onboarding-data';

const Pagination = ({ currentIndex }: { currentIndex: number }) => (
  <View className="flex-row items-center justify-center gap-3 space-x-2">
    {OnboardingData.map((_, index) => (
      <View
        key={index}
        className={`size-2 rounded-full ${
          currentIndex === index ? 'size-3 bg-primary-500' : 'bg-neutral-300'
        }`}
      />
    ))}
  </View>
);

export default Pagination;
