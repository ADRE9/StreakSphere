import { router } from 'expo-router';
import { View } from 'react-native';

import {
  AuthForm,
  type SignInFormData,
  type SignUpFormData,
} from '@/components/auth-form';
import { Text } from '@/components/ui';
import { useAuth } from '@/lib/auth/use-auth';

export default function SignUpScreen() {
  const { signUp } = useAuth();

  const handleSubmit = async (data: SignInFormData | SignUpFormData) => {
    if ('confirmPassword' in data) {
      await signUp({
        email: data.email,
        password: data.password,
      });
      router.replace('/verify-email');
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="mb-8 text-2xl font-bold">Create Account</Text>
      <AuthForm mode="sign-up" onSubmit={handleSubmit} />
      <View className="mt-4 flex-row">
        <Text className="text-neutral-500">Already have an account? </Text>
        <Text
          className="text-primary-500"
          onPress={() => router.push('/(auth)/sign-in')}
        >
          Sign In
        </Text>
      </View>
    </View>
  );
}
