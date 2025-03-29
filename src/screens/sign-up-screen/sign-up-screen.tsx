import { router } from 'expo-router';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import AuthBanner from '@/components/auth-banner';
import {
  AuthForm,
  type SignInFormData,
  type SignUpFormData,
} from '@/components/auth-form';
import { Text } from '@/components/ui';
import { useAuth } from '@/lib/auth/use-auth';
import { useKeyboardAnimation } from '@/lib/hooks/use-animated-keyboard-styles';

export default function SignUpScreen() {
  const { signUp } = useAuth();
  const { animatedKeyboardViewStyle } = useKeyboardAnimation();

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
    <Animated.View
      style={animatedKeyboardViewStyle}
      className="relative flex-1"
    >
      <AuthBanner />
      <View className="relative top-[55%] h-2/5 w-full items-center justify-center rounded-3xl bg-white p-4">
        <Text className="mb-8 text-2xl font-bold">Sign up with email</Text>
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
    </Animated.View>
  );
}
