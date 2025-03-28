import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
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
    <View className="relative flex-1">
      <View className="absolute z-0 h-3/5 w-full bg-yellow-500">
        <Image
          source={require('assets/images/pngs/login_banner.png')}
          className="flex-1"
        />
        <LinearGradient
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          start={{ x: 0, y: 0.3 }}
          end={{ x: 0, y: 0.8 }}
          colors={['transparent', 'rgba(255,255,255,0.9)']}
        />
      </View>
      <View className="relative top-[55%] h-2/5 w-full items-center justify-center rounded-3xl bg-white p-4">
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
    </View>
  );
}
