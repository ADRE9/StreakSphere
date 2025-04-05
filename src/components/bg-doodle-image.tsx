import { Image } from 'expo-image';
import React from 'react';

const light = require('/assets/images/pngs/light_bg.png');
const dark = require('/assets/images/pngs/dark_bg.png');

type Props = {
  colorScheme: 'light' | 'dark';
};

const BgDoodleImage = ({ colorScheme }: Props) => {
  return (
    <Image
      source={colorScheme === 'dark' ? dark : light}
      className="absolute inset-0"
    />
  );
};

export default BgDoodleImage;
