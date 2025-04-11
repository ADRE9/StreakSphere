import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { View } from './ui';

type Props = {
  maxStreak: number;
  currentStreak: number;
  color: string;
};

const STROKE_WIDTH = 2;
const STROKE_BASE_COLOR = 'white';
const SIZE = 40;
const STROKE_DASH_OFFSET = 5;

const StreakButton = ({ maxStreak, currentStreak, color }: Props) => {
  const progress = currentStreak / maxStreak;
  const radius = SIZE / 2 - STROKE_WIDTH * 2;
  const strokeWidth = STROKE_WIDTH;
  const dotCount = maxStreak;
  const circumference = 2 * Math.PI * radius;
  const dashLength = circumference / dotCount - STROKE_DASH_OFFSET;
  const gapLength = STROKE_DASH_OFFSET;
  const progressDots = dotCount * progress;
  const visibleLength =
    progressDots * (dashLength + gapLength) - STROKE_DASH_OFFSET;

  const polarToCartesian = (
    cx: number,
    cy: number,
    r: number,
    angle: number
    // eslint-disable-next-line max-params
  ) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const describeCircle = (cx: number, cy: number, r: number) => {
    const start = polarToCartesian(cx, cy, r, 0);
    return [
      `M ${start.x} ${start.y}`,
      `A ${r} ${r} 0 1 1 ${start.x - 0.01} ${start.y}`, // Close the loop
    ].join(' ');
  };

  const d = describeCircle(
    SIZE / 2 + STROKE_WIDTH / 2,
    SIZE / 2 + STROKE_WIDTH / 2,
    radius
  );

  return (
    <View>
      <Svg width={SIZE} height={SIZE}>
        {/* Base (all dots) */}
        <Path
          d={d}
          stroke={STROKE_BASE_COLOR}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${dashLength}, ${gapLength}`}
          strokeLinecap="round"
        />

        {/* Progress (colored dots) */}
        <Path
          d={d}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${visibleLength}, ${circumference}`}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

export default StreakButton;
