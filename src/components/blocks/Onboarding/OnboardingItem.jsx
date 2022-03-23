import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const OnboardingItem = () => {
  return (
    <View style={styles.container}>
      <Text>OnboardingItem</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OnboardingItem;