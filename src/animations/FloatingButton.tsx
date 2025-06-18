// src/animations/FloatingButton.tsx
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
// import { Ionicons } from '@expo/vector-icons'; // or react-native-vector-icons

interface Props {
  icon?: string;
  onPress: () => void;
  style?: ViewStyle;
  size?: number;
  color?: string;
}

export const FloatingButton = ({
  icon = 'cart',
  onPress,
  style,
  size = 28,
  color = 'white',
}: Props) => {
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ scale }] }, style]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.button}>
        {/* <Ionicons name={icon as any} size={size} color={color} /> */}
        {/* PLEASE ADD ICON HERE */}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    zIndex: 999,
    elevation: 5,
  },
  button: {
    backgroundColor: '#007aff',
    padding: 16,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
