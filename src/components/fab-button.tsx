/* eslint-disable max-lines-per-function */
import { Entypo } from '@expo/vector-icons';
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  type ViewStyle,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
  KeyboardState,
  LinearTransition,
  useAnimatedKeyboard,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Text } from './ui';

const AnimatedEntypo = Animated.createAnimatedComponent(Entypo);

const { width } = Dimensions.get('window');
const _defaultDuration = 500;

export type FabButtonProps = {
  onPress: () => void;
  isOpen: boolean;
  children: React.ReactNode;
  panelStyle?: ViewStyle;
  duration?: number;
  raise?: string;
  header?: string;
  openedSize?: number;
  closedSize?: number;
};

export function FabButton({
  onPress,
  isOpen,
  panelStyle,
  raise,
  children,
  header,
  duration = _defaultDuration,
  openedSize = width * 0.85,
  closedSize = 64,
}: FabButtonProps) {
  const spacing = closedSize * 0.2;
  const closeIconSize = closedSize * 0.3;
  const openIconSize = closedSize * 0.5;
  const { height: keyboardHeight, state } = useAnimatedKeyboard();

  const keyboardHeightStyle = useAnimatedStyle(() => {
    return {
      marginBottom:
        state.value === KeyboardState.OPEN
          ? keyboardHeight.value - 80 + spacing
          : 0,
    };
  });

  return (
    <Animated.View
      style={[
        styles.panel,
        panelStyle,
        {
          width: isOpen ? openedSize : closedSize,
          height: isOpen ? 'auto' : closedSize,
          bottom: typeof raise === 'string' && isOpen ? Number(raise) : 80,
          borderRadius: closedSize / 2,
          padding: spacing,
        },
        keyboardHeightStyle,
      ]}
      // Use Layout if you're using an old version of Reanimated
      layout={LinearTransition.duration(duration)}
    >
      <TouchableWithoutFeedback onPress={onPress}>
        <Animated.View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 0,
            top: 0,
            width: closedSize,
            height: closedSize,
            zIndex: 2,
          }}
          // Use Layout if you're using an old version of Reanimated
          layout={LinearTransition.duration(duration)}
        >
          {isOpen ? (
            <AnimatedEntypo
              key="close"
              name="cross"
              size={closeIconSize}
              color="white"
              entering={FadeIn.duration(duration)}
              exiting={FadeOut.duration(duration)}
            />
          ) : (
            <AnimatedEntypo
              key="open"
              name="plus"
              size={openIconSize}
              color="white"
              entering={FadeIn.duration(duration)}
              exiting={FadeOut.duration(duration)}
            />
          )}
        </Animated.View>
      </TouchableWithoutFeedback>
      {isOpen && (
        <Animated.View
          entering={FadeInDown.duration(duration)}
          exiting={FadeOutDown.duration(duration)}
          style={{ flex: 1, gap: spacing * 2, padding: spacing }}
        >
          <View style={styles.header}>
            <Text className="font-klasik text-2xl">{header ?? ''}</Text>
          </View>
          <View style={[styles.content, { gap: spacing * 2 }]}>{children}</View>
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: '#111',
    zIndex: 9999,
  },
  content: { flex: 1, paddingTop: 0 },
  header: { justifyContent: 'center' },
});
