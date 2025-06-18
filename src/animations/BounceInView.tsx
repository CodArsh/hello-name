import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export const BounceInView = ({ children }: { children: React.ReactNode }) => {
  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(bounceValue, {
      toValue: 1,
      friction: 4,
      tension: 60,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={{ transform: [{ scale: bounceValue }] }}>
      {children}
    </Animated.View>
  );
};
