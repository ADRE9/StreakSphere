import { Link, router } from 'expo-router';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import AuthBanner from '@/components/auth-banner';
import { AuthForm, type SignInFormData } from '@/components/auth-form';
import { Text } from '@/components/ui';
import { useAuth } from '@/lib/auth/use-auth';
import { useKeyboardAnimation } from '@/lib/hooks/use-animated-keyboard-styles';

export default function SignInScreen() {
  const { signIn } = useAuth();
  const { animatedKeyboardViewStyle } = useKeyboardAnimation();
  const handleSubmit = async (data: SignInFormData) => {
    const { error } = await signIn({
      email: data.email,
      password: data.password,
    });
    if (error) {
      console.log('error', error);
      Toast.show({
        type: 'error',
        text1: 'Invalid email or password',
      });
      return;
    }

    router.replace('/(app)');
  };

  return (
    <Animated.View
      style={[animatedKeyboardViewStyle]}
      className="relative flex-1"
    >
      <AuthBanner />
      <View className="absolute bottom-0 w-full items-center justify-center rounded-t-3xl bg-white p-4 py-10 dark:border-x-2 dark:border-t-2 dark:border-neutral-800 dark:bg-black">
        <Text className="mb-8 text-xl">Log in with email</Text>
        <AuthForm mode="sign-in" onSubmit={handleSubmit} />
        <Link
          href="/(auth)/forgot-password"
          className="mt-4 flex-row text-primary-500 dark:text-primary-400"
        >
          Forgot your password?
        </Link>
        <View className="mt-4 flex-row">
          <Text className="text-neutral-500">Don't have an account? </Text>
          <Text
            className="text-primary-500 dark:text-primary-400"
            onPress={() => router.push('/(auth)/sign-up')}
          >
            Sign Up
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
