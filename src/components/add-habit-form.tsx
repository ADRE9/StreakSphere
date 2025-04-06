/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { z } from 'zod';

import ColorCard from '@/components/color-card';
import FrequencyCounter from '@/components/frequency-counter';
import IconCard from '@/components/icon-card';
import { type IconName } from '@/components/icons';
import { Button, ControlledInput, Text, View } from '@/components/ui';
import { useAuth } from '@/lib/auth/use-auth';
import { createHabit } from '@/lib/state/habits-actions';
const schema = z.object({
  title: z.string().min(1, 'Habit name is required'),
  description: z.string().min(1, 'Description is required'),
});

export type THabitFeature = {
  icon: IconName | null;
  color: string | null;
  frequency: number;
};

type FormType = z.infer<typeof schema>;

const AddHabitForm = () => {
  const [selectedHabitFeature, setSelectedHabitFeature] =
    useState<THabitFeature>({
      icon: null,
      color: null,
      frequency: 1,
    });
  const { user } = useAuth();

  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = (data: FormType) => {
    if (
      !selectedHabitFeature.icon ||
      !selectedHabitFeature.color ||
      !selectedHabitFeature.frequency
    ) {
      Toast.show({
        type: 'error',
        text1: 'Please select all features',
      });
      return;
    }
    const habitObject = {
      ...data,
      icon: selectedHabitFeature.icon as string,
      color: selectedHabitFeature.color,
      streak_count: 0,
      user_id: user!.id,
      deleted: false,
      reminder_time: new Date().toISOString(),
      reminder_days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
      last_checked_in: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    console.log('habitObject', habitObject);
    createHabit(habitObject);
  };

  return (
    <View>
      <Text className="mb-2">Let's get started. Add a habit to your life.</Text>
      <ControlledInput
        placeholder="*Habit name (Drink water,Exercise,etc)"
        name="title"
        control={control}
      />
      <ControlledInput
        placeholder="*Description (Gym, Yoga, etc)"
        name="description"
        control={control}
      />
      <IconCard
        selectedIcon={selectedHabitFeature.icon}
        onSelect={setSelectedHabitFeature}
      />
      <ColorCard
        selectedColor={selectedHabitFeature.color}
        onSelect={setSelectedHabitFeature}
      />
      <FrequencyCounter
        selectedFrequency={selectedHabitFeature.frequency}
        setSelectedFrequency={setSelectedHabitFeature}
      />
      <Button variant="outline" onPress={handleSubmit(onSubmit)}>
        <Text>Add habit</Text>
      </Button>
    </View>
  );
};

export default AddHabitForm;
