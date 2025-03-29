import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View } from 'react-native';

const AuthBanner = () => {
  return (
    <View className="absolute z-0 h-3/5 w-full bg-yellow-500">
      <Image
        source={require('assets/images/pngs/login_banner.png')}
        className="flex-1"
      />
      <LinearGradient
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        start={{ x: 0, y: 0.4 }}
        end={{ x: 0, y: 0.8 }}
        colors={['transparent', 'rgba(255,255,255,1)']}
      />
    </View>
  );
};

export default AuthBanner;
