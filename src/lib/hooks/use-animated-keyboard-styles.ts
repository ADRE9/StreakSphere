import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller';
import { interpolate, useAnimatedStyle } from 'react-native-reanimated';

export function useKeyboardAnimation(pB?: number) {
  const { height, progress } = useReanimatedKeyboardAnimation();
  const actualPaddingBottom = pB ?? 0;

  const animatedKeyboardViewStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      transform: [
        {
          translateY: interpolate(
            progress.value,
            [0, 1],
            [0, height.value + actualPaddingBottom]
          ),
        },
      ],
    };
  });

  return { animatedKeyboardViewStyle };
}
