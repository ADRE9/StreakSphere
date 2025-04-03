import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

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
  const { animatedKeyboardViewStyle } = useKeyboardAnimation(180);

  const handleSubmit = async (data: SignInFormData | SignUpFormData) => {
    if ('confirmPassword' in data) {
      const { error } = await signUp({
        email: data.email,
        password: data.password,
      });
      if (error) {
        console.warn('error', error);
        Toast.show({
          type: 'error',
          text1: 'Error signing up',
        });
        return;
      }
      router.replace('/verify-email');
    }
  };

  return (
    <Animated.View
      style={animatedKeyboardViewStyle}
      className="relative flex-1"
    >
      <View className="relative size-full items-center p-4 py-10 dark:bg-black">
        <View className="relative mt-10 size-64 overflow-hidden rounded-full">
          <Image
            source={require('/assets/images/pngs/onboard-11.png')}
            contentFit="contain"
            className="size-full"
          />
        </View>
        <Text className="relative my-8 text-xl font-bold">
          CREATE YOUR ACCOUNT
        </Text>
        <AuthForm mode="sign-up" onSubmit={handleSubmit} />
        <Text className="text-xsm relative my-4 text-center">
          Or sign in with
        </Text>
        <Pressable className=" dark:border-x-hairline dark:border-y-hairline mt-4 flex-row items-center justify-center gap-2  rounded-xl bg-neutral-300 p-4 dark:border-neutral-600 dark:bg-neutral-800">
          <AntDesign name="google" size={20} color="red" />
          <Text>Continue with Google</Text>
        </Pressable>
        <View className="mt-4 flex-row">
          <Text className="text-neutral-500">Already have an account? </Text>
          <Text
            className="text-primary-500 dark:text-primary-400"
            onPress={() => router.push('/(auth)/sign-in')}
          >
            Sign In
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}
