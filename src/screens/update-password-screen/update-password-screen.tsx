/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { z } from 'zod';

import { Button, ControlledInput } from '@/components/ui';
import BackButton from '@/components/ui/back-button';
import { Text } from '@/components/ui/text';
import { useKeyboardAnimation } from '@/lib/hooks/use-animated-keyboard-styles';
import { supabase } from '@/lib/supabase';
import { tryCatch } from '@/utils/try-catch';

const updatePasswordSchema = z
  .object({
    new_password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirm_new_password: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Passwords don't match",
    path: ['confirm_new_password'],
  });

type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;

const UpdatePasswordScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { animatedKeyboardViewStyle } = useKeyboardAnimation(150);

  const { control, handleSubmit } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    mode: 'onChange',
    defaultValues: {
      new_password: '',
      confirm_new_password: '',
    },
  });

  const onSubmit = async (data: UpdatePasswordFormData) => {
    setIsLoading(true);
    const { error } = await tryCatch(
      supabase.auth.updateUser({ password: data.new_password })
    );
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error updating password',
      });
    }
    Toast.show({
      type: 'success',
      text1: 'Password updated successfully',
    });
    setIsLoading(false);
    router.replace('/(auth)/sign-in');
  };

  return (
    <Animated.View
      style={[animatedKeyboardViewStyle]}
      className="flex-1 items-center justify-center dark:bg-black"
    >
      <BackButton />
      <Text className="text-2xl font-bold text-black dark:text-white">
        UPDATE PASSWORD
      </Text>
      <Image
        className="my-10"
        source={require('/assets/images/pngs/forgot_password.png')}
        contentFit="contain"
        style={{ width: 250, height: 250 }}
      />
      <View className="w-full gap-y-4 px-8">
        <ControlledInput
          control={control}
          name="new_password"
          placeholder="New Password"
          secureTextEntry
        />
        <ControlledInput
          control={control}
          name="confirm_new_password"
          placeholder="Confirm New Password"
          secureTextEntry
        />
        <Button
          onPress={handleSubmit(onSubmit)}
          className="bg-primary-600"
          disabled={isLoading}
        >
          <Text className="text-white">
            {isLoading ? 'Updating...' : 'Update Password'}
          </Text>
        </Button>
      </View>
    </Animated.View>
  );
};

export default UpdatePasswordScreen;
