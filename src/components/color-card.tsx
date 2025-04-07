import React, { type Dispatch, type SetStateAction } from 'react';
import { Pressable, ScrollView } from 'react-native';

import { type THabitFeature } from './add-habit-form';

const COLORS_LIST = [
  { key: '01', name: '#FF6B6B' }, // Coral Red
  { key: '02', name: '#4ECDC4' }, // Turquoise
  { key: '03', name: '#45B7D1' }, // Sky Blue
  { key: '04', name: '#96CEB4' }, // Sage Green
  { key: '05', name: '#FFEEAD' }, // Soft Yellow
  { key: '06', name: '#D4A5A5' }, // Dusty Rose
  { key: '07', name: '#9B59B6' }, // Amethyst
  { key: '08', name: '#3498DB' }, // Electric Blue
  { key: '09', name: '#2ECC71' }, // Emerald
  { key: '10', name: '#F1C40F' }, // Sunflower
  { key: '11', name: '#E67E22' }, // Carrot
  { key: '12', name: '#E74C3C' }, // Alizarin
  { key: '13', name: '#1ABC9C' }, // Turquoise
  { key: '14', name: '#34495E' }, // Wet Asphalt
  { key: '15', name: '#F39C12' }, // Orange
  { key: '16', name: '#D35400' }, // Pumpkin
  { key: '17', name: '#C0392B' }, // Pomegranate
  { key: '18', name: '#8E44AD' }, // Wisteria
  { key: '19', name: '#2980B9' }, // Belize Hole
  { key: '20', name: '#27AE60' }, // Nephritis
];

type ColorCardProps = {
  onSelect: Dispatch<SetStateAction<THabitFeature>>;
  selectedColor: string | null;
};

const ColorCard = ({ onSelect, selectedColor }: ColorCardProps) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      className="mt-2 rounded-lg bg-charcoal-950 "
    >
      {COLORS_LIST.map((color) => (
        <Pressable
          onPress={() => onSelect((prev) => ({ ...prev, color: color.name }))}
          style={{
            backgroundColor: color.name,
            borderWidth: selectedColor === color.name ? 1 : 0,
            borderColor: 'white',
          }}
          key={color.name}
          className="m-[8] size-7 rounded-lg "
        />
      ))}
    </ScrollView>
  );
};

export default ColorCard;
