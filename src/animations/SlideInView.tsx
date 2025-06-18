// animations/SlideInView.tsx
import React, { useRef, useEffect } from 'react';
import { Animated, ViewStyle, StyleProp } from 'react-native';

type Direction = 'up' | 'down' | 'left' | 'right';

interface Props {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: Direction;
  style?: StyleProp<ViewStyle>;
}

export const SlideInView: React.FC<Props> = ({
  children,
  delay = 0,
  duration = 500,
  direction = 'up',
  style,
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  const translateMap = {
    up: { transform: [{ translateY: slideAnim }] },
    down: { transform: [{ translateY: slideAnim }] },
    left: { transform: [{ translateX: slideAnim }] },
    right: { transform: [{ translateX: slideAnim }] },
  };

  const initialValue = direction === 'up' ? 30 : direction === 'down' ? -30 : direction === 'left' ? 30 : -30;

  useEffect(() => {
    slideAnim.setValue(initialValue);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[translateMap[direction], style]}>
      {children}
    </Animated.View>
  );
};
