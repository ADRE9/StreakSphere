import React, { type Dispatch, type SetStateAction } from 'react';
import { useColorScheme } from 'react-native';

import { type THabitFeature } from './habit-form';
import Icon, { type IconName } from './icons';
import { Pressable, View } from './ui';

const ICON_LIST: { key: string; name: IconName }[] = [
  { key: '01', name: 'AirVent' },
  { key: '02', name: 'Dumbbell' },
  { key: '03', name: 'Book' },
  { key: '04', name: 'Heart' },
  { key: '05', name: 'Star' },
  { key: '06', name: 'Sun' },
  { key: '07', name: 'Moon' },
  { key: '08', name: 'Cloud' },
  { key: '09', name: 'CloudSun' },
  { key: '10', name: 'CloudMoon' },
  { key: '11', name: 'CloudRain' },
  { key: '14', name: 'CloudSunRain' },
  { key: '15', name: 'CloudMoonRain' },
  { key: '16', name: 'Music' },
  { key: '17', name: 'Music2' },
  { key: '18', name: 'Music3' },
  { key: '19', name: 'Music4' },
  { key: '20', name: 'Play' },
  { key: '21', name: 'Backpack' },
  { key: '22', name: 'CableCar' },
  { key: '23', name: 'TrainFront' },
  { key: '24', name: 'Bus' },
  { key: '25', name: 'Car' },
  { key: '26', name: 'BicepsFlexed' },
];

type IconCardProps = {
  onSelect: Dispatch<SetStateAction<THabitFeature>>;
  selectedIcon: IconName | null;
};

const IconCard = ({ onSelect, selectedIcon }: IconCardProps) => {
  const colorScheme = useColorScheme();
  return (
    <View className="flex-row flex-wrap justify-center gap-2 rounded-lg bg-primary-700 p-2">
      {ICON_LIST.map((icon) => {
        return (
          <Pressable
            style={{
              borderWidth: selectedIcon === icon.name ? 1 : 0,
              borderColor: 'white',
            }}
            className="size-8 items-center justify-center rounded-md bg-primary-300"
            key={icon.key}
            onPress={() => {
              onSelect((prev) => ({ ...prev, icon: icon.name }));
            }}
          >
            <Icon
              size={18}
              name={icon.name}
              color={colorScheme === 'dark' ? 'white' : 'black'}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default IconCard;
