/* eslint-disable max-lines-per-function */
import { observer, use$ } from '@legendapp/state/react';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

import Icon from '@/components/icons';
import { Pressable, View } from '@/components/ui';
import {
  createCheckIn,
  getTodaysCheckInId,
  updateCheckIn,
} from '@/lib/state/check-in-actions';
import { checkIns$, habits$ } from '@/utils/supa-legend';

type Props = {
  color: string;
  habitId: string;
};

const STROKE_WIDTH = 2;
const STROKE_BASE_COLOR = 'white';
const SIZE = 40;
const STROKE_DASH_OFFSET = 5;

const StreakButton = observer(({ color, habitId }: Props) => {
  const checkIns = use$(checkIns$);
  const todaysCheckInId = getTodaysCheckInId(habitId, checkIns);
  const maxStreak = use$(habits$[habitId].streak_count);
  const currentStreak = todaysCheckInId
    ? (checkIns[todaysCheckInId]?.frequency ?? 0)
    : 0;

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

  const visibleLengthStreak = currentStreak === 0 ? 0 : visibleLength;
  const visibleStrokeWidth = currentStreak === 0 ? 0 : strokeWidth + 0.5;

  const handleCheckIn = () => {
    if (todaysCheckInId && currentStreak === maxStreak) {
      updateCheckIn(todaysCheckInId, habitId, 0);
    } else if (todaysCheckInId && currentStreak < maxStreak) {
      updateCheckIn(todaysCheckInId, habitId, currentStreak + 1);
    } else {
      createCheckIn(habitId, 1);
    }
  };

  return (
    <Pressable
      onPress={handleCheckIn}
      className="size-[40] flex-row items-center justify-center"
    >
      <Svg
        className="absolute"
        width={SIZE + STROKE_WIDTH}
        height={SIZE + STROKE_WIDTH}
      >
        <Path
          d={d}
          stroke={STROKE_BASE_COLOR}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${dashLength}, ${gapLength}`}
          strokeLinecap="round"
        />

        <Path
          d={d}
          stroke={color}
          strokeWidth={visibleStrokeWidth}
          fill="none"
          strokeDasharray={`${visibleLengthStreak}, ${circumference}`}
          strokeLinecap="round"
        />
      </Svg>
      <View className="absolute">
        <Icon name="Plus" size={20} color={color} />
      </View>
    </Pressable>
  );
});

export default StreakButton;
