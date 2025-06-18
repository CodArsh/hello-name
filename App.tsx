import React from 'react';
import { View, ScrollView, Text, Alert, StyleSheet } from 'react-native';
import { GripButton } from './src/Component/GripButton'; // Correct the path if needed

const GripButtonExamples = () => {
  const handlePress = (msg: string) => console.log(msg);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>🎯 Grip Button Showcase</Text>

      {/* Solid Variant */}
      <Section title="🔹 Solid Variants">
        <GripButton
          title="Pay Now"
          variant="solid"
          colorType="info"
          icon={<Text style={styles.icon}>💳</Text>}
          animationType="punch"
          titleCase="capitalize"
          shape="rounded"
          onPress={() => handlePress('Solid Info')}
        />
        <GripButton
          title="Submit"
          variant="solid"
          colorType="success"
          shape="pill"
          onPress={() => handlePress('Success')}
        />
      </Section>

      {/* Outline Variant */}
      <Section title="🔹 Outline Variant">
        <GripButton
          title="Warning"
          variant="outline"
          colorType="warning"
          icon={<Text style={styles.icon}>⚠️</Text>}
          iconPosition="right"
          titleCase="uppercase"
          shape="rounded"
          onPress={() => handlePress('Warning')}
        />
      </Section>

      {/* Clear Variant */}
      <Section title="🔹 Clear Variant">
        <GripButton
          title="Clear Button"
          variant="clear"
          colorType="error"
          icon={<Text style={styles.icon}>🚫</Text>}
          animationType="punch"
          shape="pill"
          onPress={() => handlePress('Clear')}
        />
      </Section>

      {/* Dashed Variant */}
      <Section title="🔹 Dashed Variant">
        <GripButton
          title="Delete"
          variant="dashed"
          colorType="error"
          icon={<Text style={styles.icon}>🗑️</Text>}
          animationType="scale"
          titleCase="capitalize"
          shape="pill"
          onPress={() => handlePress('Deleted!')}
        />
      </Section>

      {/* Ghost Variant */}
      <Section title="🔹 Ghost Variant">
        <GripButton
          title="Ghost UI"
          variant="ghost"
          colorType="info"
          icon={<Text style={styles.icon}>💎</Text>}
          animationType="scale"
          shape="pill"
          onPress={() => handlePress('Ghost')}
        />
      </Section>

      {/* Link Variant */}
      <Section title="🔹 Link Variant">
        <GripButton
          title="Open Link"
          variant="link"
          colorType="info"
          icon={<Text style={styles.icon}>🔗</Text>}
          shape="pill"
          onPress={() => handlePress('Link')}
        />
      </Section>

      {/* Elevated Variant */}
      <Section title="🔹 Elevated Variant">
        <GripButton
          title="Magic"
          variant="elevated"
          colorType="info"
          icon={<Text style={styles.icon}>✨</Text>}
          shape="rounded"
          style={{ backgroundColor: 'hotpink' }}
          onPress={() => handlePress('Magic')}
        />
      </Section>

      {/* Disabled */}
      <Section title="🔹 Disabled + Loading">
        <GripButton
          title="Disabled"
          variant="solid"
          colorType="warning"
          disabled
          shape="rounded"
        />
        <GripButton
          title="Loading"
          variant="outline"
          colorType="success"
          loading
          shape="rounded"
        />
      </Section>

      {/* Size & Custom Style */}
      <Section title="🔹 Large Size + Custom Style">
        <GripButton
          size="large"
          style={{ backgroundColor: 'black' }}
          title="Next"
          variant="solid"
          colorType="success"
          shape="square"
        />
      </Section>
    </ScrollView>
  );
};

const Section = ({ title, children }: any) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.buttonGroup}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',

  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#555',
  },
  buttonGroup: {
    gap: 12,
  },
  icon: {
    fontSize: 18,
  },
});

export default GripButtonExamples;
