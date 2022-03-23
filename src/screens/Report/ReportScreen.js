import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ReportScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ReportScreen</Text>
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

export default ReportScreen;