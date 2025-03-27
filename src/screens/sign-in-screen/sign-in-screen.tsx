import { router } from 'expo-router';
import { View } from 'react-native';

import { AuthForm, type SignInFormData } from '@/components/auth-form';
import { Text } from '@/components/ui';
import { useAuth } from '@/lib/auth/use-auth';

export default function SignInScreen() {
  const { signIn } = useAuth();
  const handleSubmit = async (data: SignInFormData) => {
    await signIn({
      email: data.email,
      password: data.password,
    });
    router.replace('/(app)');
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="mb-8 text-2xl font-bold">Welcome Back</Text>
      <AuthForm mode="sign-in" onSubmit={handleSubmit} />
      <View className="mt-4 flex-row">
        <Text className="text-neutral-500">Don't have an account? </Text>
        <Text
          className="text-primary-500"
          onPress={() => router.push('/(auth)/sign-up')}
        >
          Sign Up
        </Text>
      </View>
    </View>
  );
}
