// src/animations/ShimmerPlaceholder.tsx
import React from 'react';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions } from 'react-native';

interface Props {
  width?: number;
  height?: number;
  borderRadius?: number;
  style?: object;
}

export const ShimmerPlaceholder = ({
  height = 150,
  borderRadius = 10,
  style,
}: Props) => {
  return (
    <ShimmerPlaceHolder
      LinearGradient={LinearGradient}
      width={100}
      // width={Dimensions.get('window').width - 32}
      height={height}
      shimmerStyle={[{ borderRadius }, style]}
      autoRun
      visible={false} // always false in this standalone usage
    />
  );
};
