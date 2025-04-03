import { type ImageSourcePropType } from 'react-native';

export type OnboardingItem = {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
};

export const OnboardingData: OnboardingItem[] = [
  {
    id: '1',
    title: 'WELCOME TO STREAK SPHERE',
    description: 'We can help you build a better version of yourself',
    image: require('/assets/images/pngs/onboard-1.png'),
  },
  {
    id: '2',
    title: 'CREATE NEW HABIT EASILY',
    description: 'The best way to track your streaks',
    image: require('/assets/images/pngs/onboard-2.png'),
  },
  {
    id: '3',
    title: 'STAY CONSISTENT, STAY MOTIVATED',
    description: 'Visualize your progress and never break your streak',
    image: require('/assets/images/pngs/onboard-3.png'),
  },
  {
    id: '4',
    title: 'BUILD HABITS, TRANSFORM LIFE',
    description: 'Small daily actions lead to big changes. Start today!',
    image: require('/assets/images/pngs/onboard-4.png'),
  },
];
