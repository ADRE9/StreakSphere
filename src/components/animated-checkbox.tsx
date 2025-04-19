/* eslint-disable max-lines-per-function */
import { Feather } from '@expo/vector-icons';
import type { MotiTransitionProp } from 'moti';
import { MotiText, MotiView } from 'moti';
import { memo, useMemo, useState } from 'react';
import { View } from 'react-native';

const _activeColor = '#4431E7';
const _inactiveColor = '#BBC0D5';
const _spacing = 20;
const _particlesCount = 8;

type TCheckBoxProps = {
  checked: boolean;
  text: string;
  size: number;
};

const AnimatedCheckBox = memo(({ checked, text, size }: TCheckBoxProps) => {
  const _innerSize = size * 0.2;
  const [width, setWidth] = useState(size);

  // Memoize particles calculation
  const particles = useMemo(() => {
    return [...Array(_particlesCount).keys()].map((i) => {
      const _angle = (i * 2 * Math.PI) / _particlesCount;
      const _radius = 6 + size / 2;
      return {
        key: `particle-${i}`,
        x: _radius * Math.cos(_angle),
        y: _radius * Math.sin(_angle),
      };
    });
  }, [size]);

  // Memoize styles
  const containerStyle = useMemo(() => ({ flexDirection: 'row' as const }), []);
  const checkContainerStyle = useMemo(
    () => ({
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      width: size,
      marginRight: _spacing,
    }),
    [size]
  );
  const particleStyle = useMemo(
    () => ({
      width: _innerSize,
      height: _innerSize,
      borderRadius: _innerSize,
      backgroundColor: _activeColor,
      position: 'absolute' as const,
    }),
    [_innerSize]
  );
  const textContainerStyle = useMemo(
    () => ({ justifyContent: 'center' as const }),
    []
  );
  const textStyle = useMemo(
    () => ({
      fontSize: size,
      fontWeight: 'bold' as const,
      lineHeight: size + 2,
      color: checked ? _inactiveColor : _activeColor,
    }),
    [checked, size]
  );
  const underlineStyle = useMemo(
    () => ({
      height: 3,
      backgroundColor: _activeColor,
      position: 'absolute' as const,
    }),
    []
  );

  // Memoize animation configurations
  const checkAnimation = useMemo(
    () => ({
      scale: checked ? 1 : 0,
      opacity: checked ? 1 : 0,
    }),
    [checked]
  );

  const checkTransition: MotiTransitionProp = useMemo(
    () => ({
      type: checked ? 'spring' : 'timing',
    }),
    [checked]
  );

  const textContainerAnimation = useMemo(
    () => ({
      translateX: checked ? [size / 2, 0] : 0,
    }),
    [checked, size]
  );

  const underlineAnimation = useMemo(
    () => ({
      translateX: checked ? -_spacing / 2 : -size - _spacing + size / 4,
      width: checked ? width + _spacing : size / 2,
      backgroundColor: checked ? _inactiveColor : _activeColor,
    }),
    [checked, size, width]
  );

  return (
    <MotiView style={containerStyle}>
      <View style={checkContainerStyle}>
        <MotiView animate={checkAnimation} transition={checkTransition}>
          <Feather name="check" size={size} color={_activeColor} />
        </MotiView>
        {width !== size &&
          particles.map((item) => (
            <MotiView
              key={item.key}
              animate={{
                transform: [
                  {
                    translateX: checked ? item.x : 0,
                  },
                  {
                    translateY: checked ? item.y : 0,
                  },
                  {
                    scale: checked ? 1.2 : 1,
                  },
                ],
                opacity: checked ? [0.5, 0] : 0,
              }}
              transition={{
                type: 'timing',
                duration: 300,
                delay: 100,
              }}
              style={particleStyle}
            />
          ))}
      </View>
      <MotiView
        animate={textContainerAnimation}
        transition={{
          type: 'timing',
          duration: 200,
          delay: 100,
        }}
        style={textContainerStyle}
        onLayout={(ev) => {
          const newWidth = ev.nativeEvent.layout.width;
          if (width !== newWidth) {
            setWidth(newWidth);
          }
        }}
      >
        <MotiText style={textStyle}>{text}</MotiText>
        {width !== size && (
          <MotiView
            animate={underlineAnimation}
            transition={{
              type: checked ? 'spring' : 'timing',
            }}
            style={underlineStyle}
          />
        )}
      </MotiView>
    </MotiView>
  );
});

export default AnimatedCheckBox;
