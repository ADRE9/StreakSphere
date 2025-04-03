/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { z } from 'zod';

import { Button, ControlledInput, Text } from '@/components/ui';

const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email')
    .transform((email) => email.toLowerCase().trim()),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(72, 'Password must be less than 72 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});

const signUpSchema = signInSchema
  .extend({
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;

type AuthFormProps = {
  mode: 'sign-in' | 'sign-up';
  onSubmit: (data: SignInFormData | SignUpFormData) => Promise<void>;
};

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isSignUp = mode === 'sign-up';

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<SignInFormData | SignUpFormData>({
    resolver: zodResolver(isSignUp ? signUpSchema : signInSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      ...(isSignUp && { confirmPassword: '' }),
    },
  });

  const handleFormSubmit = async (data: SignInFormData | SignUpFormData) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
    } catch (err) {
      // Error is handled by the auth store with toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="w-full"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="w-full space-y-4">
          <ControlledInput
            control={control}
            name="email"
            label="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Enter your email"
            autoComplete="email"
            testID="email-input"
          />
          <ControlledInput
            control={control}
            name="password"
            label="Password"
            secureTextEntry
            placeholder="Enter your password"
            autoComplete={isSignUp ? 'new-password' : 'password'}
            testID="password-input"
          />
          {isSignUp && (
            <ControlledInput
              control={control}
              name="confirmPassword"
              label="Confirm Password"
              secureTextEntry
              placeholder="Confirm your password"
              autoComplete="new-password"
              testID="confirm-password-input"
            />
          )}
          <Button
            variant="secondary"
            className="w-full"
            onPress={handleSubmit(handleFormSubmit)}
            disabled={isLoading || isSubmitting || !isValid}
            testID={`${mode}-button`}
          >
            <Text className="text-white">
              {isLoading
                ? isSignUp
                  ? 'Creating Account...'
                  : 'Signing in...'
                : isSignUp
                  ? 'Create Account'
                  : 'Sign In'}
            </Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
