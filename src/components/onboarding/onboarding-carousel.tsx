import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { Image } from 'expo-image';
import React, { forwardRef, useRef } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  type ViewToken,
} from 'react-native';
import Animated, {
  type SharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

import { OnboardingData, type OnboardingItem } from '@/data/onboarding-data';

const AnimatedFlashList = Animated.createAnimatedComponent(
  FlashList<OnboardingItem>
);

const { width } = Dimensions.get('window');

type OnboardingCarouselProps = {
  setCurrentIndex: (index: number) => void;
  scrollX: SharedValue<number>;
};

const OnboardingCarousel = forwardRef<
  FlashList<OnboardingItem>,
  OnboardingCarouselProps
>(function OnboardingCarousel({ setCurrentIndex, scrollX }, ref) {
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]) {
        setCurrentIndex(Number(viewableItems[0].index));
      }
    }
  ).current;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const renderItem: ListRenderItem<OnboardingItem> = ({ item }) => (
    <View style={styles.container}>
      <View className="flex-[2]">
        <Text className="absolute bottom-0 w-full text-center text-2xl font-bold dark:text-white">
          {item.title}
        </Text>
      </View>
      <View className="flex-[8]">
        <View className="my-10 flex-[9]">
          <Image
            source={item.image}
            contentFit="contain"
            className="size-full"
          />
        </View>
        <View className="flex-[1]">
          <Text className="mx-8  text-center text-lg font-bold dark:text-white">
            {item.description.toUpperCase()}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1">
      <AnimatedFlashList
        data={OnboardingData}
        horizontal
        ref={ref}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        snapToAlignment="center"
        decelerationRate="fast"
        bounces={false}
        scrollEnabled={false}
        onViewableItemsChanged={onViewableItemsChanged}
        onScroll={scrollHandler}
        pagingEnabled
        bouncesZoom={false}
        alwaysBounceHorizontal={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        estimatedItemSize={width}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: width,
    height: '100%',
  },
});

export default OnboardingCarousel;
