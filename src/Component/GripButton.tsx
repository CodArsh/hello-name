import React, { useRef, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
  ActivityIndicator,
  StyleSheet,
  Animated,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from 'react-native';

type Variant =
  | 'solid'
  | 'outline'
  | 'clear'
  | 'ghost'
  | 'soft'
  | 'link'
  | 'elevated'
  | 'dashed';

type Size = 'small' | 'medium' | 'large';
type ColorType = 'success' | 'error' | 'warning' | 'info';
type IconPosition = 'left' | 'right';
type Shape = 'pill' | 'rounded' | 'square';
type AnimationType = 'scale' | 'bounce' | 'punch';
type TitleCase = 'uppercase' | 'capitalize' | 'none';

interface GripButtonProps {
  title: string;
  onPress?: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  variant?: Variant;
  size?: Size;
  colorType?: ColorType;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
  debounceDelay?: number;
  shape?: Shape;
  animationType?: AnimationType;
  titleCase?: TitleCase;
  useRipple?: boolean;
}

const COLORS = {
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FFC107',
  info: '#2196F3',
  disabled: '#BDBDBD',
  white: '#FFFFFF',
};

const SIZES = {
  small: { paddingVertical: 6, paddingHorizontal: 12, fontSize: 14 },
  medium: { paddingVertical: 10, paddingHorizontal: 16, fontSize: 16 },
  large: { paddingVertical: 14, paddingHorizontal: 20, fontSize: 18 },
};

export const GripButton: React.FC<GripButtonProps> = ({
  title,
  onPress,
  disabled = false,
  variant = 'solid',
  size = 'medium',
  colorType = 'info',
  icon,
  iconPosition = 'left',
  style,
  textStyle,
  loading = false,
  debounceDelay = 500,
  shape = 'rounded',
  animationType = 'scale',
  titleCase = 'none',
  useRipple = true,
}) => {
  const [debounced, setDebounced] = useState(false);
  const anim = useRef(new Animated.Value(1)).current;

  const color = disabled ? COLORS.disabled : COLORS[colorType];
  const sizeStyle = SIZES[size];

  const shapeStyle: ViewStyle = {
    borderRadius: shape === 'pill' ? 999 : shape === 'rounded' ? 10 : 2,
  };

  const backgroundColor = (() => {
    switch (variant) {
      case 'solid':
        return color;
      case 'ghost':
        return `${color}10`;
      case 'soft':
        return `${color}20`;
      case 'elevated':
        return color;
      default:
        return 'transparent';
    }
  })();

  const borderColor =
    variant === 'outline' || variant === 'dashed' ? color : 'transparent';

  const textColor =
    variant === 'solid' || variant === 'elevated' ? COLORS.white : color;

  const shadowStyle =
    variant === 'elevated' && !disabled
      ? {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }
      : {};

  const containerStyle: ViewStyle = {
    backgroundColor,
    borderColor,
    borderWidth:
      variant === 'outline' || variant === 'dashed' ? 1.5 : 0,
    borderStyle: variant === 'dashed' ? 'dashed' : 'solid',
    paddingVertical: sizeStyle.paddingVertical,
    paddingHorizontal: sizeStyle.paddingHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.6 : 1,
    ...shapeStyle,
    ...shadowStyle,
  };

  const getTitle = () => {
    if (titleCase === 'uppercase') return title.toUpperCase();
    if (titleCase === 'capitalize')
      return title.charAt(0).toUpperCase() + title.slice(1);
    return title;
  };

  const handlePress = (e: GestureResponderEvent) => {
    if (!debounced && !disabled && !loading) {
      onPress?.(e);
      setDebounced(true);
      setTimeout(() => setDebounced(false), debounceDelay);
    }
  };

  const animatePress = () => {
    if (animationType === 'scale') {
      Animated.sequence([
        Animated.spring(anim, { toValue: 0.95, useNativeDriver: true }),
        Animated.spring(anim, { toValue: 1, useNativeDriver: true }),
      ]).start();
    } else if (animationType === 'bounce') {
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 0.9,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.spring(anim, {
          toValue: 1,
          friction: 3,
          tension: 50,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (animationType === 'punch') {
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 0.5,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const rippleWrapper = (children: React.ReactNode) => {
    if (Platform.OS === 'android' && useRipple) {
      return (
        <TouchableNativeFeedback
          onPress={handlePress}
          onPressIn={animatePress}
          disabled={disabled || loading}
        >
          <View style={[containerStyle, style]}>{children}</View>
        </TouchableNativeFeedback>
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePress}
        onPressIn={animatePress}
        disabled={disabled || loading}
        style={[containerStyle, style]}
      >
        {children}
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View style={{ transform: [{ scale: anim }] }}>
      {rippleWrapper(
        <>
          {icon && iconPosition === 'left' && (
            <View style={{ marginRight: 8 }}>{icon}</View>
          )}
          {loading ? (
            <ActivityIndicator
              size="small"
              color={variant === 'solid' || variant === 'elevated' ? COLORS.white : color}
            />
          ) : (
            <Text
              style={[
                {
                  color: variant === 'link' ? color : textColor,
                  fontSize: sizeStyle.fontSize,
                  fontWeight: '600',
                  textDecorationLine: variant === 'link' ? 'underline' : 'none',
                },
                textStyle,
              ]}
            >
              {getTitle()}
            </Text>
          )}
          {icon && iconPosition === 'right' && (
            <View style={{ marginLeft: 8 }}>{icon}</View>
          )}

        </>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#F44336',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
