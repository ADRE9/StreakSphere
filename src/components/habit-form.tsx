/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { setHours, setMinutes } from 'date-fns';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { z } from 'zod';

import ColorCard from '@/components/color-card';
import FrequencyCounter from '@/components/frequency-counter';
import IconCard from '@/components/icon-card';
import { type IconName } from '@/components/icons';
import ReminderSettings, { type DayId } from '@/components/reminder-settings';
import { Button, ControlledInput, Text, View } from '@/components/ui';
import { useAuth } from '@/lib/auth/use-auth';
import { closeFab } from '@/lib/state/fab-actions';
import { createHabit, updateHabit } from '@/lib/state/habits-actions';
import { dateToTimeString } from '@/lib/utils/date-utils';
import type { HabitWithoutId } from '@/types/habit';

const DEFAULT_REMINDER_DAYS: DayId[] = [
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
  'sun',
];

// Set default reminder time to 12:00 PM
const DEFAULT_REMINDER_TIME = dateToTimeString(
  setHours(setMinutes(new Date(), 0), 12)
);

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

export type TInitialData = {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  color: string;
  streak_count: number;
  reminder_days: DayId[];
  reminder_time: string;
};

type HabitFormProps = {
  mode: 'add' | 'edit';
  initialData?: TInitialData;
};

const HabitForm = ({ mode, initialData }: HabitFormProps) => {
  const [selectedHabitFeature, setSelectedHabitFeature] =
    useState<THabitFeature>({
      icon: initialData?.icon ?? null,
      color: initialData?.color ?? null,
      frequency: initialData?.streak_count ?? 1,
    });

  const [reminderDays, setReminderDays] = useState<DayId[]>(
    initialData?.reminder_days ?? DEFAULT_REMINDER_DAYS
  );

  const [reminderTime, setReminderTime] = useState<string>(
    initialData?.reminder_time ?? DEFAULT_REMINDER_TIME
  );

  const { user } = useAuth();
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      title: initialData?.title ?? '',
      description: initialData?.description ?? '',
    },
  });

  const validateFeatures = () => {
    if (
      !selectedHabitFeature.icon ||
      !selectedHabitFeature.color ||
      !selectedHabitFeature.frequency
    ) {
      Toast.show({
        type: 'error',
        text1: 'Please select all features',
      });
      return false;
    }
    return true;
  };

  const onSubmit = (data: FormType) => {
    if (!validateFeatures()) return;

    const habitObject: HabitWithoutId = {
      ...data,
      icon: selectedHabitFeature.icon as string,
      color: selectedHabitFeature.color as string,
      streak_count: selectedHabitFeature.frequency,
      user_id: user!.id,
      deleted: false,
      reminder_time: reminderTime,
      reminder_days: reminderDays,
      last_checked_in: new Date().toISOString(),
      created_at: null,
      updated_at: null,
    };

    if (mode === 'edit' && initialData) {
      updateHabit(initialData.id, habitObject);
    } else {
      createHabit(habitObject);
    }

    closeFab();
  };

  return (
    <View>
      {mode === 'add' && (
        <Text className="mb-2">
          Let's get started. Add a habit to your life.
        </Text>
      )}
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
      {mode === 'edit' && (
        <ReminderSettings
          selectedDays={reminderDays}
          reminderTime={reminderTime}
          onDaysChange={setReminderDays}
          onTimeChange={setReminderTime}
        />
      )}
      <Button variant="outline" onPress={handleSubmit(onSubmit)}>
        <Text>{mode === 'add' ? 'Add habit' : 'Update habit'}</Text>
      </Button>
    </View>
  );
};

export default HabitForm;
