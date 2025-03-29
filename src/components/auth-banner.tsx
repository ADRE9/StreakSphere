import AntDesign from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Text } from './ui';
type AuthBannerProps = {
  mode?: 'sign-in' | 'sign-up';
};

const AuthBanner = ({ mode = 'sign-in' }: AuthBannerProps) => {
  return (
    <View className="absolute z-0 size-full bg-yellow-500">
      <Image
        source={require('assets/images/pngs/login_banner.png')}
        className="flex-1"
      />
      <LinearGradient
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 0, y: 0.5 }}
        colors={['transparent', 'rgba(0,0,0,1)']}
      />
      <View
        className={`absolute h-1/2 w-full items-center justify-end  ${mode === 'sign-up' && 'pb-10'}`}
      >
        <Text className="text-center text-3xl font-bold text-white">
          {mode === 'sign-in'
            ? "LET'S GET\nYOU STARTED"
            : 'WELCOME TO\nSTREAK SPHERE'}
        </Text>
        <Pressable className="mt-4 flex-row items-center justify-center gap-2 rounded-xl bg-white p-4">
          <AntDesign name="google" size={20} color="red" />
          <Text>Continue with Google</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AuthBanner;
