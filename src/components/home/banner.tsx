import { Image } from 'expo-image';
import React from 'react';
import { View } from 'react-native';

import { Text } from '../ui';

const Banner = () => {
  return (
    <View className="flex-[2] flex-row items-center px-6 pt-2">
      <View className="flex-1">
        <Text className="font-klasik text-lg font-semibold">
          WE FIRST MAKE OUR HABITS,{'\n'}AND THEN OUR HABITS{'\n'}MAKES US
        </Text>
        <Text className="pt-2 font-inter text-sm font-light">- ANONYMOUS</Text>
      </View>
      <View>
        <Image
          contentFit="contain"
          source={require('/assets/images/pngs/banner.png')}
          style={{ width: 100, height: 100 }}
        />
      </View>
    </View>
  );
};

export default Banner;
