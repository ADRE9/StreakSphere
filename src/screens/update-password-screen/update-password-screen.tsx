/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
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
  const url = Linking.useLinkingURL();
  const { queryParams } = Linking.parse(url as string);
  // const params = useLocalSearchParams();
  // // Get the recovery token from the URL parameters
  const token = queryParams?.token as string;
  const type = queryParams?.type as string;

  const { control, handleSubmit } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    mode: 'onChange',
    defaultValues: {
      new_password: '',
      confirm_new_password: '',
    },
  });

  // Check if we have a valid session when the component mounts
  useEffect(() => {
    const checkSession = async () => {
      // First try to get the current session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      // If we have a session, we can proceed with password update
      if (session) {
        return;
      }
      // If no session and no token, redirect to forgot password
      if (!token) {
        Toast.show({
          type: 'error',
          text1: 'No active session found',
          text2: 'Please sign in again or request a password reset',
        });
        // router.replace('/(auth)/forgot-password');
        return;
      }
      // If we have a token, verify it
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: type as any,
      });
      if (error) {
        Toast.show({
          type: 'error',
          text1: 'Invalid or expired password reset link',
          text2: 'Please request a new password reset link',
        });
        router.replace('/(auth)/forgot-password');
      }
    };
    checkSession();
  }, [token, type]);

  const onSubmit = async (data: UpdatePasswordFormData) => {
    setIsLoading(true);

    // For password reset flow, we need to use updateUser with the recovery token
    const { error } = await supabase.auth.updateUser({
      password: data.new_password,
    });

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error updating password',
        text2: error.message,
      });
      setIsLoading(false);
      return;
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
