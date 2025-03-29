import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import { interpolate, useAnimatedStyle } from 'react-native-reanimated';

export function useKeyboardAnimation() {
  const { height, progress } = useReanimatedKeyboardAnimation();

  const animatedKeyboardViewStyle = useAnimatedStyle(() => {
    const translateY = interpolate(progress.value, [0, 1], [0, height.value]);

    return {
      transform: [{ translateY: translateY }],
    };
  });

  return { animatedKeyboardViewStyle };
}
