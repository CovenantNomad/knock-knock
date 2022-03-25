import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fontPercentage, fontSize, heightPercentage, spaces } from '../../../theme/theme';

const Button = ({ onPress, label, loading, width }) => {
  return (
    <TouchableOpacity style={[styles.container, {width: width ? width: '100%'}]} onPress={onPress} disabled={loading}>
      {loading ? (
        <ActivityIndicator color='#F5F5F5' />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.button,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: heightPercentage(spaces.m),
    borderRadius: 8,
    minHeight: heightPercentage(40),
  },
  label: {
    color: 'white',
    fontSize: fontPercentage(fontSize.large),
    fontWeight: '800',
  },
});

export default Button;