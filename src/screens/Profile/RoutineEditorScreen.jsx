import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const RoutineEditorScreen = ({ route }) => {
  const oldRoutine = route.params
  
  return (
    <View style={styles.container}>
      <Text>{oldRoutine.title}</Text>
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

export default RoutineEditorScreen;