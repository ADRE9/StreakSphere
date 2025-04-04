import React from 'react';
import { View } from 'react-native';

import { Text } from '../ui';

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <View className="flex-1">
      <View className="absolute bottom-0 w-full flex-row items-center justify-center ">
        <Text className="font-klasik text-3xl">{title}</Text>
      </View>
    </View>
  );
};

export default Header;
