import { BlurView } from 'expo-blur';
import { colorScheme } from 'nativewind';
import { Pressable, StyleSheet } from 'react-native';
import { FadeIn } from 'react-native-reanimated';
import Animated, { FadeOut } from 'react-native-reanimated';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

function Backdrop({
  onPress,
  duration = 500,
}: {
  onPress: () => void;
  duration?: number;
}) {
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        { backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2 },
      ]}
      entering={FadeIn.duration(duration)}
      exiting={FadeOut.duration(duration)}
    >
      <Pressable onPress={onPress} style={{ flex: 1 }}>
        <AnimatedBlurView
          experimentalBlurMethod={'dimezisBlurView'}
          intensity={30}
          tint={
            colorScheme.get() === 'light'
              ? 'systemThinMaterialLight'
              : 'systemThinMaterialDark'
          }
          style={{ flex: 1 }}
        />
      </Pressable>
    </Animated.View>
  );
}

export default Backdrop;
