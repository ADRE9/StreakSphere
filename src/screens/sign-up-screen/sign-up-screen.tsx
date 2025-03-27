import { router } from 'expo-router';
import { View } from 'react-native';

import { AuthForm } from '@/components/auth-form';
import { Text } from '@/components/ui';
import { useAuthStore } from '@/lib/auth';

export default function SignUpScreen() {
  const { signUp } = useAuthStore();

  const handleSubmit = async (data: any) => {
    await signUp(data.email, data.password);
    router.replace('/verify-email' as any);
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="mb-8 text-2xl font-bold">Create Account</Text>
      <AuthForm mode="sign-up" onSubmit={handleSubmit} />
      <View className="mt-4 flex-row">
        <Text className="text-neutral-500">Already have an account? </Text>
        <Text
          className="text-primary-500"
          onPress={() => router.push('/sign-in' as any)}
        >
          Sign In
        </Text>
      </View>
    </View>
  );
}
