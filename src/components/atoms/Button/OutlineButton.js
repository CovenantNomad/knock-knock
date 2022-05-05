import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fontPercentage, fontSize, heightPercentage, spaces, widthPercentage } from '../../../theme/theme';

const OutlineButton = ({ onPress, label }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: heightPercentage(spaces.s),
    paddingHorizontal: widthPercentage(spaces.m),
    borderWidth: 1,
    borderColor: colors.warning,
    borderRadius: 12,
  },
  label: {
    color: colors.warning,
    fontSize: fontPercentage(fontSize.medium),
    fontWeight: '500',
  },
});

export default OutlineButton;