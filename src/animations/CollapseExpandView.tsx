// src/animations/CollapseExpandView.tsx
import React, { useState, useRef } from 'react';
import {
  Animated,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  title: string;
  children: React.ReactNode;
}

export const CollapseExpandView = ({ title, children }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);

    Animated.timing(rotateAnim, {
      toValue: expanded ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggle} style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Animated.Text style={{ transform: [{ rotate }], fontSize: 18 }}>▶</Animated.Text>
      </TouchableOpacity>

      {expanded && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: '#f2f2f2',
    marginVertical: 8,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    paddingTop: 10,
  },
});



// ====>>>>> DECLARATION


/*
// App.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { CollapseExpandView } from './src/animations/CollapseExpandView';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CollapseExpandView title="🔧 Product Details">
        <Text>• Brand: XYZ</Text>
        <Text>• Material: Cotton</Text>
        <Text>• Warranty: 1 Year</Text>
      </CollapseExpandView>

      <CollapseExpandView title="🚚 Shipping Info">
        <Text>• Delivery in 2-5 business days</Text>
        <Text>• Free shipping on orders above ₹499</Text>
      </CollapseExpandView>

      <CollapseExpandView title="❓ FAQs">
        <Text>Q: Is return available?</Text>
        <Text>A: Yes, within 7 days.</Text>
      </CollapseExpandView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
*/