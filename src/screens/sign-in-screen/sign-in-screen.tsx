import { router } from 'expo-router';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import AuthBanner from '@/components/auth-banner';
import { AuthForm, type SignInFormData } from '@/components/auth-form';
import { Text } from '@/components/ui';
import { useAuth } from '@/lib/auth/use-auth';
import { useKeyboardAnimation } from '@/lib/hooks/use-animated-keyboard-styles';

export default function SignInScreen() {
  const { signIn } = useAuth();
  const { animatedKeyboardViewStyle } = useKeyboardAnimation();
  const handleSubmit = async (data: SignInFormData) => {
    await signIn({
      email: data.email,
      password: data.password,
    });
    router.replace('/(app)');
  };

  return (
    <Animated.View
      style={[animatedKeyboardViewStyle]}
      className="relative flex-1"
    >
      <AuthBanner />
      <View className="absolute bottom-0 w-full items-center justify-center rounded-t-3xl bg-white p-4 py-10">
        <Text className="mb-8 text-2xl font-bold">Log in with email</Text>
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
    </Animated.View>
  );
}
