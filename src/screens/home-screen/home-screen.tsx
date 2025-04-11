import React, { useState } from 'react';
import { useColorScheme, View } from 'react-native';

import AddHabitForm from '@/components/add-habit-form';
import Backdrop from '@/components/backdrop';
import BgDoodleImage from '@/components/bg-doodle-image';
import { FabButton } from '@/components/fab-button';
import Banner from '@/components/home/banner';
import HabitList from '@/components/home/habit-list';
import Header from '@/components/home/header';
import { colors } from '@/components/ui';

const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View className="flex-1 bg-blue-100 dark:bg-charcoal-800">
      <BgDoodleImage colorScheme={colorScheme ?? 'light'} />
      <Header title="HOME" />
      <Banner />
      <HabitList />
      {isOpen && <Backdrop onPress={() => setIsOpen(false)} duration={500} />}
      <FabButton
        header="Add Habit"
        raise={40}
        panelStyle={{
          backgroundColor: colors.primary[500],
          left: '50%',
          transform: [{ translateX: '-50%' }, { translateY: '40%' }],
        }}
        duration={500}
        onPress={() => {
          setIsOpen((prev) => !prev);
        }}
        isOpen={isOpen}
      >
        <AddHabitForm />
      </FabButton>
    </View>
  );
};

export default HomeScreen;
