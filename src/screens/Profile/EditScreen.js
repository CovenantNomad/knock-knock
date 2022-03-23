import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EditScreen = () => {
  return (
    <View style={styles.container}>
      <Text>EditScreen</Text>
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

export default EditScreen;