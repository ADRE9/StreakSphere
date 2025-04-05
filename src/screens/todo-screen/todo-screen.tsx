import React from 'react';
import { View } from 'react-native';

import Header from '@/components/home/header';

const TodoScreen = () => {
  return (
    <View className="flex-1 bg-blue-100 dark:bg-charcoal-800">
      <Header title="TODO" />
      <View className="flex-[8]"></View>
    </View>
  );
};

export default TodoScreen;
