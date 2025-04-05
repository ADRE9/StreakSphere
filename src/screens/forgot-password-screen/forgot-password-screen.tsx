/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { z } from 'zod';

import { ControlledInput } from '@/components/ui';
import { Button } from '@/components/ui';
import BackButton from '@/components/ui/back-button';
import { Text } from '@/components/ui/text';
import { useKeyboardAnimation } from '@/lib/hooks/use-animated-keyboard-styles';
import { supabase } from '@/lib/supabase';
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email')
    .transform((email) => email.toLowerCase().trim()),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordScreen = () => {
  const { animatedKeyboardViewStyle } = useKeyboardAnimation(150);
  const [isLoading, setIsLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<ForgotPasswordFormData>({
    mode: 'onChange',
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [cooldown]);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: 'com.streaksphere://update-password?type=recovery',
    });

    if (error === null) {
      setCooldown(60);
    }

    setIsLoading(false);
    router.replace('/(auth)/sign-in');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Animated.View
      style={[
        { flex: 1, alignItems: 'center', justifyContent: 'center' },
        animatedKeyboardViewStyle,
      ]}
    >
      <BackButton />
      <Text className="py-8 text-2xl font-bold">FORGOT YOUR PASSWORD?</Text>
      <Image
        source={require('/assets/images/pngs/forgot_password.png')}
        style={{ width: 250, height: 250 }}
        contentFit="contain"
      />
      <Text className="px-20 py-4 text-center text-sm text-neutral-500">
        Enter your registered email below to receive password reset
        notification.
      </Text>
      <View className="w-full px-10">
        <ControlledInput
          control={control}
          name="email"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Enter your email"
          autoComplete="email"
          testID="email-input"
        />
        <Button
          variant="secondary"
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading || isSubmitting || !isValid || cooldown > 0}
        >
          <Text className="text-white">
            {isSubmitting
              ? 'Sending...'
              : cooldown > 0
                ? `Resend in ${formatTime(cooldown)}`
                : 'Send Reset Link'}
          </Text>
        </Button>
      </View>
    </Animated.View>
  );
};

export default ForgotPasswordScreen;
