import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import Svg, { Path, type SvgProps } from 'react-native-svg';

import { useThemeConfig } from '@/lib/use-theme-config';

const TabBaseSvg = (props: SvgProps) => {
  const { width } = useWindowDimensions();
  const theme = useThemeConfig();
  const { colors } = theme;
  return (
    <Svg
      width={width}
      height={80}
      viewBox="0 0 414 80"
      preserveAspectRatio="none"
      {...props}
    >
      <Path
        fill={colors.background}
        d="M0 0h120.062c17.644 0 34.974 4.668 50.231 13.531l18.448 10.717a37 37 0 0 0 37.056.066l19.028-10.962A100 100 0 0 1 294.746 0H414v80H0V0Z"
      />
    </Svg>
  );
};
export default TabBaseSvg;
