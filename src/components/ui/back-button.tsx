import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

const BackButton = () => {
  return (
    <Pressable
      className="absolute left-5 top-10 z-10 rounded-full bg-primary-100 p-2"
      onPress={() => router.back()}
    >
      <Ionicons name="chevron-back" size={24} color="black" />
    </Pressable>
  );
};

export default BackButton;
