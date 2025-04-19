import { observer } from '@legendapp/state/react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { Platform, Switch } from 'react-native';

import { Button, Text, View } from '@/components/ui';

const DAYS = [
  { id: 'mon', label: 'Mon' },
  { id: 'tue', label: 'Tue' },
  { id: 'wed', label: 'Wed' },
  { id: 'thu', label: 'Thu' },
  { id: 'fri', label: 'Fri' },
  { id: 'sat', label: 'Sat' },
  { id: 'sun', label: 'Sun' },
] as const;

export type DayId = (typeof DAYS)[number]['id'];

type ReminderSettingsProps = {
  selectedDays: DayId[];
  reminderTime: string;
  onDaysChange: (days: DayId[]) => void;
  onTimeChange: (time: string) => void;
};

const ReminderSettings = observer(
  ({
    selectedDays,
    reminderTime,
    onDaysChange,
    onTimeChange,
  }: ReminderSettingsProps) => {
    const [showTimePicker, setShowTimePicker] = useState(false);
    const currentTime = new Date(reminderTime);

    const toggleDay = (dayId: DayId) => {
      const newDays = selectedDays.includes(dayId)
        ? selectedDays.filter((d) => d !== dayId)
        : [...selectedDays, dayId];
      onDaysChange(newDays);
    };

    const handleTimeChange = (_: any, selectedTime: Date | undefined) => {
      setShowTimePicker(Platform.OS === 'ios');
      if (selectedTime) {
        onTimeChange(selectedTime.toISOString());
      }
    };

    return (
      <View className="mt-4 space-y-4">
        <Text className="text-lg font-semibold">Reminder Settings</Text>

        {/* Days Selection */}
        <View className="space-y-2">
          <Text className="text-sm text-neutral-600 dark:text-neutral-400">
            Select days for reminders
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {DAYS.map((day) => (
              <View
                key={day.id}
                className="flex-row items-center space-x-2 rounded-lg border border-neutral-200 p-2 dark:border-neutral-700"
              >
                <Text className="text-sm">{day.label}</Text>
                <Switch
                  value={selectedDays.includes(day.id)}
                  onValueChange={() => toggleDay(day.id)}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Time Selection */}
        <View className="space-y-2">
          <Text className="text-sm text-neutral-600 dark:text-neutral-400">
            Set reminder time
          </Text>
          <Button variant="outline" onPress={() => setShowTimePicker(true)}>
            <Text>{format(currentTime, 'hh:mm a')}</Text>
          </Button>

          {showTimePicker && (
            <DateTimePicker
              value={currentTime}
              mode="time"
              is24Hour={false}
              onChange={handleTimeChange}
            />
          )}
        </View>
      </View>
    );
  }
);

export default ReminderSettings;
