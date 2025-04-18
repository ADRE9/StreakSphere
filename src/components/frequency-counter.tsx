import React, { type Dispatch, type SetStateAction } from 'react';
import { Pressable, Text, View } from 'react-native';

import { type THabitFeature } from './habit-form';

type TFrequencyCounterProps = {
  selectedFrequency: number | null;
  setSelectedFrequency: Dispatch<SetStateAction<THabitFeature>>;
};

const FrequencyCounter = ({
  selectedFrequency,
  setSelectedFrequency,
}: TFrequencyCounterProps) => {
  return (
    <View className="my-2 flex-row items-center justify-between">
      <Text>Times per day</Text>
      <View className="flex-row items-center gap-2">
        <Pressable
          className="size-8 items-center justify-center rounded-full bg-gray-200"
          onPress={() =>
            setSelectedFrequency((prev) => ({
              ...prev,
              frequency: prev.frequency + 1,
            }))
          }
        >
          <Text>+</Text>
        </Pressable>
        <Text>{selectedFrequency}</Text>
        <Pressable
          className="size-8 items-center justify-center rounded-full bg-gray-200"
          disabled={selectedFrequency === 1}
          onPress={() =>
            setSelectedFrequency((prev) => ({
              ...prev,
              frequency:
                selectedFrequency === 1 ? prev.frequency : prev.frequency - 1,
            }))
          }
        >
          <Text>-</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FrequencyCounter;
